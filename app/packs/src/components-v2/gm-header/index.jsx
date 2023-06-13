import React from "react";
import { Container, InnerContainer } from "./styled";
import { Avatar, useModal } from "@talentprotocol/design-system";
import TextInput from "src/components/design_system/fields/textinput";
import { SendCareerUpdateModalV2 } from "../send-career-update-modal";

export const GmHeader = ({ profile }) => {
  const modalState = useModal();

  return profile ? (
    <Container>
      <Avatar size="md" url={profile.profile_picture_url} userId={profile.id} profileURL={`/u/${profile.username}`} />
      <InnerContainer>
        <TextInput
          placeholder={`What's new in your career ${profile.name}?`}
          onClick={() => modalState.openModal()}
          className="w-100"
        />
        <SendCareerUpdateModalV2 isOpen={modalState.isOpen} closeModal={modalState.closeModal} profile={profile} />
      </InnerContainer>
    </Container>
  ) : (
    <></>
  );
};
