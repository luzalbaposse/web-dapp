import React, { useEffect } from "react";
import { TalentThemeProvider } from "@talentprotocol/design-system";
import { CareerCircle } from "../../career-circle";
import { Container } from "./styled";
import { loggedInUserStore } from "src/contexts/state";
import { useWindowDimensionsHook } from "src/utils/window";

export const CareerCirclePage = ({ railsContext }) => {
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
        <CareerCircle currentUserId={currentUser?.id} mobile={mobile} railsContext={railsContext} />
      </Container>
    </TalentThemeProvider>
  );
};

export default (props, railsContext) => {
  return () => <CareerCirclePage {...props} railsContext={railsContext} />;
};
