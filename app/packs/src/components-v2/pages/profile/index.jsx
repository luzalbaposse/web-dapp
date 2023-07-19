import React from "react";
import isMobile from "is-mobile";
import { PageContainer, DesktopPageContainer, DesktopColumn } from "./styled";
import { ProfileHeader } from "./profile-header";
import { ProfileAreas } from "./profile-areas";

export const ProfilePage = ({ isMobile }) => {
  return isMobile ? (
    <PageContainer>
      <ProfileHeader />
      <ProfileAreas />
    </PageContainer>
  ) : (
    <DesktopPageContainer>
      <DesktopColumn>
        <ProfileHeader />
      </DesktopColumn>
      <DesktopColumn>
        <ProfileAreas />
      </DesktopColumn>
      <DesktopColumn></DesktopColumn>
    </DesktopPageContainer>
  );
};

export default (props, railsContext) => {
  return () => <ProfilePage {...props} railsContext={railsContext} isMobile={isMobile()} />;
};
