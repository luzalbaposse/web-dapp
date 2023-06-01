import React, { useEffect, useMemo } from "react";
import { Tabs, TalentThemeProvider, useTabs } from "@talentprotocol/design-system";
import { Container } from "./styled";
import { ScoreBoard } from "./score-board";
import { Quests } from "./quests";
import { Invites } from "./invites";
import { loggedInUserStore } from "src/contexts/state";

const TAB_MAP = {
  0: {
    component: Quests,
    tabName: "Quests"
  },
  1: {
    component: Invites,
    tabName: "Invites"
  },
  2: {
    component: React.Fragment,
    tabName: "Rewards"
  }
};

const EarnPage = () => {
  const { currentUser, fetchCurrentUser } = loggedInUserStore();
  const tabNames = useMemo(() => Object.values(TAB_MAP).map(({ tabName }) => tabName), []);
  const tabsState = useTabs();
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("tab")?.toLocaleLowerCase() === TAB_MAP[1].tabName.toLocaleLowerCase()) {
      tabsState.selectElement(1);
    }
    if (!currentUser) {
      fetchCurrentUser();
    }
  }, []);
  const memoedComponent = useMemo(() => {
    const Component = TAB_MAP[tabsState.selectedIndex].component;
    return <Component profile={currentUser} />;
  }, [tabsState.selectedIndex, currentUser]);
  return (
    <TalentThemeProvider>
      <Container>
        <ScoreBoard points={currentUser?.experience_points_amount}>
          <Tabs
            tabList={tabNames}
            selectedIndex={tabsState.selectedIndex}
            onClick={tabsState.selectElement}
            disabledList={[false, false, true]}
          />
        </ScoreBoard>
        {memoedComponent}
      </Container>
    </TalentThemeProvider>
  );
};

export default EarnPage;
