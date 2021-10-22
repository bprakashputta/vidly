const express = require('express');
const Joi = require('joi');
const vidly = express();

// Environment Conditions
vidly.use(express.json());
const port = process.env.PORT || 3000;

// This is Vidly Backend
// Vidly is a movie rental service

// Implementing the CRUD operations for
// Gerne of Movies on the Vidly Service

const gernes = [
    {
        id: 1,
        name: "Action"
    },
    {
        id: 2,
        name: "Adventure"
    },
    {
        id: 3,
        name: "Comedy"
    },
    {
        id: 4,
        name: "Romance"
    }
];

// HOME Page of VIDLY
vidly.get('/', (request,response)=>{
    return response.send("Welcome to VIDLY!!");
})

// GET METHOD to READ list of gernes
vidly.get('/api/gernes',(request, response)=>{
    response.send(gernes);
});

// GET METHOD for reading particular gernes
vidly.get('/api/gernes/:id', (request, response)=>{
    let gerne = gernes.find(g => g.id === parseInt(request.params.id));
    if(!gerne){
        return response.status(400).send("The Gerne with the given ID doesn't exist");
    }
    return response.send(gerne);
});

// POST METHOD to INSET new gerne into gernes
vidly.post('/api/gernes/', (request, response)=>{
    // This method will try to insert new gerne object 
    // into the list / database
    const schema = Joi.object({
        
    })
})

// Server is listening on PORT Number : port
vidly.listen(port,()=>{
    console.log(`Server is listening on Port:${port}`);
})
