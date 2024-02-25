import { CreateUserDto, GetUserDTO } from "../dao/dto/user.dto.js";

export class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }
    async getBy() {
        const users = await this.dao.getBy();
        return users;
    }
    async getBy(userId) {
        try {
            const user = await this.dao.getBy(userId);
            const userDTO = new CreateUserDto(user);
            const userDtoFront = new GetUserDTO(userDTO);
            return userDtoFront;
            
        }catch(err){
            throw new Error(`Error en el repositorio al buscar el usuario: ${err.message}`);
        }

    }
}