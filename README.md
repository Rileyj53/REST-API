# My REST API
## Module 6 Assignment - Validate Model Data Using Validator Library

This is a REST API I made for IFT 488. It connects to a mongo DB database and uses validation to ensure the data passed to the database is correct and useable

## Running the program

To run the program you need to have all of the dependencies installed. To install the dependencies run the following command:

    npm install

Once the dependencies are installed you can run the program by running the following command:

    npm start
or

    node server.js

Then you can access the program by going to the following URL in postman:

    http://localhost:3000/account

### dependencies

        dotenv: 16.0.3
        express: 4.18.2
        mongoose: 7.0.3
        morgan: 1.10.0
        nodemon: 2.0.22

## Things you can do
#### GET all accounts

    http://localhost:3000/account

#### GET account by id
    
        http://localhost:3000/account/_id

#### POST account
    
        http://localhost:3000/account

#### PUT account
        
        http://localhost:3000/account/_id

#### DELETE account
                
        http://localhost:3000/account/_id

## Example of a POST request

    {
        "accountHolder": "John Doe",
        "accountEmail": "johndoe1@mail.com",
        "accountNumber": 6269154,
        "accountNickname": "Checking",
        "accountType": "checking",
        "accountBalance": 1000000
    }
