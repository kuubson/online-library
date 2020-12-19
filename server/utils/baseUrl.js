export default req => `${req.protocol}://${req.get('host')}`
