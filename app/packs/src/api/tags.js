import axios from "axios";

const getTags = query => axios.get(`/api/v1/tags?description=${query}`);

export const tagsService = {
  getTags
};
