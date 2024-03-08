import { Router } from 'express';
import { postCreateProductFaker } from '../controllers/productsFaker.controller.js';
import { checkRole } from "../middlewares/auth.js";

const router = Router();

router.get('/', checkRole(["admin"]), postCreateProductFaker);

export { router as productsGenerateRouter }