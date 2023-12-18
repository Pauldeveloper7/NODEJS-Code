const express = require('express')
const Movie = require('../Models/movieModel');
const apifeatures = require('./../utils/apifeatures')
//const app = express()
//const movies = JSON.parse(fs.readFileSync('./data/movies.json'));
// exports.checkid = (req,res,next,value) =>{
//   console.log("THe value is :" , value*1)
//  let movie =  movies.find(el=> el.id=== value*1)

//  if(!movie){
//    return  res.status(404).json({
//      status:"failed",
//      message:"Movie with id "+ value +" is not found "
//     })
//  }
 
//   next();
// }
  // exports.validatebody = (req,res,next)=>{
  //  if(!req.body.name || !req.body.duration){
  //  return  res.status(404).json({
  //     status: 'fail' ,
  //     message:'Not a valid movie data'
  //   })
  //  }
  //  next()
  // }
 //Aliasing a route 
 exports.getHighestRated = (req,res,next)=>{
  req.query.limit = '5'
  req.query.sort = '-ratings'
  next();
 } 
 exports.getmovie = async (req,res)=>{
  try{
    const features = new apifeatures(Movie.find())
    let getallmovies = await features.query
    console.log(req.query)
    let querystr = JSON.stringify(req.query);
    querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g ,(match)=> `$${match}`);
    const queryobj = JSON.parse(querystr);
    let query = Movie.find(queryobj);
    //Sorting
    // if (req.query.sort){
    //   const sortby = req.query.sort.split(',').join(' ');
    //   query = query.sort(sortby);
    // }
    // else{
    //   query = query.sort('-createdAt');

    // }
    //Limiting Fields
    // if(req.query.fields){
    //   const fields = req.query.fields.split(',').join('')
    //   query = query.select(fields);
    // }
    // else{
    //   query = query.select('-__v');
    // }
    //pagination
    // query.skip()
    // const page = req.query.page*1||1;
    // const limit = req.query.limit*1||10;
    // const skip = (page - 1) * limit;
    // query = query.skip(skip).limit(limit);
    // if(req.query.page){
    //   const moviescount = await Movie.countDocuments();
    //   if(skip>=moviescount){
    //     throw new Error ('This page is NOT FOUND');
    //   }
    // }
  //  const getallmovies = await query;
     getallmovies = await Movie.find(queryobj);
    res.status(200).json({
      status:"success",
      length:getallmovies.length,
      data:{
        getallmovies 
      }
    })
  }catch(err){
    res.status(404).json({
      status:"fail",
      message:err.message
    })
  }
    
 }
exports.getMOvieStats = async(req,res)=>{
  try{
    const stats = await Movie.aggregate([
      {$match:{ratings:{$gte:8.7}}}, //stages 
      {$group:{
        _id:'$releaseYear',
        maxprice :{$max:'$price'},
        minprice :{$min:'$price'},
        avgRating :{$avg:'$ratings'},
        avgPrice:{$avg:'$price'},
        movieCount:{$sum:1}
      }},
     {$sort:{minprice:1}},
     {$sort:{maxprice:1}}  
    ])
    res.status(200).json({
      status:"success",
      count :stats.length,
      data:{
        stats
      }
    })

    }catch(err){
      res.status(404).json({
        status:"fail",
        message:err.message
      })
    }
  }
exports.getMoviebygenre = async (req,res)=>{
  try{
   const genre = req.params.generes;
   const  moviesbygenre = await Movie.aggregate([
    {$unwind:'$generes'},
    {$group:{
      _id:'$generes',
     movieCount : {$sum:1},
     movies:{$push:'$name'},
    }},
    {$addFields:{genre:'$_id'}},
    {$project:{_id:0}},
    //{$limit:6}
    // {$match:{genre:genre}}  
  ])
  res.status(200).json({
    status:"success",
    movieCount :moviesbygenre.length,
    data:{
      moviesbygenre
    }
  })
}catch(err){
  res.status(404).json({
    status:"fail",
    message:err.message
  })
}
}

exports.postmovie = async (req,res)=>{
  try{
    const movie =  await Movie.create(req.body);
    res.status(201).json({
      status:"success",
      data:{
        movie
      }
    })
  }catch(err){
    res.status(400).json({
      status:"failed",
      message:err.message
    })
  }
}
exports.getmoviebyid = async (req,res)=>{
    //console.log(req.params);
    //converting id to number type
    //const id = req.params.id*1;
    //find movie based on id parameters
   //let movie =  movies.find(el=> el.id===id )
 
  //  if(!movie){
  //    return  res.status(404).json({
  //      status:"failed",
  //      message:"Movie with id"+id+"is not found "
  //     })
  //  }
   //send movie in the response 
    // res.status(200).json({
    //  status:'success',
    //  data: {
    //      movie:movie
    //  }
    // })
    try{
      //const getmoviebyid = await Movie.find({_id:req.params});
      const movie = await Movie.findById(req.params.id);
      res.status(200).json({
        status:"success",
        data:{
          movie
        }
      })

    }catch(err){
      res.status(404).json({
        status:"fail",
        message:err.message
      })
    }
 }
 exports.updatethemovie = async (req,res)=>{
  //   let id =  req.params.id*1;
  //  let movietoupdate =  movies.find(el => el.id===id);
  // //  if(!movietoupdate){
  //    res.status(404).json({
  //        status:'Failure',
  //        message: "The movie is not available with "+ id 
  //  })
  //  }
  //  let index = movies.indexOf(movietoupdate); //id=4 , index=3
  //  Object.assign(movietoupdate, req.body);
  //  movies[index] = movietoupdate ;
  //  fs.writeFile('./data/movies.json', JSON.stringify(movies),(err)=>{
  //    res.status(200).json({
  //        status:'success',
  //        data:{
  //            movie: movietoupdate
  //        } 
  //  })
  //  })
  try{
  const updateMovie = await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
  res.status(201).json({
    status:"success",
    data:{
      movie:updateMovie
    }
  })
 }catch(err){
  res.status(201).json({
    status:"fail",
    message:err.message
    
  })
 }
}
 exports.deletethemovie = async (req, res) => {
  // const id = parseInt(req.params.id);
  //   console.log("The id id ",id)
  // // Find the index of the movie with the given ID
  // const index = movies.findIndex((el) => el.id === id);

  // Check if the movie exists
  // if (index === -1) {
  //   return res.status(404).json({
  //     status: 'error',
  //     message: 'Movie not found',
  //   });
  // }

  // Remove the movie from the array
  //movies.splice(index, 1);

  // Write the updated movie data back to the JSON file
  // fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
  //   if (err) {
  //     return res.status(500).json({
  //       status: 'error',
  //       message: 'Failed to delete movie',
  //     });
  //   }

  //   res.status(204).json({
  //     status: 'success',
  //     message: `The movie with ID ${id} has been deleted successfully`,
  //   });
  // });
  try{
  const deleteMovie =  await Movie.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status:"success",
    data:null
  })
  }catch(err){
    res.status(201).json({
      status:"fail",
      message : err.message
    })
  }

};

