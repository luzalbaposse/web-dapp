import { useCallback, useState } from "react";
import { users } from "../api";

export const useProfileFetcher = () => {
  const [profile, setProfile] = useState(void 0);
  const fetchProfile = useCallback(
    username =>
      users
        .getProfile(username)
        .then(({ data }) => {
          setProfile(data.profile);
        })
        .catch(error => {
          console.error(error);
        }),
    [setProfile]
  );
  return {
    profile,
    fetchProfile
  };
};
