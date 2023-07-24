import React, { useEffect, useState } from "react";
import { Avatar, TextLink, Typography, Button } from "@talentprotocol/design-system";
import { BuilderEntry, BuildersList, Container, SupportButtonContainer, TitleContainer, ViewAllContainer } from "./styled";
import { talentsService } from "../../api/talents";

export const RecommendedBuildersWidgetMini = ({ username }) => {
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

  return (
    !isLoading &&
    talents.length > 0 && (
      <Container>
        <TitleContainer>
          <Typography specs={{ variant: "h5", type: "bold" }}>Recommended Builders</Typography>
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
                ellipsisAt={200}
              />
              <SupportButtonContainer>
                <Button hierarchy="primary" size="small" text="Support" href={`/u/${talent.username}/support`} />
              </SupportButtonContainer>
            </BuilderEntry>
          ))}
        </BuildersList>
        <ViewAllContainer>
          <TextLink href="/talent" text="View all" rightIcon="carret" color="primary" size="medium" />
        </ViewAllContainer>
      </Container>
    )
  );
};
