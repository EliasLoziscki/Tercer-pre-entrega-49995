import mongoose from "mongoose";
import { config } from "../config/config.js";


export const connectDB = async ()=>{
    try {
        await  mongoose.connect(config.mongo.url);
    } catch (error) {
        req.logger.fatal(`Error al conectar con la Base de Datos${error}`)
    }
}