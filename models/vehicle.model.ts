import * as mongoose from 'mongoose'

const vehicleSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    year: {
        type: Number,
        required:true
    },
    transmision: {
        type: String,
        required:true,
        enum: ['Manual','Automatic']
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

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);