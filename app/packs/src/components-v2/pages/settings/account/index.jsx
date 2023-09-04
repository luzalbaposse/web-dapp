import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";
import { Input, Tag, Typography, Button } from "@talentprotocol/design-system";
import { ConfirmPasswordContainer, Container, DeleteAccountContainer, TagsContainer } from "./styled";
import { useEditProfileStore } from "src/contexts/state";
import { editProfileService } from "src/api/edit-profile";
import { ToastBody } from "src/components/design_system/toasts";

export const AccountForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { profile, updateProfileState } = useEditProfileStore();
  const refs = {
    username: useRef(),
    email: useRef(),
    newPassword: useRef(),
    confirmPassword: useRef()
  };
  const updateAccount = useCallback(() => {
    editProfileService
      .editAccount(profile?.username, {
        ...profile
        // profile: {
        //   ...profile?.profile,
        //   website: refs.website.current.value,
        //   twitter: refs.twitter.current.value,
        //   linkedin: refs.linkedin.current.value,
        //   figma: refs.figma.current.value,
        //   behance: refs.behance.current.value,
        //   youtube: refs.youtube.current.value
        // }
      })
      .then(() => {
        updateProfileState({});
      })
      .catch(err => {
        console.error(err);
        toast.error(<ToastBody heading="Error" body={"Something happened while updating your profile"} />);
      });
  }, [refs, profile]);
  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);
  return (
    <Container>
      <Input inputRef={refs.username} label="Username" defaultValue={profile?.username} />
      <Input inputRef={refs.email} label="Email Address" defaultValue={profile?.user.email} />
      <Typography specs={{ type: "medium", variant: "p1" }} color="primary01">
        Change Password
      </Typography>
      <Input
        inputRef={refs.newPassword}
        label="New Password"
        placeholder="******"
        rightIcon="eye-disabled"
        iconColor="primary03"
      />
      <ConfirmPasswordContainer>
        <Input
          inputRef={refs.confirmPassword}
          label="Confirm Password"
          placeholder="******"
          rightIcon="eye-disabled"
          iconColor="primary03"
        />
        <TagsContainer>
          <Tag backgroundColor="bg01" label="Number" size="small" borderColor="surfaceHover02" textColor="pimary01" />
          <Tag
            backgroundColor="bg01"
            label="Uppercase"
            size="small"
            borderColor="surfaceHover02"
            textColor="pimary01"
          />
          <Tag
            backgroundColor="bg01"
            label="Lowercase"
            size="small"
            borderColor="surfaceHover02"
            textColor="pimary01"
          />
          <Tag
            backgroundColor="bg01"
            label="8 characters"
            size="small"
            borderColor="surfaceHover02"
            textColor="pimary01"
          />
          <Tag
            backgroundColor="bg01"
            label="Matching passords"
            size="small"
            borderColor="surfaceHover02"
            textColor="pimary01"
          />
        </TagsContainer>
      </ConfirmPasswordContainer>
      <DeleteAccountContainer>
        <Typography specs={{ type: "medium", variant: "p1" }} color="primary01">
          Delete Account
        </Typography>
        <Typography specs={{ type: "regular", variant: "p2" }} color="primary03">
          Delete your account and account data. This can’t be undone!
        </Typography>
        <Button hierarchy="danger" size="small" text="Delete Account" />
      </DeleteAccountContainer>
      {!isLoading &&
        createPortal(
          <Button onClick={updateAccount} hierarchy="primary" size="small" text="Save" />,
          document.getElementById("save-button")
        )}
    </Container>
  );
};
