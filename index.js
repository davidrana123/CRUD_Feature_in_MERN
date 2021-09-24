const express = require("express")
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path")
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors())

// database connection
mongoose.connect("mongodb+srv://MERN-STACK:4g8fJ790cyf5CsBV@cluster0.4s7rg.mongodb.net/MERN-STACK")

const movieSchema = {
    title: String,
    genre: String,
    year: String
}

const Movie = mongoose.model("Movie", movieSchema);


//api router 
app.get('/movies',function(req,res) {
    Movie.find().then(movies => res.json(movies));
})

app.post('/newMovie', function(req,res) {
    const title = req.body.title;
    const genre = req.body.genre;
    const year = req.body.year;

    const newMovie = new Movie({
        title,
        genre,
        year
    });

app.delete('/delete/:id', function(req, res) {
    const id = req.params.id;
    Movie.findByIdAndDelete({_id: id}, function(err) {
        if(!err){
            console.log("movie deleted")
        } else {
            console.log(err);
        }
    })
})

    newMovie.save();
})


app.put("/put/:id", (req,res) => {
    const updatedItem = {
        title: req.body.title,
        genre: req.body.genre,
        year: req.body.year
    };
    Movie.findByIdAndUpdate(
        { _id: req.params.id},
        { $set: updatedItem },
        (req,res,err) => {
            if(!err) {
                console.log("Item updated")
            }else {
                console.log(err)
            }
        }
    )
})

app.listen(port, function() {
    console.log("express is runimg")
})