import React, { useEffect, useState } from "react";
import { Button, Icon, Spinner, TextLink, Typography } from "@talentprotocol/design-system";
import { GoalCard } from "../../../../goal-card";
import { goalsService } from "src/api";
import {
  ButtonContainer,
  Container,
  EmptyStateButtonContainer,
  EmptyStateContainer,
  EmptyStateCopy,
  SpinnerContainer
} from "./styled";
import { AddGoalModal } from "./add-goal-modal";
import { useAddGoalModalState } from "./add-goal-modal/hooks/use-add-goal-modal";

export const Goals = ({ urlData, currentUser }) => {
  const [data, setData] = useState({ goals: [], isLoading: true, activeElection: false, pinned_goals: [] });
  const addGoalModalState = useAddGoalModalState();

  useEffect(() => {
    if (!urlData.profileUsername) return;
    goalsService
      .getGoals(urlData.profileUsername)
      .then(({ data }) => {
        if (data.goals?.length > 0) {
          const pinned_goals = data.goals.filter(goal => goal.pin);
          const all_goals = data.goals.filter(goal => !goal.pin);

          setData({
            goals: all_goals,
            isLoading: false,
            activeElection: data.active_election,
            pinned_goals: pinned_goals
          });
        } else {
          setData({ goals: data.goals, isLoading: false, activeElection: data.active_election });
        }
      })
      .catch(err => {
        console.error(err);
        setData({ isLoading: false });
      });
  }, [urlData, setData]);

  const emptyState = () => {
    return (
      (currentUser?.username === urlData?.profileUsername && (
        <EmptyStateContainer>
          <Icon name="target" size={64} color="primary04" />
          <Typography specs={{ type: "regular", variant: "p1" }} color="primary04">
            Setting a career goal is your spotlight moment! It's simple, impactful, and the key to meaningful
            interactions with other members. Why wait? Share your goal and get the support you need to succeed.
          </Typography>
          <EmptyStateButtonContainer>
            <Button
              hierarchy="primary"
              size="medium"
              text="Add new goal"
              onClick={() => addGoalModalState.openModal("Add")}
            />
          </EmptyStateButtonContainer>
        </EmptyStateContainer>
      )) || (
        <EmptyStateContainer>
          <Icon name="target" size={64} color="primary04" />
          <EmptyStateCopy specs={{ type: "regular", variant: "p1" }} color="primary04">
            Patience, my friend! <b>{urlData?.profileUsername}</b> is still working on their first goal. Keep an eye out
            - you might just find the perfect chance to collaborate. Or drop them a suggestion{" "}
            <TextLink href={`/messages?user=${urlData?.profileUsername}`} text="directly" />.
          </EmptyStateCopy>
        </EmptyStateContainer>
      )
    );
  };

  const showEmptyState = () => {
    if (data?.goals && data.goals.length == 0 && data?.pinned_goals && data.pinned_goals.length == 0) {
      return emptyState();
    } else {
      return <></>;
    }
  };

  return data.isLoading ? (
    <SpinnerContainer>
      <Spinner color="primary" size={48} />
    </SpinnerContainer>
  ) : (
    <Container>
      {urlData?.profileUsername === currentUser?.username && (
        <ButtonContainer>
          <Button
            text="Add new goal"
            hierarchy="secondary"
            size="small"
            iconColor="primary01"
            leftIcon="add"
            onClick={() => addGoalModalState.openModal("Add")}
          />
        </ButtonContainer>
      )}
      {data?.pinned_goals?.length > 0 &&
        data.pinned_goals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            openAddGoalModal={addGoalModalState.openModal}
            careerGoalId={currentUser?.career_goal_id}
            isOwner={urlData?.profileUsername === currentUser?.username}
          />
        ))}
      {data?.goals?.length > 0 &&
        data.goals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            openAddGoalModal={addGoalModalState.openModal}
            careerGoalId={currentUser?.career_goal_id}
            isOwner={urlData?.profileUsername === currentUser?.username}
          />
        ))}
      {showEmptyState()}
      <AddGoalModal
        {...addGoalModalState}
        talent={{ id: currentUser?.talent_id, career_goal: { id: currentUser?.career_goal_id } }}
        activeElection={data.activeElection}
      />
    </Container>
  );
};
