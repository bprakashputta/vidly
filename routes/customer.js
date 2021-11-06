const mongoose = require('mongoose');
const customerLog = require('debug')('customer:log');
const express = require('express');
const {request, response} = require("express");
const Joi = require('joi');
const customerRouter = express.Router();
const {Customer, validate} = require('../models/customer');
const auth = require("../middleware/auth");

// Get list of All Customers
customerRouter.get('', async (request, response)=>{
  const customers = await Customer.find().sort('name');
  response.send(customers);
})

// Get details of Customer with given ID.
customerRouter.get('/:id', async (request, response) => {
  const customer = await Customer.findById({_id: request.params.id});
  if(!customer){
    return response.status(400).send('Customer with Given ID was not found');
  }

  return response.send(customer);
});



// Add new Customer to the database
customerRouter.post('/', auth, async (request, response)=>{
  // Step 1
  // Validate the Customer Schema passed in request body
  const validateRequest = await validate(request.body);
  if(!validateRequest){
    return response.status(400).send(validateRequest.error.details[0].message);
  }

  // Step 2
  let customer;
  try {
    customer = await new Customer({
      isGold: request.body.isGold,
      name: request.body.name,
      phone: request.body.phone
    });
    const result = await customer.save();
    customerLog(result);
  }catch (ex) {
    customerLog(ex.message);
  }

  return response.send(customer);
});


// Update customer details by id
customerRouter.put('/:id', auth, async (request, response)=>{
  // Step 1
  // Validate the Customer Schema passed in request body
  const validateRequest = await validate(request.body);
  if(!validateRequest){
    return response.status(400).send(validateRequest.error.details[0].message);
  }

  // Step 2
  let customer;
  try {
    customer = await Customer.findByIdAndUpdate({_id: request.params.id},{
      // Update the fields which are to be updated
      name: request.body.name,
      // isGold: request.body.isGold,
      // phone: request.body.phone
    }, {new: true});
  }catch (ex) {
    customerLog(ex.message);
  }

  return response.send(customer);
});



// Delete customer details by id
customerRouter.delete('/:id', auth, async (request, response)=>{
  // Step 1
  let customer;
  try {
    customer = await Customer.findByIdAndRemove({_id: request.params.id});
    if(!customer){
      return response.status(400).send('Customer with the Given ID does not exist');
    }
  }catch (ex) {
    customerLog(ex.message);
  }

  return response.send(customer);
});


// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });


// sendEmailToGoldSubscribers().then(r => console.log(r));

async function sendEmailToGoldSubscribers() {
  try {
    const customer = await getCustomer(1);
    console.log("customer: ", customer);
    if(customer.isGold){
      const movies = await getTopMovies();
      console.log("Top Movies: ", movies);
      const sendmail = await sendEmail(customer.email, movies);
      console.log("Hi:", sendmail);
    }
  }catch (err){
    console.log(err.message);
  }
}

function getCustomer(id) {
  return new Promise((resolve, reject)=>{
    setTimeout(() => {
      // console.log("Customer: ", id);
      resolve({
        id: 1,
        name: 'Mosh Hamedani',
        isGold: true,
        email: 'email'
      });
    }, 4000);
  });
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      movies = ['movie1', 'movie2'];
      // console.log("Movies: ", movies);
      resolve(movies);
    }, 4000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("emailSuccessful");
    }, 4000);
  });
}

module.exports = customerRouter;