import React from "react";
import { Container, GoalImage, GoalInfo, TagsRow } from "./styled";
import { GoalTag } from "./goal-tag";
import { Typography } from "@talentprotocol/design-system";

export const GoalCard = () => {
  return (
    <Container>
      <TagsRow>
        <GoalTag state="doing" />
        <GoalTag state="date" content={Date.now()} />
      </TagsRow>
      <GoalInfo>
        <Typography specs={{ type: "medium", variant: "p1" }} color="primary01">
          I want to learn more about Product to get a job as Head of Design
        </Typography>
        <Typography specs={{ type: "regular", variant: "p2" }} color="primary03">
          I'm starting learning 3D modeling in Blender to complement my UI's better and create 3D digital assets like
          Tokens, Landscapes and imagine that this is the maxi
        </Typography>
      </GoalInfo>
      <GoalImage src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg" />
    </Container>
  );
};
