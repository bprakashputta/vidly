const express = require('express');
const Joi = require("joi");
const gerneRouter = express.Router();
const DB = require('../db/mongodb');
const db = new DB();


// const gernes = [
//     {
//         name: "Action"
//     },
//     {
//         name: "Adventure"
//     },
//     {
//         name: "Comedy"
//     },
//     {
//         name: "Romance"
//     }
// ];

// Implementing the CRUD operations for
// Gerne of Movies on the Vidly Service


// GET METHOD to READ list of gernes
gerneRouter.get('/',(request, response)=>{
    const gernes = db.getAllGernes();
    console.log((gernes));
    response.send();
});

// GET METHOD for reading particular gernes
gerneRouter.get('/:id', (request, response)=>{
    // find gerne by id from Gernes array
    // let gerne = gernes.find(g => g.id === parseInt(request.params.id));

    // find gerne by id from database
    let gerne = db.getGerneByID(request.params.id);
    if(!gerne){
        return response.status(400).send("The Gerne with the given ID doesn't exist");
    }
    return response.send(gerne);
});

// POST METHOD to INSET new gerne into gernes
gerneRouter.post('/', (request, response)=>{
    // This method will try to insert new gerne object
    // into the list / database

    // Step 1
    // Check if the gerne object passed in body is valid
    const validSchema = validateSchema(request.body);
    if(validSchema.error){
        return response.status(400).send(validSchema.error.details[0].message);
    }

    // Step 2
    // Create Gerne object
    const gerne = {
        id: gernes.length+1,
        name: request.body.name
    };
    // Step 3
    // Insert Gerne object into Gerne List
    gernes.push(gerne);
    return response.send(gernes);
});


// PUT METHOD to UPDATE gerne object in gernes
gerneRouter.put('/:id', (request, response)=>{
    // Step 1
    // Check if the object with given ID exists
    const gerne = gernes.find(g => g.id === parseInt(request.params.id));
    if(!gerne){
        return response.status(400).send(`The gerne object with given ${request.params.id} does not exist`);
    }
    // Step 2
    // Check if the schema object is valid
    // Has all the required parameters
    const validateRequestObject = validateSchema(request.body);
    if(validateRequestObject.error){
        return response.status(400).send(validateRequestObject.error.details[0].message);
    }

    // Step 3
    // Update the gerne object
    gerne.name = request.body.name;
    return response.send(gernes);
});

// DELETE METHOD to DELETE gerne object from gernes
gerneRouter.delete('/:id', (request, response)=>{
    // Step 1
    // Check if the gerne object with given ID exists
    const gerne = gernes.find(g => g.id === parseInt(request.params.id));
    if(!gerne){
        return response.status(400).send(`The object with given gerne ID ${request.params.id} does not exist`);
    }

    // Step 2
    // Delete the gerne object
    const index = gernes.indexOf(gerne);
    gernes.splice(index, 1);
    return response.send(gernes);
});

function validateSchema(gerne){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(gerne);
}

module.exports = gerneRouter;