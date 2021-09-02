/**
 * This will be the main file to route to different API call
 * later because we will need to parse all those route to different endpoint
 *
 */

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const morgan = require('morgan'); // import to logging


// connect to mongodb
const database_name = "Main"
const uri = "mongodb+srv://username:Password@cluster0.iczed.mongodb.net/" +
            database_name + "?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser:true, useUnifiedTopology: true });

//Bind connection to error event (to get notification of connection errors)
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// To allow us to create our own _id for each record in the collection
mongoose.set('useCreateIndex', true);

const diaryRoute = require('./routes/diary');
const userRoute = require('./routes/user');

app.use(morgan('dev'));
app.use(express.json()); //Used to parse JSON bodies

// set up the routes
// can add other routes here like update to update data
app.use('/diary', diaryRoute);
app.use('/user', userRoute);

app.use((req, res, next) => {

    const error = new Error('Not found');
    error.status(404);
    next(error);
})

// // catch error from other endpoint
// app.use((error, req, res, next) => {
//     res.status(err.statuus || 500);
//     res.json ({
//         error: {
//             message: error.message
//         }
//     })
// })
module.exports = app;