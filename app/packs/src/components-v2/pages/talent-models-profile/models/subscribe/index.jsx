import { Button, Icon, Typography } from "@talentprotocol/design-system";
import React from "react";
import { Container, ImageContainer } from "./styled";
import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";
import { post, destroy } from "src/utils/requests";

export const SubscribeModel = ({ profile, setProfile, isCurrentUserProfile }) => {
  const subscriptionButtonText = {
    pending: "Pending",
    subscribed: "Unsubscribe",
    unsubscribed: "Subscribe"
  };

  const updateSubscription = async () => {
    let response;
    let successMessage;
    let successHeader;
    let new_status;

    if (profile.subscribing_status == "subscribed") {
      response = await destroy(`/api/v1/subscriptions?talent_id=${profile.user.username}`);
      successHeader = "Subscription removed";
      successMessage = `You're no longer subscribed to ${profile.user.name} career updates`;
      new_status = "unsubscribed";
    } else if (profile.subscribing_status == "unsubscribed") {
      response = await post(`/api/v1/subscriptions`, {
        talent_id: profile.user.username
      });
      successHeader = "New subscription requested";
      successMessage = `A subscription request was sent to ${profile.user.name}`;
      new_status = "pending";
    }

    if (response.success) {
      setProfile(prev => ({
        ...prev,
        subscribing_status: new_status
      }));
      toast.success(<ToastBody heading={successHeader} body={successMessage} />, { autoClose: 5000 });
    } else {
      toast.error(<ToastBody heading="Unable to update subscription" body={response?.error} />, { autoClose: 5000 });
    }
  };

  return (
    <Container>
      <ImageContainer>
        <Icon name="mailbox" color="primary" size={40} />
      </ImageContainer>
      <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
        Career Updates
      </Typography>
      <Typography specs={{ variant: "p2", type: "regular" }} color="primary01">
        The first step to support someone is being present. Subscribe to get access to private Career Updates from{" "}
        {profile.user.name}.
      </Typography>
      {profile.subscribing_status === "pending" && (
        <Button
          hierarchy="secondary"
          size="large"
          isStretched
          leftIcon="clock"
          iconColor="primary01"
          text={subscriptionButtonText[profile.subscribing_status]}
          onClick={updateSubscription}
          isDisabled
        />
      )}
      {profile.subscribing_status === "subscribed" && (
        <Button
          hierarchy="secondary"
          size="large"
          isStretched
          text={subscriptionButtonText[profile.subscribing_status]}
          onClick={updateSubscription}
          isDisabled={isCurrentUserProfile}
        />
      )}
      {profile.subscribing_status === "unsubscribed" && (
        <Button
          hierarchy="primary"
          size="large"
          isStretched
          text={subscriptionButtonText[profile.subscribing_status]}
          onClick={updateSubscription}
          isDisabled={isCurrentUserProfile}
        />
      )}
    </Container>
  );
};
