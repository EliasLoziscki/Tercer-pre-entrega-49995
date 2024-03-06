import { UserRepository } from "./user.repository.js";
import { connectDB } from "../config/connectDB.js"
import Users from "../dao/Managers/mongo/user.mongo.js";

export const userDao = new Users();

connectDB();

export const userService = new UserRepository(userDao);