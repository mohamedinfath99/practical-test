
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const colors = require('colors');


process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception - Shutting Down!');
    console.log(err.name, err.message);
    console.log(err);
    process.exit(1);
});


const app = require('./app');

dotenv.config();


const DB = process.env.DATABASE_URL.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);


mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(`MongoDB connected successfully - ${mongoose.connection.host}`.bgMagenta.bgBlack);
    });


const port = process.env.PORT;

const server = app.listen(port, () => {
    console.log(`App running on port ${port}..!`.bgGreen.bgBlack);
});


process.on('unhandledRejection', (err) => {
    console.log('Unhandled Rejection - Shutting Down..!');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});