import { Icon, Typography, Button, useModal } from "@talentprotocol/design-system";
import React from "react";
import { Container, TextColumn } from "./styled";
import TextInput from "src/components/design_system/fields/textinput";
import { SendCareerUpdateModalV2 } from "../../../../send-career-update-modal";

export const CareerUpdateEmptyState = ({ isCurrentUserProfile, currentUserProfile, profile }) => {
  const sendCareerUpdateModalState = useModal();
  return (
    <Container>
      <Icon name="mailbox" size={48} color="primary04" />
      <TextColumn>
        <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
          {profile.user.name} doesn't have career updates
        </Typography>
        {isCurrentUserProfile ? (
          <TextInput
            placeholder={`What's new in your career ${currentUserProfile.name}?`}
            onClick={sendCareerUpdateModalState.openModal}
            className="w-100 mt-3"
          />
        ) : (
          <Typography specs={{ variant: "p2", type: "regular" }} color="primary01">
            Ask for an update
          </Typography>
        )}
      </TextColumn>
      {isCurrentUserProfile ? (
        <SendCareerUpdateModalV2
          isOpen={sendCareerUpdateModalState.isOpen}
          closeModal={sendCareerUpdateModalState.closeModal}
          profile={currentUserProfile}
        />
      ) : (
        <Button
          hierarchy="primary"
          variant=""
          size="medium"
          text="Send message"
          href={`/messages?user=${profile.user.username}`}
        />
      )}
    </Container>
  );
};
