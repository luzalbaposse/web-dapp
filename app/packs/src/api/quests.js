import axios from "axios";

const getQuests = (uuid, perPage, cursor) =>
  axios.get(`/api/v1/quests?&id=${uuid}&per_page=${perPage}&${cursor ? `cursor=${cursor}` : ""}`);

export const questsService = {
  getQuests
};
