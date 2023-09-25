import { Tabs, TalentThemeProvider, useTabs } from "@talentprotocol/design-system";
import React, { useEffect, useMemo, useState } from "react";
import { Activity } from "./tabs/activity";
import { camelCaseObject } from "src/utils/transformObjects";
import { Container, Divider, TabsContainer } from "./styled";
import { loggedInUserStore } from "src/contexts/state";
import { Members } from "./tabs/members";
import Overview from "./overview";
import ThemeContainer from "src/contexts/ThemeContext";
import TextInput from "src/components/design_system/fields/textinput";
import { Search } from "src/components/icons";

const TAB_LIST = ["Members", "Activity"];
const ELECTION_TAB_LIST = ["Candidates"];

const TAB_NAME_TO_INDEX = {
  members: 0,
  activity: 1
};

const ELECTION_TAB_NAME_TO_INDEX = {
  candidates: 0,
  activity: 1
};

export const CollectiveShowPage = ({ organization, railsContext }) => {
  const { currentUser, fetchCurrentUser } = loggedInUserStore();
  const [keyword, setKeyword] = useState("");

  const collective = { ...camelCaseObject(organization) };

  const tabState = useTabs();

  useEffect(() => {
    if (!currentUser) fetchCurrentUser();
  }, []);

  const tabIndex = collective.election ? ELECTION_TAB_NAME_TO_INDEX : TAB_NAME_TO_INDEX;

  useEffect(() => {
    const url = new URL(document.location);
    const tab = url.searchParams.get("tab") || "";

    if (tab) tabState.selectElement(tabIndex[tab]);
  }, []);

  const onClick = index => {
    const tab = Object.keys(tabIndex).find(key => tabIndex[key] === index);
    const url = new URL(document.location);
    url.searchParams.set("tab", tab);
    history.pushState({}, "", url);
    tabState.selectElement(tabIndex[tab]);
  };

  const RenderedTab = useMemo(() => {
    if (!collective) return;

    switch (tabState.selectedIndex) {
      case 0:
        return (
          <Members
            currentUser={currentUser}
            members={collective.users}
            activeElection={collective.election}
            railsContext={railsContext}
            keyword={keyword}
          />
        );
      case 1:
        return <Activity currentUser={currentUser} organization={collective.slug} />;
    }
  }, [collective, tabState.selectedIndex]);

  const renderSearch = () => {
    if (!collective.election || tabState.selectedIndex !== 0) return <></>;

    return (
      <div className="position-relative">
        <TextInput
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="Search"
          inputClassName="pl-5"
          className="w-100"
        />
        <Search color="currentColor" className="position-absolute chat-search-icon" />
      </div>
    );
  };

  return (
    <Container>
      <Overview collective={collective} />
      <Divider className="divider" />
      <TabsContainer>
        <Tabs
          onClick={onClick}
          selectedIndex={tabState.selectedIndex}
          tabList={collective.election ? ELECTION_TAB_LIST : TAB_LIST}
        />
        {renderSearch()}
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
