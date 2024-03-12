import mongoose from 'mongoose';

const collection = 'messages';

const messagesSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: true},
    message: {
        type: String, 
        required: true},
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const messagesModel = mongoose.model(collection, messagesSchema);

export default messagesModel;

