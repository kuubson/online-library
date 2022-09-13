import nodemailer from 'nodemailer'

const { NODEMAILER_USERNAME, NODEMAILER_PASSWORD } = process.env

export const transporter = nodemailer.createTransport(
   {
      service: 'gmail',
      auth: {
         user: NODEMAILER_USERNAME,
         pass: NODEMAILER_PASSWORD,
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
