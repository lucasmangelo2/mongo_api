import * as mongoose from 'mongoose'

const animalSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    classification:{
        type: String,
        required:true
    },
    creation_date:{
        default: new Date(),
        type: Date
    },
    status:{
        default: "A",
        type: String
    }
});

export const Animal = mongoose.model('Animal', animalSchema);