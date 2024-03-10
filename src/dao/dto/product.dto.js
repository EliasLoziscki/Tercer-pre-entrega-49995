export class GetProductDto {
    constructor(productDto) {
    this.id = productDto.id;
    this.title = productDto.title;
    this.description = productDto.description;
    this.price = productDto.price;
    this.thumbnail = productDto.thumbnail;
    this.code = productDto.code;
    this.stock = productDto.stock;
    this.status = productDto.status;
    this.category = productDto.category;
    }
}