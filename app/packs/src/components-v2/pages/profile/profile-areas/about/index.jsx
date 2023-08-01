import React, { useEffect, useState } from "react";
import { Spinner } from "@talentprotocol/design-system";
import OldAbout from "../../../../../components/profile/About";
import OldJourney from "../../../../../components/profile/Journey";
import Connections from "src/components/profile/Connections";
import { talentsService } from "src/api";
import { Container, SpinnerContainer } from "./styled";

export const About = ({ currentUser, urlData }) => {
  const [aboutData, setAboutData] = useState(null);
  const [supportData, setSupportData] = useState(null);

  useEffect(() => {
    if (!urlData.profileUsername) return;
    talentsService.getAbout(urlData.profileUsername).then(({ data }) => {
      setAboutData(data.talent);
    });
  }, []);

  console.log("aboutData", aboutData);

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
      <OldAbout profile={aboutData} />
      <OldJourney talent={aboutData} canUpdate={aboutData?.username === currentUser?.username} />
      {!!currentUser?.id && <Connections userId={aboutData?.username} talent={supportData} canUpdate={false} />}
    </Container>
  );
};
