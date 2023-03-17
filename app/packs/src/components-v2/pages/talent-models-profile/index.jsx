import React, { useEffect, useState } from "react";
import { Spinner, TalentThemeProvider } from "@talentprotocol/design-system";
import { Container } from "./styled";
import { ProfileHeader } from "./profile-header";
import { Models } from "./models";
import { SupportedBy } from "./supported-by";
import { FinalHero } from "./final-hero";
import { CareerUpdates } from "./career-updates";
import { useProfileFetcher } from "../../../hooks/use-profile-fetcher";

export const TalentModelsProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { profile, fetchProfile } = useProfileFetcher();
  useEffect(() => {
    if (typeof window === "undefined") return;
    const username = window.location.href.split("/u/")[1];
    fetchProfile(username).then(() => setIsLoading(false));
  }, [fetchProfile]);
  return (
    <TalentThemeProvider>
      <Container isLoading={isLoading}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <ProfileHeader profile={profile} />
            <Models />
            <SupportedBy profile={profile} />
            <CareerUpdates profile={profile} />
            <FinalHero profile={profile} />
          </>
        )}
      </Container>
    </TalentThemeProvider>
  );
};

export default (props, railsContext) => {
  return () => <TalentModelsProfilePage {...props} railsContext={railsContext} />;
};
