import ticketModel from "../../models/ticket.model.js";

class dbTicketManager {

    get() {
        try{
            return ticketModel.find().lean();
        }
        catch(err){
            res.logger.error("Error al obtener tickets:", err);
            return [];
        }
    }
    create(ticket){
        try{
            const newTicket = new ticketModel(ticket);
            return newTicket.save();
        }
        catch(err){
            res.logger.error("Error al agregar ticket:", err);
            return null;
        }
    }
    getById(ticketId){
        try{
            return ticketModel.findById(ticketId).lean();
        }
        catch(err){
            res.logger.error("Error al obtener ticket:", err);
            return null;
        }
    }
    getByTicket(params){
        try{
            return ticketModel.findOne(params);
        }
        catch(err){
            res.logger.error("Error al obtener ticket:", err);
            return null;
        }
    }
    update(id, updateTicket){
        try{
            return ticketModel.findByIdAndUpdate(id, updateTicket, {new: true});
        } 
        catch(err){
            res.logger.error("Error al actualizar ticket:", err);
            return null;
        }
    }
    delete(ticketId){
        try{
            return ticketModel.findByIdAndDelete(ticketId);
        }
        catch(err){
            res.logger.error("Error al eliminar ticket:", err);
            return null;
        }
    }
};

export default dbTicketManager;