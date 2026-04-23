const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'elightitsolutions@gmail.com',
    pass: 'zfph qabx vzye kmcr',
  }
});

app.post('/submit', (req, res) => {
  const { fullname, email, description } = req.body;
  const mailOptions = {
    from: 'elightitsolutions@gmail.com',
    to: 'elightitsolutions@gmail.com',
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