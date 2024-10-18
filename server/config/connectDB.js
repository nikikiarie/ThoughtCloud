const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('Connected to the database');
        })
        connection.on('error', (error) => {
            console.log('Something went wrong while connecting to the database', error);
        })
    } catch (error) {
        console.log("Something went wrong while connecting to the database", error);
    }
}

module.exports = connectDB;