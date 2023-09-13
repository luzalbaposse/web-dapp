import React, { useEffect } from "react";
import { TalentThemeProvider } from "@talentprotocol/design-system";
import { Column, Container, GMContainer } from "./styled";
import { loggedInUserStore } from "src/contexts/state";
import { ActivityWall } from "../../activity-wall";
import { QuickNavigator } from "../../quick-navigator";
import { GmHeader } from "../../gm-header";
import { CompleteProfileWidget } from "../../complete-profile-widget";
import { LeaderboardWidget } from "../../leaderboard-widget";
import { RecommendedBuildersWidget } from "../../recommended-builders-widget";
import { RecommendedTeamsWidget } from "../../recommended-teams-widget";
import { useWindowDimensionsHook } from "src/utils/window";
import { QuestsWidget } from "../../quests-widget";

export const HomepagePage = props => {
  const { mobile } = useWindowDimensionsHook();
  const { currentUser, fetchCurrentUser } = loggedInUserStore();
  const railsContext = props.railsContext;
  const ellipsisAt = mobile ? 300 : 350;

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
        {mobile ? (
          <Column>
            <CompleteProfileWidget user={currentUser} />
            {currentUser?.profile_completed && <QuestsWidget profile={currentUser} railsContext={railsContext} />}
            <QuickNavigator username={currentUser?.username} />
            <RecommendedBuildersWidget username={currentUser?.username} ellipsisAt={ellipsisAt} />
            <RecommendedTeamsWidget ellipsisAt={ellipsisAt} />
            <LeaderboardWidget user={currentUser} />
            <ActivityWall profile={currentUser} />
          </Column>
        ) : (
          <>
            <Column grows>
              <CompleteProfileWidget user={currentUser} />
              <QuickNavigator username={currentUser?.username} />
              {currentUser?.profile_completed && <QuestsWidget profile={currentUser} railsContext={railsContext} />}
              <ActivityWall profile={currentUser} />
            </Column>
            <Column>
              <RecommendedBuildersWidget username={currentUser?.username} ellipsisAt={ellipsisAt} />
              <RecommendedTeamsWidget ellipsisAt={ellipsisAt} />
              <LeaderboardWidget user={currentUser} />
            </Column>
          </>
        )}
      </Container>
    </TalentThemeProvider>
  );
};

export default (props, railsContext) => {
  return () => <HomepagePage {...props} railsContext={railsContext} />;
};
