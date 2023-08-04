import axios from "axios";

const getActivities = (perPage, cursor = undefined, organization = undefined, types = undefined) => {
  const params = new URLSearchParams(document.location.search);
  params.set("per_page", perPage);
  if (cursor) params.set("cursor", cursor);
  if (organization) params.set("organization", organization);
  if (typeof types === "string") params.set("types[]", types);
  if (typeof types === "object") types.map(t => params.append("types[]", t));

  return axios.get(`/api/v1/activities?${params.toString()}`);
};

const getActivitiesOfUser = (perPage, username, types = undefined, cursor = undefined) => {
  const params = new URLSearchParams(document.location.search);
  params.set("per_page", perPage);
  params.set("id", username);
  if (cursor) params.set("cursor", cursor);
  if (typeof types === "string") params.set("types[]", types);
  if (typeof types === "object") types.map(t => params.append("types[]", t));

  return axios.get(`/api/v1/activities/of_user?${params.toString()}`);
};

export const activitiesService = {
  getActivities,
  getActivitiesOfUser
};
