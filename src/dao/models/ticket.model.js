import mongoose from "mongoose";

const collection = "tickets";

const ticketSchema = new mongoose.Schema({
    //amount la cantidad de dinero que se va a pagar
    amount: {
        type: Number,
        required: true
    },
    //code string debe autogenerarse y unico
    code: {
        type: String,
        required: true,
        unique: true
    },
    //purchase_datetime debera guarda la hora exacta y fecha en la cual se dormalizo la compra
    purchase_datetime: {
        type: Date,
        required: true
    },
    //purchaser: Strng, contendra el correo del usuaio asociado al carrito
    purchaser: {
        type: String,
        required: true
    }
});

const ticketModel = mongoose.model(collection, ticketSchema);

export default ticketModel;