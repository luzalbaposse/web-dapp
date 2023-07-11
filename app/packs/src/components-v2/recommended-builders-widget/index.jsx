import React, { useEffect, useState } from "react";
import { Avatar, TextLink, Typography, Button } from "@talentprotocol/design-system";
import { BuilderEntry, BuildersList, Container, TitleContainer } from "./styled";
import { talentsService } from "../../api/talents";

export const RecommendedBuildersWidget = ({ username }) => {
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
          <TextLink href="/talent" text="View all" rightIcon="carret" color="primary" size="medium" />
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
              <Button hierarchy="primary" size="small" text="Support" href={`/u/${talent.username}/support`} />
            </BuilderEntry>
          ))}
        </BuildersList>
      </Container>
    )
  );
};
