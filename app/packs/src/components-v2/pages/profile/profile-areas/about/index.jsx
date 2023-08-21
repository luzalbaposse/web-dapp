import React, { useCallback, useEffect, useState } from "react";
import { Button, Spinner } from "@talentprotocol/design-system";
import { talentsService } from "src/api";
import { Container, Divider, SpinnerContainer, ButtonContainer } from "./styled";
import { AboutMe } from "./about-me";
import { CurrentRole } from "./current-role";
import { Tags } from "./tags";
import { OnTheWeb } from "./on-the-web";
import { SupportData } from "./support-data";
import EditAboutModal from "src/components/profile/edit/EditAboutModal";

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
            text="Edit profile"
            hierarchy="secondary"
            size="small"
            iconColor="primary01"
            leftIcon="edit"
            onClick={openEditModal}
          />
        </ButtonContainer>
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
