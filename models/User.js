const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    uid: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: Array, 
        required: false, 
    },
    phone: {
        type: String,
        required: false
    },
    userType: {
        type: String,
        required: true, 
        default: 'Client',
        enum: ['Admin', 'Driver', 'Vendor', 'Client']
    },
    profle: {
        type: String,
        required: true, 
        default: 'https://res.cloudinary.com/dxvzhnyx',
    }


}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);