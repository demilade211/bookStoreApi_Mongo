import mongoose from "../database/index.js";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    lastName: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 3
    },
    password: {
        type: String,
        required: true,
        minLenght: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("user", userSchema);