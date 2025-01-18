const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    userType: Joi.string().valid('Client', 'Admin', 'Vendor', 'Driver').required()
});

module.exports = { registerSchema };