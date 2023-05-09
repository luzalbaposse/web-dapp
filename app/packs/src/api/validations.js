import axios from "axios";

const validateHandle = localHandle => axios.get(`/api/v1/validations/username?username=${localHandle}`);

const validateEmail = email => axios.get(`/api/v1/validations/email?email=${encodeURIComponent(email)}`);

export const validations = {
  validateHandle,
  validateEmail
};
