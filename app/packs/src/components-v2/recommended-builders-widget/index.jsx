import React, { useEffect } from "react";
import { Avatar, TextLink, Typography, Button } from "@talentprotocol/design-system";
import { BuilderEntry, BuildersList, Container, TitleContainer } from "./styled";
import { talentsService } from "../../api/talents";

export const RecommendedBuildersWidget = ({}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [talents, setTalents] = React.useState([]);
  useEffect(() => {
    talentsService
      .getRecommendedTalents()
      .then(({ data }) => {
        setIsLoading(false);
        setTalents(data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    !isLoading &&
    talents.length && (
      <Container>
        <TitleContainer>
          <Typography specs={{ variant: "h5", type: "bold" }}>Recommended Builders</Typography>
          <TextLink href="/talent" text="View all" rightIcon="carret" color="primary" size="medium" />
        </TitleContainer>
        <BuildersList>
          {talents.map(talent => (
            <BuilderEntry key={talent.username}>
              <Avatar size="md" isVerified={talent.verified} name={talent.username} occupation={talent.occupation} url={talent.profile_picture_url} profileURL={`/u/${talent.username}`} />
              <Button hierarchy="primary" size="small" text="Support" href={`/u/${talent.username}/support`} />
            </BuilderEntry>
          ))}
        </BuildersList>
      </Container>
    )
  );
};
