# Introduction
This project is a single-page application built with React and TypeScript as the front end.  
Graphql as the api layer.  
Data is fetched from https://fakestoreapi.com/ and a mongoDb.  
This project was taken from a previously created project and adapted to the DVT assessment needs.  
The user can register and log in with your user details as this is saved in the database.  
The cart only persists during a session as it is not added to the database yet. At which point a cart and user would be linked based on user id.  
At checkout, only a modal is shown as there is no payment gateway added.

# Getting Started
## Prerequisites
Node.js (>= 14.x) (https://nodejs.org/)  
npm (>= 6.x)  

## Installation
### Clone the repository:
git clone https://github.com/Vanrenen/derivco-app.git  
cd derivco-app

## Running the app
The app can be run from root by typing "npm start". With the help of "concurrently", this will trigger both the UI and server to run.  
Alternatively, you can navigate in to the ui and server folders respectively and run "npm start" from each folder to run the ui and server.
