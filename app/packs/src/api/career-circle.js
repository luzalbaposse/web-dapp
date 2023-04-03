import axios from "axios";
import { defaultHeaders, appendCSRFToken } from "./utils";

const getActiveSubscribers = (userUUID, perPage, cursor) =>
  axios.get(`/api/v1/subscribers?id=${userUUID}&per_page=${perPage}&${cursor ? `cursor=${cursor}` : ""}`);

const getPendingSubscribers = (userUUID, perPage, cursor) =>
  axios.get(`/api/v1/pending_subscribers?id=${userUUID}&per_page=${perPage}&${cursor ? `cursor=${cursor}` : ""}`);

const acceptSubscription = (userUUID, subscribingUserId) => {
  const baseHeaders = defaultHeaders();
  const headers = appendCSRFToken(baseHeaders);

  return axios.put(
    `/api/v1/subscriptions/accept`,
    {
      id: userUUID,
      talent_id: subscribingUserId
    },
    {
      headers: {
        ...headers
      }
    }
  );
};

const destroySubscription = (userUUID, subscribingUserId) => {
  const baseHeaders = defaultHeaders();
  const headers = appendCSRFToken(baseHeaders);

  return axios.delete(
    "/api/v1/subscriptions",
    {
      data: {
        id: userUUID,
        talent_id: subscribingUserId
      }
    },
    {
      headers: {
        ...headers
      }
    }
  );
};

export const careerCircle = {
  acceptSubscription,
  destroySubscription,
  getActiveSubscribers,
  getPendingSubscribers
};
