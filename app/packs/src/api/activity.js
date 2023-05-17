import axios from "axios";

const getActivity = page => axios.get(`/api/v1/activity?page=${page}`);

export const activityService = {
  getActivity
};
