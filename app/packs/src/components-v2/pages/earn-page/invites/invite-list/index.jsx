import React from "react";
import dayjs from "dayjs";
import {
  Container,
  DesktopCopyInviteLinkContainer,
  InviteLink,
  InviteLinkArea,
  InvitesRow,
  ListContainer,
  ListItem,
  LoadMoreContainer,
  RewardTag,
  StyledTypography,
  TitleContainer,
  TitleRow
} from "./styled";
import { Avatar, Button, Icon, Typography } from "@talentprotocol/design-system";
import { toast } from "react-toastify";

const XP_RELEASE_DATE = new Date("2023-06-01");

export const InviteList = ({ list, openQRCodeModal, username, loadMore, totalInvites }) => {
  return (
    <Container>
      <TitleRow>
        <TitleContainer>
          <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
            Friends Invited ({totalInvites})
          </Typography>
          <StyledTypography specs={{ variant: "p2", type: "regular" }} color="primary04">
            Get your friends on board. For each friend who signs up and verifies their account, you will win{" "}
            <Icon name="flash" size={12} color="primary" /> 100 XP
          </StyledTypography>
        </TitleContainer>
        <DesktopCopyInviteLinkContainer>
          <TitleContainer>
            <Button
              hierarchy="primary"
              size="medium"
              text="Copy invite link"
              isStretched
              rightIcon="copy"
              onClick={() => {
                navigator.clipboard.writeText(`https://beta.talentprotocol.com/join/${username}`);
                toast.success("Copied to clipboard!", {
                  autoClose: 3000
                });
              }}
            />
            <InviteLink specs={{ variant: "p2", type: "regular" }} color="primary04">
              https://beta.talent.../join/{username}
            </InviteLink>
          </TitleContainer>
        </DesktopCopyInviteLinkContainer>
      </TitleRow>
      <ListContainer>
        {list.map((item, index) => {
          const joinedAt = new Date(item.joined_at);
          return (
            <ListItem key={index} href={`/u/${item.username}`}>
              <Avatar
                size="md"
                name={item.name}
                occupation={`${dayjs(item.joined_at).fromNow()} - ${item.status}`}
                url={item.profile_picture_url}
                isVerified={item.verified}
              />
              <RewardTag>
                {joinedAt > XP_RELEASE_DATE && <Icon name="flash" size={12} />}
                <Typography specs={{ variant: "label3", type: "medium" }} color={"primary02"}>
                  {joinedAt > XP_RELEASE_DATE ? `+ ${item.experience_points_amount}` : `${item.tal_amount} TAL`}
                </Typography>
              </RewardTag>
            </ListItem>
          );
        })}
      </ListContainer>
      <LoadMoreContainer>
        {loadMore ? (
          <Button size="medium" hierarchy="secondary" onClick={loadMore} text="Load more" />
        ) : (
          <Typography specs={{ variant: "p3", type: "regular" }} color={"primary03"}>
            You've reached the end of the list
          </Typography>
        )}
      </LoadMoreContainer>
      <InviteLinkArea>
        <InviteLink specs={{ variant: "p2", type: "regular" }} color="primary04">
          https://beta.talent.../join/{username}
        </InviteLink>
        <InvitesRow>
          <Button
            hierarchy="primary"
            size="medium"
            text="Copy invite link"
            isStretched
            rightIcon="copy"
            onClick={() => {
              navigator.clipboard.writeText(`https://beta.talentprotocol.com/join/${username}`);
              toast.success("Copied to clipboard!", {
                autoClose: 3000
              });
            }}
          />
          <Button size="medium" hierarchy="secondary" leftIcon="qr" iconColor="primary01" onClick={openQRCodeModal} />
        </InvitesRow>
      </InviteLinkArea>
    </Container>
  );
};
