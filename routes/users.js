const mongoose = require('mongoose');
const bcryt = require('bcrypt');
const express = require('express');
const Joi = require("joi");
const userRouter = express.Router();
const {User, validate} =require('../models/user');
const jwt = require("jsonwebtoken");
const config = require("config");




// GET METHOD to register users
userRouter.post('/',async (request, response)=>{
    const {error} =await validate(request.body);
    if(error){
        return response.status(400).send(error.details[0].message);
    }

    // let user = User.findOne({email: request.body.email});
    let user = await User.findOne({email: request.body.email})
    if(user){
        console.log(user._id);
        return response.status(400).send("User already exists");
    }else {
        user = await new User({
            name: request.body.name,
            email: request.body.email,
            password: request.body.password
        });
        console.log("New User: ",user._id);
        const salt = await bcryt.genSalt(10);
        user.password = await bcryt.hash(user.password, salt);
        try {
            await user.save();
        } catch (ex) {
            console.log(ex.error);
        }
        const token = user.generateAuthToken();
        return response.header('x-auth-token', token).send({
            name: request.body.name,
            email: request.body.email,
        });
    }
});

module.exports = userRouter;