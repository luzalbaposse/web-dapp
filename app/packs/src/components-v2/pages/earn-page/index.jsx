import React, { useEffect, useMemo } from "react";
import { Tabs, TalentThemeProvider, useTabs } from "@talentprotocol/design-system";
import { Container } from "./styled";
import { ScoreBoard } from "./score-board";
import { Quests } from "./quests";
import { Invites } from "./invites";
import { loggedInUserStore } from "src/contexts/state";
import { Leaderboard } from "./leaderboard";
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
  },
  3: {
    component: Leaderboard,
    tabName: "Leaderboard"
  }
};

export const EarnPage = ({ railsContext }) => {
  const { currentUser, fetchCurrentUser } = loggedInUserStore();
  const tabNames = useMemo(() => Object.values(TAB_MAP).map(({ tabName }) => tabName), []);
  const tabsState = useTabs();

  // Create a client
  const queryClient = new QueryClient();

  useEffect(() => {
    const url = new URL(window.location.href);
    const match = Object.entries(TAB_MAP).find(
      entry => entry[1].tabName.toLocaleLowerCase() === url.searchParams.get("tab")?.toLocaleLowerCase()
    );
    if (match) {
      tabsState.selectElement(match[0]);
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
            <Tabs tabList={tabNames} selectedIndex={tabsState.selectedIndex} onClick={tabsState.selectElement} />
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
