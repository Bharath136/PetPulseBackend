const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const redis = require('redis');
const redisClient = redis.createClient();
const emailQueue = require('../queues/emailQueue'); // Import the email queue
const { generateOTP, isValidEmail } = require('../utils/helper'); // Adjust according to your utilities

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Validate email format
        if (!isValidEmail(email)) {
            return res.status(400).json({ msg: 'Invalid email format' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User with this email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            otp: generateOTP() // Generating OTP for email verification
        });

        await newUser.save();

        // Queue a job for sending the OTP verification email
        emailQueue.add('sendVerificationEmail', {
            email: newUser.email,
            name: newUser.name,
            otp: newUser.otp,
        });

        // Queue a job for sending the welcome email
        emailQueue.add('sendWelcomeEmail', {
            email: newUser.email,
            name: newUser.name,
        });

        res.status(201).json({ message: 'User registered successfully. Please check your email for verification.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Login a user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cache the user profile in Redis
exports.getProfile = async (req, res) => {
    try {
        const userId = req.params.id;

        // Check Redis cache first
        redisClient.get(`user:${userId}`, async (err, cachedProfile) => {
            if (cachedProfile) {
                return res.status(200).json(JSON.parse(cachedProfile));
            }

            // If not in cache, query MongoDB
            const user = await User.findById(userId).select('-password');
            if (!user) return res.status(404).json({ message: 'User not found' });

            // Store result in Redis
            redisClient.setex(`user:${userId}`, 3600, JSON.stringify(user)); // Cache for 1 hour

            res.status(200).json(user);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    try {
        const updates = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete user and related data (with transaction)
exports.deleteUser = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const userId = req.params.id;

        // Delete user and related data in a transaction
        const userDeletion = await User.findByIdAndDelete(userId).session(session);
        const profileDeletion = await Profile.deleteMany({ userId }).session(session);
        const appointmentDeletion = await Appointment.deleteMany({ userId }).session(session);

        if (!userDeletion) {
            throw new Error('User not found');
        }

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({ message: 'User and related data deleted successfully' });

    } catch (error) {
        // Rollback the transaction in case of error
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: error.message });
    }
};
