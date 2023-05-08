import React, { useEffect, useState } from "react";
import { Container, IntroContainer, ItemContainer, ListContainer, ProgressContainer } from "./styled";
import { Button, Checkbox, Typography } from "@talentprotocol/design-system";
import { users } from "../../api/users";

export const CompleteProfileWidget = ({ username }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState({
    progress: 0,
    profilePicture: false,
    occupation: false,
    journeyEntries: false,
    socialLinks: false
  });
  useEffect(() => {
    if (!username) return;
    users
      .getProfile(username)
      .then(({ data }) => {
        const newState = {
          progress: 0,
          profilePicture: !!data.profile.profile_picture_url,
          occupation: !!data.profile.occupation,
          headline: !!data.profile.headline,
          journeyEntries: [...data.profile.milestones, ...data.profile.career_goal.goals].length >= 2,
          socialLinks:
            Object.values(data.profile.profile).filter(el => typeof el === "string" && el.substring(0, 4) === "http")
              .length >= 2
        };
        newState.progress = Math.ceil((100 / 5) * Object.values(newState).filter(el => !!el).length);
        setState(newState);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
  }, [username, setState]);
  return (
    !isLoading &&
    state.progress < 100 && (
      <Container>
        <ProgressContainer progress={state.progress}>
          <Typography specs={{ variant: "p1", type: "bold" }}>{state.progress}%</Typography>
        </ProgressContainer>
        <IntroContainer>
          <Typography specs={{ variant: "h5", type: "bold" }}>Complete your profile</Typography>
          <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
            Completing your profile unlocks quests and allows you to start earning TAL!
          </Typography>
        </IntroContainer>
        <ListContainer>
          <ItemContainer>
            <Checkbox
              label="Add your profile picture"
              isChecked={state.profilePicture}
              isDisabled={state.profilePicture}
            />
          </ItemContainer>
          <ItemContainer>
            <Checkbox
              label="Add your current occupation"
              isChecked={state.occupation}
              isDisabled={state.occupation}
              hasNoAction
            />
          </ItemContainer>
          <ItemContainer>
            <Checkbox
              label="Create your headline"
              isChecked={state.headline}
              isDisabled={state.headline}
              hasNoAction
            />
          </ItemContainer>
          <ItemContainer>
            <Checkbox
              label="Add at least 2 entries to your journey"
              isChecked={state.journeyEntries}
              isDisabled={state.journeyEntries}
              hasNoAction
            />
          </ItemContainer>
          <ItemContainer>
            <Checkbox
              label="Add at least 2 social links"
              isChecked={state.socialLinks}
              isDisabled={state.socialLinks}
              hasNoAction
            />
          </ItemContainer>
        </ListContainer>
        <Button
          text="Edit my profile"
          size="large"
          hierarchy="primary"
          isStretched
          href={`/u/${username}`}
        />
      </Container>
    )
  );
};
