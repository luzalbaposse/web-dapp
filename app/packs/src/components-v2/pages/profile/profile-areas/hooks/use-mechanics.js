import { useEffect, useState } from "react";
import { TAB_NAME_TO_INDEX_MAP } from "../constants";

export const useMechanics = tabsState => {
  const [urlData, setUrlData] = useState({ profileUsername: "" });
  useEffect(() => {
    const params = new URL(document.location).searchParams;
    const selectedTab = params.get("tab")?.toLowerCase();
    if (selectedTab) {
      const index = TAB_NAME_TO_INDEX_MAP[selectedTab];
      if (index !== undefined) {
        tabsState.selectElement(index);
        setUrlData({ profileUsername: window.location.pathname.split("/")[2] });
      }
    }
  }, [tabsState.selectElement]);
  return {
    ...urlData
  };
};
