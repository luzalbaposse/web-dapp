import React, { useMemo } from "react";
import { Container, LinkItem, LinksList } from "./styled";
import { Button, TextLink, Typography } from "@talentprotocol/design-system";

const LINK_TYPE_TO_ICON = {
  Website: "globe",
  GitHub: "github",
  Linkedin: "linkedin",
  Twitter: "twitter",
  Lens: "lens",
  Mastodon: "mastodon",
  Telegram: "telegram",
  Discord: "discord"
};

const LINK_DTO = {
  Website: (link) => link,
  GitHub: (link) => link,
  Linkedin: (link) => link,
  Twitter: (link) => link,
  Lens: (link) => link,
  Mastodon: (link) => link,
  Telegram: (link) => {
    if (link.length > 0 && link[0] == "@") {
      const newLink = "https://t.me/" + link.substring(1);
      return newLink;
    } else if (link.length > 0 && link.includes("t.me")) {
      return link;
    } else {
      return "https://t.me/" + link;
    }
  },
  Discord: (link) => {
    if (link.length > 0 && link.includes("discordapp.com")) {
      return link;
    } else {
      return `https://discordapp.com/users/${link}`;
    }
  }
};

export const OnTheWeb = ({ links }) => {
  if (!links.some(linkObject => !!linkObject.link)) return <></>;
  const renderedLinks = useMemo(
    () =>
      links.reduce((acc, linkObject) => {
        if (!!linkObject.link) {
          acc.push(
            <LinkItem key={linkObject.link}>
              <Button
                hierarchy="secondary"
                size="small"
                leftIcon={LINK_TYPE_TO_ICON[linkObject.type]}
                iconColor="primary03"
                href={LINK_DTO[linkObject.type](linkObject.link)}
                newPage
              />
              <TextLink color="primary01" size="small" text={linkObject.type} href={LINK_DTO[linkObject.type](linkObject.link)} newPage />
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
