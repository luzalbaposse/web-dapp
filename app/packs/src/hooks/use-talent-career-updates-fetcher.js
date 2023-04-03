import { useCallback, useState } from "react";
import { talentsService } from "../api/talents";

export const useTalentCareerUpdatesFetcher = () => {
  const [careerUpdates, setCareerUpdates] = useState([]);
  const fetchCareerUpdates = useCallback(
    username =>
      talentsService
        .getCareerUpdates(username)
        .then(({ data }) => {
          setCareerUpdates(data.career_updates);
        })
        .catch(error => {
          console.error(error);
          throw "AccessLocked";
        }),
    [setCareerUpdates]
  );
  return {
    careerUpdates,
    fetchCareerUpdates
  };
};
