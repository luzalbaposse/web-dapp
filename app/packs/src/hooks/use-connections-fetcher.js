import { useCallback, useState } from "react";
import { users } from "../api";

export const useConnectionsFetcher = () => {
  const [connections, setConnections] = useState(void 0);
  const fetchConnections = useCallback(
    username =>
      users
        .getConnections(username)
        .then(({ data }) => {
          setConnections(data.connections);
        })
        .catch(error => {
          console.error(error);
        }),
    [setConnections]
  );
  return {
    connections,
    fetchConnections
  };
};
