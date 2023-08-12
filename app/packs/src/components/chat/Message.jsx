import React from "react";
import dayjs from "dayjs";
import cx from "classnames";
import { Tag } from "@talentprotocol/design-system";
import Divider from "src/components/design_system/other/Divider";

import TalentProfilePicture from "../talent/TalentProfilePicture";
import { P2, P3 } from "src/components/design_system/typography";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { MessageLinkified } from "src/components-v2/message-linkified";

dayjs.extend(customParseFormat);

const Message = props => {
  const { message, mine, profilePictureUrl, username, profileLink, previousMessageSameUser, user, userId } = props;

  const sentDate = dayjs(message.created_at).format("MMM D, YYYY, h:mm A");

  return (
    <div className="d-flex flex-row w-100 mt-2 message-div">
      {!previousMessageSameUser && (
        <TalentProfilePicture
          src={mine ? user.profile_picture_url : profilePictureUrl}
          userId={userId}
          link={profileLink}
          height={48}
          className="mb-auto mt-3"
        />
      )}
      <div className={`d-flex flex-column w-100 ${previousMessageSameUser ? "messages-from-same-user" : "ml-3"}`}>
        {!previousMessageSameUser && (
          <div className="d-flex flex-row w-100 align-items-center mt-3">
            <P2 bold text={mine ? user.username : username} className="mb-0 text-primary" />
            <P3 text={sentDate} className="mb-0 ml-2" />
          </div>
        )}
        {message.from_career_update && (
          <div style={{ width: "144px" }}>
            <Tag
              backgroundColor="bg01"
              label="Career update"
              leftIcon="mailbox"
              textColor="primary02"
              size="small"
              borderColor="surfaceHover02"
            />
          </div>
        )}
        <P2 className={cx("text-white-space-wrap", message.from_career_update && "my-3")}>
          <MessageLinkified message={message.text} mine={mine} />
        </P2>
        {message.from_career_update && <Divider />}
      </div>
    </div>
  );
};

export default Message;
