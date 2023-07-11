import axios from "axios";

const getActivity = (perPage, cursor = undefined, organization = undefined, type = undefined) => {
  const params = new URLSearchParams(document.location.search);
  params.set("per_page", perPage);
  if (cursor) params.set("cursor", cursor);
  if (organization) params.set("organization", organization);
  if (type) params.set("type", type);

  return axios.get(`/api/v1/activities?${params.toString()}`);
}

export const activityService = {
  getActivity
};
