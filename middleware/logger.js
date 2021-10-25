const express = require('express')

function log(request, response, next){
    console.log("Logger....!");
    next();
}

module.exports = log;