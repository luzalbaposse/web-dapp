import { Avatar, Typography, Spinner } from "@talentprotocol/design-system";
import React, { useEffect, useMemo, useState } from "react";
import { useSupportersFetcher } from "../../../../hooks/use-supporters-fetcher";
import { Container, ListContainer, ListItem, TitleContainer } from "./styled";

export const SupportedBy = ({ profile }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { supporters, fetchSupporters, totalSupporters } = useSupportersFetcher();
  useEffect(() => {
    fetchSupporters(profile.user.username).then(() => setIsLoading(false));
  }, [setIsLoading, fetchSupporters, profile]);
  const SupporterList = useMemo(
    () =>
      (supporters || []).reduce((acc, supporter) => {
        if (supporter.id !== profile.user.uuid && acc.length < 6) {
          acc.push(
            <ListItem key={supporter.id} href={`/u/${supporter.username}`}>
              <Avatar
                size="md"
                url={supporter.profile_picture_url}
                name={supporter.name}
                ticker={supporter.ticker}
                occupation={supporter.occupation}
                ellipsisAt={100}
              />
            </ListItem>
          );
        }
        return acc;
      }, []),
    [supporters, profile]
  );
  return (
    <Container hasSupporters={profile.supporters_count}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <TitleContainer>
            <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
              {profile.user.legal_first_name} is supported by {totalSupporters} people
            </Typography>
          </TitleContainer>
          <ListContainer>{SupporterList}</ListContainer>
        </>
      )}
    </Container>
  );
};
