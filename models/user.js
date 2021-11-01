const mongoose = require('mongoose');
const Joi = require('joi');
const {func} = require("joi");
JoiObjectId = require('joi-objectid')(Joi);

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        unique: true,
        maxlength: 255,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});

const User = mongoose.model('User', registerSchema);

async function validateRegistrationDetails(user){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().max(255).required().email(),
        password: Joi.string().min(5).max(20).required()
    });
    return schema.validate(user);
}

module.exports.userSchema = registerSchema;
module.exports.validate = validateRegistrationDetails;
module.exports.User = User;