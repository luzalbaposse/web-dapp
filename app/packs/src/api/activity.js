import axios from "axios";

const getActivity = (perPage, cursor = undefined, organization = undefined, types = undefined) => {
  const params = new URLSearchParams(document.location.search);
  params.set("per_page", perPage);
  if (cursor) params.set("cursor", cursor);
  if (organization) params.set("organization", organization);
  if (typeof types === "string") params.set("types[]", types);
  if (typeof types === "object") types.map(t => params.append("types[]", t));

  return axios.get(`/api/v1/activities?${params.toString()}`);
};

export const activityService = {
  getActivity
};
