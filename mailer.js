const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
   host: "smtp.mail.ru",
   port: 465,
   secure: true,
   auth: { user: "greenhungryfox@mail.ru", pass: "p6LfwjNvXcHuVFcZ2Rek" },
})

const mailer = (message) => transporter.sendMail(message)

module.exports = mailer

//основной пароль - yellowredbackbackgo123

//mUYHyssGqqbxv2Mm9Rps
