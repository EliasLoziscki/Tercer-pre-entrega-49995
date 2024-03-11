import { cartService, productService, ticketService } from "../repository/index.js";


//La compra debe corroborar el stock del producto al momento de finalizar
//Si el producto tiene stock suficiente para la cantidad indicada en el producto del carrito, entonces restarlodel stock del producto y continuar
//Si el producto no tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces no agregar el prodcuto al proceso de compra
//Al final, utilizar el servicio de Tickets para poder generar un ticket con los datos de compra
// en caso de existir una compra no completada, devolver el arrglo con los ids de los productos que no pudieron procesarse
//Finalizada la compra el carrito debe quedar vacio de productos. no se debe elmiminar el carrito

const purchase = async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await cartService.getCartByID({ _id: cid });
        const products = cart.products;
        let productsNotPurchased = [];
        for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const stock = await productService.getStock(product._id);
        if (stock >= product.quantity) {
            await productService.updateStock(product._id, stock - product.quantity);
        } else {
            productsNotPurchased.push(product._id);
        }
        }
        if (productsNotPurchased.length > 0) {
        res.send({
            status: "error",
            msg: "No se pudo realizar la compra de los siguientes productos",
            productsNotPurchased: productsNotPurchased,
        });
        } else {
        const ticket = await ticketService.create(cart);
        await cartService.updateCart(cid, { products: [] });
        res.send({
            status: "success",
            msg: "Compra realizada con éxito",
            ticket: ticket,
        });
        }
    } catch (error) {
        req.logger.error("Error al realizar la compra:", error);
        res.send({
        status: "error",
        msg: "Error al realizar la compra",
        });
    }
};

export { purchase };
