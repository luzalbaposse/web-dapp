import { Button, Icon, Typography } from "@talentprotocol/design-system";
import React from "react";
import { Container, ImageContainer } from "./styled";
import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";
import { post, destroy } from "src/utils/requests";

export const SubscribeModel = ({ profile, setProfile, isCurrentUserProfile }) => {
  const updateFollow = async () => {
    let response;
    let successMessage;
    let successHeader;
    console.log(profile);
    if (profile.is_following) {
      response = await destroy(`/api/v1/follows?user_id=${profile.user.id}`);
      successHeader = "New subscription added";
      successMessage = `You're no longer subscribed to ${profile.user.name} career updates`;
    } else {
      response = await post(`/api/v1/follows`, {
        user_id: profile.user.id
      });
      successHeader = "Subscription removed";
      successMessage = `You're now subscribed to ${profile.user.name} career updates`;
    }

    if (response.success) {
      setProfile(prev => ({
        ...prev,
        is_following: !profile.is_following
      }));
      toast.success(<ToastBody heading={successHeader} body={successMessage} />);
    } else {
      toast.error(<ToastBody heading="Unable to update subscription" body={response?.error} />);
    }
  };

  return (
    <Container>
      <ImageContainer>
        <Icon name="pig" color="primary" size={40} />
      </ImageContainer>
      <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
        Career Updates
      </Typography>
      <Typography specs={{ variant: "p2", type: "regular" }} color="primary01">
        The first step to support someone is being present. Unlock access to career updates, supporter NFT & much more!
      </Typography>
      <Button
        hierarchy="primary"
        size="large"
        isStretched
        text={profile.is_following ? "Unsubscribe" : "Subscribe"}
        onClick={() => updateFollow()}
        isDisabled={isCurrentUserProfile}
      />
    </Container>
  );
};
