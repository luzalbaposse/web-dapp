import axios from "axios";

const getLeaderboard = () => axios.get(`/api/v1/leaderboards`);

const getExperiencePointsLeaderboard = (perPage, page, userId) => {
  return axios.get(`/api/v1/experience_points_leaderboards`, {
    params: {
      id: userId,
      per_page: perPage,
      page
    }
  });
};

export const leaderboardService = {
  getLeaderboard,
  getExperiencePointsLeaderboard
};
