import { Avatar, Typography } from "@talentprotocol/design-system";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useConnectionsFetcher } from "../../../../hooks/use-connections-fetcher";
import { Container, ListContainer, ListItem, ListItemInfo, ListItemInfoRow, TitleContainer } from "./styled";

export const SupportedBy = ({ profile }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { connections, fetchConnections } = useConnectionsFetcher();
  useEffect(() => {
    fetchConnections(profile.user.username).then(() => setIsLoading(false));
  }, [setIsLoading, fetchConnections, profile]);
  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <TitleContainer>
            <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
              {profile.user.legal_first_name} is supported by {connections.length} people
            </Typography>
          </TitleContainer>
          <ListContainer>
            {connections.map(connection => (
              <ListItem key={connection.id}>
                <Avatar size="md" url={connection.profile_picture_url} />
                <ListItemInfo>
                  <ListItemInfoRow>
                    <Typography specs={{ variant: "label2", type: "medium" }} color="primary01">
                      {connection.name}
                    </Typography>
                  </ListItemInfoRow>
                </ListItemInfo>
              </ListItem>
            ))}
          </ListContainer>
        </>
      )}
    </Container>
  );
};
