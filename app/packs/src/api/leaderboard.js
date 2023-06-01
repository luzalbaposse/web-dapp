import axios from "axios";

const getLeaderboard = () => axios.get(`/api/v1/leaderboards`);

const getExperiencePointsLeaderboard = () => axios.get(`/api/v1/experience_points_leaderboards`);

export const leaderboardService = {
  getLeaderboard,
  getExperiencePointsLeaderboard
};
