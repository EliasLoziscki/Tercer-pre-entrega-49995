import express from "express";
import { connectDB } from "./config/connectDB.js";
import { engine } from "express-handlebars";
import passport from "passport";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import session from "express-session";
import MongoStore from "connect-mongo";
import dbProductManager from "./dao/Managers/mongo/product.mongo.js";
import inicializePassport from "./config/passport.config.js";
import { message } from "./controllers/messages.controller.js";
import sessionRouter from "./routes/sessions.routes.js";
import viewRouter from "./routes/views.routes.js";
import { dbProductRouter } from "./routes/dbProducts.routes.js";
import { dbCartRouter } from "./routes/dbCarts.routes.js";
import { config } from "./config/config.js";
import cors from "cors";
import { productsGenerateRouter } from "./routes/productsFaker.routes.js";
import { addLogger } from "./utils/logger.js";
import Handlebars from "handlebars";

console.log(config);

const PORT = config.server.port;
let messages = [];
const app = express();

connectDB();

//Para poder usar el body de las peticiones en formato json
app.use(express.json());
//Para poder usar el body de las peticiones en formato urlencoded (formularios). lo que hace es parsear el body de las peticiones y lo deja en req.body
app.use(express.urlencoded({ extended: true }));
//Para poder usar el cors en el servidor y poder hacer peticiones desde el front end al back end sin problemas de seguridad de cors (Cross Origin Resource Sharing)
//app.use(cors());
app.use(cors({ origin: "http://localhost:8080" }));
//Para poder usar el logger en el servidor y poder ver las peticiones que llegan al servidor y los errores que se producen en el mismo (middleware).
app.use(addLogger);

const httpServer = app.listen(PORT, () =>
  console.log(`Servidor funcionando en el puerto: ${PORT}`)
); //Se crea el servidor http con express y se lo asigna a una constante para poder usarlo en el socket server

app.use(
  session({
    store: new MongoStore({
      mongoUrl: config.mongo.url,
      ttl: 3600,
    }),
    secret: "CoderSecret",
    resave: false,
    saveUninitialized: false,
  })
);

const io = new Server(httpServer);

app.engine("handlebars", engine()); //handlebars como template engine para las vistas html
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

Handlebars.registerHelper('add', function(a, b) {
  return a + b;
});
Handlebars.registerHelper('multiply', function(a, b) {
  return a * b;
});

app.use(express.static(`${__dirname}/public`)); //Para poder usar los archivos estáticos de la carpeta public (css y js)

app.use("/", viewRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/products", dbProductRouter);
app.use("/api/carts", dbCartRouter);
app.use("/mockingproducts", productsGenerateRouter);
inicializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.get("/loggerTest", (req, res) => {
  req.logger.debug('debug');
  req.logger.http('HTTP');
  req.logger.info('info');
  req.logger.warn('warning');
  req.logger.error('error');
  req.logger.fatal('fatal');
  res.send(`Logger test`);
});

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("createProduct", async (productData) => {
    try {
      const productManager = new dbProductManager();
      console.log("Datos del producto recibidos en el servidor:", productData);
      const newProduct = await productManager.createProduct(productData);
      io.emit("newProduct", productData);
    } catch (error) {
      console.error("Error al agregar producto:", error.message);
    }
  });
  socket.on("chat-message", async (data) => {
    messages.push(data);
    io.emit("messages", messages);
    try {
      await message.createMessage(data.email, data.message);
    } catch (error) {
      console.error(
        "Error al guardar el mensaje en la base de datos:",
        error.message
      );
    }
  });

  socket.on("new-user", async (email) => {
    socket.broadcast.emit("new-user", email);
    try {
      const messages = await message.getMessages();
      socket.emit("messages", messages);
    } catch (error) {
      console.error(
        "Error al obtener los mensajes de la base de datos:",
        error.message
      );
    }
  });
});
