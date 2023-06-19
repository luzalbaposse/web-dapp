import axios from "axios";

const getQuests = (uuid, perPage, cursor) =>
  axios.get(`/api/v1/quests?&id=${uuid}&per_page=${perPage}&${cursor ? `cursor=${cursor}` : ""}`);

const completeQuest = (questType, data) => axios.put(`/api/v1/quests/${questType}/complete`, data);

export const questsService = {
  getQuests,
  completeQuest
};
