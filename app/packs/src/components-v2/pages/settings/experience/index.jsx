import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Container } from "./styled";
import { ExperiencesComponent } from "src/components-v2/experiences-component";
import { Button } from "@talentprotocol/design-system";

export const ExperienceForm = ({ username }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);
  return (
    <Container>
      <ExperiencesComponent username={username} isOwner />
      {!isLoading && createPortal(<Button hierarchy="primary" size="small" text="Save" />, document.getElementById("save-button"))}
    </Container>
  );
};
