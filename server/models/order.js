const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let orderSchema = new Schema({

    idClient: {
        type: String,
        required: [true, 'id client is necesary']
    },
    idItems: {
        type: Array,
        required: [true, 'items are necesary']
    },
    itemsQty: {
        type: Array,
        required: [true, 'items quantity are necesary']
    },
    notes: {
        type: String,
        default: 'notes'
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('order', orderSchema);