import React, { useCallback, useEffect, useState } from "react";
import { Button, Icon, Spinner, Typography } from "@talentprotocol/design-system";
import { talentsService } from "src/api";
import { Container, Divider, SpinnerContainer, ButtonContainer, EmptyStateContainer } from "./styled";
import { AboutMe } from "./about-me";
import { CurrentRole } from "./current-role";
import { Tags } from "./tags";
import { OnTheWeb } from "./on-the-web";
import { SupportData } from "./support-data";
import EditAboutModal from "src/components/profile/edit/EditAboutModal";

const isProfileEmpty = aboutData =>
  !(
    aboutData.about ||
    aboutData.current_position ||
    aboutData.tags.length ||
    aboutData.social_links.some(linkObject => !!linkObject.link)
  );

export const About = ({ currentUser, urlData }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [aboutData, setAboutData] = useState(null);
  const [supportData, setSupportData] = useState(null);

  const closeEditModal = useCallback(() => {
    setIsEditModalOpen(false);
  }, []);
  const openEditModal = useCallback(() => {
    setIsEditModalOpen(true);
  }, []);

  useEffect(() => {
    if (!urlData.profileUsername) return;
    talentsService.getAbout(urlData.profileUsername).then(({ data }) => {
      setAboutData(data.talent);
    });
  }, []);

  useEffect(() => {
    if (!urlData.profileUsername) return;
    talentsService.getSupportData(urlData.profileUsername).then(({ data }) => {
      setSupportData(data.talent);
    });
  }, []);

  return !aboutData ? (
    <SpinnerContainer>
      <Spinner color="primary" size={48} />
    </SpinnerContainer>
  ) : (
    <Container>
      {isProfileEmpty(aboutData) ? (
        <EmptyStateContainer>
          <Icon name="binoculars" size={64} color="primary04" />
          <Typography specs={{ type: "regular", variant: "p1" }} color="primary04">
            Currently a blank slate, but soon to be filled with adventures, thoughts, and all things.
          </Typography>
        </EmptyStateContainer>
      ) : (
        <>
          {aboutData.about && <AboutMe pitch={aboutData.about} />}
          <CurrentRole
            position={aboutData.current_position}
            username={urlData.profileUsername}
            isOwner={urlData?.profileUsername === currentUser?.username}
          />
          {!!aboutData.tags.length && <Tags tags={aboutData.tags} />}
          <OnTheWeb links={aboutData.social_links} />
        </>
      )}
      <Divider />
      <SupportData {...supportData} />
      <EditAboutModal
        show={isEditModalOpen}
        hide={closeEditModal}
        setProfile={() => {
          window.location.reload();
        }}
        username={urlData.profileUsername}
      />
    </Container>
  );
};
