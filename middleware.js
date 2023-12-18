//express.json()is a middleware add req in app.get()
//app.route()is also midleware 
const fs = require('fs');
const express = require('express');
const app = express();
const movies = JSON.parse(fs.readFileSync('./data/movies.json'));
const port = 8000;
const morgan = require('morgan');
const moviesrouter = require('./routes/moviesroutes')
//const { getmoviebyid } = require('./controllers/controller');

const logger = function (req, res, next) {
    console.log('Custom middleware is used');
    next(); // Call next to pass control to the next middleware or route handler
};


app.use(express.json()); // Request body is added through this middleware
app.use(morgan('dev'));
app.use(express.static('./public')); // Serving static files
app.use(logger);
app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString();
    next();
});

// const  getmovie = (req, res) => {
//     res.status(200).json({
//         status: "success",
//         requestedAt: req.requestedAt,
//         count: movies.length,
//         data: {
//             movies: movies
//         }
//     });
// };


// const moviesrouter = express.Router();

// moviesrouter.route("/")
//     .get(getmovie);
// moviesrouter.route("/id")
//     .get(getmoviebyid);
// Use the moviesrouter as a middleware
app.use('/api/v1/movies', moviesrouter);
module.exports = app;

// app.listen(port, () => {
//    console.log(`Server is running on port ${port}`);
// });

//USING THIRD PARTY MIDDLEWARE ....
//Mounting Routes in express / using this because it will help us move these routes into a separate files  ///n