import axios from "axios";
import { defaultHeaders, appendCSRFToken } from "./utils";

const updateSubscription = (username) => 
  axios.post(`/api/v1/subscriptions`, {
    talent_id: username
  });

export const subscriptionService = {
  updateSubscription
};


/*



  if (response.success) {
    setProfile(prev => ({
      ...prev,
      subscribing_status: new_status
    }));
    toast.success(<ToastBody heading={successHeader} body={successMessage} />, { autoClose: 5000 });
  } else {
    toast.error(<ToastBody heading="Unable to update subscription" body={response?.error} />, { autoClose: 5000 });
  }

*/