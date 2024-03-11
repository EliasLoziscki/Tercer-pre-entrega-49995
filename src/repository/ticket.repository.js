import { GetTicketDTO } from "../dao/dto/ticket.dto.js";

export class TicketRepository {
    constructor(ticketDto){
        this.ticketDto = ticketDto;
    }
    get() {
        try{
            return this.ticketDto.get;
        }
        catch(err){
            res.logger.error("Error al obtener tickets:", err);
            return [];
        }
    }
    create(ticket){
        try{
            return this.ticketDto.create(ticket);
        }
        catch(err){
            res.logger.error("Error al agregar ticket:", err);
            return null;
        }
    }
    getById(ticketId){
        try{
            const ticketDto = new GetTicketDTO(this.ticketDto.getById(ticketId));
            return ticketDto;

        }
        catch(err){
            res.logger.error("Error al obtener ticket:", err);
            return null;
        }
    }
    update(id, updateTicket){
        try{
            return this.ticketDto.update(id, updateTicket);
        } 
        catch(err){
            res.logger.error("Error al actualizar ticket:", err);
            return null;
        }
    }
    delete(ticketId){
        try{
            return this.ticketDto.delete(ticketId);
        }
        catch(err){
            res.logger.error("Error al eliminar ticket:", err);
            return null;
        }
    }
}
