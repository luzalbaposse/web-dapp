import React, { useEffect, useState } from "react";
import { Spinner } from "@talentprotocol/design-system";
import OldAbout from "../../../../../components/profile/About";
import OldJourney from "../../../../../components/profile/Journey";
import { Container, SpinnerContainer } from "./styled";
import { talentsService } from "src/api";

export const About = ({ currentUser, urlData }) => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    if (!urlData.profileUsername) return;
    talentsService.getAbout(urlData.profileUsername).then(({ data }) => {
      setAboutData(data.talent);
    });
  }, []);

  return !aboutData ? (
    <SpinnerContainer>
      <Spinner color="primary" size={48} />
    </SpinnerContainer>
  ) : (
    <Container>
      <OldAbout profile={aboutData} />
      <OldJourney talent={aboutData} canUpdate={aboutData.profileUsername === currentUser?.username} />
    </Container>
  );
};
