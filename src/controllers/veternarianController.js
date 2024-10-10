const Veterinarian = require('../models/VeternarianModels/Veterinarian');

const User = require('../models/userModel');

// Create a new veterinarian profile
exports.createVeterinarian = async (req, res) => {
    try {
        const { userId, credentials, specialties, clinicAddress, availability, servicesOffered, consultationFee } = req.body;

        // Check if the user exists and is a veterinarian
        const user = await User.findById(userId);
        if (!user || user.role !== 'veterinarian') {
            return res.status(400).json({ message: 'Invalid user or role' });
        }

        // Create the veterinarian profile
        const veterinarian = new Veterinarian({
            userId,
            credentials,
            specialties,
            clinicAddress,
            availability,
            servicesOffered,
            consultationFee,
        });

        await veterinarian.save();
        res.status(201).json({ message: 'Veterinarian profile created successfully', veterinarian });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a veterinarian profile by ID
exports.getVeterinarianById = async (req, res) => {
    try {
        const veterinarian = await Veterinarian.findById(req.params.id).populate('userId', 'name email');
        if (!veterinarian) {
            return res.status(404).json({ message: 'Veterinarian not found' });
        }
        res.status(200).json(veterinarian);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all veterinarians
exports.getAllVeterinarians = async (req, res) => {
    try {
        const veterinarians = await Veterinarian.find().populate('userId', 'name email');
        res.status(200).json(veterinarians);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a veterinarian profile
exports.updateVeterinarian = async (req, res) => {
    try {
        const { credentials, specialties, clinicAddress, availability, servicesOffered, consultationFee } = req.body;

        const veterinarian = await Veterinarian.findById(req.params.id);
        if (!veterinarian) {
            return res.status(404).json({ message: 'Veterinarian not found' });
        }

        // Update veterinarian details
        veterinarian.credentials = credentials || veterinarian.credentials;
        veterinarian.specialties = specialties || veterinarian.specialties;
        veterinarian.clinicAddress = clinicAddress || veterinarian.clinicAddress;
        veterinarian.availability = availability || veterinarian.availability;
        veterinarian.servicesOffered = servicesOffered || veterinarian.servicesOffered;
        veterinarian.consultationFee = consultationFee || veterinarian.consultationFee;

        await veterinarian.save();
        res.status(200).json({ message: 'Veterinarian profile updated successfully', veterinarian });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a veterinarian profile
exports.deleteVeterinarian = async (req, res) => {
    try {
        const veterinarian = await Veterinarian.findById(req.params.id);
        if (!veterinarian) {
            return res.status(404).json({ message: 'Veterinarian not found' });
        }

        await veterinarian.remove();
        res.status(200).json({ message: 'Veterinarian profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
