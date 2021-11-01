const mongoose = require('mongoose');
const bcryt = require('bcrypt');
const express = require('express');
const Joi = require("joi");
const userRouter = express.Router();
const {User} =require('../models/user');


// GET METHOD to READ list of users
userRouter.post('/',async (request, response)=>{
    const {error} = await validate(request.body);
    if(error){
        return response.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({email: request.email});
    if(!user){
        return response.status(400).send("Invalid email or password");
    }

    const validPassword = await bcryt.compare(request.body.password, user.password);
    if(!validPassword){
        return response.status(400).send("Invalid email or password");
    }

    return response.send("Logged In Successfully.");
});


async function validate(request){
    const schema = Joi.object({
        email: Joi.string().max(255).required().email(),
        password: Joi.string().min(5).max(20).required()
    });
    return schema.validate(request);
}

module.exports = userRouter;