import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { useEditProfileStore } from "src/contexts/state";
import { Container, AvatarRow, UploadContainer, UploadButtons, InfoRow } from "./styled";
import { Avatar, Button, Input, TextArea, Typography } from "@talentprotocol/design-system";
import { editProfileService } from "src/api/edit-profile";
import { ToastBody } from "src/components/design_system/toasts";

export const ProfileForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);
  const { profile, updateProfileState } = useEditProfileStore();
  const updateProfile = useCallback(() => {
    editProfileService
      .editProfile(profile.username, {
        user: {
          display_name: refs.name.current.value
        },
        talent: {
          profile: {
            location: refs.location.current.value,
            headline: refs.headline.current.value
          }
        }
      })
      .then(() => {
        updateProfileState({
          name: refs.name.current.value,
          user: {
            ...profile.user,
            name: refs.name.current.value,
            display_name: refs.name.current.value
          },
          profile: {
            ...profile.profile,
            location: refs.location.current.value,
            headline: refs.headline.current.value
          },
          headline: refs.headline.current.value
        });
      })
      .catch(err => {
        console.error(err);
        toast.error(<ToastBody heading="Error" body={"Something happened while updating your profile"} />);
      });
  }, [profile]);
  const refs = {
    name: useRef(),
    location: useRef(),
    headline: useRef()
  };
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
          inputRef={refs.name}
        />
        <Input
          inputRef={refs.location}
          label="Current Location"
          placeholder="City, Location"
          defaultValue={profile?.profile.location}
        />
      </InfoRow>
      <TextArea
        label="Short Bio"
        placeholder="This is the first thing people read about you after your name. Make it count 💫"
        defaultValue={profile?.profile.headline}
        textAreaRef={refs.headline}
      />
      {!isLoading &&
        createPortal(
          <Button hierarchy="primary" size="small" text="Save" onClick={updateProfile} />,
          document.getElementById("save-button")
        )}
    </Container>
  );
};
