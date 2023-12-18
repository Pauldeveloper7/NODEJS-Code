//What is route parameters ?
//Route parameters are named url segments that are used to capture  the values specified at their position in the url
// Example  ==== 127.0.0.1/getapi/v1/movies/:id
//2 to make a route optional we have to add ? this after that route param meter /:name?

const express = require('express');
const fs = require('fs')
const app = express()
const movies = JSON.parse(fs.readFileSync('./data/movies.json'));

app.get("/api/v1/movies",(req,res)=>{
    res.status(200).json({
        status:"success",
        count:movies.length,
        data:{
            movies:movies 
        }
    })
})
app.get("/api/v1/movies/:id",(req,res)=>{
   //console.log(req.params);
   //converting id to number type
   const id = req.params.id*1;
   //find movie based on id parameters
  let movie =  movies.find(el=> el.id===id )

  if(!movie){
    return  res.status(404).json({
      status:"failed",
      message:"Movie with id"+id+"is not found "
     })
  }
  //send movie in the response 
   res.status(200).json({
    status:'success',
    data: {
        movie:movie
    }
   })
})
const port = 8000;
app.listen(port, ()=>{
    console.log("completed")
})