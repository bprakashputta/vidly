const winston = require('winston');

function error(err, request, response){
    // Step 1 : Verify if the user exists and has admin permission
    // console.log(ex.error);
    winston.error(err.message, err);
    return response.status(500).send('Something failed');
}

module.exports = error;
