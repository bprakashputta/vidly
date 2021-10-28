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

const gerneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Gerne = mongoose.model('Gerne', gerneSchema);

class GerneClass{

// Create Gerne function
    async createGerne(){
        const gernes = [
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

        for(let i=0; i<gernes.length; i++){
            // mongolog(gernes[i]);
            let name = gernes[i].name;
            const gerne = await new Gerne({
                name: name
            });
            try {
                const result = await gerne.save();
                mongolog(result);
            }catch (ex){
                mongolog(ex.message);
            }
        }
    }

// createGerne();



// Get All Gerne Function
    async getAllGernes(){
        const gernes = await Gerne
            .find()
            .sort({name: 1});
        mongolog(gernes);
        return gernes;
    }
// getAllGernes();


// Get Gerne by ID Function
    async getGerneByID(id){
        const gerne = await Gerne
            .find({_id: id});
        mongolog(gerne);
        return gerne;
    }
// getGerneByID('617a8eb2627a4ceb40c80bc4');


// Update Gerne Object fields
    async updateGerneByID(id){
        const gerne = await Gerne
            .find({_id: id});
        if(!gerne) {
            mongolog(`Couldn't find Gerne with given ID`);
            return;
        }
        gerne[0].name = "Adventure";
        const result = await gerne[0].save();
        // console.log(gerne[0].name);
        mongolog(result)
    }

// updateGerneByID('617a8eb2627a4ceb40c80bc7');

    async deleteGerneByID(id){
        const gerne = await Gerne.find({_id: id});
        if(!gerne){
            mongolog('Gerne with given ID not found');
        }
        const result = await Gerne.findOneAndDelete({_id: id});
        mongolog(result);
        return result;
    }

// deleteGerneByID('617a8eb2627a4ceb40c80bc7');

}

module.exports = GerneClass;