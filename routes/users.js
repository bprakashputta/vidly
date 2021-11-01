const mongoose = require('mongoose');
const express = require('express');
const Joi = require("joi");
const userRouter = express.Router();
const {User, validate} =require('../models/user');




// GET METHOD to READ list of users
userRouter.post('/',async (request, response)=>{
    const validateUser = validate(request.body);
    if(!validateUser){
        return response.status(400).send(validateUser.error.details[0].message())
    }

    let user = User.findOne({email: request.body.email});
    if(user){
        return response.status(400).send("User already exists");
    }
    user = new User({
        name: request.body.name,
        email: request.body.email,
        username: request.body.username,
        password: request.body.password
    });
    return response.send(user);
});
