import React from "react";
import { Tabs, TextLink, Typography, useTabs } from "@talentprotocol/design-system";
import { Container, TabsContainer, TitleRow, UpdatesContainer } from "./styled";
//import { CareerUpdate } from "../career-update";

const ACTIVITY_TABS = ["Highlights", "Following"];

export const ActivityWidget = () => {
  const tabState = useTabs();
  return (
    <Container>
      <TitleRow>
        <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
          Activity
        </Typography>
        <TextLink color="primary" text="Read all" rightIcon="carret" href="/" size="medium" />
      </TitleRow>
      <TabsContainer>
        <Tabs tabList={ACTIVITY_TABS} selectedIndex={tabState.selectedIndex} onClick={tabState.selectElement} />
      </TabsContainer>
      <UpdatesContainer></UpdatesContainer>
    </Container>
  );
};
