import axios from "axios";

const getActivity = (perPage, cursor = "", type = "") =>
  axios.get(
    `/api/v1/activities?&per_page=${perPage}${cursor ? `&cursor=${cursor}` : ""}${type ? `&type=${type}` : ""}`
  );

export const activityService = {
  getActivity
};
