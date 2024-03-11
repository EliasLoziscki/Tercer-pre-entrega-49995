import express from "express";
import { getCartByID, getCartsAll, postCreateCarts, postAddProductToCart, updateCartId, updateCartIdByProduct, deleteCartById, deleteProductItCartById } from "../controllers/dbCarts.controller.js";
import { purchase } from "../controllers/ticket.controller.js";

const router = express.Router();

//Crear un carrito en la base de datos 
router.post("/", postCreateCarts);

//Traer todos los carritos de la base de datos 
router.get("/", getCartsAll);

//Traer un carrito por su id 
router.get("/:cid", getCartByID);

//Agregar un producto a un carrito 
router.post("/:cid/products/:pid", postAddProductToCart);

//Actualizar un carrito por su id 
router.put("/:cid", updateCartId);

//Actualizar un producto de un carrito por su id
router.put("/:cid/products/:pid", updateCartIdByProduct);

//Eliminar un carrito por su id
router.delete("/:cid", deleteCartById);

//Eliminar un producto de un carrito por su id
router.delete("/:cid/products/:pid", deleteProductItCartById);

//permite finalizar el proceso de compra de dicho carrito
router.put("/:cid/purchase", purchase);

export { router as dbCartRouter };