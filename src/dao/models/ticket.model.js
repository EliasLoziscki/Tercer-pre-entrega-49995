import mongoose from "mongoose";

const collection = "tickets";

const ticketSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    purchase_datetime: {
        type: Date,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
});

const ticketModel = mongoose.model(collection, ticketSchema);

export default ticketModel;