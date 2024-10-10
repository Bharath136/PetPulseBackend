// queues/emailProcessor.js
const emailQueue = require('./emailQueue');
const { sendWelcomeEmail } = require('../utils/sendEmail');

// Process the email jobs in the queue
emailQueue.process(async (job) => {
    const { email, name } = job.data;

    try {
        await sendWelcomeEmail(email, name);
        console.log(`Welcome email sent to ${email}`);
    } catch (error) {
        console.error(`Failed to send email to ${email}:`, error);
    }
});
