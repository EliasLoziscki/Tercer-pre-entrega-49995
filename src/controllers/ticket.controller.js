import { cartService, productService, ticketService } from "../repository/index.js";
import moment from "moment";


const purchase = async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await cartService.getCartByID({ _id: cid });
        const products = cart.products;
        let productsNotPurchased = [];

        for (let i = 0; i < products.length; i++) {
            const product = await productService.getProductById(products[i].product._id);
            if (product.stock < products[i].quantity) {
                productsNotPurchased.push({
                    product: product,
                    quantity: products[i].quantity,
                });
            } else {
                const newStock = product.stock - products[i].quantity;
                await productService.updateProduct(products[i].product._id, { stock: newStock });
            }
        }

        if (productsNotPurchased.length > 0) {
            console.log("Productos no comprados debido a la falta de stock: ", productsNotPurchased);
        }

        const amount = products.reduce((acc, product) => {
            return acc + product.product.price * product.quantity;
        }, 0);

        const date = moment().subtract(3, 'hours').toDate();

        const newTicket = {
            amount: amount,
            code: Math.random().toString(36).substring(2, 15),
            purchase_datetime: date,
            purchaser: req.session.user.email,
        };

        console.log('ticket: ', newTicket)
        const ticket = await ticketService.create(newTicket);
        await cartService.updateCart(cid, { products: [] });
        res.send({
            status: "success",
            msg: "Compra realizada con éxito",
            ticket: ticket,
        });
    } catch (error) {
        req.logger.error("Error al realizar la compra:", error);
        res.send({
            status: "error",
            msg: "Error al realizar la compra",
        });
    }
};

export { purchase };