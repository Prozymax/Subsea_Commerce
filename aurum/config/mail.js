const nodemailer = require('nodemailer');

const Transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'maxwellprosper76@gmail.com',
        pass: 'lgbxqyeforunsasw',
    }
})

module.exports = Transporter;