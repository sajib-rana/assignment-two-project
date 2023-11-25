# Installation Process
first of all we install nodejs, typescript in globally or specific project
# Setup a directory
create a directory in command like, npm init -y
and when we command tsc --init .This will generate tsconfig.json
# Install Dependancies
Install the necessary packages for Express, Mongoose, and TypeScript
# Set Up TypeScript Code
Create TypeScript source files app.ts
where we keep express.js hello world demo starting code.
# Configure Mongoose and Express
Add Mongoose and Express configuration to connect to database, define models, and set up routes.
# Run Application
use ts-node to run TypeScript application.
# Access Application
go to http://localhost:5000 which we keep in .env file and which we are access an config file separately. because when we get express.js hello world demo code we seperate server code and database url and port access from config file.

# Make Changes and Test
As we make changes to our TypeScript code, the TypeScript compiler (tsc) will transpile our code to JavaScript. Restart our application to see the changes.
