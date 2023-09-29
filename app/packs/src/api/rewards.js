import axios from "axios";

const getRewards = () => axios.get(`api/v1/experience_rewards`);
const claimReward = rewardId => axios.post(`/api/v1/experience_rewards/${rewardId}/claim`);

export const rewardsService = {
  getRewards,
  claimReward
};
