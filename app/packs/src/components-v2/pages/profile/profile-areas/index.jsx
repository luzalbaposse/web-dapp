import React, { useMemo, useEffect, useState } from "react";
import { TabsContainer, Container, AreaContainer } from "./styled";
import { Tabs } from "@talentprotocol/design-system";
import { useTabsOverride } from "./hooks/use-tabs-override";
import { TAB_TO_AREA_MAP, TAB_NAME_TO_INDEX_MAP } from "./constants";
import { useProfileOverviewStore } from "src/contexts/state";
import capitalize from "lodash/capitalize";

export const ProfileAreas = ({ currentUser, railsContext, urlData }) => {
  const { tabsState, changeTab } = useTabsOverride();
  const { profileOverview } = useProfileOverviewStore();
  const [loading, setLoading] = useState(true);

  const withUpdatesTab = useMemo(
    () => profileOverview?.updates_length > 0 || profileOverview?.id === currentUser?.id,
    [profileOverview, currentUser?.id]
  );

  const memoizedArea = useMemo(() => {
    if (!profileOverview || loading) return <></>;

    const Component = TAB_TO_AREA_MAP(withUpdatesTab)[tabsState.selectedIndex];

    return <Component currentUser={currentUser} railsContext={railsContext} urlData={urlData} />;
  }, [tabsState.selectedIndex, currentUser, railsContext, urlData, profileOverview, loading]);

  const tabList = useMemo(() => {
    return Object.keys(TAB_NAME_TO_INDEX_MAP(withUpdatesTab)).map(key => capitalize(key));
  }, [withUpdatesTab]);

  useEffect(() => {
    if (!profileOverview || !currentUser) return;
    const params = new URL(document.location).searchParams;
    const selectedTab = params.get("tab")?.toLowerCase();
    if (selectedTab) {
      const index = TAB_NAME_TO_INDEX_MAP(withUpdatesTab)[selectedTab];
      if (index !== undefined) {
        tabsState.selectElement(index);
      } else {
        window.history.pushState({}, "", `?tab=${Object.keys(TAB_NAME_TO_INDEX_MAP(withUpdatesTab))[0]}`);
      }
    }
    setLoading(false);
  }, [tabsState.selectElement, profileOverview, currentUser]);

  return !profileOverview ? (
    <></>
  ) : (
    <Container>
      <TabsContainer>
        <Tabs
          selectedIndex={tabsState.selectedIndex}
          tabList={tabList}
          onClick={index => changeTab(index, withUpdatesTab)}
        />
      </TabsContainer>
      {!!urlData && <AreaContainer>{memoizedArea}</AreaContainer>}
    </Container>
  );
};
