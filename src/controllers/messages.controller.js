import dbMessageManager from "../dao/Managers/mongo/message.mongo.js";

const messageManager = new dbMessageManager();

class MessageController {
  async createMessage(email, message) {
    try {
      const newMessage = await messageManager.createMessage(email, message);
      return newMessage;
    } catch (error) {
      console.error("Error al crear el mensaje:", error);
      throw error;
    }
  }

  async getMessages() {
    return messageManager.getMessages();
  }
}

const message = new MessageController();

export { message };