import { productService } from "../repository/index.js";

const getProductsAll = async (req, res) => {
  try {
    const product = await productService.getProducts();

    res.send({
      status: "success",
      msg: "Productos del carrito",
      carts: product,
    });
  } catch (error) {
    req.logger.error("que pasa", error);
    res.send({
      status: "error",
      msg: "Error al obtener los carts",
    });
  }
};

const postCreateProduct = async (req, res) => {
  const product = req.body;

  await productService.createProduct(product);

  res.send({
    status: "success",
    msg: "Producto creado",
    producto: product,
  });
};

const getProductById = async (req, res) => {
  const pid = req.params.pid;
  try {
    const product = await productService.getProductById(pid);
    res.send({
      status: "success",
      msg: `Ruta GET ID PRODUCTS con ID: ${pid}`,
      producto: product,
    });
  } catch (error) {
    req.logger.error("Error al obtener el producto:", error);
    res.send({
      status: "error",
      msg: "Error al obtener el producto",
    });
  }
};

const updateProductById = async (req, res) => {
  try {
    const pid = req.params.pid;
    const updatedProduct = req.body;
    await productService.updateProduct(pid, updatedProduct);
    res.send({
      status: "success",
      msg: `Ruta PUT de PRODUCTS con ID: ${pid}`,
    });
  } catch (error) {
    req.logger.error("Error al actualizar el producto:", error);
    res.send({
      status: "error",
      msg: "Error al actualizar el producto",
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productService.getProductById(pid);
    const productTitle = product.title;
    await productService.deleteProduct(pid);
    res.send({
      status: "success",
      msg: `Ruta DELETE de PRODUCTS con ID: ${pid}`,
      producto: productTitle,
    });
  } catch (error) {
    req.logger.error("Error al eliminar el producto:", error);
    res.send({
      status: "error",
      msg: "Error al eliminar el producto",
    });
  }
};

const getStock = async (req, res) => {
  const pid = req.params.pid;
  try {
    const stock = await productService.getStock(pid);
    res.send({
      status: "success",
      msg: `Stock del producto con ID: ${pid}`,
      stock: stock,
    });
  } catch (error) {
    req.logger.error("Error al obtener el stock del producto:", error);
    res.send({
      status: "error",
      msg: "Error al obtener el stock del producto",
    });
  }
};

const updateStock = async (req, res) => {
  const pid = req.params.pid;
  const stock = req.body.stock;
  try {
    await productService.updateStock(pid, stock);
    res.send({
      status: "success",
      msg: `Stock del producto con ID: ${pid} actualizado`,
    });
  } catch (error) {
    req.logger.error("Error al actualizar el stock del producto:", error);
    res.send({
      status: "error",
      msg: "Error al actualizar el stock del producto",
    });
  }
};


export {
  getProductsAll,
  postCreateProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  getStock,
  updateStock
};
