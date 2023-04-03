import axios from "axios";
import { defaultHeaders, appendCSRFToken } from "./utils";

const createAccount = user => {
  const baseHeaders = defaultHeaders();
  const headers = appendCSRFToken(baseHeaders);
  return axios.post(
    "/users.json",
    {
      captcha: user.captcha,
      code: user.code,
      email: user.email,
      legal_first_name: user.firstName,
      legal_last_name: user.lastName,
      password: user.password,
      theme_preference: "light",
      username: user.handle,
      career_needs: user.careerNeeds,
      headline: user.headline,
      gender: user.gender,
      nationality: user.nationality,
      location: user.location,
      tags: user.tags
    },
    {
      headers: {
        ...headers
      }
    }
  );
};

const sendConfirmationEmail = userUUID => axios.post(`users/${userUUID}/send_confirmation_email.json`);

const sendResetPasswordEmail = email => axios.post("/passwords", { email });

const resetPassword = (userUUID, token, password) => {
  const baseHeaders = defaultHeaders();
  const headers = appendCSRFToken(baseHeaders);

  return axios.put(
    `/users/${userUUID}/password`,
    {
      token,
      password_reset: { password }
    },
    {
      headers: {
        ...headers
      }
    }
  );
};

const getProfile = username =>
  axios.get(`/u/${username}`, {
    headers: {
      accept: "application/json",
      "content-type": "application/json"
    }
  });

const getConnections = username =>
  axios.get(`/api/v1/connections?id=${username}`, {
    headers: {
      accept: "application/json",
      "content-type": "application/json"
    }
  });

const getSupporters = username =>
  axios.get(`/api/v1/supporters?id=${username}`, {
    headers: {
      accept: "application/json",
      "content-type": "application/json"
    }
  });

const getSubscribers = username =>
  axios.get(`/api/v1/subscribing?id=${username}`, {
    headers: {
      accept: "application/json",
      "content-type": "application/json"
    }
  });

export const users = {
  createAccount,
  sendConfirmationEmail,
  sendResetPasswordEmail,
  resetPassword,
  getConnections,
  getProfile,
  getSupporters,
  getSubscribers
};
