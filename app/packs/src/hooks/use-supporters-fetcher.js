import { useCallback, useState } from "react";
import { users } from "../api";

export const useSupportersFetcher = () => {
  const [supporters, setSupporters] = useState(void 0);
  const fetchSupporters = useCallback(
    username =>
      users
        .getSupporters(username)
        .then(({ data }) => {
          setSupporters(data.supporters);
        })
        .catch(error => {
          console.error(error);
        }),
    [setSupporters]
  );
  return {
    supporters,
    fetchSupporters
  };
};
