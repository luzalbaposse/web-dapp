import axios from "axios";

const getActivity = (perPage, cursor = undefined, organization = undefined, type = undefined) => {
  const params = new URLSearchParams(document.location.search);
  params.set("per_page", perPage);
  if (cursor) params.set("cursor", cursor);
  if (organization) params.set("organization", organization);
  if (typeof type === "string") params.set("type[]", type);
  if (typeof type === "object") type.map(t => params.append("type[]", t));

  return axios.get(`/api/v1/activities?${params.toString()}`);
};

export const activityService = {
  getActivity
};
