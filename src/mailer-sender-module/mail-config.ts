var nodemailer = require('nodemailer')
export let transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: 'p_lobachev@inbox.ru',
    pass: '9Ig8cdSOYjxEbBrfa73x'
  }
});


