import React from "react";
import { ActivityWall } from "../../../../activity-wall";
import { Container } from "./styled";

export const Activity = ({ currentUser, organization }) => {
  return (
    <Container>
      <ActivityWall hideTitle organization={organization} profile={currentUser} />
    </Container>
  );
};
