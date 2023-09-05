import React, { createRef, useEffect, useCallback, useState } from "react";
import { Avatar, Button, Input, Spinner, Typography, Tag } from "@talentprotocol/design-system";
import {
  ActivityContainer,
  LoadMoreContainer,
  ReplyArea,
  TitleDateWrapper,
  Update,
  UpdateContent,
  UpdateTitle,
  UpdatesContainer,
  TagContainer
} from "./styled";
import dayjs from "dayjs";
import { Activity } from "../activity-wall/activity";
import { toast } from "react-toastify";
import { messagesService } from "src/api/messages";
import { ACTIVITY_TYPE_TO_TITLE_MAP } from "./constants";

let inputRefs = [];

export const Activities = ({ data, isLoading, loadMore, filter, profileUsername = "", withSupportButton = true }) => {
  const [hasSentMessage, setHasSentMessage] = useState({});
  const [inputsWithContent, setInputsWithContent] = useState([]);

  const sendMessage = useCallback((update, inputRef) => {
    messagesService
      .sendMessage(update.origin_user.id, inputRef.current.value || "🔥")
      .then(() => {
        if (!inputRef.current.value) {
          setHasSentMessage(prev => ({ ...prev, [update.id]: true }));
        }
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

  useEffect(() => {
    if (data?.activities?.length > 0) {
      setHasSentMessage(
        data.activities.reduce((result, { id }) => {
          result[id] = false;

          return result;
        }, {})
      );
      setInputsWithContent(new Array(data.activities.length).fill(false));
    }
  }, [data?.activities]);

  return (
    <UpdatesContainer>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {data.activities.map((update, index) => {
            let content = update.content.message;
            if (update.type === "Activities::CareerUpdate") content = update.content.message;
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
                  {withSupportButton && (
                    <Button
                      hierarchy="primary"
                      size="small"
                      text="Subscribe"
                      href={`/u/${update.origin_user.username}`}
                    />
                  )}
                </UpdateTitle>
                <UpdateContent>
                  {update.type === "Activities::CareerUpdate" && (
                    <TagContainer>
                      <Tag
                        size="small"
                        color="surfaceHover02"
                        label={ACTIVITY_TYPE_TO_TITLE_MAP[update.type]}
                        borderColor="surfaceHover02"
                        textColor="primary02"
                      />
                    </TagContainer>
                  )}
                  <ActivityContainer>
                    <Activity content={content} originUser={update.origin_user} targetUser={update.target_user} />
                  </ActivityContainer>
                  {profileUsername &&
                    profileUsername !== update.origin_user.username &&
                    update.type === "Activities::CareerUpdate" && (
                      <ReplyArea>
                        <Input
                          placeholder="Reply directly..."
                          inputRef={inputRefs[index]}
                          onChange={() => {
                            onInputChange(inputRefs[index], index);
                          }}
                          onEnterCallback={() => sendMessage(update, inputRefs[index])}
                        />
                        <Button
                          hierarchy="secondary"
                          size="medium"
                          leftIcon={"send"}
                          iconColor={"primary01"}
                          isDisabled={hasSentMessage[update.id]}
                          onClick={() => sendMessage(update, inputRefs[index])}
                        />
                      </ReplyArea>
                    )}
                </UpdateContent>
              </Update>
            );
          })}
          {data.pagination.cursor && (
            <LoadMoreContainer>
              <Button hierarchy="secondary" size="medium" text="Load more" onClick={() => loadMore(filter.type)} />
            </LoadMoreContainer>
          )}
        </>
      )}
    </UpdatesContainer>
  );
};
