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
const port = 8000;
app.listen(port, ()=>{
    console.log("completed")
})