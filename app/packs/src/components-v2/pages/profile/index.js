import React from "react";
import isMobile from "is-mobile";
import { PageContainer, DesktopPageContainer, DesktopColumn } from "./styled";
import { ProfileHeader } from "./profile-header";

export const ProfilePage = ({ isMobile }) => {
  return isMobile ? (
    <PageContainer>
      <ProfileHeader />
    </PageContainer>
  ) : (
    <DesktopPageContainer>
      <DesktopColumn>
        <ProfileHeader />
      </DesktopColumn>
      <DesktopColumn>

      </DesktopColumn>
      <DesktopColumn>

      </DesktopColumn>
    </DesktopPageContainer>
  )
}

export default (props, railsContext) => {
  return () => <ProfilePage {...props} railsContext={railsContext} isMobile={isMobile()} />;
};
