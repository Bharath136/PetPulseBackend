// emailController.js

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const User = require('../models/User'); // Adjust the path as needed

dotenv.config(); // Load environment variables

// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any email service
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS // Your email password or app-specific password
    }
});

// Function to send verification email with OTP
const sendVerificationEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'PetPulse - Email Verification',
        html: `
            <h1>Welcome to PetPulse!</h1>
            <p>Thank you for signing up with PetPulse, your trusted partner in pet care.</p>
            <p>Your One-Time Password (OTP) for email verification is: <strong>${otp}</strong></p>
            <p>Please enter this OTP within the next 10 minutes to verify your email and complete your registration.</p>
            <p>We're excited to have you as part of the PetPulse community!</p>
            <p>If you did not request this email, please ignore it.</p>
            <p>Best Regards,</p>
            <p>The PetPulse Team</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent');
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};

// Function to send login notification email with OTP
const sendLoginNotificationEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'PetPulse - New Login Notification & OTP',
        html: `
            <h1>PetPulse Account Login Alert</h1>
            <p>Dear User,</p>
            <p>We noticed a new login to your PetPulse account. As an additional security measure, please use the following One-Time Password (OTP) to complete your login:</p>
            <p>Your OTP is: <strong>${otp}</strong></p>
            <p>If this was you, please enter the OTP to proceed. If you did not log in, we recommend changing your password immediately to secure your account.</p>
            <p>Thank you for choosing PetPulse for your pet care needs.</p>
            <p>Best Regards,</p>
            <p>The PetPulse Team</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Login notification email with OTP sent');
    } catch (error) {
        console.error('Error sending login notification email with OTP:', error);
    }
};

// Function to verify OTP
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        // Check OTP validity
        if (user.otp !== otp) {
            return res.status(400).json({ msg: 'Invalid OTP' });
        }

        if (new Date() > new Date(user.otp_expires)) {
            return res.status(400).json({ msg: 'OTP has expired' });
        }

        // Mark user as verified
        user.isVerified = true;
        user.otp = undefined;
        user.otp_expires = undefined;
        await user.save();

        res.status(200).json({ msg: 'Email verified successfully!' });
    } catch (err) {
        console.error('Error verifying OTP:', err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

// Function to send order success email
const sendOrderSuccessEmail = async (customerEmail, orderDetails) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: customerEmail,
            subject: 'PetPulse - Order Successful!',
            html: `
                <h2>Order Successful!</h2>
                <p>Dear Customer,</p>
                <p>Thank you for your purchase. Your order has been successfully placed.</p>
                <h3>Order Details:</h3>
                <p><strong>Order ID:</strong> ${orderDetails.order_id}</p>
                <p><strong>Total Amount:</strong> ₹${orderDetails.total_amount}</p>
                <p><strong>Payment Method:</strong> ${orderDetails.payment_method}</p>
                <p><strong>Shipping Address:</strong> ${orderDetails.shipping_address}</p>
                <p>We will notify you once your order has been shipped.</p>
                <p>Thank you for choosing PetPulse!</p>
                <p>Best regards,<br />The PetPulse Team</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Order success email sent');
    } catch (error) {
        console.error('Failed to send order success email:', error);
    }
};

// Function to send order status update email
const sendOrderStatusEmail = async (customerEmail, customerName, orderId, newStatus) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: `PetPulse - Order #${orderId} Status Update`,
        html: `
            <h3>Hi ${customerName},</h3>
            <p>Your order <strong>#${orderId}</strong> status has been updated to: <strong>${newStatus}</strong>.</p>
            <p>If you have any questions, feel free to contact our support team.</p>
            <br>
            <p>Thank you for choosing PetPulse!</p>
            <p>Best regards,</p>
            <p>The PetPulse Team</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Order status email sent to ${customerEmail}`);
    } catch (error) {
        console.error('Error sending order status email:', error);
    }
};

// Function to send email to service providers or delivery partners
const sendServiceProviderWelcomeEmail = async (email, password, name) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to PetPulse Service Provider Team!',
            text: `
                Hi ${name},

                Congratulations! Your account has been successfully created as a Service Provider on PetPulse.

                You can now log in and start offering your services.

                Your password is: ${password}

                Please make sure to change your password upon first login for security reasons.

                Welcome to the team!

                Best regards,
                The PetPulse Team
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error('Error sending service provider email:', error);
    }
};

module.exports = {
    sendVerificationEmail,
    sendLoginNotificationEmail,
    verifyOTP,
    sendOrderSuccessEmail,
    sendOrderStatusEmail,
    sendServiceProviderWelcomeEmail,
};
