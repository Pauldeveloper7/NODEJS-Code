const express = require('express');
const fs = require('fs')
const app = express()
app.use(express.json()) //middle ware 
const movies = JSON.parse(fs.readFileSync('./data/movies.json'));
app.patch('/api/v1/movies/:id',(req,res)=>{
   let id =  req.params.id*1;
  let movietoupdate =  movies.find(el => el.id===id);
  if(!movietoupdate){
    res.status(404).json({
        status:'Failure',
        message: "The movie is not available with "+ id 
  })
  }
  let index = movies.indexOf(movietoupdate); //id=4 , index=3
  Object.assign(movietoupdate, req.body);
  movies[index] = movietoupdate ;
  fs.writeFile('./data/movies.json', JSON.stringify(movies),(err)=>{
    res.status(200).json({
        status:'success',
        data:{
            movie: movietoupdate
        } 
  })
  })
})
const port = 8000;
app.listen(port, ()=>{
    console.log("completed")
})