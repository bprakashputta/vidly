
function admin(request, response, next){
    // Step 1 : Verify if the user exists and has admin permission
    if(!request.user.isAdmin){
        return response.status(403).send("Access Denied!");
    }
    next();
}

module.exports = admin;