
export class GetCartDto {
    constructor(cartDto) {
        this.products = cartDto.products;
        this.quantity = cartDto.quantity;
        this.price = cartDto.price;
    }
}