import axios from "axios";
import { defaultHeaders } from "./utils";

const getDiscoveryRows = (page, perPage, partnershipsOnly = false) =>
  axios.get(`/discovery?partnerships_only=${partnershipsOnly}&page=${page}&per_page=${perPage}`, {
    headers: defaultHeaders()
  });

export const discoveryRowsService = {
  getDiscoveryRows
};
