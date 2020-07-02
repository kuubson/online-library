import nodemailer from 'nodemailer'

const { NODEMAILER_USERNAME, NODEMAILER_PASSWORD } = process.env

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NODEMAILER_USERNAME,
        pass: NODEMAILER_PASSWORD
    }
})

transporter.verify((error, success) => {
    if (error) {
        console.log({
            error,
            message: 'There was a problem connecting to the Online Library email!'
        })
    }
    if (success) {
        console.log('The connection with Online Library email has been successfully established!')
    }
})

export default transporter
