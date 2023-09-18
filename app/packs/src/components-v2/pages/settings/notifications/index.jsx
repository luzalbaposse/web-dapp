import React from "react";
import { Container, Row, Row16Gap, SwitchContainer } from "./styled";
import { Checkbox, Switch, Typography } from "@talentprotocol/design-system";

export const NotificationsForm = () => {
  return (
    <Container>
      <Row>
        <Typography specs={{ type: "regular", variant: "p2" }} color="primary03">
          Get emails to find out what’s going on when you’re not on Talent Protocol. You can turn them off anytime.
        </Typography>
        <SwitchContainer>
          <Switch isChecked />
          <Typography specs={{ type: "regular", variant: "p2" }} color="primary01">
            Turn off all Email Notifications
          </Typography>
        </SwitchContainer>
      </Row>
      <Row16Gap>
        <Typography specs={{ type: "medium", variant: "p1" }} color="primary01">
          General
        </Typography>
        <Checkbox label="Direct messages" />
        <Checkbox label="Career Updates" />
        <Checkbox label="Subscriber requests" />
        <Checkbox label="Other notifications" />
      </Row16Gap>
      <Row16Gap>
        <Typography specs={{ type: "medium", variant: "p1" }} color="primary01">
          From Talent Protocol
        </Typography>
        <Checkbox label="News about Talent Protocol product and feature updates" />
        <Checkbox label="Participation in research surveys and beta testing" />
      </Row16Gap>
      <Row16Gap>
        <Typography specs={{ type: "medium", variant: "p1" }} color="primary01">
          System Email Notifications
        </Typography>
        <Typography specs={{ type: "regular", variant: "p2" }} color="primary03">
          System notifications are necessary to maintain system sanity, privacy and safety of Talent Protocol members.
          By default Talent Protocol will send you system, privacy and security related email notifications, for
          example:
          <ul>
            <li>When there is a reset password request, password changed, etc.</li>
            <li>Updates to our Privacy Policy, Code of Conduct and Terms of Use.</li>
            <li>When we notice any unusual activity related to your account.</li>
          </ul>
        </Typography>
      </Row16Gap>
    </Container>
  );
};
