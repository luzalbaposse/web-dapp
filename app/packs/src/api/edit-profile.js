import axios from "axios";
import { defaultHeaders, appendCSRFToken } from "./utils";

const editProfile = (username, profile) => {
  const baseHeaders = defaultHeaders();
  const headers = appendCSRFToken(baseHeaders);
  return axios.patch(`/api/v1/talents/update_profile?id=${username}`, {...profile}, 
  {
    headers: {
      ...headers
    }
  });
};

const editAbout = (username, profile) => {
  const baseHeaders = defaultHeaders();
  const headers = appendCSRFToken(baseHeaders);
  return axios.patch(`/api/v1/talents/edit_about?id=${username}`, {...profile}, 
  {
    headers: {
      ...headers
    }
  });
};

const editExperience = (username, profile) => {
  const baseHeaders = defaultHeaders();
  const headers = appendCSRFToken(baseHeaders);
  return axios.patch(`/api/v1/talents/edit_experience?id=${username}`, {...profile}, 
  {
    headers: {
      ...headers
    }
  });
};

const editAccount = (username, profile) => {
  const baseHeaders = defaultHeaders();
  const headers = appendCSRFToken(baseHeaders);
  return axios.patch(`/api/v1/talents/edit_account?id=${username}`, {...profile}, 
  {
    headers: {
      ...headers
    }
  });
};

export const editProfileService = {
    editProfile,
    editAbout,
    editExperience,
    editAccount
};