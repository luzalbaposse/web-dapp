import React from "react";
import { Container, LinkItem, LinksList } from "./styled";
import { Button, Typography } from "@talentprotocol/design-system";

export const OnTheWeb = ({}) => {
  return (
    <Container>
      <Typography specs={{ type: "medium", variant: "p1" }} color="primary01">
        On the web
      </Typography>
      <LinksList>
        <LinkItem>
          <Button hierarchy="secondary" size="small" leftIcon="discord" iconColor="primary03" />
          <Typography specs={{ type: "regular", variant: "p2" }} color="primary01">
            On the web
          </Typography>
        </LinkItem>
        <LinkItem>
          <Button hierarchy="secondary" size="small" leftIcon="discord" iconColor="primary03" />
          <Typography specs={{ type: "regular", variant: "p2" }} color="primary01">
            On the web
          </Typography>
        </LinkItem>
        <LinkItem>
          <Button hierarchy="secondary" size="small" leftIcon="discord" iconColor="primary03" />
          <Typography specs={{ type: "regular", variant: "p2" }} color="primary01">
            On the web
          </Typography>
        </LinkItem>
        <LinkItem>
          <Button hierarchy="secondary" size="small" leftIcon="discord" iconColor="primary03" />
          <Typography specs={{ type: "regular", variant: "p2" }} color="primary01">
            On the web
          </Typography>
        </LinkItem>
        <LinkItem>
          <Button hierarchy="secondary" size="small" leftIcon="discord" iconColor="primary03" />
          <Typography specs={{ type: "regular", variant: "p2" }} color="primary01">
            On the web
          </Typography>
        </LinkItem>
      </LinksList>
    </Container>
  );
};
