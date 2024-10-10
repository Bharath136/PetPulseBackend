// emailQueue.js
const Queue = require('bull');
const nodemailer = require('nodemailer');

// Initialize the email queue
const emailQueue = new Queue('email', {
    redis: {
        host: '127.0.0.1', // or your Redis host
        port: 6379 // Redis default port
    }
});

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your preferred email service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Common function to send email
async function sendEmail(email, subject, html) {
    const mailOptions = {
        from: '"PetPulse" <bk3604073@gmail.com>', // sender address
        to: email, // recipient email
        subject: subject, // Subject line
        html: html // HTML body
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}: ${info.response}`);
    } catch (error) {
        console.error(`Failed to send email to ${email}:`, error);
    }
}

// Process different types of email jobs
emailQueue.process('sendVerificationEmail', async (job) => {
    const { email, name, otp } = job.data;

    const subject = 'Verify Your Email';
    const html = `<h1>Hello ${name},</h1><p>Your OTP for verification is: <strong>${otp}</strong></p>`;

    await sendEmail(email, subject, html);
});

emailQueue.process('sendWelcomeEmail', async (job) => {
    const { email, name } = job.data;

    const subject = 'Welcome to PetPulse!';
    const html = `<h1>Hi ${name},</h1><p>Thank you for registering with PetPulse!</p>`;

    await sendEmail(email, subject, html);
});

// Export the email queue
module.exports = emailQueue;
