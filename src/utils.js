import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import { Faker, en } from "@faker-js/faker"

export const customFaker = new Faker({ locale: [en] });

const { commerce, image, database, string, internet, person, phone, lorem  } = customFaker;

const generateProduct = () => {
    return {
        title: commerce.productName(),
        description: commerce.productDescription(),
        price: parseFloat(commerce.price()),
        thumbnail: image.url(),
        code: string.alphanumeric(10),
        stock: parseInt(string.numeric(2)),
        status: "true",
        category: commerce.department()
    }
}

export const generateProducts = () => {
    const productsNumber = Math.ceil(Math.random() * 10);
    let products = [];
    for (let i = 0; i < productsNumber; i++) {
        const product = generateProduct();
        products.push(product);
    }
    return products;
}


export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));// esto es para encriptar la contraseña del usuario en la base de datos y que no se vea en texto plano en la base de datos
export const validatePassword = (password, user) => bcrypt.compareSync(password, user.password);// esto es para comparar la contraseña que el usuario ingresa con la contraseña encriptada en la base de datos y que coincidan para que el usuario pueda ingresar a su cuenta de usuario en la aplicación

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;