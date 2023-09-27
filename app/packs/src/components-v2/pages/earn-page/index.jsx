import React, { useEffect, useMemo } from "react";
import { Tabs, TalentThemeProvider, useTabs } from "@talentprotocol/design-system";
import { Container } from "./styled";
import { ScoreBoard } from "./score-board";
import { Quests } from "./quests";
import { Invites } from "./invites";
import { loggedInUserStore } from "src/contexts/state";
import { Rewards } from "./rewards";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
    component: Rewards,
    tabName: "Rewards"
  }
};

// Create a client
const queryClient = new QueryClient();

export const EarnPage = props => {
  const { currentUser, fetchCurrentUser } = loggedInUserStore();
  const tabNames = useMemo(() => Object.values(TAB_MAP).map(({ tabName }) => tabName), []);
  const tabsState = useTabs();
  const railsContext = props.railsContext;

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
    return <Component profile={currentUser} railsContext={railsContext} />;
  }, [tabsState.selectedIndex, currentUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <TalentThemeProvider>
        <Container>
          <ScoreBoard points={currentUser?.experience_points_amount}>
            <Tabs
              tabList={tabNames}
              selectedIndex={tabsState.selectedIndex}
              onClick={tabsState.selectElement}
              disabledList={[false, false, false]}
            />
          </ScoreBoard>
          {memoedComponent}
        </Container>
      </TalentThemeProvider>
    </QueryClientProvider>
  );
};

export default (props, railsContext) => {
  return () => <EarnPage {...props} railsContext={railsContext} />;
};
