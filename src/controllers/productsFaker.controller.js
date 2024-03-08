import { generateProducts } from "../utils.js";

export const postCreateProductFaker = async (req, res) => {
    try {
      const products = generateProducts();
      const maxProducts = 10;
      for (let i = 0; i < maxProducts; i++) {
        req.logger.info(products[i])
        await productServicio.createProduct(products[i]);
      }
      res.send({
        status: "success",
        msg: "Productos creados",
        productos: products.slice(0, maxProducts),
      });
    } catch (error) {
      req.logger.error("Error al crear los productos:", error);
      res.send({
        status: "error",
        msg: "Error al crear los productos",
      });
    }
  }
