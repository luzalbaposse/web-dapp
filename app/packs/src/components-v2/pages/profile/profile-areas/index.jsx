import React from "react";
import { TabsContainer, Container, AreaContainer } from "./styled";
import { Tabs, useTabs } from "@talentprotocol/design-system";
import { Goals } from "./goals";
import { About } from "./about";
import { Support } from "./support";
import { useMemo } from "react";

const TAB_TO_AREA_MAP = {
  0: Goals,
  1: About,
  2: Support
};

export const ProfileAreas = () => {
  const tabsState = useTabs();
  const memoizedArea = useMemo(() => {
    const Component = TAB_TO_AREA_MAP[tabsState.selectedIndex];
    return <Component />;
  }, [tabsState.selectedIndex]);
  return (
    <Container>
      <TabsContainer>
        <Tabs
          selectedIndex={tabsState.selectedIndex}
          tabList={["Goals", "About", "Support"]}
          onClick={tabsState.selectElement}
        />
      </TabsContainer>
      <AreaContainer>{memoizedArea}</AreaContainer>
    </Container>
  );
};
