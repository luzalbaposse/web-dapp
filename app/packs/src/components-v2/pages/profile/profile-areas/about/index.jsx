import React, { useEffect, useState } from "react";
import { Spinner } from "@talentprotocol/design-system";
import { talentsService } from "src/api";
import { Container, Divider, SpinnerContainer } from "./styled";
import { AboutMe } from "./about-me";
import { CurrentRole } from "./current-role";
import { Tags } from "./tags";
import { OnTheWeb } from "./on-the-web";
import { SupportData } from "./support-data";

export const About = ({ currentUser, urlData }) => {
  const [aboutData, setAboutData] = useState(null);
  const [supportData, setSupportData] = useState(null);

  // TODO: check support data

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
      <AboutMe />
      <CurrentRole />
      <Tags />
      <OnTheWeb />
      <Divider />
      <SupportData />
    </Container>
  );
};
