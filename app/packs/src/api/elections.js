import axios from "axios";

const getElections = () => axios.get("/api/v1/elections");

export const electionsService = {
  getElections
};
