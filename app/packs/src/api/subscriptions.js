import axios from "axios";

const updateSubscription = username =>
  axios.post(`/api/v1/subscriptions`, {
    talent_id: username
  });

export const subscriptionService = {
  updateSubscription
};
