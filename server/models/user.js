const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid role'
}
let Schema = mongoose.Schema;

let userSchema = new Schema({

    name: {
        type: String,
        required: [true, 'name is necesary']
    },
    email: {
        type: String,
        required: [true, 'email is necesary'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is necesary']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validRoles
    },
    active: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false

    }
});

userSchema.methods.toJSON = function() {
    let thisUser = this;
    let userObject = thisUser.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin(uniqueValidator, {
    message: '{PATH} already exist'
});

module.exports = mongoose.model('User', userSchema)