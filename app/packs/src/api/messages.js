import axios from "axios";
import { appendCSRFToken, defaultHeaders } from "./utils";

const sendMessage = (uuid, message) => {
  const baseHeaders = defaultHeaders();
  const headers = appendCSRFToken(baseHeaders);
  return axios.post("/messages", { id: uuid, message }, {
    headers
  });
}

export const messagesService = {
  sendMessage
};
