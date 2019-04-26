const mongoose = require('mongoose');

const BoughtBookSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    order: {
        type: Array,
        required: true
    }
})

const BoughtBook = mongoose.model('BoughtBook', BoughtBookSchema, 'boughtBooks');

module.exports = BoughtBook;