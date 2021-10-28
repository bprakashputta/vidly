const mongoose = require('mongoose');
const mongolog = require('debug')('mongo:log');

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost/vidly')
    .then(()=>{
        mongolog("Successfully Connected to Vidly Database");
    })
    .catch(error=>{
        mongolog("Error connecting to database: ", error.message);
    });

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Genre = mongoose.model('genre', genreSchema);

// class genreClass{

// Create genre function
    async function creategenre(){
        const genres = [
            {
                name: "Action"
            },
            {
                name: "Adventure"
            },
            {
                name: "Comedy"
            },
            {
                name: "Romance"
            }
        ];

        for(let i=0; i<genres.length; i++){
            // mongolog(genres[i]);
            let name = genres[i].name;
            const genre = await new Genre({
                name: name
            });
            try {
                const result = await genre.save();
                mongolog(result);
            }catch (ex){
                mongolog(ex.message);
            }
        }
    }

creategenre();


// Get All genre Function
async function getAllGenres(){
    const genres = await Genre
        .find()
        .sort({name: 1});
    mongolog(genres);
    return genres;
}
// getAllgenres();


// Get genre by ID Function
async function getGenreByID(id){
    const genre = await Genre
        .find({_id: id});
    mongolog(genre);
    return genre;

}
// getgenreByID('617a8eb2627a4ceb40c80bc4');


// Update genre Object fields
    async function  updateGenreByID(id){
        const genre = await Genre
            .find({_id: id});
        if(!genre) {
            mongolog(`Couldn't find genre with given ID`);
            return;
        }
        genre[0].name = "Adventure";
        const result = await genre[0].save();
        // console.log(genre[0].name);
        mongolog(result)
    }

// updategenreByID('617a8eb2627a4ceb40c80bc7');

    async function deleteGenreByID(id){
        const genre = await Genre.find({_id: id});
        if(!genre){
            mongolog('genre with given ID not found');
        }
        const result = await Genre.findOneAndDelete({_id: id});
        mongolog(result);
        return result;
    }

// deletegenreByID('617a8eb2627a4ceb40c80bc7');

// }
//
// module.exports = genreClass;