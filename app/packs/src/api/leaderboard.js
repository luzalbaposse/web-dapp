import axios from "axios";

const getLeaderboard = () => axios.get(`/api/v1/leaderboards`);

const getExperiencePointsLeaderboard = perPage =>
  axios.get(`/api/v1/experience_points_leaderboards?per_page=${perPage}`);

export const leaderboardService = {
  getLeaderboard,
  getExperiencePointsLeaderboard
};
