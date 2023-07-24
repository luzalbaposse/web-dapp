import React, { useEffect, useState } from "react";
import { Spinner } from "@talentprotocol/design-system";
import { GoalCard } from "../../../../goal-card";
import { goalsService } from "src/api";
import { Container, SpinnerContainer } from "./styled";

export const Goals = ({ urlData }) => {
  const [goals, setGoals] = useState([]);
  useEffect(() => {
    if (!urlData.profileUsername) return;
    goalsService.getGoals(urlData.profileUsername)
      .then(({ data }) => {
        setGoals(data.goals);
      })
      .catch((err) => {
        console.error(err)
      });
  }, [urlData]);

  return !goals.length ? (
    <SpinnerContainer>
      <Spinner color="primary" size={48} />
    </SpinnerContainer>
  ) : (
    <Container>
      {goals.map((goal) => (
        <GoalCard key={goal.uuid} {...goal} />
      ))}
    </Container>
  );
};

// load more
