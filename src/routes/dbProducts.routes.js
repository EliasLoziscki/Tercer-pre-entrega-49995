import express from "express";
import { productById, deleteProductById, getProductsAll, postCreateProduct, updateProductById } from "../controllers/dbProducts.controller.js";
import { checkRole } from "../middlewares/auth.js";

const router = express.Router();

//Traer todos los productos de la base de datos 
router.get("/", getProductsAll);

//Crear un producto en la base de datos 
router.post("/", checkRole(["admin"]), postCreateProduct);

//Traer un producto por su id 
router.get("/:pid", productById);

//Actualizar un producto por su id 
router.put("/:pid", checkRole(["admin"]), updateProductById);

//Eliminar un producto por su id 
router.delete("/:pid", deleteProductById);

export { router as dbProductRouter };