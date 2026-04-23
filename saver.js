const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'process.env.EMAIL_HOST',
  port: 587,
  auth: {
    user: 'process.env.EMAIL_USER',
    pass: 'process.env.EMAIL_PASS',
  }
});

app.post('/submit', (req, res) => {
  const { fullname, email, description } = req.body;
  const mailOptions = {
    from: 'process.env.EMAIL_USER',
    to: 'process.env.EMAIL_USER',
    subject: 'New submission',
    text: `Name: ${fullname}\nEmail: ${email}\nDescription: ${description}`
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) console.log(err);
    res.send('Submission received!');
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

module.exports = app;
