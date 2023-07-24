import React from "react";
import { Container, GoalImage, GoalInfo, TagsRow } from "./styled";
import { GoalTag } from "./goal-tag";
import { Typography } from "@talentprotocol/design-system";

export const GoalCard = ({ progress, due_date, title, description, images }) => {
  console.log("-----", images)
  return (
    <Container>
      <TagsRow>
        <GoalTag state={progress} />
        <GoalTag state="date" date={new Date(due_date)} />
      </TagsRow>
      <GoalInfo>
        <Typography specs={{ type: "medium", variant: "p1" }} color="primary01">
          {title}
        </Typography>
        <Typography specs={{ type: "regular", variant: "p2" }} color="primary03">
          {description}
        </Typography>
      </GoalInfo>
      {!!images?.length && (
        <GoalImage src={images[0].image_url} />)}
    </Container>
  );
};
