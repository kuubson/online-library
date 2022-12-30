import type { SendMailOptions } from 'nodemailer'
import nodemailer from 'nodemailer'

import { ApiError, isProd } from '@online-library/config'

import { NODEMAILER_TEST_PASSWORD, NODEMAILER_TEST_USER } from 'config'

import { EtherealEmail } from 'database'

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

const testingTransporter = nodemailer.createTransport({
   host: 'smtp.ethereal.email',
   port: 587,
   auth: {
      user: NODEMAILER_TEST_USER,
      pass: NODEMAILER_TEST_PASSWORD,
   },
})

export const sendMail = async (options: SendMailOptions) => {
   if (!isProd) {
      const info = await testingTransporter.sendMail(options)

      const url = nodemailer.getTestMessageUrl(info)

      if (!url) {
         throw new ApiError('Sending email', 'Testing ethereal email failed', 502)
      }

      await EtherealEmail.create({ url })

      console.log({ url })
   } else {
      await transporter.sendMail(options)
   }
}

transporter.verify((error, success) => {
   if (error) {
      console.log('❌ SMTP connection failed')
   }
   if (success) {
      console.log('📧 SMTP host connected')
   }
})

testingTransporter.verify((error, success) => {
   if (error) {
      console.log('❌ Test SMTP connection failed')
   }
   if (success) {
      console.log('📧 Test SMTP host connected')
   }
})
