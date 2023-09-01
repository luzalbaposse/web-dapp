import axios from "axios";
import { defaultHeaders, appendCSRFToken } from "./utils";

const editProfile = (profile) => {
    const baseHeaders = defaultHeaders();
    const headers = appendCSRFToken(baseHeaders);
    return axios.patch(`/api/v1/talents/update_profile?id=${profile.username}`, {user: {...profile}}, 
    {
      headers: {
        ...headers
      }
    });
};

export const editProfileService = {
    editProfile
};