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
    aboutData.career_goal.pitch &&
    aboutData.current_position &&
    aboutData.tags.length &&
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
      {urlData?.profileUsername === currentUser?.username && (
        <ButtonContainer>
          <Button
            text="Edit"
            hierarchy="secondary"
            size="small"
            iconColor="primary01"
            leftIcon="edit"
            onClick={openEditModal}
          />
        </ButtonContainer>
      )}
      {isProfileEmpty(aboutData) && (
        <EmptyStateContainer>
          <Icon name="binoculars" size={64} color="primary04" />
          <Typography specs={{ type: "regular", variant: "p1" }} color="primary04">
            Currently a blank slate, but soon to be filled with adventures, thoughts, and all things. 
          </Typography>
        </EmptyStateContainer>
      )}
      {aboutData.career_goal.pitch && <AboutMe pitch={aboutData.career_goal.pitch} />}
      {aboutData.current_position && (
        <CurrentRole position={aboutData.current_position} username={urlData.profileUsername} />
      )}
      {aboutData.tags.length && <Tags tags={aboutData.tags} />}
      <OnTheWeb links={aboutData.social_links} />
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
