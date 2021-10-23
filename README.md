# ViDLy


## Middlewares
    1. express.json() - converts the JSON object received in request to request.body
    2. express.urlencoded() - converts Fields/Parameters received in Request to request.body
    3. express.static('public') - serves static files such as images, CSS files, and JavaScript files

## Configurations

    1. NPM RC - most popular configuration manager that we use for managing multiple environments, 
                like different databases for development and production environments 
    
    2. NPM CONFIG - My preferred configuration manager that we use for managing multiple environments, 
                like different databases for development and production environments

### Note
    While Checking config files to repository, do not write usernames, passwords, and server details
    in to the public repository

## Debug
1. debug - `npm i debug` to install the debug package
   
2. Import the package into the code

        const startupDebugger = require('debug')('vidly::startup')
        const dbDebugger = require('debug')('vidly::db')

3. Now, export the debug namespaces to environment variables,

       export DEBUG=vidly:server,vidly:app,vidly:route
                  or
       export DEBUG=*


This package can be used instead of console.log statement, enable or disable it depending
development environment type