const mongoose = require('mongoose');
const Joi = require('joi');
const {func} = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
JoiObjectId = require('joi-objectid')(Joi);

const userSchema = new mongoose.Schema({
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
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.valueOf().get("jwtPrivateKey"));
    return token;
}

const User = mongoose.model('User', userSchema);

async function validateRegistrationDetails(user){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().max(255).required().email(),
        password: Joi.string().min(5).max(20).required()
    });
    return schema.validate(user);
}

module.exports.userSchema = userSchema;
module.exports.validate = validateRegistrationDetails;
module.exports.User = User;