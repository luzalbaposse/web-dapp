import React, { useState } from "react";
import dayjs from "dayjs";
import Modal from "react-bootstrap/Modal";
import { LinkIt, LinkItEmail, urlRegex } from "react-linkify-it";
import cx from "classnames";
import { Tag } from "@talentprotocol/design-system";
import Divider from "src/components/design_system/other/Divider";

import TalentProfilePicture from "../talent/TalentProfilePicture";
import { P1, P2, P3 } from "src/components/design_system/typography";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export const PhisingAwarenessModal = ({ show, hide, url }) => (
  <Modal show={show} onHide={hide} centered dialogClassName="remove-background">
    <Modal.Body className="p-4" style={{ "word-wrap": "break-word" }}>
      <P1 bold text="Before you go" className="mb-4"></P1>
      <P2
        text="Always double check that the links that were sent to you are legitimate. It's a dangerous world out there."
        className="mb-2"
      ></P2>
      <a className="mb-6" href={url}>
        {url}
      </a>
      <div className="d-flex flex-row justify-content-between align-items-center mt-4">
        <button className="talent-button white-subtle-button normal-size-button w-100 mr-2" onClick={hide}>
          Cancel
        </button>
        <a
          className="btn talent-button primary-default-button normal-size-button w-100 ml-2"
          href={url}
          target="_blank"
          onClick={hide}
        >
          I Understand
        </a>
      </div>
    </Modal.Body>
  </Modal>
);

const MessageLinkified = props => {
  const [showPishingModal, setShowPishingModal] = useState(false);
  const [url, setUrl] = useState("");

  const { message, mine } = props;

  const handleClick = (e /*, url*/) => {
    if (mine) {
      return;
    }
    e.preventDefault();
    setShowPishingModal(true);
    setUrl(e.target.href);
  };

  return (
    <LinkIt
      className={message.from_career_update && "ml-2"}
      component={(match, key) => (
        <a href={match} key={key} target="_blank" onClick={handleClick}>
          {match}
        </a>
      )}
      regex={urlRegex}
    >
      <LinkItEmail>
        {!mine && <PhisingAwarenessModal url={url} show={showPishingModal} hide={() => setShowPishingModal(false)} />}
        {message}
      </LinkItEmail>
    </LinkIt>
  );
};

const Message = props => {
  const { message, mine, profilePictureUrl, username, profileLink, previousMessageSameUser, user, userId } = props;

  const sentDate = dayjs(message.created_at).format("MMM D, YYYY, h:mm A");

  return (
    <div className="d-flex flex-row w-100 mt-2 message-div">
      {!previousMessageSameUser && (
        <TalentProfilePicture
          src={mine ? user.profilePictureUrl : profilePictureUrl}
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
