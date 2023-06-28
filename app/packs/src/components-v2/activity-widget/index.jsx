import React, { createRef, useCallback, useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Input, Typography } from "@talentprotocol/design-system";
import {
  ActivityContainer,
  Container,
  FilterContainer,
  LoadMoreContainer,
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
import dayjs from "dayjs";
import { Activity } from "./activity";

const ACTIVITY_TYPE_TO_TITLE_MAP = {
  "Activities::CareerUpdate": "Career Update",
  "Activities::TokenLaunch": "Token Launch",
  "Activities::Stake": "Stake",
  "Activities::Sponsor": "Sponsor",
  "Activities::Subscribe": "Subscribe"
};

let inputRefs = [];
const perPage = 8;

const DROPDOWN_OPTIONS = [
  { type: undefined, value: "All" },
  { type: "Activities::CareerUpdate", value: "Updates" },
  { type: "Activities::TokenLaunch", value: "Token Launches" },
  { type: "Activities::Stake", value: "Staking" },
  { type: "Activities::Sponsor", value: "Sponsors" },
  { type: "Activities::Subscribe", value: "Subscribes" }
];

export const ActivityWidget = ({ profile = {} }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activity, setActivity] = useState({
    activities: [],
    pagination: {
      total: 0,
      cursor: undefined
    }
  });
  const [filter, setFilter] = useState(DROPDOWN_OPTIONS[0]);
  const [inputsWithContent, setInputsWithContent] = useState([]);
  const loadMore = useCallback(
    tempFilterType => {
      const filter = typeof tempFilterType === "string" ? tempFilterType : undefined;
      activityService
        .getActivity(perPage, activity.pagination.cursor, filter)
        .then(({ data }) => {
          const recentActivities = [...data.activities];
          setActivity({
            ...data,
            activities: filter ? [...recentActivities] : [...activity.activities, ...recentActivities]
          });
          setInputsWithContent(new Array(data.activities.length).fill(false));
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
        });
    },
    [setActivity, setIsLoading, setInputsWithContent, activity, filter]
  );
  useEffect(() => {
    inputRefs = [];
    loadMore();
  }, []);
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
      <Container id="activity-widget">
        <TitleRow>
          <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
            Activity
          </Typography>
          <FilterContainer>
            <Typography specs={{ variant: "label2", type: "regular" }} color="primary03">
              Filter by:
            </Typography>
            <Dropdown
              options={DROPDOWN_OPTIONS}
              selectedOption={filter}
              selectOption={option => {
                if (option.type !== filter.type) {
                  setFilter(option);
                  loadMore(option.type);
                }
              }}
            />
          </FilterContainer>
        </TitleRow>
        <UpdatesContainer>
          {activity.activities.map((update, index) => {
            let content = update.content.message;
            if (update.type === "Activities::CareerUpdate") {
              content = update.content.message;
            }
            inputRefs.push(createRef(null));
            return (
              <Update key={update.id}>
                <UpdateTitle>
                  <TitleDateWrapper>
                    <Avatar
                      size="sm"
                      name={update.origin_user.name}
                      isVerified={update.origin_user.verified}
                      url={update.origin_user.profile_picture_url}
                      profileURL={`/u/${update.origin_user.username}`}
                    />
                    <Typography specs={{ variant: "p2", type: "regular" }} color="primary04">
                      {dayjs(update.created_at).fromNow()}
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
                    {ACTIVITY_TYPE_TO_TITLE_MAP[update.type]}
                  </Typography>
                  <ActivityContainer>
                    <Activity content={content} originUser={update.origin_user} targetUser={update.target_user} />
                  </ActivityContainer>
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
          {activity.pagination.cursor && (
            <LoadMoreContainer>
              <Button hierarchy="secondary" size="medium" text="Load more" onClick={loadMore} />
            </LoadMoreContainer>
          )}
        </UpdatesContainer>
      </Container>
    )
  );
};
