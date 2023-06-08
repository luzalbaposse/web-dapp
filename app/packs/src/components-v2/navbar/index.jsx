import { TalentThemeProvider, Typography } from "@talentprotocol/design-system";
import React from "react";
import { Container, InnerContainer, Link, LinksList } from "./styled";

export const NavBar = () => {
  return (
    <Container>
        <InnerContainer>
      <LinksList>
        <Link href="/talent">
          <Typography specs={{ variant: "label2", type: "medium" }} color="primary03">
            Explore
          </Typography>
        </Link>
        <Link href="/portfolio">
          <Typography specs={{ variant: "label2", type: "medium" }} color="primary03">
            Portfolio
          </Typography>
        </Link>
        <Link href="/connection">
          <Typography specs={{ variant: "label2", type: "medium" }} color="primary03">
            Connections
          </Typography>
        </Link>
        <Link href="/messages">
          <Typography specs={{ variant: "label2", type: "medium" }} color="primary03">
            Messages
          </Typography>
        </Link>
        <Link href="/earn">
          <Typography specs={{ variant: "label2", type: "medium" }} color="primary03">
            Earn
          </Typography>
        </Link>
      </LinksList>
        </InnerContainer>
    </Container>
  );
};

export default (props, railsContext) => {
  return () => (
    <TalentThemeProvider>
      <NavBar {...props} railsContext={railsContext} />
    </TalentThemeProvider>
  );
};
