import axios from "axios";

const updateSubscription = username =>
  axios.post(`/api/v1/subscriptions`, {
    user_id: username
  });

export const subscriptionService = {
  updateSubscription
};
