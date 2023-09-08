import axios from "axios";
import { defaultHeaders, appendCSRFToken } from "./utils";

const getTalent = username => axios.get(`/api/v1/talents/${username}`);

const getCareerUpdates = username => axios.get(`/api/v1/career_updates?id=${username}`);

const getRecommendedTalents = username => axios.get(`/api/v1/talents/recommended?id=${username}&per_page=3`);

const getProfileOverview = username => axios.get(`/api/v1/talents/overview?id=${username}`);

const getFollowers = username => axios.get(`/api/v1/talents/following?id=${username}`);

const getAbout = username => axios.get(`/api/v1/talents/about?id=${username}`);

const getSupportData = username => axios.get(`/api/v1/talents/support?id=${username}`);

const sendSubscribeRequest = username => axios.post(`/api/v1/subscriptions`, { user_id: username });

const unsubscribe = username => axios.delete(`/api/v1/subscriptions?user_id=${username}`);

const getMilestones = username => axios.get(`/api/v1/talents/milestones?id=${username}`);

const createMilestone = (talentId, milestone) => {
  const baseHeaders = defaultHeaders();
  const headers = appendCSRFToken(baseHeaders);
  return axios.post(`/api/v1/talent/${talentId}/milestones`, milestone, { headers });
};

const updateMilestone = (talentId, milestone) => {
  const baseHeaders = defaultHeaders();
  const headers = appendCSRFToken(baseHeaders);
  return axios.patch(`/api/v1/talent/${talentId}/milestones/${milestone.id}`, milestone, { headers });
};

export const talentsService = {
  getTalent,
  getCareerUpdates,
  getRecommendedTalents,
  getProfileOverview,
  getFollowers,
  getAbout,
  getSupportData,
  sendSubscribeRequest,
  unsubscribe,
  getMilestones,
  createMilestone,
  updateMilestone
};
