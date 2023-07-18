import React from "react";
import { PageContainer } from "./styled";
import { ProfileHeader } from "./profile-header";

export const ProfilePage = () => {
  return (
    <PageContainer>
      <ProfileHeader />
    </PageContainer>
  );
}

export default (props, railsContext) => {
  return () => <ProfilePage {...props} railsContext={railsContext} />;
};
