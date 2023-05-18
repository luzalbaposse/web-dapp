import React, { useEffect, useState, useContext, useCallback } from "react";
import debounce from "lodash/debounce";
import { loggedInUserStore } from "src/contexts/state";

import { post, get } from "src/utils/requests";
import { setupChannel, removeChannel } from "channels/message_channel";

import ThemeContainer, { ThemeContext } from "src/contexts/ThemeContext";

import MessageUserList from "./MessageUserList";
import MessageExchange from "./MessageExchange";
import { useWindowDimensionsHook } from "../../utils/window";
import { TalentThemeProvider } from "@talentprotocol/design-system";

const Chat = ({ chats, pagination }) => {
  const baseUrl = new URL(document.location);
  const [activeUserUsername, setActiveUserUsername] = useState(baseUrl.searchParams.get("user") || "");
  const [localChats, setLocalChats] = useState(chats);
  const [localPagination, setLocalPagination] = useState(pagination);
  const [perkId] = useState(baseUrl.searchParams.get("perk") || 0);
  const [activeChannel, setActiveChannel] = useState(null); // @TODO: Refactor chat
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [lastMessageId, setLastMessageId] = useState(0);
  const [searchValue, setSearchValue] = useState(baseUrl.searchParams.get("q") || "");
  const [chatId, setChatId] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [gettingMessages, setGettingMessages] = useState(false);
  const [messengerProfilePicture, setMessengerProfilePicture] = useState();
  const [messengerUsername, setMessengerUsername] = useState();
  const [lastOnline, setLastOnline] = useState();
  const { mobile } = useWindowDimensionsHook();
  const theme = useContext(ThemeContext);

  const { currentUser, fetchCurrentUser } = loggedInUserStore();

  const updateChats = (previousChats, newChat) => {
    const receiverIndex = previousChats.findIndex(chat => chat.receiver_username === newChat?.receiver_username);

    const newChats = [
      {
        ...previousChats[receiverIndex],
        ...newChat
      },
      ...previousChats.slice(0, receiverIndex),
      ...previousChats.slice(receiverIndex + 1)
    ];
    return newChats;
  };

  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser();
    }
  }, []);

  // Get user from URL
  useEffect(() => {
    if (activeUserUsername == "") {
      return;
    }

    if (activeUserUsername == currentUser?.username) {
      window.location.replace("/messages");
    }

    setGettingMessages(true);
    setMessage("");
    setMessages([]);

    get(`messages/${activeUserUsername}`).then(response => {
      setLocalChats(previousChats =>
        updateChats(
          previousChats,
          response.readChat || {
            receiver_username: response.username,
            last_message_text: "No messages exchanged yet.."
          }
        )
      );
      setMessages(response.messages);
      setLastMessageId(response.messages[response.messages.length - 1]?.id);
      setChatId(response.chat_id || "");
      setMessengerProfilePicture(response.profilePictureUrl);
      setMessengerUsername(response.username);
      setLastOnline(response.lastOnline);
      setGettingMessages(false);
    });
  }, [activeUserUsername]);

  useEffect(() => {
    if (perkId <= 0) {
      return;
    }

    get(`api/v1/perks/${perkId}`).then(response => {
      if (response.title) {
        setMessage(`Hi! I'm reaching out because of your perk "${response.title}"`);
      }
    });
  }, [perkId]);

  useEffect(() => {
    if (chatId != "") {
      setActiveChannel(setupChannel(chatId, getNewMessage));
    }

    return () => {
      if (activeChannel) {
        removeChannel(activeChannel);
      }
    };
  }, [chatId, messages]);

  useEffect(() => {
    const element = document.getElementById(`message-date-${lastMessageId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [lastMessageId, messages]);

  const getNewMessage = response => {
    setMessages([...messages, response.message]);
    setLastMessageId(response.message.id);
  };

  const sendNewMessage = () => {
    if (message.replace(/\s+/g, "") == "") {
      return;
    }

    setSendingMessage(true);

    post("/messages", { id: activeUserUsername, message }).then(response => {
      if (response.error) {
        console.log(response.error);
        // setError("Unable to send message, try again") // @TODO: Create error box (absolute positioned)
      } else {
        setLocalChats(previousChats => updateChats(previousChats, response.chat));
        setMessages([...messages, response.message]);
        setLastMessageId(response.message.id);
        setMessage("");
      }
      setSendingMessage(false);
    });
  };

  const debouncedNewMessage = debounce(() => sendNewMessage(), 200);

  const ignoreAndCallDebounce = e => {
    e.preventDefault();
    debouncedNewMessage();
  };

  const clearActiveUser = () => {
    setActiveUserUsername("");
    setMessages([]);
    setMessage("");
  };

  const setActiveUser = userUsername => {
    const url = new URL(document.location);
    setLocalChats(previousChats => {
      const index = previousChats.findIndex(chat => chat.receiver_username === userUsername);
      if (index > -1) {
        const newChats = [
          ...previousChats.slice(0, index),
          {
            ...previousChats[index],
            unreadMessagesCount: 0
          },
          ...previousChats.slice(index + 1)
        ];
        return newChats;
      } else {
        return previousChats;
      }
    });
    setActiveUserUsername(userUsername);

    url.searchParams.set("user", userUsername);
    window.history.pushState({}, "", url);
  };

  window.addEventListener("popstate", () => {
    const params = new URLSearchParams(document.location.search);
    setActiveUserUsername(params.get("user"));
  });

  const messagingDisabled = () => {
    const activeUser = chats.find(chat => chat.receiver_username == activeUserUsername);
    return currentUser?.messaging_disabled || (activeUser && activeUser.messagingDisabled);
  };

  const loadMoreChats = () => {
    const url = new URL(document.location);
    const nextPage = localPagination.currentPage + 1;
    const unread = url.searchParams.get("unread") || "";

    get(`messages?page=${nextPage}&q=${searchValue}&unread=${unread}`).then(response => {
      const newChats = [...localChats, ...response.chats];
      setLocalChats(newChats);
      setLocalPagination(response.pagination);
    });
  };

  const showLoadMoreChats = () => {
    return localPagination.currentPage < localPagination.lastPage;
  };

  const searchChats = value => {
    const url = new URL(document.location);
    url.searchParams.set("q", value);
    history.pushState({}, "", url);
    setSearchValue(value);
    const unread = url.searchParams.get("unread") || "";

    get(`messages?page=1&q=${value}&unread=${unread}`).then(response => {
      setLocalChats(response.chats);
      setLocalPagination(response.pagination);
    });
  };

  const debouncedSearchChats = useCallback(debounce(searchChats, 300), []);

  return (
    <>
      <div className="d-flex flex-column w-100 themed-border-top" style={{ height: "100vh", paddingTop: "66px" }}>
        <main className="d-flex flex-row h-100 themed-border-left chat-container">
          {(!mobile || !activeUserUsername) && (
            <section className="col-lg-4 mx-auto mx-lg-0 px-0 d-flex flex-column themed-border-right chat-section">
              <MessageUserList
                onClick={userName => setActiveUser(userName)}
                activeUserUsername={activeUserUsername}
                chats={localChats}
                setChats={setLocalChats}
                setPagination={setLocalPagination}
                mode={theme.mode()}
                mobile={mobile}
                supportersCount={currentUser?.supporters_count}
                showLoadMoreChats={showLoadMoreChats()}
                loadMoreChats={loadMoreChats}
                searchChats={debouncedSearchChats}
                searchValue={searchValue}
              />
            </section>
          )}
          {(!mobile || activeUserUsername) && !gettingMessages && (
            <section className="col-lg-8 px-0 lg-overflow-y-hidden themed-border-right chat-section">
              <MessageExchange
                smallScreen={mobile}
                activeUserUsername={activeUserUsername}
                clearActiveUserUsername={() => clearActiveUser()}
                value={message}
                onChange={setMessage}
                onSubmit={ignoreAndCallDebounce}
                messages={messages}
                sendingMessage={sendingMessage}
                messagingDisabled={messagingDisabled()}
                user={currentUser}
                profilePictureUrl={messengerProfilePicture}
                username={messengerUsername}
                lastOnline={lastOnline}
                supportersCount={currentUser?.supporters_count}
                mode={theme.mode()}
              />
            </section>
          )}
        </main>
      </div>
    </>
  );
};

export default props => {
  return (
    <TalentThemeProvider>
      <ThemeContainer>
        <Chat {...props} />
      </ThemeContainer>
    </TalentThemeProvider>
  );
};
