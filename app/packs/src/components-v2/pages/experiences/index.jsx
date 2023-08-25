import React, { useEffect } from "react";
import isMobile from "is-mobile";
import { loggedInUserStore } from "src/contexts/state";
import { DesktopColumn, DesktopPageContainer, PageContainer } from "src/components-v2/styled-containers";
import { useUrlData } from "src/components-v2/shared-hooks/use-url-data";
import { LocalHeader } from "./local-header";
import { ExperiencesComponent } from "../../experiences-component";

export const ExperiencesPage = ({ isMobile }) => {
  const { currentUser, fetchCurrentUser } = loggedInUserStore();
  const urlData = useUrlData();
  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser();
    }
  }, []);

  return isMobile ? (
    <PageContainer>
      <LocalHeader username={urlData.profileUsername} />
      <ExperiencesComponent username={urlData.profileUsername} />
    </PageContainer>
  ) : (
    <>
      <LocalHeader username={urlData.profileUsername} />
      <DesktopPageContainer>
        <DesktopColumn></DesktopColumn>
        <DesktopColumn>
          <ExperiencesComponent username={urlData.profileUsername} />
        </DesktopColumn>
        <DesktopColumn></DesktopColumn>
      </DesktopPageContainer>
    </>
  );
};

export default (props, railsContext) => {
  return () => <ExperiencesPage {...props} railsContext={railsContext} isMobile={isMobile()} />;
};
