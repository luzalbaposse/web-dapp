import React, { useEffect } from "react";
import { TalentThemeProvider } from "@talentprotocol/design-system";
import { Column, Container, GMContainer } from "./styled";
import { loggedInUserStore } from "src/contexts/state";
import { ActivityWidget } from "../../activity-widget";
import { QuickNavigator } from "../../quick-navigator";
import { GmHeader } from "../../gm-header";
import { CompleteProfileWidget } from "../../complete-profile-widget";
import { LeadderboardWidget } from "../../leadderboard-widget";
import { RecommendedBuildersWidget } from "../../recommended-builders-widget";
// import { RecommendedTeamsWidget } from "../../recommended-teams-widget";
// import { QuestsWidget } from "../../quests-widget";
// import { MyWalletWidget } from "../../my-wallet-widget";

export const HomepagePage = ({}) => {
  const { currentUser, fetchCurrentUser } = loggedInUserStore();

  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser();
    }
  }, []);

  return (
    <TalentThemeProvider>
      <GMContainer>
        <GmHeader profile={currentUser} />
      </GMContainer>
      <Container>
        <Column grows>
          <CompleteProfileWidget username={currentUser?.username} />
          <QuickNavigator username={currentUser?.username} />
          <ActivityWidget username={currentUser?.username} />
        </Column>
        <Column>
          <RecommendedBuildersWidget />
          <LeadderboardWidget username={currentUser?.username} />
        </Column>
      </Container>
    </TalentThemeProvider>
  );
};

export default (props, railsContext) => {
  return () => <HomepagePage {...props} railsContext={railsContext} />;
};
