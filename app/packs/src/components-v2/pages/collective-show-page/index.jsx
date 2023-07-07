import { Spinner, Tabs, TalentThemeProvider, useTabs } from "@talentprotocol/design-system";
import React, { useEffect, useMemo, useState } from "react";
import { Activity } from "./tabs/activity";
import { camelCaseObject } from "src/utils/transformObjects";
import { Container, Divider, SpinnerContainer, TabsContainer } from "./styled";
import { loggedInUserStore } from "src/contexts/state";
import { Members } from "./tabs/members";
import { organizations } from "../../../api/organizations";
import Overview from "./overview";
import ThemeContainer from "src/contexts/ThemeContext";

const TAB_LIST = ["Activity", "Members"];

const TAB_NAME_TO_INDEX = {
  activity: 0,
  members: 1
};

export const CollectiveShowPage = ({}) => {
  const { currentUser, fetchCurrentUser } = loggedInUserStore();

  const [collective, setCollective] = useState(null);
  const [loading, setLoading] = useState(true);

  const tabState = useTabs();

  useEffect(() => {
    if (!currentUser) fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const id = window.location.pathname.split("/").reverse()[0];

    organizations
      .getOrganization(id)
      .then(({ data }) => {
        if (data.organization) {
          setCollective({ ...camelCaseObject(data.organization) });
          setLoading(false);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const url = new URL(document.location);
    const tab = url.searchParams.get("tab") || "";

    if (tab) tabState.selectElement(TAB_NAME_TO_INDEX[tab]);
  }, []);

  const onClick = index => {
    const tab = Object.keys(TAB_NAME_TO_INDEX).find(key => TAB_NAME_TO_INDEX[key] === index);
    const url = new URL(document.location);
    url.searchParams.set("tab", tab);
    history.pushState({}, "", url);
    tabState.selectElement(TAB_NAME_TO_INDEX[tab]);
  };

  const RenderedTab = useMemo(() => {
    if (!collective) return;

    switch (tabState.selectedIndex) {
      case 0:
        return <Activity currentUser={currentUser} organization={collective.slug} />;
      case 1:
        return <Members currentUser={currentUser} members={collective.users} />;
    }
  }, [collective, tabState.selectedIndex]);

  if (loading || !collective) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  return (
    <Container>
      <Overview collective={collective} />
      <Divider className="divider" />
      <TabsContainer>
        <Tabs onClick={onClick} selectedIndex={tabState.selectedIndex} tabList={TAB_LIST} />
      </TabsContainer>
      {RenderedTab}
    </Container>
  );
};

export default (props, railsContext) => {
  return () => (
    <TalentThemeProvider>
      <ThemeContainer>
        <CollectiveShowPage {...props} railsContext={railsContext} />
      </ThemeContainer>
    </TalentThemeProvider>
  );
};
