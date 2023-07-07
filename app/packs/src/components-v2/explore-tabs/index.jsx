import { Tabs } from "@talentprotocol/design-system";
import React from "react";
import { Container, TabsContainer } from "./styled";

const INDEX_TO_PATH = {
  0: "/talent",
  1: "/collectives"
};

const TAB_LIST = ["Talent", "Collectives"];

const onClick = index => {
  window.location.href = INDEX_TO_PATH[index];
};

export const ExploreTabs = () => {
  const url = new URL(document.location);
  const selectedIndex = url.pathname.includes("/talent") ? 0 : 1;

  return (
    <Container>
      <TabsContainer>
        <Tabs onClick={onClick} selectedIndex={selectedIndex} tabList={TAB_LIST} />
      </TabsContainer>
    </Container>
  );
};
