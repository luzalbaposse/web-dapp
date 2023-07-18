import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { talentsService } from "src/api/talents";
import { ToastBody } from "src/components/design_system/toasts";

export const useDataFetcher = urlData => {
  const [profileOverview, setProfileOverview] = useState(null);
  const [supporters, setSupporters] = useState([]);
  useEffect(() => {
    if (!urlData.profileUsername) return;
    talentsService
      .getProfileOverview(urlData.profileUsername)
      .then(({ data }) => {
        setProfileOverview(data.talent);
      })
      .catch(err => {
        console.error(err);
        toast.error(<ToastBody heading={"Profile not found"} />);
        setTimeout(() => {
          debugger;
          window.location.href = "/home";
        }, 500);
      });
  }, [urlData]);
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
    profileOverview,
    supporters
  };
};
