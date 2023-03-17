import { Avatar, Icon, Typography } from "@talentprotocol/design-system";
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
            <ListItem>
              <Avatar size="md" />
              <ListItemInfo>
                <ListItemInfoRow>
                  <Typography specs={{ variant: "label2", type: "medium" }} color="primary01">
                    Esther Howard
                  </Typography>
                  <Icon name="verified-2" />
                </ListItemInfoRow>
                <ListItemInfoRow>
                  <Typography specs={{ variant: "p3", type: "bold" }} color="primary01">
                    $EST
                  </Typography>
                  <Typography specs={{ variant: "p3", type: "regular" }} color="primary01">
                    Design Lead at Microsoft
                  </Typography>
                </ListItemInfoRow>
              </ListItemInfo>
            </ListItem>
            <ListItem>
              <Avatar size="md" />
              <ListItemInfo>
                <ListItemInfoRow>
                  <Typography specs={{ variant: "label2", type: "medium" }} color="primary01">
                    Esther Howard
                  </Typography>
                  <Icon name="verified-2" />
                </ListItemInfoRow>
                <ListItemInfoRow>
                  <Typography specs={{ variant: "p3", type: "bold" }} color="primary01">
                    $EST
                  </Typography>
                  <Typography specs={{ variant: "p3", type: "regular" }} color="primary01">
                    Design Lead at Microsoft
                  </Typography>
                </ListItemInfoRow>
              </ListItemInfo>
            </ListItem>
            <ListItem>
              <Avatar size="md" />
              <ListItemInfo>
                <ListItemInfoRow>
                  <Typography specs={{ variant: "label2", type: "medium" }} color="primary01">
                    Esther Howard
                  </Typography>
                  <Icon name="verified-2" />
                </ListItemInfoRow>
                <ListItemInfoRow>
                  <Typography specs={{ variant: "p3", type: "bold" }} color="primary01">
                    $EST
                  </Typography>
                  <Typography specs={{ variant: "p3", type: "regular" }} color="primary01">
                    Design Lead at Microsoft
                  </Typography>
                </ListItemInfoRow>
              </ListItemInfo>
            </ListItem>
          </ListContainer>
        </>
      )}
    </Container>
  );
};
