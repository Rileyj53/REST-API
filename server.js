const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
const port = 8000;
const hostname = 'localhost'; // so you can change it to your local ip address if needed

const mongoose = require('mongoose');

const MONGO_DATA_BASE = process.env.DATABASE.replace('<password>', process.env.DB_PASSWORD);

//Connect to database
// The database is open to all IP addresses so you can test if youd like to
// the username and password are in the config.env file
mongoose
    .connect(MONGO_DATA_BASE, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB database: ', MONGO_DATA_BASE))
    .catch((err) => {
        console.error('Could not connect to MongoDB:', err.message);
        process.exit(1);
    });