import React, { useEffect, useMemo } from "react";
import isMobile from "is-mobile";
import { useEditProfileStore } from "src/contexts/state";
import { DesktopColumn, DesktopPageContainer, PageContainer } from "src/components-v2/styled-containers";
import { useUrlData } from "src/components-v2/shared-hooks/use-url-data";
import { LocalHeader } from "./local-header";
import { useCustomNavigation } from "./use-custom-navigation";
import { NavLinks } from "./nav-links";
import { ProfileForm } from "./profile";
import { ExperienceForm } from "./experience";
import { AboutForm } from "./about";
// import { NotificationsForm } from "./notifications";
import { AccountForm } from "./account";
import { LocalHeaderMobile } from "./local-header-mobile";

export const SettingsPage = ({ isMobile }) => {
  const urlData = useUrlData();
  const { profile, fetchEditProfileInfo } = useEditProfileStore();
  const nav = useCustomNavigation(urlData.tab, isMobile);

  const content = useMemo(() => {
    switch (nav.page) {
      case "Profile":
        return <ProfileForm />;
      case "Experience":
        return <ExperienceForm username={urlData.profileUsername} />;
      case "About":
        return <AboutForm />;
      case "Account":
      default:
        return <AccountForm />;
      // case "Notifications":
      //   return <NotificationsForm />;
    }
  }, [nav.page]);
  useEffect(() => {
    if (!profile && urlData.profileUsername) {
      fetchEditProfileInfo(urlData.profileUsername);
    }
  }, [urlData]);

  return isMobile ? (
    <PageContainer>
      <LocalHeaderMobile
        username={urlData.profileUsername}
        goToPage={nav.goToPage}
        openHamburguer={nav.openHamburguer}
        isHamburguerOpen={nav.isHamburguerOpen}
        page={nav.page}
      />
      {content}
    </PageContainer>
  ) : (
    <>
      <LocalHeader username={urlData.profileUsername} />
      <DesktopPageContainer>
        <DesktopColumn>
          <NavLinks goToPage={nav.goToPage} page={nav.page} />
        </DesktopColumn>
        <DesktopColumn>{content}</DesktopColumn>
        <DesktopColumn></DesktopColumn>
      </DesktopPageContainer>
    </>
  );
};

export default (props, railsContext) => {
  return () => <SettingsPage {...props} railsContext={railsContext} isMobile={isMobile()} />;
};
