import React, { useEffect } from "react";
import isMobile from "is-mobile";
import { loggedInUserStore } from "src/contexts/state";
import { DesktopColumn, DesktopPageContainer, PageContainer } from "src/components-v2/styled-containers";
import { useUrlData } from "src/components-v2/shared-hooks/use-url-data";
import { LocalHeader } from "./local-header";
import { Experiences } from "./experiences";

export const SettingsPage = ({ isMobile }) => {
  const { currentUser, fetchCurrentUser } = loggedInUserStore();
  const urlData = useUrlData();
  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser();
    }
  }, []);
  const isOwner = currentUser?.username === urlData.profileUsername;

  return isMobile ? (
    <PageContainer>
      <LocalHeader isOwner={isOwner} username={urlData.profileUsername} />
      <Experiences username={urlData.profileUsername} isOwner={isOwner} />
    </PageContainer>
  ) : (
    <>
      <LocalHeader isOwner={isOwner} username={urlData.profileUsername} />
      <DesktopPageContainer>
        <DesktopColumn></DesktopColumn>
        <DesktopColumn>
          <Experiences username={urlData.profileUsername} isOwner={isOwner} />
        </DesktopColumn>
        <DesktopColumn></DesktopColumn>
      </DesktopPageContainer>
    </>
  );
};

export default (props, railsContext) => {
  return () => <SettingsPage {...props} railsContext={railsContext} isMobile={isMobile()} />;
};
