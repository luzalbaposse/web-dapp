import React, { useEffect, useMemo } from "react";

import { get } from "src/utils/requests";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

import TalentProfilePicture from "../talent/TalentProfilePicture";
import ThemedButton from "src/components/design_system/button";
import { P2, P3 } from "src/components/design_system/typography";
import TextInput from "src/components/design_system/fields/textinput";
import { Search } from "src/components/icons";
import { buildColor, Tabs, useTabs } from "@talentprotocol/design-system";

const lastMessageText = lastMessage => {
  if (lastMessage) {
    return lastMessage.length > 30 ? `${lastMessage.substring(0, 28)}...` : lastMessage;
  } else {
    return "";
  }
};

const ChatMessage = ({ chat, activeUserUsername, onClick }) => {
  const message = lastMessageText(chat.last_message_text);
  const active = chat.receiver_username == activeUserUsername ? " active" : "";

  const displayTime = () => {
    if (chat.last_message_at) {
      return dayjs(chat.last_message_at).fromNow();
    } else {
      return "";
    }
  };

  return (
    <a className={`pt-3 pl-6 pr-6 chat-user ${active} text-reset`} onClick={() => onClick(chat.receiver_username)}>
      <div className="d-flex flex-row justify-content-between themed-border-bottom">
        <TalentProfilePicture src={chat.receiver_profile_picture_url} height={48} />
        <div className="d-flex flex-column w-100 h-100 pl-2 pb-3 ml-2">
          <div style={{ minHeight: 48 }}>
            <div className="d-flex flex-row justify-content-between">
              <div className="d-flex flex-row">
                <P2 text={chat.receiver_username} bold className="mr-2" />
              </div>
              <P3 text={displayTime()} />
            </div>
            <div className="d-flex flex-row mb-0 justify-content-between">
              <P2 text={message} className="mr-2" />
              <UnreadMessagesCount count={chat.unread_messages_count} />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

const UnreadMessagesCount = ({ count }) => {
  count ||= 0;

  if (count > 0) {
    const value = count > 99 ? "+99" : count.toString();
    return <span className="chat-unread-count">{value}</span>;
  } else {
    return null;
  }
};

const EmptyChats = ({ mode }) => (
  <div className="w-100 p-3 themed-border-top d-flex flex-column align-items-center">
    <ThemedButton onClick={() => (window.location.href = "/talent")} type="primary-default" mode={mode}>
      Browse Talent
    </ThemedButton>
  </div>
);

const tabs = ["Connections", "Unread", "All"];

const TAB_INDEX_TO_NAME = {
  0: "Connections",
  1: "Unread",
  2: "All"
};

const TAB_NAME_TO_INDEX = {
  connections: 0,
  unread: 1,
  all: 2
};

const MessageUserList = ({
  chats,
  setChats,
  setPagination,
  activeUserUsername,
  onClick,
  mode,
  loadMoreChats,
  showLoadMoreChats,
  searchChats,
  searchValue
}) => {
  const tabState = useTabs();

  const sortedChats = useMemo(() => {
    return chats.sort((a, b) => (Date.parse(a.last_message_at) < Date.parse(b.last_message_at) ? 1 : -1));
  }, [chats, activeUserUsername]);

  const changeTab = index => {
    const url = new URL(document.location);
    const tab = TAB_INDEX_TO_NAME[index].toLowerCase();
    url.searchParams.set("tab", tab);
    history.pushState({}, "", url);
    tabState.selectElement(index);
    const q = url.searchParams.get("q") || "";

    get(`messages?tab=${tab}&q=${q}`).then(response => {
      setChats(response.chats);
      setPagination(response.pagination);
    });
  };

  useEffect(() => {
    const url = new URL(document.location);
    const tab = url.searchParams.get("tab") || "";
    if (tab) {
      tabState.selectElement(TAB_NAME_TO_INDEX[tab]);
    }
  }, []);

  return (
    <>
      <div className="d-flex flex-column align-items-stretch lg-overflow-y-scroll" style={{ paddingBottom: "32px" }}>
        <div className="w-100 d-flex flex-row align-items-center py-4 pl-6 pr-6">
          <div className="position-relative w-100">
            <TextInput
              disabled={chats.length == 0 && searchValue.length == 0}
              onChange={e => searchChats(e.target.value)}
              placeholder="Search in messages..."
              inputClassName="pl-5"
              className="w-100"
              defaultValue={searchValue}
            />
            <Search color="currentColor" className="position-absolute chat-search-icon" />
          </div>
        </div>
        <div className="themed-border-bottom pb-2 pl-6">
          <Tabs
            selectedIndex={tabState.selectedIndex}
            onClick={changeTab}
            tabList={tabs}
            disabledList={[false, false]}
          />
        </div>
        {chats.length == 0 && searchValue.length == 0 && <EmptyChats mode={mode} />}
        <div className="w-100 d-flex flex-column lg-overflow-y-scroll lg-h-50">
          {sortedChats.map(chat => (
            <ChatMessage
              onClick={onClick}
              key={`user-message-list-${chat.receiver_username}`}
              chat={chat}
              activeUserUsername={activeUserUsername}
              mode={mode}
            />
          ))}
          {showLoadMoreChats && (
            <ThemedButton
              onClick={() => loadMoreChats()}
              type="white-subtle"
              mode={mode}
              style={{
                margin: "auto",
                marginTop: "32px",
                boxShadow: `0px 0px 0px 3px ${buildColor("primaryTint02")};`
              }}
            >
              Load more
            </ThemedButton>
          )}
        </div>
      </div>
    </>
  );
};

export default MessageUserList;
