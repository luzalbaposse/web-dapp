import React from "react";
import isMobile from "is-mobile";
import { PageContainer, DesktopPageContainer, DesktopColumn } from "./styled";
import { ProfileHeader } from "./profile-header";
import { ProfileAreas } from "./profile-areas";
import { loggedInUserStore } from "src/contexts/state";
import { useEffect } from "react";

export const ProfilePage = ({ isMobile }) => {
  const { currentUser, fetchCurrentUser } = loggedInUserStore();

  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser();
    }
  }, []);

  return isMobile ? (
    <PageContainer>
      <ProfileHeader />
      <ProfileAreas currentUser={currentUser} />
    </PageContainer>
  ) : (
    <DesktopPageContainer>
      <DesktopColumn>
        <ProfileHeader />
      </DesktopColumn>
      <DesktopColumn>
        <ProfileAreas currentUser={currentUser} />
      </DesktopColumn>
      <DesktopColumn></DesktopColumn>
    </DesktopPageContainer>
  );
};

export default (props, railsContext) => {
  return () => <ProfilePage {...props} railsContext={railsContext} isMobile={isMobile()} />;
};
