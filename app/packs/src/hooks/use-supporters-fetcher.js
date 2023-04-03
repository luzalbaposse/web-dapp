import { useCallback, useState } from "react";
import { users } from "../api";

export const useSupportersFetcher = () => {
  const [supporters, setSupporters] = useState(void 0);
  const [totalSupporters, setTotalSupporters] = useState(0);
  const fetchSupporters = useCallback(
    username =>
      users
        .getSupporters(username)
        .then(({ data }) => {
          setSupporters(data.supporters);
          setTotalSupporters(data.pagination.total);
        })
        .catch(error => {
          console.error(error, setTotalSupporters);
        }),
    [setSupporters]
  );
  return {
    supporters,
    totalSupporters,
    fetchSupporters
  };
};
