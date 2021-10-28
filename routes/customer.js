const express = require('express');
const customerRouter = express.Router();

customerRouter.get('/:id', (request, response) => {

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


sendEmailToGoldSubscribers();
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