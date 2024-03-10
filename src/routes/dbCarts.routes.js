import express from "express";
import { cartByID, getCartsAll, postCreateCarts, postAddProductToCart, updateCartId, updateCartIdByProduct, deleteCartById, deleteProductItCartById } from "../controllers/dbCarts.controller.js";

const router = express.Router();

//Crear un carrito en la base de datos 
router.post("/", postCreateCarts);

//Traer todos los carritos de la base de datos 
router.get("/", checkRole(["admin"]), getCartsAll);

//Traer un carrito por su id 
router.get("/:cid", cartByID);

//Agregar un producto a un carrito 
router.post("/:cid/products/:pid", postAddProductToCart);

//Actualizar un carrito por su id 
router.put("/:cid", updateCartId);

//Actualizar un producto de un carrito por su id
router.put("/:cid/products/:pid", updateCartIdByProduct);

//Eliminar un carrito por su id
router.delete("/:cid", checkRole(["admin"]), deleteCartById);

//Eliminar un producto de un carrito por su id
router.delete("/:cid/products/:pid", deleteProductItCartById);

export { router as dbCartRouter };