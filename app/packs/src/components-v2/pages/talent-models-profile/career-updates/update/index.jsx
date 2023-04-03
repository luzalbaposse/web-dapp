import React, { useState } from "react";
import { Avatar, Button, Input, Typography } from "@talentprotocol/design-system";
import dayjs from "dayjs";
import { AvatarHeader, Container, ReplyArea } from "./styled";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { post } from "src/utils/requests";

import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";

import debounce from "lodash/debounce";

dayjs.extend(customParseFormat);

export const Update = ({ data, profile, isCurrentUserProfile }) => {
  const [message, setMessage] = useState("");

  const sendNewMessage = () => {
    if (message.replace(/\s+/g, "") == "") {
      return;
    }

    post("/messages", { id: profile.user.uuid, message }).then(response => {
      if (response.error) {
        toast.error(<ToastBody heading="Error!" body={response.error} />, { autoClose: 5000 });
      } else {
        toast.success(<ToastBody heading="Success!" body={"Your reply was sent!"} />, { autoClose: 5000 });
      }
    });
  };

  const debouncedNewMessage = debounce(() => sendNewMessage(), 200);

  return (
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
      {!isCurrentUserProfile && (
        <ReplyArea>
          <Input
            placeholder="Reply..."
            onChange={e => setMessage(e.target.value)}
            value={message}
            isDisabled={isCurrentUserProfile}
          />
          <Button
            hierarchy="secondary"
            size="medium"
            leftIcon="flame"
            onClick={debouncedNewMessage}
            isDisabled={isCurrentUserProfile}
          />
        </ReplyArea>
      )}
    </Container>
  );
};
