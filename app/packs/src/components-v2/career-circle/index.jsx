import React, { useMemo } from "react";
import { Tabs, useTabs } from "@talentprotocol/design-system";
import { Subscribers } from "./tabs/subscribers";
import { Container, TabsContainer } from "./styled";
import { Sponsors } from "./tabs/sponsors";

const tabs = ["Subscribers", "Sponsors [Soon]"];

const TAB_INDEX_TO_COMPONENT_MAP = {
  0: Subscribers,
  1: Sponsors
};

export const CareerCircle = ({ currentUserId, railsContext }) => {
  const tabState = useTabs();
  const RenderedTab = useMemo(() => {
    const TabComponent = TAB_INDEX_TO_COMPONENT_MAP[tabState.selectedIndex];
    if (tabState.selectedIndex === 1) {
      return <></>;
    }
    return <TabComponent currentUserId={currentUserId} railsContext={railsContext} />;
  }, [tabState.selectedIndex, currentUserId]);
  return (
    <Container>
      <TabsContainer>
        <Tabs
          selectedIndex={tabState.selectedIndex}
          onClick={tabState.selectElement}
          tabList={tabs}
          disabledList={[false, true]}
        />
      </TabsContainer>
      {RenderedTab}
    </Container>
  );
};
