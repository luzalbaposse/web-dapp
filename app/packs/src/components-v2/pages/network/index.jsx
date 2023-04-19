import React, { useEffect } from "react";
import { TalentThemeProvider } from "@talentprotocol/design-system";
import { Network } from "../../network";
import { Container } from "./styled";
import { loggedInUserStore } from "src/contexts/state";
import { useWindowDimensionsHook } from "src/utils/window";

export const NetworkPage = ({ railsContext }) => {
  const { currentUser, fetchCurrentUser } = loggedInUserStore();
  const { mobile } = useWindowDimensionsHook(false);

  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser();
    }
  }, []);

  return (
    <TalentThemeProvider>
      <Container>
        <Network currentUserId={currentUser?.id} mobile={mobile} railsContext={railsContext} />
      </Container>
    </TalentThemeProvider>
  );
};

export default (props, railsContext) => {
  return () => <NetworkPage {...props} railsContext={railsContext} />;
};
