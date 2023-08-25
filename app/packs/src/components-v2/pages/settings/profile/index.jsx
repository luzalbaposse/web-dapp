import React from "react";
import { Container, AvatarRow, UploadContainer, UploadButtons, InfoRow } from "./styled";
import { Avatar, Button, Input, TextArea, Typography } from "@talentprotocol/design-system";

export const ProfileForm = () => {
  return (
    <Container>
      <AvatarRow>
        <Avatar size="xl" />
        <UploadContainer>
          <Typography specs={{ type: "regular", variant: "p3" }} color="primary04">
            JPG or PNG. Max 1MB
          </Typography>
          <UploadButtons>
            <Button hierarchy="primary" size="small" text="Upload Profile Picture" />
            <Button hierarchy="secondary" size="small" text="Delete" />
          </UploadButtons>
        </UploadContainer>
      </AvatarRow>
      <InfoRow>
        <Input
          label="Display Name"
          shortDescription="The name that we will generally use"
          placeholder="Pedro Pereira"
        />
        <Input label="Current Location" placeholder="City, Location" />
      </InfoRow>
      <TextArea
        label="Short Bio"
        placeholder="This is the first thing people read about you after your name. Make it count 💫"
      />
    </Container>
  );
};
