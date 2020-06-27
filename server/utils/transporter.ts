import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_USERNAME,
        pass: process.env.NODEMAILER_PASSWORD
    }
})

transporter.verify((error, success) => {
    if (error) {
        console.log({
            error,
            message: 'There was a problem connecting to the Online Library e-mail!'
        })
    }
    if (success) {
        console.log('The connection with Online Library e-mail has been successfully established!')
    }
})

export default transporter
