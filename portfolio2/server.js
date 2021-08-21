const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

let intialPath = path.join(__dirname, 'public');
let app = express();

app.use(express.static(intialPath));
app.use(express.json);

app.get('/', (req,res) => {
    res.sendFile(path.join(intialPath, 'index.html'));

});

app.post('/mail', (req, res) => {
    const { firstname, lastname, email, msg } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: 'Postfolio',
        text: `First name: ${firstname}, \nLast name: ${lastname}, \nEmail: ${email}, \nMessage: ${msg}`
    }

    transporter.sendMail(mailOptions, (err, result) => {
        if (err){
            console.log(err);
            res.json('opps! it seems like some error occured plz. try again.')
        } else{
            res.json('thanks for e-mailing me. I will reply to you within 2 working days');
        }
    })
})



app.listen('3000',(req,res) => {
    console.log('listening on http://localhost:3000');
});

