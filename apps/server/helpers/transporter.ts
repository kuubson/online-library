import nodemailer from 'nodemailer'

const { MAILJET_PASSWORD, MAILJET_USER, NODEMAILER_USERNAME } = process.env

export const transporter = nodemailer.createTransport(
   {
      host: 'in-v3.mailjet.com',
      port: 587,
      auth: {
         user: MAILJET_USER,
         pass: MAILJET_PASSWORD,
      },
   },
   { from: `"Online Library" <${NODEMAILER_USERNAME}>` }
)

transporter.verify((error, success) => {
   if (error) {
      console.log('❌ SMTP connection failed')
   }
   if (success) {
      console.log('📧 SMTP host connected')
   }
})
