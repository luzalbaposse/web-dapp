import React from "react";
import {
  ActivityAmount,
  ActivityEntry,
  Card,
  CardContainer,
  Container,
  FooterActions,
  RecentActivityContainer,
  TitleContainer
} from "./styled";
import { Avatar, Button, TextLink, Typography } from "@talentprotocol/design-system";

export const MyWalletWidget = () => {
  return (
    <Container>
      <TitleContainer withPadding>
        <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
          My wallet
        </Typography>
        <TextLink text="Go to wallet" rightIcon="carret" color="primary" size="small" />
      </TitleContainer>
      <CardContainer>
        <Card isPrimary></Card>
        <Card></Card>
      </CardContainer>
      <RecentActivityContainer>
        <TitleContainer>
          <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
            Recent Activity
          </Typography>
          <TextLink text="Go to wallet" rightIcon="carret" color="primary" size="small" />
        </TitleContainer>
        <ActivityEntry>
          <Avatar userId={1} occupation="Feb 6, 2023 7.30 am" name="David Cunha" size="md" />
          <ActivityAmount>
            <Typography specs={{ variant: "label2", type: "medium" }} color="primary01">
              +100 $CUNHA
            </Typography>
            <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
              $10.00
            </Typography>
          </ActivityAmount>
        </ActivityEntry>
        <ActivityEntry>
          <Avatar userId={1} occupation="Feb 6, 2023 7.30 am" name="David Cunha" size="md" />
          <ActivityAmount>
            <Typography specs={{ variant: "label2", type: "medium" }} color="primary01">
              +100 $CUNHA
            </Typography>
            <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
              $10.00
            </Typography>
          </ActivityAmount>
        </ActivityEntry>
        <ActivityEntry>
          <Avatar userId={1} occupation="Feb 6, 2023 7.30 am" name="David Cunha" size="md" />
          <ActivityAmount>
            <Typography specs={{ variant: "label2", type: "medium" }} color="primary01">
              +100 $CUNHA
            </Typography>
            <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
              $10.00
            </Typography>
          </ActivityAmount>
        </ActivityEntry>
      </RecentActivityContainer>
      <FooterActions>
        <Button hierarchy="primary" size="large" text="Earn TAL" isStretched />
        <Button hierarchy="tertiary" size="large" text="Buy TAL" isStretched />
      </FooterActions>
    </Container>
  );
};
