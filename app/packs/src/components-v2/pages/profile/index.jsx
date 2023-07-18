import React, { useEffect } from "react";
import isMobile from "is-mobile";
import { TalentThemeProvider } from "@talentprotocol/design-system";
import { PageContainer, DesktopPageContainer, DesktopColumn } from "./styled";
import { ProfileHeader } from "./profile-header";
import { ProfileAreas } from "./profile-areas";
import { loggedInUserStore } from "src/contexts/state";
import { useUrlData } from "./hooks/use-url-data";
import { RecommendedBuildersWidgetMini } from "../../recommended-builders-widget-mini";
import { RecommendedTeamsWidgetMini } from "../../recommended-teams-widget-mini";
import ThemeContainer from "src/contexts/ThemeContext";

export const ProfilePage = ({ isMobile, railsContext }) => {
  const { currentUser, fetchCurrentUser } = loggedInUserStore();
  const urlData = useUrlData();
  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser();
    }
  }, []);

  return isMobile ? (
    <PageContainer>
      <ProfileHeader currentUser={currentUser} urlData={urlData} />
      <ProfileAreas currentUser={currentUser} railsContext={railsContext} urlData={urlData} />
    </PageContainer>
  ) : (
    <DesktopPageContainer>
      <DesktopColumn>
        <ProfileHeader currentUser={currentUser} urlData={urlData} />
      </DesktopColumn>
      <DesktopColumn>
        <ProfileAreas currentUser={currentUser} railsContext={railsContext} urlData={urlData} />
      </DesktopColumn>
      <DesktopColumn>
        <RecommendedBuildersWidgetMini username={currentUser?.username} />
        <RecommendedTeamsWidgetMini />
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
