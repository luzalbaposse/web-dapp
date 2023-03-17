import React from "react";
import { TalentThemeProvider } from "@talentprotocol/design-system";
import {
  Container,
} from "./styled";
import { ProfileHeader } from "./profile-header";
import { Models } from "./models";
import { SupportedBy } from "./supported-by";
import { FinalHero } from "./final-hero";

export const TalentModelsProfilePage = () => {
  return (
    <TalentThemeProvider>
      <Container>
        <ProfileHeader />
        <Models />
        <SupportedBy />
        <FinalHero />
      </Container>
    </TalentThemeProvider>
  );
};

export default (props, railsContext) => {
  return () => (
    <TalentModelsProfilePage {...props} railsContext={railsContext} />
  );
};
