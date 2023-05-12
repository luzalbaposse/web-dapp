import axios from "axios";

const getTalent = username => axios.get(`/api/v1/talents/${username}`);

const getCareerUpdates = username => axios.get(`/api/v1/career_updates?id=${username}`);

const getRecommendedTalents = () => axios.get("/api/v1/talents/recommended");

export const talentsService = {
  getTalent,
  getCareerUpdates,
  getRecommendedTalents
};
