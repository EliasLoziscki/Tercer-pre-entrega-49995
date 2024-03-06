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

export class GetUserDto {
    constructor(userDto) {
        this.fullName = `${userDto.name} ${userDto.lastName}`;
        this.name = userDto.name;
        this.lastName = userDto.lastName;
        this.email = userDto.email;
        this.age = userDto.age;
        this.cart = userDto.cart;
        this.rol = userDto.rol;
    }
}