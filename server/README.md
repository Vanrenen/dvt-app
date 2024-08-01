# Introduction
The server creates the GraphQl api written with TypeScript and a mongo database.  
The api is used to fetch data from https://fakestoreapi.com/ and the mongo database.

# Installation
## Install dependencies:
cd server  
npm install

## Techstack
GraphQl (^16.9.0)  
Apollo server (^4.10.4)  
Dotenv (^16.4.5)  
Bcryptjs (^2.4.3)  
Express (^4.19.2)  
Jsonwebtoken (^9.0.2)  
MongoDb (^6.8.0)  
Mongoose (^8.4.4)  

## Setup environment variables:
Create a .env file in the root directory and add your environment variables:  
.env  
This file contains environment-specific settings. Here's a sample:  
MONGO_URI=  
JWT_SECRET=  
PORT=  
