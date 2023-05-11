import React, { createRef, useCallback, useEffect, useState } from "react";
import { Avatar, Button, Input, Typography } from "@talentprotocol/design-system";
import {
  Container,
  LoadMoreContainer,
  ReplyArea,
  StyledTypography,
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
  "Activities::CareerUpdate": "Career Update",
  "Activities::TokenLaunch": "Token Launch",
  "Activities::ProfileComplete": "Profile Complete",
  "Activities::Stake": "Stake",
  "Activities::Sponsor": "Sponsor",
  "Activities::Subscribe": "Subscribe"
};

let activityPage = 0;

export const ActivityWidget = ({ profile = {} }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activity, setActivity] = useState({
    activities: [],
    pagination: {
      lastPage: 1
    }
  });
  const [inputsWithContent, setInputsWithContent] = useState([]);
  const inputRefs = [];
  const loadMore = useCallback(() => {
    activityPage = activityPage + 1;
    activityService
      .getActivity(activityPage)
      .then(({ data }) => {
        const recentActivities = [...data.activities];
        setActivity({
          ...data,
          activities: [...recentActivities, ...activity.activities]
        });
        setInputsWithContent(new Array(data.activities.length).fill(false));
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, [setActivity, setIsLoading, setInputsWithContent]);
  useEffect(() => {
    loadMore();
  }, [loadMore]);
  const sendMessage = useCallback((to, inputRef) => {
    messagesService
      .sendMessage(to, inputRef.current.value || "🔥")
      .then(() => {
        inputRef.current.value = "";
        toast.success("Message sent");
      })
      .catch(err => {
        console.error(err);
        toast.error("Error sending message", { autoClose: 5000 });
      });
  }, []);
  const onInputChange = useCallback(
    (updatedRef, updateIndex) => {
      if (updatedRef.current.value && !inputsWithContent[updateIndex]) {
        const inputsWithContentCopy = [...inputsWithContent];
        inputsWithContentCopy[updateIndex] = true;
        setInputsWithContent(inputsWithContentCopy);
      } else if (!updatedRef.current.value && inputsWithContent[updateIndex]) {
        const inputsWithContentCopy = [...inputsWithContent];
        inputsWithContentCopy[updateIndex] = false;
        setInputsWithContent(inputsWithContentCopy);
      }
    },
    [inputsWithContent, setInputsWithContent]
  );
  return (
    !isLoading && (
      <Container>
        <TitleRow>
          <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
            Activity
          </Typography>
        </TitleRow>
        <UpdatesContainer>
          {activity.activities.map((update, index) => {
            let content = update.content.message;
            console.log(update);
            if (update.type === "Activities::CareerUpdate") {
              content = update.content.message;
            }
            console.log(content)
            inputRefs.push(createRef(null));
            return (
              <Update key={update.id}>
                <UpdateTitle>
                  <TitleDateWrapper>
                    <Avatar
                      size="sm"
                      name={update.origin_user.username}
                      isVerified={true}
                      url={update.origin_user.profile_picture_url}
                      profileURL={`/u/${update.origin_user.username}`}
                    />
                    <Typography specs={{ variant: "p2", type: "regular" }} color="primary04">
                      {new Date(update.created_at).toLocaleDateString()}
                    </Typography>
                  </TitleDateWrapper>
                  <Button
                    hierarchy="primary"
                    size="small"
                    text="Support"
                    href={`/u/${update.origin_user.username}/support`}
                  />
                </UpdateTitle>
                <UpdateContent>
                  <Typography specs={{ variant: "p1", type: "medium" }} color="primary01">
                    {ACTIVITY_TYPE_TO_TITLE_MAP[update.type]}.
                  </Typography>
                  <StyledTypography specs={{ variant: "p2", type: "regular" }} color="primary03">
                    {content}
                  </StyledTypography>
                  {profile.username !== update.origin_user.username && (
                    <ReplyArea>
                      <Input
                        placeholder="Reply directly..."
                        inputRef={inputRefs[index]}
                        onChange={() => {
                          onInputChange(inputRefs[index], index);
                        }}
                        onEnterCallback={() => sendMessage(update.origin_user.id, inputRefs[index])}
                      />
                      <Button
                        hierarchy="secondary"
                        size="medium"
                        leftIcon={!inputsWithContent[index] ? "flame" : "send"}
                        iconColor={"primary01"}
                        onClick={() => sendMessage(update.origin_user.id, inputRefs[index])}
                      />
                    </ReplyArea>
                  )}
                </UpdateContent>
              </Update>
            );
          })}
          {
            activityPage < activity.pagination.lastPage && (
              <LoadMoreContainer>
                <Button
                  hierarchy="secondary"
                  size="medium"
                  text="Load more"
                  onClick={loadMore}
                />
              </LoadMoreContainer>
            )
          }
        </UpdatesContainer>
      </Container>
    )
  );
};
