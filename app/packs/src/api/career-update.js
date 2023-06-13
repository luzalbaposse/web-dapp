import axios from "axios";

const sendUpdate = (message, goals) =>
  axios.post("/api/v1/career_updates", {
    career_update: {
      message,
      goals
    }
  });

export const careerUpdatesService = {
  sendUpdate
};
