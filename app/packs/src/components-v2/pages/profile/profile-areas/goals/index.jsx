import React, { useEffect, useState } from "react";
import { Icon, Spinner, TextLink, Typography } from "@talentprotocol/design-system";
import { GoalCard } from "../../../../goal-card";
import { goalsService } from "src/api";
import { Container, EmptyStateContainer, EmptyStateCopy, SpinnerContainer } from "./styled";

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
          <EmptyStateContainer>
            <Icon name="binoculars" size={64} color="primary04" />
            <Typography specs={{ type: "regular", variant: "p1" }} color="primary01">
              Setting goals is a powerful way to turn your dreams into reality. By defining your aspirations, you'll
              have a clear direction, purpose, and something to strive for. Other community members are here and eager
              to help you reach your goals. Collaboration and support from the community can make all the difference.
              So, dream big and let's work together to make those dreams come true. I'm here to support you all the
              way!
            </Typography>
          </EmptyStateContainer>
        )) || (
          <EmptyStateContainer>
            <Icon name="binoculars" size={64} color="primary04" />
            <EmptyStateCopy specs={{ type: "regular", variant: "p1" }} color="primary01">
              Everyone is on a unique journey, and it seems like <b>{urlData?.profileUsername}</b> is still defining
              their next steps. Check back soon to discover their goals and perhaps find exciting opportunities for
              collaboration and inspiration! If you have a suggestion for them{" "}
              <TextLink href={`/messages?user=${urlData?.profileUsername}`} text="reach out directly" />.
            </EmptyStateCopy>
          </EmptyStateContainer>
        )}
    </Container>
  );
};
