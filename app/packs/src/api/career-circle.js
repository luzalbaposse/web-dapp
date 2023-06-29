import axios from "axios";
import { defaultHeaders, appendCSRFToken } from "./utils";

const getActiveSubscribers = (userUUID, perPage, cursor) =>
  axios.get(`/api/v1/subscribers?id=${userUUID}&per_page=${perPage}&${cursor ? `cursor=${cursor}` : ""}`);

const getPendingSubscribers = (userUUID, perPage, cursor) =>
  axios.get(`/api/v1/pending_subscribers?id=${userUUID}&per_page=${perPage}&${cursor ? `cursor=${cursor}` : ""}`);

const acceptSubscription = (subscribing, subscriber) => {
  const baseHeaders = defaultHeaders();
  const headers = appendCSRFToken(baseHeaders);

  return axios.put(
    `/api/v1/subscriptions/accept`,
    {
      id: subscriber,
      talent_id: subscribing
    },
    {
      headers: {
        ...headers
      }
    }
  );
};

const destroySubscription = (subscribing, subscriber) => {
  const baseHeaders = defaultHeaders();
  const headers = appendCSRFToken(baseHeaders);

  return axios.delete(
    "/api/v1/subscriptions",
    {
      data: {
        id: subscriber,
        talent_id: subscribing
      }
    },
    {
      headers: {
        ...headers
      }
    }
  );
};

const getSponsors = (userUUID, status, perPage, cursor) =>
  axios.get(
    `/api/v1/sponsors?id=${userUUID}&per_page=${perPage}${cursor ? `&cursor=${cursor}` : ""}${
      status ? `&status=${status}` : ""
    }`
  );

const getSponsorships = (userUUID, status, perPage, cursor) =>
  axios.get(
    `/api/v1/sponsorships?id=${userUUID}&per_page=${perPage}${cursor ? `&cursor=${cursor}` : ""}${
      status ? `&status=${status}` : ""
    }`
  );

export const careerCircle = {
  acceptSubscription,
  destroySubscription,
  getActiveSubscribers,
  getPendingSubscribers,
  getSponsors,
  getSponsorships
};
