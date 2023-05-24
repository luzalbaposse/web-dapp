import React, { useEffect } from "react";
import { TalentThemeProvider } from "@talentprotocol/design-system";
import { Connections } from "../../connections";
import { Container } from "./styled";
import { loggedInUserStore } from "src/contexts/state";
import { useWindowDimensionsHook } from "src/utils/window";

export const ConnectionsPage = ({ railsContext }) => {
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
        <Connections currentUserId={currentUser?.id} mobile={mobile} railsContext={railsContext} />
      </Container>
    </TalentThemeProvider>
  );
};

export default (props, railsContext) => {
  return () => <ConnectionsPage {...props} railsContext={railsContext} />;
};
