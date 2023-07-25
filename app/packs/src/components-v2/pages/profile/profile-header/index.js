import React from "react";
import { Avatar, Button, Icon, MembersList, Spinner, Tag, Typography } from "@talentprotocol/design-system";
import {
  Actions,
  Container,
  DesktopActions,
  LocationContainer,
  MembersContainer,
  SpinnerContainer,
  TagContainer,
  TopRow,
  UserInfo
} from "./styled";
import { useDataFetcher } from "./hooks/use-data-fetcher";

export const ProfileHeader = ({ urlData, currentUser }) => {
  const data = useDataFetcher(urlData);
  return !data.profileOverview ? (
    <SpinnerContainer>
      <Spinner color="primary" size={48} />
    </SpinnerContainer>
  ) : (
    <Container>
      <TopRow>
        <Avatar
          size="lg"
          userId={1}
          url={data.profileOverview?.profile_picture_url}
          profileURL={`/u/${data.profileOverview?.username}`}
        />
        <Actions>
          <Button size="small" hierarchy="secondary" leftIcon="navigation" iconColor="primary01" />
          {currentUser?.username !== data.profileOverview?.username && (
            <>
              <Button size="small" hierarchy="secondary" leftIcon="email" iconColor="primary01" />
              <Button size="small" hierarchy="secondary" text="Subscribe" />
            </>
          )}
        </Actions>
      </TopRow>
      <UserInfo>
        <Typography specs={{ type: "bold", variant: "h5" }} color="primary01">
          {data.profileOverview?.name}
        </Typography>
        <Icon name="verified-2" color="primary" size={18} />
      </UserInfo>
      <TagContainer>
        {currentUser?.username !== data.profileOverview?.username && (
          <Tag
            size="small"
            color="primary"
            label={
              data.profileOverview?.subscribing_status.charAt(0).toUpperCase() +
              data.profileOverview?.subscribing_status.slice(1)
            }
            backgroundColor="bg01"
            borderColor="surfaceHover02"
            textColor="primary02"
          />
        )}
      </TagContainer>
      <Typography specs={{ type: "regular", variant: "p1" }} color="primary01">
        {data.profileOverview?.headline}
      </Typography>
      <LocationContainer>
        <Icon name="pin" color="primary04" size={16} />
        <Typography specs={{ type: "regular", variant: "p2" }} color="primary04">
          {data.profileOverview?.location || "..."}
        </Typography>
      </LocationContainer>
      <MembersContainer>
        {data.supporters.talents?.length && (
          <>
            <MembersList membersImages={data.supporters.talents.map(supporter => supporter.profile_picture_url)} />
            <Typography specs={{ type: "small", variant: "label3" }} color="primary04">
              Supported by {data.supporters.pagination.total} other connections.
            </Typography>
          </>
        )}
      </MembersContainer>
      <DesktopActions>
        <Button size="small" hierarchy="secondary" leftIcon="navigation" iconColor="primary01" />
        {currentUser?.username !== data.profileOverview?.username && (
          <>
            <Button size="small" hierarchy="secondary" leftIcon="email" iconColor="primary01" />
            <Button size="small" hierarchy="secondary" text="Subscribe" />
          </>
        )}
      </DesktopActions>
    </Container>
  );
};
