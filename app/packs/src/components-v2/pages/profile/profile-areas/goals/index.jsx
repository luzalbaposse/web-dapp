import React from "react";
import { Spinner } from "@talentprotocol/design-system";
import { GoalCard } from "../../../../goal-card";
import { Container, SpinnerContainer } from "./styled";

export const Goals = () => {
  return !true ? (
    <SpinnerContainer>
      <Spinner color="primary" size={48} />
    </SpinnerContainer>
  ) : (
    <Container>
      <GoalCard />
      <GoalCard />
      <GoalCard />
      <GoalCard />
      <GoalCard />
      <GoalCard />
      <GoalCard />
      <GoalCard />
    </Container>
  );
};

// load more
