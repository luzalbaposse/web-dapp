import React from "react";
import { Container } from "./styled";
import { ExperiencesComponent } from "src/components-v2/experiences-component";

export const ExperienceForm = ({ username }) => {
  return (
    <Container>
      <ExperiencesComponent username={username} isOwner />
    </Container>
  );
};
