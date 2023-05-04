import React, { useCallback, useEffect, useRef } from "react";
import { Avatar, Button, Input, Typography } from "@talentprotocol/design-system";
import {
  Container,
  ReplyArea,
  TitleDateWrapper,
  TitleRow,
  Update,
  UpdateContent,
  UpdateTitle,
  UpdatesContainer
} from "./styled";
import { activityService } from "../../api/activity";
import { toast } from "react-toastify";
import { messagesService } from "../../api/messages";

const ACTIVITY_TYPE_TO_TITLE_MAP = {
  1: "Career Update"
}

export const ActivityWidget = ({ profile = {} }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [activity, setActivity] = React.useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    activityService
      .getActivity()
      .then(({ data }) => {
        setActivity(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, [setActivity, setIsLoading]);
  
  const sendMessage = useCallback(() => {
    if (!inputRef.current.value) {
      toast.error("Please enter a message", { autoClose: 5000 });
    }
    messagesService
      .sendMessage(profile.id, inputRef.current.value)
      .then(({ data }) => {
        inputRef.current.value = "";
        toast.success("Message sent")
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error sending message", { autoClose: 5000 });
      });
  }, [inputRef, profile])

  return (
    !isLoading && (
      <Container>
        <TitleRow>
          <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
            Activity
          </Typography>
        </TitleRow>
        <UpdatesContainer>
          {activity.map(update => {
            const content = JSON.parse(update.content);
            return (
              <Update key={update.id}>
                <UpdateTitle>
                  <TitleDateWrapper>
                    <Avatar size="sm" name={update.origin_user.username} isVerified={true} url={update.origin_user.profile_picture_url} />
                    <Typography specs={{ variant: "p2", type: "regular" }} color="primary04">
                      {new Date(update.created_at).toLocaleDateString()}
                    </Typography>
                  </TitleDateWrapper>
                  <Button hierarchy="primary" size="small" text="Support" href={`/u/${update.origin_user.username}/support`} />
                </UpdateTitle>
                <UpdateContent>
                  <Typography specs={{ variant: "p1", type: "medium" }} color="primary01">
                    {ACTIVITY_TYPE_TO_TITLE_MAP[update.activity_type_id]}.
                  </Typography>
                  <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
                    {content.message}
                  </Typography>
                  {profile.username !== update.origin_user.username && (
                    <ReplyArea>
                      <Input placeholder="Reply directly..." inputRef={inputRef} />
                      <Button hierarchy="secondary" size="medium" leftIcon="send" iconColor={"primary01"} onClick={sendMessage} />
                    </ReplyArea>
                  )}
                </UpdateContent>
              </Update>
            );
          })}
        </UpdatesContainer>
      </Container>
    )
  );
};
