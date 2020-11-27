const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let itemSchema = new Schema({

    itemName: {
        type: String,
        required: [true, 'Item name is necesary'],
        unique: true
    },
    ref: {
        type: String,
        required: [true, 'ref is necesary']
    },
    price: {
        type: String,
        required: [true, 'Value is necesary']
    },
    qty: {
        type: String,
        default: '0'
    },
    desc: {
        type: String,
        default: 'description',
        required: [true, 'Value is necesary']
    },
    active: {
        type: Boolean,
        default: true
    }
});

itemSchema.plugin(uniqueValidator, {
    message: '{PATH} already exist'
});

module.exports = mongoose.model('Item', itemSchema);