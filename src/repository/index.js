import { UserRepository } from "./user.repository.js";
import Users from "../dao/Managers/mongo/user.mongo.js";

export const userDao = new Users();


export const userService = new UserRepository(userDao);