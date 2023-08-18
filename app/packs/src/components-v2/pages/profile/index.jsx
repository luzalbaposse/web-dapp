import React, { useEffect } from "react";
import isMobile from "is-mobile";
import { TalentThemeProvider } from "@talentprotocol/design-system";
import { PageContainer, DesktopPageContainer, DesktopColumn } from "./styled";
import { ProfileHeader } from "./profile-header";
import { ProfileAreas } from "./profile-areas";
import { loggedInUserStore } from "src/contexts/state";
import { useUrlData } from "./hooks/use-url-data";
import { RecommendedBuildersWidget } from "../../recommended-builders-widget";
import { RecommendedTeamsWidget } from "../../recommended-teams-widget";
import ThemeContainer from "src/contexts/ThemeContext";

const ELLIPSIS_AT = 175;

export const ProfilePage = ({ isMobile, railsContext, withPersonaRequest }) => {
  const { currentUser, fetchCurrentUser } = loggedInUserStore();
  const urlData = useUrlData();
  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser();
    }
  }, []);

  return isMobile ? (
    <PageContainer>
      <ProfileHeader
        currentUser={currentUser}
        urlData={urlData}
        railsContext={railsContext}
        isMobile
        withPersonaRequest={withPersonaRequest}
      />
      <ProfileAreas currentUser={currentUser} railsContext={railsContext} urlData={urlData} />
    </PageContainer>
  ) : (
    <DesktopPageContainer>
      <DesktopColumn>
        <ProfileHeader
          currentUser={currentUser}
          urlData={urlData}
          railsContext={railsContext}
          withPersonaRequest={withPersonaRequest}
        />
      </DesktopColumn>
      <DesktopColumn>
        <ProfileAreas currentUser={currentUser} railsContext={railsContext} urlData={urlData} />
      </DesktopColumn>
      <DesktopColumn>
        <RecommendedBuildersWidget username={currentUser?.username} ellipsisAt={ELLIPSIS_AT} />
        <RecommendedTeamsWidget ellipsisAt={ELLIPSIS_AT} />
      </DesktopColumn>
    </DesktopPageContainer>
  );
};

export default (props, railsContext) => {
  return () => (
    <ThemeContainer>
      <TalentThemeProvider>
        <ProfilePage {...props} railsContext={railsContext} isMobile={isMobile()} />
      </TalentThemeProvider>
    </ThemeContainer>
  );
};
