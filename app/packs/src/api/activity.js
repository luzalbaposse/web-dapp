import axios from "axios";

const getActivity = () => axios.get("/api/v1/activity");

export const activityService = {
  getActivity
};
