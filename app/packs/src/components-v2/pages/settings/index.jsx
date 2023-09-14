import React, { useEffect, useMemo, useState } from "react";
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
import { DiscardModal } from "./discard-modal";

export const SettingsPage = ({ isMobile }) => {
  const urlData = useUrlData();
  const { profile, fetchEditProfileInfo } = useEditProfileStore();
  const nav = useCustomNavigation(urlData.tab, isMobile);
  const [isDirty, setIsDirty] = useState(false);
  const [nextTab, setNextTab] = useState("");
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);

  const content = useMemo(() => {
    switch (nav.page) {
      case "Profile":
        return <ProfileForm setIsDirty={setIsDirty} />;
      case "Experience":
        return <ExperienceForm username={urlData.profileUsername} setIsDirty={setIsDirty} />;
      case "About":
        return <AboutForm setIsDirty={setIsDirty} />;
      case "Account":
      default:
        return <AccountForm setIsDirty={setIsDirty} />;
      // case "Notifications":
      //   return <NotificationsForm />;
    }
  }, [nav.page]);
  useEffect(() => {
    if (!profile && urlData.profileUsername) {
      fetchEditProfileInfo(urlData.profileUsername);
    }
  }, [urlData]);

  const changeTab = tab => {
    if (isDirty) {
      setIsDiscardModalOpen(true);
      setNextTab(tab);
    } else {
      nav.goToPage(tab);
    }
  };

  const discardChangesCallback = () => {
    setIsDirty(false);
    nav.goToPage(nextTab);
  };

  return (
    <>
      {isMobile ? (
        <PageContainer>
          <LocalHeaderMobile
            username={urlData.profileUsername}
            goToPage={changeTab}
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
              <NavLinks goToPage={changeTab} page={nav.page} />
            </DesktopColumn>
            <DesktopColumn>{content}</DesktopColumn>
            <DesktopColumn></DesktopColumn>
          </DesktopPageContainer>
        </>
      )}
      <DiscardModal
        isOpen={isDiscardModalOpen}
        setIsDiscardModalOpen={setIsDiscardModalOpen}
        callBack={discardChangesCallback}
      />
      ;
    </>
  );
};

export default (props, railsContext) => {
  return () => <SettingsPage {...props} railsContext={railsContext} isMobile={isMobile()} />;
};
