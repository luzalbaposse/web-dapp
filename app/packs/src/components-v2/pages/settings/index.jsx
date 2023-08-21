import React, { useEffect } from "react";
import isMobile from "is-mobile";
import { TalentThemeProvider } from "@talentprotocol/design-system";
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

  return isMobile ? (
    <PageContainer>
      <LocalHeader isOwner={currentUser?.username === urlData.profileUsername} username={urlData.profileUsername} />
      <Experiences username={urlData.profileUsername} />
    </PageContainer>
  ) : (
    <>
      <LocalHeader isOwner={currentUser?.username === urlData.profileUsername} username={urlData.profileUsername} />
      <DesktopPageContainer>
        <DesktopColumn></DesktopColumn>
        <DesktopColumn>
          <Experiences username={urlData.profileUsername} />
        </DesktopColumn>
        <DesktopColumn></DesktopColumn>
      </DesktopPageContainer>
    </>
  );
};

export default (props, railsContext) => {
  return () => (
    <TalentThemeProvider>
      <SettingsPage {...props} railsContext={railsContext} isMobile={isMobile()} />
    </TalentThemeProvider>
  );
};
