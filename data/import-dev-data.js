const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config({path:'./config.env'});
//connect to mongodb 
const movie = require('../Models/movieModel');
//connecting to the database 
const app = require('../middleware');

dotenv.config({ path: './config.env' });

const uri = "mongodb+srv://admin:k1Q9gkIStO8TvvbA@cluster0.mms3uvi.mongodb.net/cineflex?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // You can adjust this value based on your needs
}).then(() => {
  console.log("DB connected successfully....");
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});
//Read movies.json file 
const movies = JSON.parse(fs.readFileSync('./data/movies.json'),'utf-8');
//Delete existing movie documents from collections 
const deleteMovies = async ()=>{
    try{
        await movie.deleteMany();
        console.log('Data Succesfully deleted ');
    }catch(err){
        console.log(err.message);
        process.exit();
    }
}
//Import movies data to mongodb collection 
const importmovies = async ()=>{
    try{
        await movie.create(movies);
        console.log('Data successfully imported !');

    }catch(err){
        console.log(err.message);
    }
    process.exit()

}
if(process.argv[2]=='--import'){
    importmovies()
}
if(process.argv[2]=='--delete'){
deleteMovies()
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server has started on port', port);
});
