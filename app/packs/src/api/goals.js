import axios from "axios";
import { appendCSRFToken, defaultHeaders } from "./utils";

const getGoals = user => axios.get(`/api/v1/goals?id=${user}&per_page=20`);

const deleteGoal = goalId => {
  const baseHeaders = defaultHeaders();
  const headers = appendCSRFToken(baseHeaders);

  return axios.delete(`/api/v1/goals/${goalId}`, {
    headers: {
      ...headers
    }
  });
};

export const goalsService = {
  getGoals,
  deleteGoal
};
