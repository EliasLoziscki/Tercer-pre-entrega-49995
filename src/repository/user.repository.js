import { CreateUserDto, GetUserDto } from "../dao/dto/user.dto.js";

export class UserRepository {
    constructor(userDao) {
        this.userDao = userDao;
    }

    async getUsers() {
        const users = await this.userDao.get();
        console.log(users)
        return users;
    }

    async createUser(user) {
        const userDto = new CreateUserDto(user);
        const userCreated = await this.userDao.saveUser(userDto);
        return userCreated;
    }
    
    async getByUserDto(params) {
        const user = await this.userDao.getBy(params);
        const userDtoFront = new GetUserDto(user);
        return userDtoFront;
    }
}