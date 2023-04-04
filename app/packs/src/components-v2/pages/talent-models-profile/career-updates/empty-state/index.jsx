import { Icon, Typography, Button } from "@talentprotocol/design-system";
import React, { useState } from "react";
import { Container, TextColumn } from "./styled";
import SendCareerUpdateModal from "../../../../../components/profile/SendCareerUpdateModal";
import TextInput from "src/components/design_system/fields/textinput";

export const CareerUpdateEmptyState = ({ profile, isCurrentUserProfile, railsContext }) => {
  const [isSendCareerUpdateModalOpen, setShowCareerUpdateModal] = useState(false);
  return (
    <Container>
      <Icon name="mailbox" size={48} color="primary04" />
      <TextColumn>
        <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
          {profile.user.name} doesn't have career updates
        </Typography>
        {isCurrentUserProfile ? (
          <TextInput
            placeholder={`What's new in your career ${profile.user.name}?`}
            onClick={() => setShowCareerUpdateModal(true)}
            className="w-100 mt-3"
          />
        ) : (
          <Typography specs={{ variant: "p2", type: "regular" }} color="primary01">
            Ask for an update
          </Typography>
        )}
      </TextColumn>
      {isCurrentUserProfile ? (
          <SendCareerUpdateModal
            show={isSendCareerUpdateModalOpen}
            hide={() => setShowCareerUpdateModal(false)}
            placeholder={`What's new in your career ${profile.user.name}?`}
            contractsEnv={railsContext}
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
