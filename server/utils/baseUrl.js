export default req => {
    const production = process.env.NODE_ENV === 'production'
    return `${production ? 'https' : 'http'}://${
        production ? req.hostname : `${req.hostname}:3000`
    }`
}
