const express = require('express');
const connectDB = require('./config/connectDB');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const PORT = process.env.PORT || 5000;


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})