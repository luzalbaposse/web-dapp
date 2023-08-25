import React from "react";
import { Container, LinksArea, LinksRow } from "./styled";
import { Input, TextArea, Typography } from "@talentprotocol/design-system";

export const AboutForm = () => {
  return (
    <Container>
      <TextArea label="About me" placeholder="You can write about your experience, passions or achievements." />
      <Typography specs={{ type: "medium", variant: "p1" }} color="primary01">
        On The Web
      </Typography>
      <div>Insert tabs component here</div>
      <LinksArea>
        <LinksRow>
          <Input label="Personal Website" placeholder="www." />
          <Input label="Twitter" placeholder="twitter.com/" />
        </LinksRow>
        <LinksRow>
          <Input label="LinkedIn" placeholder="linkedin.com/in/" />
          <Input label="Figma" placeholder="figma.com/@" />
        </LinksRow>
        <LinksRow>
          <Input label="Behance" placeholder="behance.net/" />
          <Input label="Youtube" placeholder="youtube.com/" />
        </LinksRow>
      </LinksArea>
    </Container>
  );
};
