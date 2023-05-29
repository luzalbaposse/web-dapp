import axios from "axios";

const getInvitedTalents = (perPage, cursor) =>
  axios.get(`/api/v1/invited_talents?&per_page=${perPage}&${cursor ? `cursor=${cursor}` : ""}`);

export const invitedTalentsService = {
  getInvitedTalents
};
