import { Icon, Typography, Button } from "@talentprotocol/design-system";
import React from "react";
import { Container, TextColumn } from "./styled";
import { post } from "../../../../../utils/requests";
import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";

export const CareerUpdateLockedState = ({ profile, setProfile }) => {
  const updateSubscription = async () => {
    let response;
    let successMessage;
    let successHeader;
    let new_status;

    response = await post(`/api/v1/subscriptions`, {
      talent_id: profile.user.username,
    });
    successHeader = "New subscription requested";
    successMessage = `A subscription request was sent to ${profile.user.name}`;
    new_status = "pending";

    if (response.success) {
      setProfile((prev) => ({
        ...prev,
        subscribing_status: new_status,
      }));
      toast.success(
        <ToastBody heading={successHeader} body={successMessage} />,
        { autoClose: 5000 }
      );
    } else {
      toast.error(
        <ToastBody
          heading="Unable to update subscription"
          body={response?.error}
        />,
        { autoClose: 5000 }
      );
    }
  };
  return (
    <Container>
      <Icon name="padlock" size={48} color="primary04" />
      <TextColumn>
        <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
          Unlock career updates
        </Typography>
        <Typography
          specs={{ variant: "p2", type: "regular" }}
          color="primary01"
        >
          By becoming a subscriber!
        </Typography>
      </TextColumn>

      {profile.subscribing_status === "pending" ? (
        <Button
          hierarchy="secondary"
          size="large"
          leftIcon="clock"
          iconColor="primary01"
          text="Pending"
          onClick={updateSubscription}
          isDisabled
        />
      ) : (
        <Button hierarchy="primary" variant="" size="medium" text="Subscribe" onClick={updateSubscription} />
      )}
    </Container>
  );
};
