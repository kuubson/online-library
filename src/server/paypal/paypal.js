module.exports = paypal => {
    paypal.configure({
        'mode': 'sandbox',
        'client_id': process.env.REACT_APP_PAYPAL_ONLINE_LIBRARY_ID_SANDBOX,
        'client_secret': process.env.REACT_APP_PAYPAL_ONLINE_LIBRARY_SECRET
    });
}