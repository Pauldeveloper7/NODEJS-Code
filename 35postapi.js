const express = require('express');
const fs = require('fs')
const app = express()
app.use(express.json()) //middle ware 
const movies = JSON.parse(fs.readFileSync('./data/movies.json'));
app.post('/api/v1/movies',(req,res)=>{
    const newid = movies[movies.length-1].id +1
    const newmovie = Object.assign({id:newid},req.body)
    // console.log(req.body);
    movies.push(newmovie);
    fs.writeFile("./data/movies.json",JSON.stringify(movies), (err)=>{
        res.status(201).json({
            status:"success",
             data:{
                movie:newmovie
             }
        })
    })
    

})


const port = 8000;
app.listen(port, ()=>{
    console.log("completed")
})