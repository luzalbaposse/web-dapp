import axios from "axios";

const sendMessage = (uuid, message) => axios.post("/messages", { id: uuid, message });

export const messagesService = {
  sendMessage
};
