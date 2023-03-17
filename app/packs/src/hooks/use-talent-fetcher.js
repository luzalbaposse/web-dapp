import { useCallback, useState } from "react";
import { talentsService } from "../api/talents";

export const useTalentFetcher = () => {
  const [talent, setTalent] = useState(void 0);
  const fetchTalent = useCallback(
    username =>
      talentsService
        .getTalent(username)
        .then(({ data }) => {
          setTalent(data.talent);
        })
        .catch(error => {
          console.error(error);
        }),
    [setTalent]
  );
  return {
    talent,
    fetchTalent
  };
};
