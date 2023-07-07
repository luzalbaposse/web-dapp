import axios from "axios";

const getOrganization = id => axios.get(`/api/v1/organizations/${id}`);

const getOrganizations = params => axios.get(`/api/v1/organizations?${params}`);

export const organizations = {
  getOrganization,
  getOrganizations
};
