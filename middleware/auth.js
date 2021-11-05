const jwt = require('jsonwebtoken');
const config = require('config');

function auth(request, response, next){
    // Step 1 : Verify if the token actually exists in the request object
    const token = request.header('x-auth-token');
    if(!token){
        return response.status(401).send('Access Denied, token not found');
    }
    // Step 2 : Verify that the token passed by user is valid
    try {
        const payload = jwt.verify(token, config.valueOf().get('jwtPrivateKey'));
        request.user = payload;
        // Step 3 : Pass the handle to next middleware function
        next();
    }catch (ex){
        console.log(ex);
        response.status(400).send('Invalid token');
    }
}

module.exports = auth;