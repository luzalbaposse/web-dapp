import { useCallback, useState } from "react";
import { users } from "../api";

export const useSubscribingFetcher = () => {
  const [subscribing, setSubscribing] = useState(void 0);
  const fetchSubscribing = useCallback(
    username =>
      users
        .getSubscribers(username)
        .then(({ data }) => {
          setSubscribing(data.subscribing);
        })
        .catch(error => {
          console.error(error);
        }),
    [setSubscribing]
  );
  return {
    subscribing,
    fetchSubscribing
  };
};
