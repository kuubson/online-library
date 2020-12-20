export default req =>
    process.env.NODE_ENV === 'production'
        ? `${req.protocol}://${req.get('host')}`
        : 'http://localhost:3000'
