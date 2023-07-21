import React, { useEffect } from "react";
import { Avatar, Button, Icon, MembersList, Spinner, Tag, Typography } from "@talentprotocol/design-system";
import {
  Actions,
  Container,
  DesktopActions,
  LocationContainer,
  MembersContainer,
  SpinnerContainer,
  TopRow,
  UserInfo
} from "./styled";
import { useProfileFetcher } from "src/hooks/use-profile-fetcher";

export const ProfileHeader = ({ urlData }) => {
  const { profile, fetchProfile } = useProfileFetcher();
  useEffect(() => {
    fetchProfile(urlData.profileUsername);
  }, [urlData]);

  return !profile ? (
    <SpinnerContainer>
      <Spinner color="primary" size={48} />
    </SpinnerContainer>
  ) : (
    <Container>
      <TopRow>
        <Avatar size="lg" userId={1} url={profile.profile_picture_url} profileURL={`/u/${profile.user.username}`} />
        <Actions>
          <Button size="small" hierarchy="secondary" leftIcon="share-2" iconColor="primary01" />
          <Button size="small" hierarchy="secondary" leftIcon="email" iconColor="primary01" />
          <Button size="small" hierarchy="secondary" text="Subscribe" />
        </Actions>
      </TopRow>
      <UserInfo>
        <Typography specs={{ type: "bold", variant: "h5" }} color="primary01">
          {profile?.user.name}
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
        {profile.headline}
      </Typography>
      <LocationContainer>
        <Icon name="pin" color="primary04" size={16} />
        <Typography specs={{ type: "regular", variant: "p2" }} color="primary04">
          {profile.profile.location || "..."}
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
