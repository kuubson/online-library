const mongoose = require('mongoose')

const BoughtBookSchema = new mongoose.Schema({
    order: {
        type: Array,
        required: true
    }
})

const BoughtBooks = new mongoose.model('BoughtBooks', BoughtBookSchema, 'BoughtBooks')

module.exports = BoughtBooks
