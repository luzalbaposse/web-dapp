import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { ButtonDropdown, Typography, Button } from "@talentprotocol/design-system";
import {
  Container,
  DropDownContainer,
  GoalImage,
  GoalInfo,
  TagsRow,
  VoteContainer,
  VoteDiv,
  VoteTextContainer,
  StyledTypographyLink
} from "./styled";
import { GoalTag } from "./goal-tag";
import { goalsService } from "src/api";
import { ToastBody } from "src/components/design_system/toasts";

const DROPDOWN_OPTIONS = [{ value: "Edit goal" }, { value: "Delete goal" }];

export const GoalCard = ({ goal, openAddGoalModal, isOwner }) => {
  const selectOption = useCallback(
    ({ value }) => {
      switch (value) {
        case "Delete goal":
          goalsService
            .deleteGoal(goal.id)
            .then(() => {
              toast.success(<ToastBody heading="Goal deleted successfully." />);
              setTimeout(() => {
                window.location.reload();
              }, 500);
            })
            .catch(err => {
              toast.error(<ToastBody heading="Something went wrong." />);
              console.error(err);
            });
          return;
        case "Edit goal":
        default:
          openAddGoalModal("Edit", goal);
          return;
      }
    },
    [goal]
  );

  const disableVoteButton = () => goal.election_status != "voting_active";

  const goalTitleWithLink = () => {
    if (!goal.election_status) {
      return goal.title;
    } else {
      return <StyledTypographyLink href={"/collectives/takeoff-istanbul"}>{goal.title}</StyledTypographyLink>;
    }
  };

  return (
    <Container>
      <TagsRow>
        <GoalTag state={goal.progress} />
        <GoalTag state="date" date={new Date(goal.due_date)} />
        {goal.pin && <GoalTag state={"pinned"} />}
        {isOwner && (
          <DropDownContainer>
            <ButtonDropdown selectOption={selectOption} options={DROPDOWN_OPTIONS} opensOnRight>
              <Button size="small" hierarchy="secondary" leftIcon="navigation" iconColor="primary01" />
            </ButtonDropdown>
          </DropDownContainer>
        )}
      </TagsRow>
      <GoalInfo>
        <Typography specs={{ type: "medium", variant: "p1" }} color="primary01">
          {goalTitleWithLink()}
        </Typography>
        <Typography specs={{ type: "regular", variant: "p2" }} color="primary03" className="text-white-space-wrap">
          {goal.description}
        </Typography>
      </GoalInfo>
      {!!goal.images?.length && <GoalImage src={goal.images[0].image_url} />}
      {goal.election_status != null && (
        <VoteContainer>
          <Button size="small" hierarchy="secondary" isDisabled={disableVoteButton()}>
            <VoteTextContainer>
              <Typography
                specs={{
                  variant: "label2",
                  type: "medium"
                }}
                color={disableVoteButton() ? "primaryDisable" : "primary01"}
              >
                Vote
              </Typography>
              <VoteDiv />
              <Typography
                specs={{
                  variant: "label2",
                  type: "medium"
                }}
                color={disableVoteButton() ? "primaryDisable" : "primary01"}
              >
                {goal.election_count}
              </Typography>
            </VoteTextContainer>
          </Button>
        </VoteContainer>
      )}
    </Container>
  );
};
