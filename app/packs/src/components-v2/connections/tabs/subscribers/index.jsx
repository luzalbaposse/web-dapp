import { Typography, Spinner, TalentCard } from "@talentprotocol/design-system";
import React, { useEffect, useState } from "react";
import { Avatar, Button } from "@talentprotocol/design-system";

import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";

import { CareerCircleEmptyState } from "src/components-v2/connections/empty-state";
import { SubscriptionButton } from "src/components-v2/subscription-button";

import { careerCircle } from "src/api/career-circle";
import { useWindowDimensionsHook } from "src/utils/window";

import {
  Container,
  NewSubscribersContainer,
  SubscribersContainer,
  CardsContainer,
  NewSubscribersRow,
  ActionsContainer,
  NewSubscribersList,
  LoadMoreContainer
} from "./styled";

export const Subscribers = ({ currentUserId }) => {
  const [activeSubscribers, setActiveSubscribers] = useState({
    subscribers: [],
    pagination: {}
  });
  const [pendingSubscribers, setPendingSubscribers] = useState({
    subscribers: [],
    pagination: {}
  });
  const [isLoading, setIsLoading] = useState(true);
  const { mobile } = useWindowDimensionsHook();

  const activeSubscribersPerPage = 16;
  const pendingSubscribersPerPage = 6;

  useEffect(() => {
    if (!currentUserId) {
      return;
    }

    careerCircle
      .getActiveSubscribers(currentUserId, activeSubscribersPerPage)
      .then(({ data }) => {
        setActiveSubscribers(data);
      })
      .catch(() => {});

    careerCircle
      .getPendingSubscribers(currentUserId, pendingSubscribersPerPage)
      .then(({ data }) => {
        setPendingSubscribers(data);
        // Prevent empty state to show for an instant
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      })
      .catch(() => {});
  }, [currentUserId]);

  const showLoadMoreActiveSubscribers = () => !!activeSubscribers.pagination.cursor;

  const loadMoreActiveSubscribers = () => {
    careerCircle
      .getActiveSubscribers(currentUserId, activeSubscribersPerPage, activeSubscribers.pagination.cursor)
      .then(({ data }) => {
        const newData = {
          subscribers: [...activeSubscribers.subscribers, ...data.subscribers],
          pagination: data.pagination
        };
        setActiveSubscribers(newData);
      })
      .catch(() => {});
  };

  const showLoadMorePendingSubscribers = () => !!pendingSubscribers.pagination.cursor;

  const loadMorePendingSubscribers = () => {
    careerCircle
      .getPendingSubscribers(currentUserId, pendingSubscribersPerPage, pendingSubscribers.pagination.cursor)
      .then(({ data }) => {
        const newData = {
          subscribers: [...pendingSubscribers.subscribers, ...data.subscribers],
          pagination: data.pagination
        };
        setPendingSubscribers(newData);
      })
      .catch(() => {});
  };

  const acceptSubscription = subscriber => {
    careerCircle
      .acceptSubscription(currentUserId, subscriber.username)
      .then(() => {
        toast.success(<ToastBody heading="Success!" body={"Subscription accepted!"} />, { autoClose: 5000 });
        removePendingSubscriber(subscriber);
        addActiveSubscriber(subscriber);
      })
      .catch(() => {
        toast.error(<ToastBody heading="Error!" body={"We were not able to accept the subscription."} />, {
          autoClose: 5000
        });
      });
  };

  const rejectSubscription = subscriber => {
    careerCircle
      .destroySubscription(currentUserId, subscriber.username)
      .then(() => {
        toast.success(<ToastBody heading="Success!" body={"Subscription rejected!"} />, { autoClose: 5000 });
        removePendingSubscriber(subscriber);
      })
      .catch(() => {
        toast.error(<ToastBody heading="Error!" body={"We were not able to reject the subscription."} />, {
          autoClose: 5000
        });
      });
  };

  const removePendingSubscriber = subscriber => {
    const subscribers = pendingSubscribers.subscribers;
    const subscriberIndex = subscribers.findIndex(existingSubscriber => existingSubscriber.id === subscriber.id);

    const newSubscribers = [...subscribers.slice(0, subscriberIndex), ...subscribers.slice(subscriberIndex + 1)];
    setPendingSubscribers({
      subscribers: newSubscribers,
      pagination: pendingSubscribers.pagination
    });
  };

  const addActiveSubscriber = subscriber => {
    const newData = {
      subscribers: [subscriber, ...activeSubscribers.subscribers],
      pagination: activeSubscribers.pagination
    };
    setActiveSubscribers(newData);
  };

  const subscriberCardOnClick = (username, subscription) => {
    let newActiveSubscribers = [];
    if (subscription === "subscribe") {
      newActiveSubscribers = activeSubscribers.subscribers.map(t => {
        if (t.username === username) {
          return { ...t, subscribed_status: "Cancel request" };
        }
        return { ...t };
      });
    } else {
      newActiveSubscribers = activeSubscribers.subscribers.map(t => {
        if (t.username === username) {
          return { ...t, subscribed_status: "Subscribe back" };
        }
        return { ...t };
      });
    }

    setActiveSubscribers(prev => ({ ...prev, subscribers: newActiveSubscribers }));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      {pendingSubscribers.subscribers.length == 0 && activeSubscribers.subscribers.length == 0 && (
        <CareerCircleEmptyState
          iconName="binoculars"
          title="You don't have any subscribers"
          text="Start engaging with the community! Send a message, subscribe, stake or sponsor Talent career"
          buttonText="See all Talent"
          buttonUrl="/talent"
        />
      )}
      {pendingSubscribers.subscribers.length > 0 && (
        <Container>
          <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
            New requests
          </Typography>
          <NewSubscribersContainer>
            <NewSubscribersList>
              {pendingSubscribers.subscribers.map(subscriber => (
                <NewSubscribersRow key={subscriber.id}>
                  <a href={`/u/${subscriber.username}`}>
                    <Avatar
                      size="md"
                      url={subscriber.profile_picture_url}
                      name={subscriber.name}
                      ticker={subscriber.ticker || ""}
                      occupation={
                        mobile && subscriber.occupation?.length > 20
                          ? `${subscriber.occupation.substring(0, 20)}...`
                          : subscriber.occupation
                      }
                      isVerified={subscriber.verified}
                    />
                  </a>
                  <ActionsContainer>
                    <Button
                      hierarchy="secondary"
                      size="small"
                      leftIcon="remove"
                      iconColor="primary01"
                      onClick={() => rejectSubscription(subscriber)}
                    />
                    <Button
                      hierarchy="primary"
                      size="small"
                      leftIcon="check-chat"
                      onClick={() => acceptSubscription(subscriber)}
                    />
                  </ActionsContainer>
                </NewSubscribersRow>
              ))}
              {showLoadMorePendingSubscribers() && (
                <LoadMoreContainer>
                  <Button
                    hierarchy="secondary"
                    size="medium"
                    text="Load more"
                    onClick={() => loadMorePendingSubscribers()}
                  />
                </LoadMoreContainer>
              )}
            </NewSubscribersList>
          </NewSubscribersContainer>
        </Container>
      )}
      {activeSubscribers.subscribers.length > 0 && (
        <SubscribersContainer>
          <CardsContainer>
            {activeSubscribers.subscribers.map(subscriber => (
              <TalentCard
                key={subscriber.id}
                bannerImage={subscriber.banner_url}
                isVerified={subscriber.verified}
                name={subscriber.name}
                occupation={subscriber.occupation}
                profileImage={subscriber.profile_picture_url}
                ticker={subscriber.ticker}
                to={`/u/${subscriber.username}`}
              >
                <SubscriptionButton
                  username={subscriber.username}
                  subscribedStatus={subscriber.subscribed_status}
                  callback={subscriberCardOnClick}
                />
              </TalentCard>
            ))}
          </CardsContainer>
          <LoadMoreContainer>
            {showLoadMoreActiveSubscribers() ? (
              <Button hierarchy="secondary" size="medium" text="Load more" onClick={loadMoreActiveSubscribers} />
            ) : (
              <Typography specs={{ variant: "p2" }} color={"primary03"}>
                You have reached the end of the list
              </Typography>
            )}
          </LoadMoreContainer>
        </SubscribersContainer>
      )}
    </>
  );
};
