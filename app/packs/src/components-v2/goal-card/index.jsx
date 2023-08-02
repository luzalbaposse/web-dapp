import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { ButtonDropdown, Typography, Button } from "@talentprotocol/design-system";
import { Container, DropDownContainer, GoalImage, GoalInfo, TagsRow } from "./styled";
import { GoalTag } from "./goal-tag";
import { goalsService } from "src/api";
import { ToastBody } from "src/components/design_system/toasts";

const DROPDOWN_OPTIONS = [{ value: "Edit goal" }, { value: "Delete goal" }];

export const GoalCard = ({ goal, openAddGoalModal, userId, isOwner }) => {
  const selectOption = useCallback(
    ({ value }) => {
      switch (value) {
        case "Delete goal":
          if (!userId) return;
          goalsService
            .deleteGoal(userId, goal.id)
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
    [goal, userId]
  );
  return (
    <Container>
      <TagsRow>
        <GoalTag state={goal.progress} />
        <GoalTag state="date" date={new Date(goal.due_date)} />
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
          {goal.title}
        </Typography>
        <Typography specs={{ type: "regular", variant: "p2" }} color="primary03">
          {goal.description}
        </Typography>
      </GoalInfo>
      {!!goal.images?.length && <GoalImage src={goal.images[0].image_url} />}
    </Container>
  );
};
