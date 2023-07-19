import React from "react";
import { Actions, Container, DesktopActions, LocationContainer, MembersContainer, TopRow, UserInfo } from "./styled";
import { Avatar, Button, Icon, MembersList, Tag, Typography } from "@talentprotocol/design-system";

export const ProfileHeader = () => {
  // spinner for loading state
  return (
    <Container>
      <TopRow>
        <Avatar size="lg" userId={1} />
        <Actions>
          <Button size="small" hierarchy="secondary" leftIcon="share-2" iconColor="primary01" />
          <Button size="small" hierarchy="secondary" leftIcon="email" iconColor="primary01" />
          <Button size="small" hierarchy="secondary" text="Subscribe" />
        </Actions>
      </TopRow>
      <UserInfo>
        <Typography specs={{ type: "bold", variant: "h5" }} color="primary01">
          John Doe
        </Typography>
        <Icon name="verified-2" color="primary" size={18} />
        <Tag
          size="small"
          color="primary"
          label="Supporting"
          backgroundColor="bg01"
          borderColor="surfaceHover02"
          textColor="primary02"
        />
      </UserInfo>
      <Typography specs={{ type: "regular", variant: "p1" }} color="primary01">
        Think product. Execute like a developer. Designing with love at Talent Protocol.
      </Typography>
      <LocationContainer>
        <Icon name="pin" color="primary04" size={16} />
        <Typography specs={{ type: "regular", variant: "p2" }} color="primary04">
          EthParis, France
        </Typography>
      </LocationContainer>
      <MembersContainer>
        <MembersList
          membersImages={[
            "https://i.pravatar.cc/300?img=1",
            "https://i.pravatar.cc/300?img=1",
            "https://i.pravatar.cc/300?img=1",
            "https://i.pravatar.cc/300?img=1"
          ]}
        />
        <Typography specs={{ type: "small", variant: "label3" }} color="primary04">
          Supported by 13 other connections.
        </Typography>
      </MembersContainer>
      <DesktopActions>
        <Button size="small" hierarchy="secondary" leftIcon="share-2" iconColor="primary01" />
        <Button size="small" hierarchy="secondary" leftIcon="email" iconColor="primary01" />
        <Button size="small" hierarchy="secondary" text="Subscribe" />
      </DesktopActions>
    </Container>
  );
};
