const mongoose = require('mongoose');
const { MAX } = require('uuid');

const restaurantSchema = new mongoose.Schema({

    title: {type: String, required: true},
    time: {type: String, required: true},
    imageUrl: {type: String, required: true},
    foods: {type: Array, required: true},
    pickup: {type: Boolean, required: false, default: true}, 
    delivery: {type: Boolean, required: false, default: true},
    owner: {type: String, required: true}, 
    isAvailable: {type: Boolean, required: false, default: true},
    code: {type: String, required: true, unique: true},
    logoUrl: {
        type: String,
        required: true,
        default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    }, 
    rating: {type: Number, min: 1, max: 5},
    ratingCount: {type: String},
    coords: {
        id: {type: String, required: true},
        latitude: {type: Number, required: true},
        longitude: {type: Number, required: true},
        latitudeDelta: {type: Number, required: true, default: 0.0922},
        longitudeDelta: {type: Number, required: true, default: 0.0421},
        address: {type: String, required: true},
        title: {
            type: String, required: true 
        }
    }


}, {timestamps: true});

module.exports = mongoose.model('Restaurant', restaurantSchema);