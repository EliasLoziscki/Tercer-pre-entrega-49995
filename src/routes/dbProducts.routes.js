import express from "express";
import { ProductById, deleteProductById, getProductsAll, postCreateProduct, updateProductById } from "../controllers/dbProducts.controller.js";
import { checkRole } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getProductsAll);

router.post("/", checkRole(["admin"]), postCreateProduct);

router.get("/:pid", ProductById);

router.put("/:pid", checkRole(["admin"]), updateProductById);

router.delete("/:pid", checkRole(["admin"]), deleteProductById);

export { router as dbProductRouter };