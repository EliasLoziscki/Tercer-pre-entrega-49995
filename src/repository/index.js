import { UserRepository } from "./user.repository.js";
import { connectDB } from "../config/connectDB.js"
import Users from "../dao/Managers/mongo/user.mongo.js";
import { ProductRepository } from "./product.repository.js";
import dbProductManager from "../dao/Managers/mongo/product.mongo.js";
import { CartRepository } from "./cart.repository.js";
import dbCartManager from "../dao/Managers/mongo/cart.mongo.js";
import { TicketRepository } from "./ticket.repository.js";
import dbTicketManager from "../dao/Managers/mongo/ticket.mongo.js";

export const userDao = new Users();
export const productDao = new dbProductManager();
export const cartDao = new dbCartManager();
export const ticketDao = new dbTicketManager();

connectDB();

export const userService = new UserRepository(userDao);
export const productService = new ProductRepository(productDao);
export const cartService = new CartRepository(cartDao);
export const ticketService = new TicketRepository(ticketDao);