import React, { useEffect, useState } from "react";
import { Avatar, TextLink, Typography } from "@talentprotocol/design-system";
import {
  BuilderEntry,
  BuildersList,
  Container,
  SupportButtonContainer,
  TitleContainer,
  ViewAllContainer
} from "./styled";
import { talentsService } from "../../api/talents";
import { SubscriptionButton } from "src/components-v2/subscription-button";

export const RecommendedBuildersWidget = ({ username, ellipsisAt = 350 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [talents, setTalents] = useState([]);

  useEffect(() => {
    if (username) {
      talentsService
        .getRecommendedTalents(username)
        .then(({ data }) => {
          setIsLoading(false);
          setTalents(data.talents);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [username]);

  const callback = (username, subscription) => {
    let newTalents = [];
    if (subscription === "subscribe") {
      newTalents = talents.map(t => {
        if (t.username === username) {
          return { ...t, subscribed_status: "Cancel Request" };
        }
        return { ...t };
      });
    } else {
      newTalents = talents.map(t => {
        if (t.username === username) {
          return { ...t, subscribed_status: "Subscribe" };
        }
        return { ...t };
      });
    }

    setTalents(newTalents);
  };

  return (
    !isLoading &&
    talents.length > 0 && (
      <Container>
        <TitleContainer>
          <Typography specs={{ variant: "p1", type: "medium" }}>Recommended Builders</Typography>
        </TitleContainer>
        <BuildersList>
          {talents.map(talent => (
            <BuilderEntry key={talent.username}>
              <Avatar
                size="md"
                isVerified={talent.verified}
                name={talent.name}
                occupation={talent.occupation}
                url={talent.profile_picture_url}
                profileURL={`/u/${talent.username}`}
                ellipsisAt={ellipsisAt}
              />
              <SupportButtonContainer>
                <SubscriptionButton
                  username={talent.username}
                  subscribedStatus={talent.subscribed_status}
                  callback={callback}
                />
              </SupportButtonContainer>
            </BuilderEntry>
          ))}
        </BuildersList>
        <ViewAllContainer>
          <TextLink href="/talent" text="Show more" rightIcon="carret" color="primary" size="small" />
        </ViewAllContainer>
      </Container>
    )
  );
};
