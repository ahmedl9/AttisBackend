const Joi = require('joi');
const mongoose = require('mongoose');
 
const User = mongoose.model('User', new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    last_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    loan_amount: {
        type: Number,
        required: false,
    },
    date: {
        type: Date,
        required: true
    },
    was_referred: {
        type: Boolean,
        required: true
    },
    referral_count: {
        type: Number,
        required: true
    }
}));
 
function validateUser(user) {
    const schema = {
        first_name: Joi.string().min(2).max(50).required(),
        last_name: Joi.string().min(3).max(255).required(),
        email: Joi.string().min(3).max(255).required().email(),
        loan_amount: Joi.number(),
        date: Joi.date().required(),
        was_referred: Joi.boolean().required(),
        referral_count: Joi.number().required()

    };
    return Joi.validate(user, schema);
}
 
exports.User = User;
exports.validate = validateUser;