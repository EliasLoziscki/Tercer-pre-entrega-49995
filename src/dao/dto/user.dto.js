export class CreateUserDto {
    constructor(user) {
        this.fullName = `${user.first_name} ${user.last_name}`;
        this.name = user.first_name;
        this.lastName = user.last_name;
        this.email = user.email;
        this.age = user.age;
        this.password = user.password;
        this.cart = user.cart;
        this.rol = user.rol;
    }
}

export class GetUserDTO {
    constructor(userDao) {
        this.fullName = userDao.fullName;
        this.email = userDao.email;
        this.age = userDao.age;
        this.rol = userDao.rol;
    }
}