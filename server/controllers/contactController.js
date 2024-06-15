import asyncHandler from 'express-async-handler';
import nodemailer from 'nodemailer';

// @desc    Send contact message
// @route   POST /api/contact
// @access  Public
const sendContactMessage = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: 'Contact Form Message',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).json({ message: 'Error sending message', error });
        } else {
            res.status(200).json({ message: 'Message sent successfully', info });
        }
    });
});

export { sendContactMessage };
