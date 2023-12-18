const mongoose = require('mongoose');
const movieSchema  = new mongoose.Schema({
    name:{
        type:String
    },
    description: {
        type: [String],
        required: [true, 'Description is a required field']
    },
    duration: {
        type: Number,
      // required: [true,'Duration is a required field']
    },
    ratings: {
        type: Number,
        default: 1.0
    },
    totalRating: {
        type: Number
    },
    releaseYear: {
        type: Number
    },
    releaseDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    generes: {
        type: [String],
        required: [true, "Genres is a required field"]
    },
    directors: {
        type: [String],
        required: [true, "Directors is a required field"]
    },
    coverImage: {
        type: [String],
        required: [true, "Cover Image is a required field"]
    },
    Actors: {
        type: [String],
        required: [true,"Actors is a required field"]
    },
    price: {
        type: Number,
        required: [true,'price is a required field']
    }
},{
    toJSON:{virtuals:true,
    toObject:{virtual:true}}
});
movieSchema.virtual('durationinhours').get(function(){
    return this.duration/60;
})

const Movie = mongoose.model("Movie", movieSchema) //model 
// const testMovie = new Movie ({
//     name:"Animal   ",
//     description:"This is comedy new release   movie ",
//     duration : "2hr"  ,
//     ratings :5.5
// })
// testMovie.save().then(doc=>{
//     console.log(doc)
// }).catch(err=>{
//     console.log("Error occur "+ err)
// })
module.exports = Movie ;