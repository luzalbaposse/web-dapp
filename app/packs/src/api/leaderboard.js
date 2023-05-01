import axios from "axios";

const getLeaderboard = () => axios.get(`/api/v1/leaderboard`);

export const leaderboardService = {
  getLeaderboard
};
