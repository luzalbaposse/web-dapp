import React, { useEffect, useState } from "react";
import { Spinner, Typography } from "@talentprotocol/design-system";
import { GoalCard } from "../../../../goal-card";
import { goalsService } from "src/api";
import { Container, SpinnerContainer } from "./styled";

export const Goals = ({ urlData, currentUser }) => {
  const [data, setData] = useState({ goals: [], isLoading: true });
  useEffect(() => {
    if (!urlData.profileUsername) return;
    goalsService
      .getGoals(urlData.profileUsername)
      .then(({ data }) => {
        setData({ goals: data.goals, isLoading: false });
      })
      .catch(err => {
        console.error(err);
        setData({ isLoading: false });
      });
  }, [urlData, setData]);

  return data.isLoading ? (
    <SpinnerContainer>
      <Spinner color="primary" size={48} />
    </SpinnerContainer>
  ) : (
    <Container>
      {data.goals.length
        ? data.goals.map(goal => <GoalCard key={goal.uuid} {...goal} />)
        : (currentUser?.username === urlData?.profileUsername && (
            <Typography specs={{ type: "regular", variant: "p1" }} color="primary01">
              Add goals to your career to get the support you need.
            </Typography>
          )) || (
            <Typography specs={{ type: "regular", variant: "p1" }} color="primary01">
              Ask {urlData?.profileUsername} to setup their career goals.
            </Typography>
          )}
    </Container>
  );
};

// load more
