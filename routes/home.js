const express = require('express');
const homeRouter = express.Router();

// HOME Page of VIDLY
homeRouter.get('/', (request,response)=>{
    // return response.send("Welcome to VIDLY!!");
    response.render('index', {
        apptitle: "Vidly",
        appicon: "ViDLy",
        introtext: "Vidly is a video rental service"
    });
});

module.exports = homeRouter;