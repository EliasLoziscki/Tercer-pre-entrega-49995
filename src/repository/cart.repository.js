import { GetCartDto } from "../dao/dto/cart.dto.js";

export class CartRepository {
    constructor(cartDao) {
        this.cartDao = cartDao;
    }

    async getCarts() {
        const cart = await this.cartDao.getCarts();
        console.log(cart)
        return cart;
    }

    async createCart(cart) {
        const cartDto = new GetCartDto(cart);
        const cartCreated = await this.cartDao.createCart(cartDto);
        return cartCreated;
    }
    
    async getByCartDto(params) {
        const cart = await this.cartDao.getByCart(params);
        const cartDtoFront = new GetCartDto(cart);
        return cartDtoFront;
    }
    
    async getCartByID(id) {
        const cart = await this.cartDao.getCartByID(id);
        const cartDtoFront = new GetCartDto(cart);
        return cartDtoFront;
    }

    async addProductToCart(cid, pid, quantity) {
        const cart = await this.cartDao.addProductToCart(cid, pid, quantity);
        return cart;
    }

    async deleteCart(cid) {
        const cart = await this.cartDao.deleteCart(cid);
        return cart;
    }

    async deleteProductItCart (cid, pid) {      
        const cart = await this.cartDao.deleteProductItCart(cid, pid);
        return cart;
    }

    async updateCart (cid, updateData) {      
        const cart = await this.cartDao.updateCart(cid, updateData);
        return cart;
    }

    async updateProductInCart (cid, pid, updateData) {
        const cart = await this.cartDao.updateProductInCart(cid, pid, updateData);
        return cart;
    }
}