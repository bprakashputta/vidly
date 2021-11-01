const mongoose = require('mongoose');
const { genreSchema } = require('./genres');
// const Joi = require("joi");
const Joi = require('joi');
JoiObjectId = require('joi-objectid')(Joi);

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});

const Movies = mongoose.model('Movies', movieSchema);

async function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(1).max(100).required(),
        genreId: JoiObjectId().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required()
    });
    return schema.validate(movie);
}

module.exports.Movies = Movies;
module.exports.validate = validateMovie;
module.exports.movieSchema = movieSchema;