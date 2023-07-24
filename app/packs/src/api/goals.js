import axios from "axios";

const getGoals = (user) => axios.get(`/api/v1/goals?id=${user}`);

export const goalsService = {
  getGoals
};
