import { cartService } from "../repository/index.js";

const postCreateCarts = async (req, res) => {
  try {
    const cart = await cartService.createCart();
    res.send({
      status: "success",
      msg: "Cart creado",
      producto: cart,
    });
  } catch (error) {
    req.logger.error("Error al crear el cart:", error);
    res.send({
      status: "error",
      msg: "Error al crear el cart",
    });
  }
};

const getCartsAll = async (req, res) => {
  try {
    const carts = await cartService.getCarts();

    res.send({
      status: "success",
      msg: "Productos del carrito",
      carts: carts,
    });
  } catch (error) {
    req.logger.error("Error al obtener los carts:", error);
    res.send({
      status: "error",
      msg: "Error al obtener los carts",
    });
  }
};

const getCartByID = async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartService.getCartByID({ _id: cid });
    res.send({
      status: "success",
      msg: `Ruta GET ID CART con ID: ${cid}`,
      producto: cart,
    });
  } catch (error) {
    req.logger.error("Error al obtener el cart:", error);
    res.send({
      status: "error",
      msg: `Error al obtener el cart con ID: ${cid}`,
    });
  }
};

const postAddProductToCart = async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;
    const cart = await cartService.addProductToCart(cid, pid, quantity);
    res.send({
      status: "success",
      msg: `Ruta POST ID CART con ID: ${cid} y ID PRODUCTO con ID: ${pid}`,
      producto: cart,
    });
  } catch (error) {
    req.logger.error("Error al agregar el producto al carrito:", error);
    res.send({
      status: "error",
      msg: "Error al agregar el producto al carrito",
    });
  }
};

const updateCartId = async (req, res) => {
  try {
    const cid = req.params.cid;
    const updateData = req.body;
    const cart = await cartService.updateCart(cid, updateData);
    res.send({
      status: "success",
      msg: `Ruta PUT ID CART con ID: ${cid}`,
      producto: cart,
    });
  } catch (error) {
    req.logger.error("Error al actualizar el cart:", error);
    res.send({
      status: "error",
      msg: `Error al actualizar el cart con ID: ${cid}`,
    });
  }
};

const updateCartIdByProduct = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const updateData = req.body;
  try {
    const cart = await cartService.updateProductInCart(cid, pid, updateData);
    res.send({
      status: "success",
      msg: `Ruta PUT ID CART con ID: ${cid} y ID PRODUCTO con ID: ${pid}`,
      producto: cart,
    });
  } catch (error) {
    req.logger.error("Error al actualizar el cart:", error);
    res.send({
      status: "error",
      msg: `Error al actualizar el cart con ID: ${cid} y el producto con ID: ${pid}`,
    });
  }
};

const deleteCartById = async (req, res) => {
  const cid = req.params.cid;
  try {
    const cart = await cartService.deleteCart({ _id: cid });
    res.send({
      status: "success",
      msg: `Ruta DELETE ID CART con ID: ${cid}`,
      producto: cart,
    });
  } catch (error) {
    req.logger.error("Error al eliminar el cart:", error);
    res.send({
      status: "error",
      msg: `Error al eliminar el cart con ID: ${cid}`,
    });
  }
};

const deleteProductItCartById = async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cart = await cartService.deleteProductItCart(cid, pid);

    res.send({
      status: "success",
      msg: `Ruta DELETE ID CART con ID: ${cid}`,
      producto: cart,
    });
  } catch (error) {
    req.logger.error("Error al eliminar el cart:", error);
    res.send({
      status: "error",
      msg: `Error al eliminar el cart con ID: ${cid}`,
    });
  }
};

export {
  postCreateCarts,
  getCartsAll,
  getCartByID,
  postAddProductToCart,
  updateCartId,
  updateCartIdByProduct,
  deleteCartById,
  deleteProductItCartById,
};
