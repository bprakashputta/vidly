const mongoose = require('mongoose');
const rentalLog = require('debug');
const {rentalSchema, Rental, validate} = require('../models/rental');
const express = require('express');
const {request, response} = require("express");
const {Customer} = require("../models/customer");
const {Movies} = require("../models/movies");
const rentalRoute = express.Router();
const Fawn = require('fawn');

// Initialise fawn
Fawn.init(mongoose);

// Get List of all rentals
rentalRoute.get('/', async (request, response)=>{
   const rentals = await Rental.find().sort('-dateOut');
   response.send(rentals);
});

// Add Rental to the list
rentalRoute.post('/', async (request, response)=>{
    // validate the movie object sent in the body
    const { error } = validate(request.body);
    if(error){
        return response.status(400).send(error.details[0].message);
    }

    // check if the customer with customerId exists
    const customer = await Customer.findById(request.body.customerId);
    if(!customer){
        return response.status(400).send('Customer with given ID not found');
    }

    const movie = await Movies.findById(request.body.movieId);
    if(!movie){
        return response.status(400).send('Invalid Movie');
    }
    if(movie.numberInStock === 0){
        return response.status(400).send('Movie not available for rental at the moment');
    }

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
    });
    rental = await rental.save();
    movie.numberInStock--;
    movie.save();

    return response.send(movie);
});



// Update Rental

// Delete rental
// but we will not give this route public
