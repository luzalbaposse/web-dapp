import axios from "axios";

const getRewards = () => {
  return axios.get(`api/v1/experience_rewards`).then(res => res.data);
};
const claimReward = rewardId => {
  return axios.post(`/api/v1/experience_rewards/${rewardId}/claim`).then(res => res.data);
};

export const rewardsService = {
  getRewards,
  claimReward
};
