import React, { useEffect, useState } from "react";
import { Spinner, TalentThemeProvider } from "@talentprotocol/design-system";
import { Container, ContentDesktopRow } from "./styled";
import { ProfileHeader } from "./profile-header";
import { Models } from "./models";
import { SupportedBy } from "./supported-by";
import { FinalHero } from "./final-hero";
import { CareerUpdates } from "./career-updates";
import { useProfileFetcher } from "../../../hooks/use-profile-fetcher";
import { loggedInUserStore } from "src/contexts/state";

export const TalentModelsProfilePage = props => {
  const [isLoading, setIsLoading] = useState(true);
  const { profile, fetchProfile, setProfile } = useProfileFetcher();

  const { currentUser, fetchCurrentUser } = loggedInUserStore();

  const isCurrentUserProfile = currentUser?.id == profile?.user?.uuid;

  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser();
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const username = window.location.href.split("/u/")[1].split("/support")[0];
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
            <Models
              profile={profile}
              setProfile={setProfile}
              currentUserId={currentUser?.id}
              isCurrentUserProfile={isCurrentUserProfile}
              railsContext={props.railsContext}
            />
            <ContentDesktopRow hasSupporters={profile.supporters_count}>
              {profile.supporters_count > 0 && <SupportedBy profile={profile} />}
              <CareerUpdates
                profile={profile}
                setProfile={setProfile}
                isCurrentUserProfile={isCurrentUserProfile}
                railsContext={props.railsContext}
              />
            </ContentDesktopRow>
            <FinalHero
              profile={profile}
              isCurrentUserProfile={isCurrentUserProfile}
              railsContext={props.railsContext}
            />
          </>
        )}
      </Container>
    </TalentThemeProvider>
  );
};

export default (props, railsContext) => {
  return () => <TalentModelsProfilePage {...props} railsContext={railsContext} />;
};
