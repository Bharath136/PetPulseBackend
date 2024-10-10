// utils/sendEmail.js
const nodemailer = require('nodemailer');

// Configure Nodemailer transporter (Example using Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,  // Your email
        pass: process.env.EMAIL_PASSWORD  // Your email password
    }
});

// Send welcome email function
const sendWelcomeEmail = async (email, name) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Welcome to PetPulse!',
        text: `Hi ${name},\n\nWelcome to PetPulse! We're thrilled to have you on board to take care of your furry friends.\n\nThanks for joining us!\nPetPulse Team`,
        html: `<h1>Welcome to PetPulse!</h1><p>Hi ${name},</p><p>We're thrilled to have you on board to take care of your furry friends.</p><p>Thanks for joining us!<br>PetPulse Team</p>`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendWelcomeEmail };
