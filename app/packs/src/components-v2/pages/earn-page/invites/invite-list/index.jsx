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

export const InviteList = ({ list, openQRCodeModal, username, loadMore, totalInvites }) => {
  return (
    <Container>
      <TitleRow>
        <TitleContainer>
          <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
            Friends Invited ({totalInvites})
          </Typography>
          <StyledTypography specs={{ variant: "p2", type: "regular" }} color="primary04">
            Invite your friends to sign-up, and each of you will <Icon name="flash" size={12} color="primary" /> 500 XP
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
        {list.map((item, index) => (
          <ListItem key={index} href={`/u/${item.username}`}>
            <Avatar
              size="md"
              name={item.name}
              occupation={dayjs(item.joined_at).fromNow()}
              url={item.profile_picture_url}
              isVerified={item.verified}
            />
            <RewardTag>
              <Icon name="flash" size={12} />
              <Typography specs={{ variant: "label3", type: "medium" }} color={"primary02"}>
                + {item.experience_points_amount}
              </Typography>
            </RewardTag>
          </ListItem>
        ))}
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
