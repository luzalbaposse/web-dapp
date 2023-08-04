import { useState, useEffect } from "react";
import { talentsService } from "src/api/talents";

export const useDataFetcher = urlData => {
  const [supporters, setSupporters] = useState([]);

  useEffect(() => {
    if (!urlData.profileUsername) return;
    talentsService
      .getFollowers(urlData.profileUsername)
      .then(({ data }) => {
        setSupporters(data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [urlData]);

  return {
    supporters
  };
};
