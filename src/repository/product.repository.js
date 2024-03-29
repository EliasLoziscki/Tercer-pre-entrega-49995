import { GetProductDto } from "../dao/dto/product.dto.js";

export class ProductRepository {
    constructor(productDao) {
        this.productDao = productDao;
    }

    async getProducts() {
        const products = await this.productDao.getProducts();
        return products;
    }

    async getProductById(id) {
        const product = await this.productDao.getProductById(id);
        const productDto = new GetProductDto(product);
        return productDto;
    }

    async getByProductDto(params) {
        const product = await this.productDao.getByProduct(params);
        const productDto = new GetProductDto(product);
        return productDto;
    }

    async createProduct(product) {
        const productCreated = await this.productDao.createProduct(product);
        return productCreated;
    }

    async updateProduct(id, product) {
        const productUpdated = await this.productDao.updateProduct(id, product);
        return productUpdated;
    }

    async deleteProduct(id) {
        const productDeleted = await this.productDao.deleteProduct(id);
        return productDeleted;
    }

    async getStock(id) {
        const stock = await this.productDao.getStock(id);
        return stock;
    }

    async updateStock(id, stock) {
        const stockUpdated = await this.productDao.updateStock(id, stock);
        return stockUpdated;
    }

}