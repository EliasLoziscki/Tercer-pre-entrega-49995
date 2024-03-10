import { UserRepository } from "./user.repository.js";
import { connectDB } from "../config/connectDB.js"
import Users from "../dao/Managers/mongo/user.mongo.js";
import { ProductRepository } from "./product.repository.js";
import dbProductManager from "../dao/Managers/mongo/product.mongo.js";
import { CartRepository } from "./cart.repository.js";
import dbCartManager from "../dao/Managers/mongo/cart.mongo.js";

export const userDao = new Users();
export const productDao = new dbProductManager();
export const cartDao = new dbCartManager();

connectDB();

export const userService = new UserRepository(userDao);
export const productService = new ProductRepository(productDao);
export const cartService = new CartRepository(cartDao);