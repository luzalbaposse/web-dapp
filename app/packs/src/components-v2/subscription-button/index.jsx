import React, { useCallback } from "react";
import { Button } from "@talentprotocol/design-system";
import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";
import { talentsService } from "../../api/talents";

export const SubscriptionButton = ({ username, subscribedStatus, callback }) => {
  const subscribe = useCallback(
    username => {
      talentsService
        .sendSubscribeRequest(username)
        .then(() => {
          toast.success(<ToastBody heading="Subscription request sent" />, { autoClose: 1500 });
          callback(username, "subscribe");
        })
        .catch(() => {
          toast.error(<ToastBody heading="You are already subscribed to that user." />, { autoClose: 1500 });
        });
    },
    [username, callback]
  );

  const unsubscribe = useCallback(
    username => {
      talentsService
        .unsubscribe(username)
        .then(() => {
          toast.success(<ToastBody heading="Unsubscribed successfully" />, { autoClose: 1500 });
          callback(username, "unsubscribe");
        })
        .catch(() => {
          toast.error(<ToastBody heading="You are not subscribed to that user." />, { autoClose: 1500 });
        });
    },
    [username, callback]
  );

  const buttonOnClick = useCallback(
    e => {
      e.preventDefault();

      if (subscribedStatus == "Unsubscribe" || subscribedStatus == "Cancel request") {
        unsubscribe(username);
      } else if (subscribedStatus == "Visit profile") {
        window.location.href = `/u/${username}`;
      } else {
        subscribe(username);
      }
    },
    [subscribedStatus, callback]
  );

  return <Button hierarchy="secondary" size="small" text={subscribedStatus} onClick={e => buttonOnClick(e)} />;
};
