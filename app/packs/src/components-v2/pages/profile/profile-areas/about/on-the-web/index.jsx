import React, { useMemo } from "react";
import { Container, LinkItem, LinksList } from "./styled";
import { Button, Typography } from "@talentprotocol/design-system";

export const OnTheWeb = ({ links }) => {
  const renderedLinks = useMemo(() =>
    links.reduce((acc, linkObject) => {
      if (!!linkObject.link) {
        acc.push(
          <LinkItem key={linkObject.link}>
            <Button
              hierarchy="secondary"
              size="small"
              leftIcon="discord"
              iconColor="primary03"
              href={linkObject.link}
            />
            <Typography specs={{ type: "regular", variant: "p2" }} color="primary01">
              {linkObject.type}
            </Typography>
          </LinkItem>
        );
      }
      return acc;
    }, []),
    [links]
  );
  return (
    <Container>
      <Typography specs={{ type: "medium", variant: "p1" }} color="primary01">
        On the web
      </Typography>
      <LinksList>{renderedLinks}</LinksList>
    </Container>
  );
};
