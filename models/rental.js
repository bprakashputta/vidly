const mongoose = require('mongoose');
const {Customer} = require("./customer");
const {Movies} = require('./movies');
const Joi = require("joi");

const rentalSchema = new mongoose.Schema({
    Customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                required: true,
                default: false
            },
            phone: {
                type: Number,
                required: true,
                minlength: 10,
                maxlength: 12
            }
        }),
        required: true
    },
    Movies: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateIn: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

const Rental = mongoose.model('Rental', rentalSchema);

async function validateRental(rental){
    const schema = Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    });
    return schema.validate(rental);
}

module.exports.rentalSchema = rentalSchema;
module.exports.Rental = Rental;
module.exports.validate = validateRental;