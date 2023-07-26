import { useCallback, useState } from "react";
import { noop } from "lodash";
import { users } from "../api";

export const useProfileFetcher = () => {
  const [profile, setProfile] = useState(void 0);
  const fetchProfile = useCallback(
    (username, onError = noop, onSuccess = noop) =>
      users
        .getProfile(username)
        .then(({ data }) => {
          setProfile(data.profile);
          onSuccess(data.profile);
        })
        .catch(error => {
          console.error(error);
          onError(error);
        }),
    [setProfile]
  );
  return {
    profile,
    setProfile,
    fetchProfile
  };
};
