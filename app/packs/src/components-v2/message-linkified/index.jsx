import React, { useState } from "react";
import { LinkIt, urlRegex } from "react-linkify-it";
import { useModal } from "@talentprotocol/design-system";
import { PhisingAwarenessModal } from "./phishing-awareness-modal";

export const MessageLinkified = ({ message, mine }) => {
  const hasPhishingAwarenessDisabled = sessionStorage.getItem("phishing-awareness-disabled") === "true";

  const modalState = useModal();
  const [url, setUrl] = useState("");

  const handleClick = e => {
    if (mine || hasPhishingAwarenessDisabled) {
      return;
    }
    e.preventDefault();
    setUrl(e.target.href);
    modalState.openModal();
  };

  return (
    <LinkIt
      component={(match, key) => {
        let url = match;
        if (!/^https?:\/\//i.test(url)) {
          url = "https://" + url;
        }
        return (
          <a href={url} key={key} target="_blank" onClick={handleClick}>
            {match}
          </a>
        );
      }}
      regex={urlRegex}
    >
      {!mine && !hasPhishingAwarenessDisabled && <PhisingAwarenessModal url={url} modalState={modalState} />}
      {message}
    </LinkIt>
  );
};
