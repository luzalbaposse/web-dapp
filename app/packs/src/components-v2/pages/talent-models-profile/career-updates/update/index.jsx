import { Avatar, Button, Input, Typography } from "@talentprotocol/design-system";
import dayjs from "dayjs";
import React from "react";
import { AvatarHeader, Container, ReplyArea } from "./styled";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const Update = ({ data, profile }) => (
  <Container>
    <AvatarHeader>
      <Avatar size="md" url={profile.profile_picture_url} />
      <Typography specs={{ variant: "label2", type: "medium" }} color="primary01">
        {profile.user.legal_first_name} {profile.user.legal_last_name}
      </Typography>
      <Typography specs={{ variant: "p2", type: "regular" }} color="primary04">
        {dayjs(data.created_at).format("MMM D, YYYY, h:mm A")}
      </Typography>
    </AvatarHeader>
    <Typography specs={{ variant: "p2", type: "regular" }} color="primary04">
      {data.message}
    </Typography>
    <ReplyArea>
      <Input placeholder="Reply..." />
      <Button hierarchy="secondary" size="medium" leftIcon="flame" />
    </ReplyArea>
  </Container>
);
