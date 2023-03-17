import { Typography } from "@talentprotocol/design-system";
import React from "react";
import { Container, TitleContainer } from "./styled";
import { Update } from "./update";

export const CareerUpdates = () => (
  <Container>
    <TitleContainer>
      <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
          Pedro’s last career update was sent in February
      </Typography>
    </TitleContainer>
    <Update />
    <Update />
    <Update />
  </Container>
);
