import axios from "axios";

const getTalent = username => axios.get(`/api/v1/talents/${username}`);

const getCareerUpdates = username => axios.get(`/api/v1/career_updates?id=${username}`);

export const talentsService = {
  getTalent,
  getCareerUpdates
};
