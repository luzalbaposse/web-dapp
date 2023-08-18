import React, { useMemo } from "react";
import { Container, LinkItem, LinksList } from "./styled";
import { Button, Typography } from "@talentprotocol/design-system";

const LINK_TYPE_TO_ICON = {
  Website: "globe",
  GitHub: "github",
  Linkedin: "linkedin",
  Twitter: "twitter",
  Lens: "lens",
  Mastodon: "globe",
  Telegram: "telegram",
  Discord: "discord"
};

export const OnTheWeb = ({ links }) => {
  if (!links.some(linkObject => !!linkObject.link)) return <></>;
  const renderedLinks = useMemo(() =>
    links.reduce((acc, linkObject) => {
      if (!!linkObject.link) {
        acc.push(
          <LinkItem key={linkObject.link}>
            <Button
              hierarchy="secondary"
              size="small"
              leftIcon={LINK_TYPE_TO_ICON[linkObject.type]}
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
