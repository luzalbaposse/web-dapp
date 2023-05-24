import React, { useMemo, useEffect } from "react";
import { Tabs, useTabs } from "@talentprotocol/design-system";
import { Subscribers } from "./tabs/subscribers";
import { Container, TabsContainer } from "./styled";
import { Sponsors } from "./tabs/sponsors";
import { Sponsorships } from "./tabs/sponsorships";

const tabs = ["Subscribers", "Sponsors", "Sponsorships"];

const TAB_INDEX_TO_COMPONENT_MAP = {
  0: Subscribers,
  1: Sponsors,
  2: Sponsorships
};

const TAB_NAME_TO_INDEX = {
  subscribers: 0,
  sponsors: 1,
  sponsorships: 2
};

const TAB_INDEX_TO_NAME = {
  0: "subscribers",
  1: "sponsors",
  2: "sponsorships"
};

export const Connections = ({ currentUserId, railsContext }) => {
  const tabState = useTabs();

  useEffect(() => {
    const url = new URL(document.location);
    const tab = url.searchParams.get("tab") || "";
    if (tab) {
      tabState.selectElement(TAB_NAME_TO_INDEX[tab]);
    }
  }, []);

  const changeTab = index => {
    const url = new URL(document.location);
    const tab = TAB_INDEX_TO_NAME[index].toLowerCase();
    url.searchParams.set("tab", tab);
    history.pushState({}, "", url);
    tabState.selectElement(TAB_NAME_TO_INDEX[tab]);
  };

  const RenderedTab = useMemo(() => {
    const TabComponent = TAB_INDEX_TO_COMPONENT_MAP[tabState.selectedIndex];
    return <TabComponent currentUserId={currentUserId} railsContext={railsContext} />;
  }, [tabState.selectedIndex, currentUserId]);
  return (
    <Container>
      <TabsContainer>
        <Tabs
          selectedIndex={tabState.selectedIndex}
          onClick={changeTab}
          tabList={tabs}
          disabledList={[false, false, false]}
        />
      </TabsContainer>
      {RenderedTab}
    </Container>
  );
};
