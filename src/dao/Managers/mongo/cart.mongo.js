import cartModel from "../../models/carts.model.js";
import productModel from "../../models/products.model.js";

class dbCartManager {
  constructor() {
    this.cartModel = cartModel;
    this.productModel = productModel;
  }

  async getCarts () {
    try {
      return await this.cartModel.find();
    } catch (error) {
      throw new Error(`Error al obtener los carritos: ${error.message}`);
    }
  };

  async getCartByID(id) {
    try {
        const cart = await cartModel.findById(id).populate("products.product").lean();
        return cart;
    } catch (error) {
        throw new Error(`Error al obtener el carrito: ${error.message}`);
    }
  }

  async getByCart (params) {
    try {
      return await this.cartModel.findOne(params);
    } catch (error) {
      throw new Error(`Error al obtener el carrito: ${error.message}`);
    }
  };

  async createCart () {
    try {
      const cart = new this.cartModel({ products: [] });
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error al crear el carrito: ${error.message}`);
    }
  };

  async addProductToCart (cid, pid, quantity = 1) {
    try {
        const cart = await this.cartModel.findById(cid);
        if (!cart) {
            throw new Error(`El carrito con el id ${cid} no existe`);
        }
        const product = await this.productModel.findById(pid);
        if (!product) {
            throw new Error(`El producto con el id ${pid} no existe`);
        }

        const productInCart = cart.products.find(p => p.product.toString() === pid);

        if (productInCart) {

            productInCart.quantity += parseInt(quantity);
        } else {

            cart.products.push({ product: pid, quantity: parseInt(quantity) });
        }

        await cart.save();

        return cart;
    } catch (error) {
        throw new Error(`Error al agregar el producto al carrito: ${error.message}`);
    }
  }

  async deleteCart (cid) {
    try {
      const cart = await this.cartModel.findById(cid);
      if (!cart) {
        throw new Error(`El carrito con el id ${cid} no existe`);

      }
      await this.cartModel.deleteOne({ _id: cid })
      return {
        status: "success",
        message: `El carrito con el id ${cid} fue eliminado`,
      };
    } catch (error) {
      throw new Error(`Error al eliminar el carrito: ${error.message}`);
    }
  };

  async deleteProductItCart (cid, pid) {
    try {
      const cart = await this.cartModel.findById(cid);
      if (!cart) {
        throw new Error(`El carrito con el id ${cid} no existe`);
      }
      const product = await this.productModel.findById(pid);
      if (!product) {
        throw new Error(`El producto con el id ${pid} no existe`);
      }
      let productsInCart = cart.products;
      const indexProduct = productsInCart.findIndex(
        (product) => product.product == pid
      );

      if (indexProduct == -1) {
        throw new Error(
          `El producto con el id ${pid} no existe en el carrito con el id ${cid}`
        );
      } else {
        cart.products.splice(indexProduct, 1);
      }
      await cart.save();
      return cart;

    } catch (error) {
      throw new Error(`Error al eliminar el producto del carrito: ${error.message}`);
    }
  };

  async updateCart (cid, updateData) {
    try {
      const cart = await this.cartModel.findById(cid);
      if (!cart) {
        throw new Error(`El carrito con el id ${cid} no existe`);
      }
      for (let key in updateData) {
        cart[key] = updateData[key];
      }
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error al actualizar el carrito: ${error.message}`);
    }
  };

  async updateProductInCart (cid, pid, updateData) {
    try {
      const cart = await this.cartModel.findById(cid);
      if (!cart) {
        throw new Error(`El carrito con el id ${cid} no existe`);
      }
      let productsInCart = cart.products;
      const indexProduct = productsInCart.findIndex(
        (product) => product.product == pid
      );
      if (indexProduct == -1) {
        throw new Error(
          `El producto con el id ${pid} no existe en el carrito con el id ${cid}`
        );
      } else {
        productsInCart[indexProduct].quantity = updateData.quantity;
      }
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error al actualizar el producto del carrito: ${error.message}`);
    }
  };

}

export default dbCartManager;
