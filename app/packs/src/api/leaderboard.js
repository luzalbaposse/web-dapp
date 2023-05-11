import axios from "axios";

const getLeaderboard = () => axios.get(`/api/v1/leaderboards`);

export const leaderboardService = {
  getLeaderboard
};
