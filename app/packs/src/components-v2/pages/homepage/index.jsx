import React, { useEffect } from "react";
import { TalentThemeProvider } from "@talentprotocol/design-system";
import { Container } from "./styled";
import { loggedInUserStore } from "src/contexts/state";
import { ActivityWidget } from "../../activity-widget";
import { QuickNavigator } from "../../quick-navigator";
import { GmHeader } from "../../gm-header";
import { CompleteProfileWidget } from "../../complete-profile-widget";
import { QuestsWidget } from "../../quests-widget";
import { MyWalletWidget } from "../../my-wallet-widget";
import { LeadderboradWidget } from "../../leadderboard-widget";

export const HomepagePage = ({}) => {
  const { currentUser, fetchCurrentUser } = loggedInUserStore();

  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser();
    }
  }, []);

  return (
    <TalentThemeProvider>
      <Container>
        <GmHeader profile={currentUser} />
        <CompleteProfileWidget />
        <QuestsWidget />
        <QuickNavigator />
        <MyWalletWidget />
        <ActivityWidget />
        <LeadderboradWidget />
      </Container>
    </TalentThemeProvider>
  );
};

export default (props, railsContext) => {
  return () => <HomepagePage {...props} railsContext={railsContext} />;
};
