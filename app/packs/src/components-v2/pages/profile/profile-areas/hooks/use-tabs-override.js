import { useCallback } from "react";
import { useTabs } from "@talentprotocol/design-system";
import { TAB_NAME_TO_INDEX_MAP } from "../constants";

export const useTabsOverride = () => {
  const tabsState = useTabs();
  const changeTab = useCallback(
    (index, withUpdatesTab) => {
      window.history.pushState({}, "", `?tab=${Object.keys(TAB_NAME_TO_INDEX_MAP(withUpdatesTab))[index]}`);
      tabsState.selectElement(index);
    },
    [tabsState.selectElement]
  );
  return {
    tabsState,
    changeTab
  };
};
