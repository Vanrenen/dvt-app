# Introduction
The front end of the project is written in React using typed in Typescript.  
It follows the path of login in or register a new user.  
When succesfull, you will be greeted with a list of available products which can be filtered by category.  
When selecting a product, you will navigate to the product page that shows more details of the product.   
Interaction with the cart can be done at either these pages, which is accessible via a button at the top right of the header.  
Log in status persists via a token until the logout button is selected from the header.

# Installation
## Install dependencies:
npm install

## Techstack
React (^17.0.2)  
Typescript (^4.9.5)  
Emotion/REact (^11.13.0)  
MUI/material (^5.16.5)  
Axios (^1.7.2)

## Setup environment variables:
Create a .env file in the root directory and add your environment variables:  
.env  
This file contains environment-specific settings. Here's a sample:  
GRAPHQL_API_API=

# Caching
React-query is used for caching in the frontend.

# Testing
Testing is done using jest where some simple unit tests were included.
To run the tests simply type in "npm run test"
