import React, { useState } from "react";
import { Container, InnerContainer } from "./styled";
import { Avatar } from "@talentprotocol/design-system";
import TextInput from "src/components/design_system/fields/textinput";
import SendCareerUpdateModal from "src/components/profile/SendCareerUpdateModal";

export const GmHeader = ({ profile }) => {
  const [showCareerUpdateModal, setShowCareerUpdateModal] = useState(false);

  return profile ? (
    <Container>
      <Avatar size="md" url={profile.profile_picture_url} userId={profile.id} profileURL={`/u/${profile.username}`} />
      <InnerContainer>
        <TextInput
          placeholder={`What's new in your career ${profile.username}?`}
          onClick={() => setShowCareerUpdateModal(true)}
          className="w-100"
        />
        <SendCareerUpdateModal
          show={showCareerUpdateModal}
          hide={() => setShowCareerUpdateModal(false)}
          placeholder={`What's new in your career ${profile.username}?`}
        />
      </InnerContainer>
    </Container>
  ) : (
    <></>
  );
};
