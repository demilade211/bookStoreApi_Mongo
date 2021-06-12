import mongoose from "../database/index.js";

const bookSchema = new mongoose.Schema({
    book_name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    author: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    year_released: {
        type: Number,
        required: true,
        min: 3
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Books", bookSchema);