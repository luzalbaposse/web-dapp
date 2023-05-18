import axios from "axios";

const getActivity = (perPage, cursor) =>
  axios.get(`/api/v1/activities?&per_page=${perPage}&${cursor ? `cursor=${cursor}` : ""}`);

export const activityService = {
  getActivity
};
