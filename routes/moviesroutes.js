const express = require('express');
const router = express.Router();
const app = express();
const moviescontroller = require('./../controllers/controller');
// router.param('id',(req,res,next,value)=>{
// console.log("movie Id is "+ value);
// next();
// })
//router.param('id',moviescontroller.checkid)


// Define your routes on the router
router.route("/")
  .get(moviescontroller.getmovie)
  .post(moviescontroller.postmovie)
router.route("/getHighestRated")
  .get(moviescontroller.getHighestRated, moviescontroller.getmovie)
router.route("/movies-stats")
   .get(moviescontroller.getMOvieStats)
router.route("/movie-by-genre/:genre")
   .get(moviescontroller.getMoviebygenre)   

router.route('/:id')
  .get(moviescontroller.getmoviebyid)
  .patch(moviescontroller.updatethemovie)
  .delete(moviescontroller.deletethemovie);

// Attach the router to the app

// app.listen(8000, () => {
  //   console.log("Server is running on port 8000");
  // });
  
  module.exports = router;
  //app.use('/api/v1/movies', router);
