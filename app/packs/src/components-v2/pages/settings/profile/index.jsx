import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useEditProfileStore } from "src/contexts/state";
import { Container, AvatarRow, UploadContainer, UploadButtons, InfoRow } from "./styled";
import { Avatar, Button, Input, TextArea, Typography } from "@talentprotocol/design-system";
import { editProfileService } from "src/api/edit-profile";

export const ProfileForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);
  const { profile } = useEditProfileStore();
  const updateProfile = useCallback(() => {
    editProfileService
      .editProfile(profile);
  }, [profile]);
  return (
    <Container>
      <AvatarRow>
        <Avatar size="xl" url={profile?.profile_picture_url} />
        <UploadContainer>
          <Typography specs={{ type: "regular", variant: "p3" }} color="primary04">
            JPG or PNG. Max 1MB
          </Typography>
          <UploadButtons>
            <Button hierarchy="primary" size="small" text="Upload Profile Picture" />
          </UploadButtons>
        </UploadContainer>
      </AvatarRow>
      <InfoRow>
        <Input
          label="Display Name"
          shortDescription="The name that we will generally use"
          placeholder="Pedro Pereira"
          defaultValue={profile?.user.name}
        />
        <Input label="Current Location" placeholder="City, Location" defaultValue={profile?.profile.location} />
      </InfoRow>
      <TextArea
        label="Short Bio"
        placeholder="This is the first thing people read about you after your name. Make it count 💫"
        defaultValue={profile?.profile.headline}
      />
      {!isLoading && createPortal(<Button hierarchy="primary" size="small" text="Save" onClick={updateProfile} />, document.getElementById("save-button"))}
    </Container>
  );
};
