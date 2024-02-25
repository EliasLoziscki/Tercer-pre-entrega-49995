import userModel from "../../models/Users.models.js";

export default class Users {
  constructor() {}
  get = async () => {
    try {
      let users = await userModel.find();
      return users;
    } catch (error) {
      return {
        status: "error",
        msg: error.message,
      };
    }
  };
  saveUser = async (user) => {
    try {
      let result = await userModel.create(user);
      return result;
    } catch (error) {
      return {
        status: "error",
        msg: error.message,
      };
    }
  };
  getBy = async (params) => {
    try {
      let result = await userModel.findOne(params);
      return result;
    } catch (error) {
      return {
        status: "error",
        msg: error.message,
      };
    }
  };
  getById = async (id) => {
    try {
      let result = await userModel.findById(id);
      return result;
    } catch (error) {
      return {
        status: "error",
        msg: error.message,
      };
    }
  };
  updateUser = async (id, user) => {
    try {
      delete user._id;
      let result = await userModel.updateOne({ _id: id }, { $set: user });
      return result;
    } catch (error) {
      return {
        status: "error",
        msg: error.message,
      };
    }
  };
}
