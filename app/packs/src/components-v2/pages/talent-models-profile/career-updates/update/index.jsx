import { Avatar, Button, Input, Typography } from "@talentprotocol/design-system";
import React from "react";
import { AvatarHeader, Container, ReplyArea } from "./styled";

export const Update = () => (
  <Container>
    <AvatarHeader>
      <Avatar size="md" />
      <Typography specs={{ variant: "label2", type: "medium" }} color="primary01">Pedro Goncalves</Typography>
      <Typography specs={{ variant: "p2", type: "regular" }} color="primary04">45m</Typography>
    </AvatarHeader>

    <Typography specs={{ variant: "p2", type: "regular" }} color="primary04">I'm starting learning 3D modeling in Blender to complement my UI's better and create 3D digital assets like Tokens, Landscapes, NFTs, and many more!</Typography>
    <ReplyArea>
      <Input placeholder="Reply..." />
      <Button hierarchy="secondary" size="medium" leftIcon="flame" />
    </ReplyArea>
  </Container>
);
