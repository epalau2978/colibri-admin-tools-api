const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let clientSchema = new Schema({


    client_name: {
        type: String,
        required: [true, 'client name is necesary']
    },
    client_tel: {
        type: String,
        required: [true, 'client tel is necesary'],
        unique: true

    },
    client_address: {
        type: String,
        required: [true, 'client address is necesary']
    },
    order_items: {
        type: Array
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

clientSchema.plugin(uniqueValidator, {
    message: '{PATH} already exist'
})

module.exports = mongoose.model('Client', clientSchema);