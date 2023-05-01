import React from "react";
import { Container, Entry, EntryIdentification, Footer, ListContainer, TitleContainer } from "./styled";
import { Avatar, Button, TextLink, Typography } from "@talentprotocol/design-system";

export const LeadderboardWidget = () => {
  return (
    <Container>
      <TitleContainer>
        <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
          Community Leaderboard
        </Typography>
        <TextLink text="Go to wallet" rightIcon="carret" color="primary" size="small" />
      </TitleContainer>
      <ListContainer>
        <Entry>
          <EntryIdentification>
            <Typography specs={{ variant: "label2", type: "medium" }} color="primary01">
              #1
            </Typography>
            <Avatar userId={1} occupation="Feb 6, 2023 7.30 am" name="David Cunha" size="md" />
          </EntryIdentification>
        </Entry>
        <Entry>
          <EntryIdentification>
            <Typography specs={{ variant: "label2", type: "medium" }} color="primary01">
              #1
            </Typography>
            <Avatar userId={1} occupation="Feb 6, 2023 7.30 am" name="David Cunha" size="md" />
          </EntryIdentification>
        </Entry>
        <Entry>
          <EntryIdentification>
            <Typography specs={{ variant: "label2", type: "medium" }} color="primary01">
              #1
            </Typography>
            <Avatar userId={1} occupation="Feb 6, 2023 7.30 am" name="David Cunha" size="md" />
          </EntryIdentification>
        </Entry>
        <Entry>
          <EntryIdentification>
            <Typography specs={{ variant: "label2", type: "medium" }} color="primary01">
              #1
            </Typography>
            <Avatar userId={1} occupation="Feb 6, 2023 7.30 am" name="David Cunha" size="md" />
          </EntryIdentification>
        </Entry>
        <Entry>
          <EntryIdentification>
            <Typography specs={{ variant: "label2", type: "medium" }} color="primary01">
              #1
            </Typography>
            <Avatar userId={1} occupation="Feb 6, 2023 7.30 am" name="David Cunha" size="md" />
          </EntryIdentification>
        </Entry>
      </ListContainer>
      <Footer>
        <Typography specs={{ variant: "h4", type: "regular" }} color="primary01">
          <b>Help the</b> <i>community</i> <b>grow</b>
        </Typography>
        <Typography specs={{ variant: "p2", type: "regular" }} color="primary01">
          Invite your peers to join and earn rewards.
        </Typography>
        <Button hierarchy="primary" size="large" text="Copy your referral link" isStretched rightIcon="copy" />
      </Footer>
    </Container>
  );
};
