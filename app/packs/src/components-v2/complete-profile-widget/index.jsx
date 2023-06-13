import React, { useEffect, useState } from "react";
import { Container, IntroContainer, ItemContainer, ListContainer, ProgressContainer } from "./styled";
import { Button, Checkbox, Typography } from "@talentprotocol/design-system";
import { TitleContainer } from "./styled";

export const CompleteProfileWidget = ({ user }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!user) return;

    const completedCount = user.required_profile_fields.length - user.missing_profile_fields.length;
    const progress = Math.ceil((100 / user.required_profile_fields.length) * completedCount);
    setProgress(progress);
  }, [user]);

  if (progress == 100 || !user) {
    return <></>;
  }

  return (
    <div>
      <TitleContainer>
        <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
          Profile progress
        </Typography>
      </TitleContainer>
      <Container>
        <ProgressContainer progress={progress}>
          <Typography specs={{ variant: "p1", type: "bold" }}>{progress}%</Typography>
        </ProgressContainer>
        <IntroContainer>
          <Typography specs={{ variant: "h5", type: "bold" }}>Complete your profile</Typography>
          <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
            Completing your profile unlocks quests and allows you to start earning TAL!
          </Typography>
        </IntroContainer>
        <ListContainer>
          {user.required_profile_fields.map(field => {
            const completed = !user.missing_profile_fields.includes(field.name);
            return (
              <ItemContainer key={field.name}>
                <Checkbox label={field["description"]} isChecked={completed} isDisabled={completed} hasNoAction />
              </ItemContainer>
            );
          })}
        </ListContainer>
        <Button text="Edit my profile" size="large" hierarchy="primary" isStretched href={`/u/${user.username}`} />
      </Container>
    </div>
  );
};
