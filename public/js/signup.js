const { mongoose } = require("mongoose");


const Schema = mongoose.Schema;

const detailsSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const collection = new mongoose.model("users", detailsSchema);

module.exports = collection;
