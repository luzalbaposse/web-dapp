import React, { useMemo } from "react";
import { TabsContainer, Container, AreaContainer } from "./styled";
import { Tabs } from "@talentprotocol/design-system";
import { useTabsOverride } from "./hooks/use-tabs-override";
import { useMechanics } from "./hooks/use-mechanics";
import { TAB_TO_AREA_MAP } from "./constants";

export const ProfileAreas = ({ currentUser, railsContext }) => {
  const { tabsState, changeTab } = useTabsOverride();
  const urlData = useMechanics(tabsState);
  const memoizedArea = useMemo(() => {
    const Component = TAB_TO_AREA_MAP[tabsState.selectedIndex];
    return <Component currentUser={currentUser} railsContext={railsContext} urlData={urlData} />;
  }, [tabsState.selectedIndex, currentUser, railsContext, urlData]);
  return (
    <Container>
      <TabsContainer>
        <Tabs selectedIndex={tabsState.selectedIndex} tabList={["Goals", "About", "Support"]} onClick={changeTab} />
      </TabsContainer>
      <AreaContainer>{memoizedArea}</AreaContainer>
    </Container>
  );
};
