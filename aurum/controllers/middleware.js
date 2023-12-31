const express = require('express')
const path = require('path')
const router = express.Router()
const app = express()
const Transporter = require('../config/mail');
const Mail = require('nodemailer/lib/mailer');
const { error } = require('console');
app.use(express.json())


const Mailmiddleware = async (request, response, next) => {
        const tryCatchMailException = async (mailOptions) => {
        try {
            const MailResponse = await Transporter.sendMail(mailOptions);
            if (MailResponse) {
                console.log(MailResponse.response)
                response.json({ message: 'Mail Sent' })
            }
            else if(error) {
                console.log('line 20' + ' ' + MailResponse.response)
                response.json({ message: 'Error Encountered' })
            }
            next()
        }
        catch (error) {
            console.log(error);
            response.json({ message: 'Please Check your internet connection'})
        }
    }
    
    if (request.originalUrl == '/contact-us/mail-sent') {
        const userData = {
            fullname: request.body.name,
            email: request.body.email,
            phone: request.body.phone,
            subject: request.body.subject,
            message: request.body.message,
            }
        const contactMailOptions = { 
            from: userData.email,
            to: 'maxwellprosper76@gmail.com',
            subject: userData.subject,
            text: userData.message,
        }
        tryCatchMailException(contactMailOptions)
        
    }
    else {
        const quoteData = {
            fullname: request.body.name,
            email: request.body.email,
            phone: request.body.phone,
            orderName: request.body.quoteprod_name,
            color: request.body.color,
            size: request.body.size,
            numberOfOrder: request.body.qty,
            ordertype: request.body.ordertype,
            subject: 'Quote Order',
            message: request.body.message
            }
        const quoteMailOptions = { 
            from: quoteData.email,
            to: 'maxwellprosper76@gmail.com',
            subject: quoteData.subject,
            text: JSON.stringify(quoteData)
        }
        tryCatchMailException(quoteMailOptions)
    }

    
}

module.exports = Mailmiddleware;