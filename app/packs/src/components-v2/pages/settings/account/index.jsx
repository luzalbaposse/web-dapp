import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";
import { Input, Tag, Typography, Button, useModal } from "@talentprotocol/design-system";
import { ConfirmPasswordContainer, Container, DeleteAccountContainer, TagsContainer } from "./styled";
import { useEditProfileStore } from "src/contexts/state";
import { editProfileService } from "src/api/edit-profile";
import { ToastBody } from "src/components/design_system/toasts";
import { DeleteAccountEmail } from "./delete-account-email";

export const AccountForm = ({ setIsDirty }) => {
  const modalState = useModal();
  const [isLoading, setIsLoading] = useState(true);
  const [isHiddingPassword, setIsHiddingPassword] = useState(true);
  const { profile, updateProfileState } = useEditProfileStore();
  const refs = {
    username: useRef(),
    email: useRef(),
    newPassword: useRef(),
    currentPassword: useRef()
  };

  const updateAccount = useCallback(() => {
    const newUsername = refs.username.current.value;
    const usernameChanged = profile?.username != newUsername;
    editProfileService
      .editAccount(profile?.username, {
        user: {
          username: newUsername,
          email: refs.email.current.value,
          current_password: refs.currentPassword.current.value,
          new_password: refs.newPassword.current.value
        }
      })
      .then(() => {
        updateProfileState({
          ...profile,
          user: {
            ...profile.user,
            username: refs.username.current.value,
            email: refs.email.current.value
          },
          username: refs.username.current.value
        });
        toast.success(<ToastBody heading="Success!" body="Account updated successfully." />, { autoClose: 1500 });
      })
      .catch(err => {
        console.error(err);
        toast.error(<ToastBody heading="Error" body={"Something happened while updating your profile"} />);
      });
    setIsDirty(false);
    // Reload page since the route needs to be changed
    if (usernameChanged) {
      window.location.href = `/u/${newUsername}/settings?tab=Account`;
    }
  }, [refs, profile]);

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  return (
    <Container>
      <Input
        inputRef={refs.username}
        label="Username"
        defaultValue={profile?.username}
        onChange={() => setIsDirty(true)}
      />
      <Input
        inputRef={refs.email}
        label="Email Address"
        defaultValue={profile?.user.email}
        onChange={() => setIsDirty(true)}
      />
      <Typography specs={{ type: "medium", variant: "p1" }} color="primary01">
        Change Password
      </Typography>
      <Input
        inputRef={refs.currentPassword}
        label="Current Password"
        type={isHiddingPassword ? "password" : "text"}
        placeholder="******"
        rightIcon={isHiddingPassword ? "eye-disabled" : "eye"}
        rightIconCallback={() => setIsHiddingPassword(!isHiddingPassword)}
        iconColor="primary03"
        onChange={() => setIsDirty(true)}
      />
      <ConfirmPasswordContainer>
        <Input
          inputRef={refs.newPassword}
          label="New Password"
          type={isHiddingPassword ? "password" : "text"}
          placeholder="******"
          rightIcon={isHiddingPassword ? "eye-disabled" : "eye"}
          iconColor="primary03"
          rightIconCallback={() => setIsHiddingPassword(!isHiddingPassword)}
          onChange={() => setIsDirty(true)}
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
        <Button hierarchy="danger" size="small" text="Delete Account" onClick={modalState.openModal} />
      </DeleteAccountContainer>
      {!isLoading &&
        createPortal(
          <Button onClick={updateAccount} hierarchy="primary" size="small" text="Save" />,
          document.getElementById("save-button")
        )}
      <DeleteAccountEmail modalState={modalState} userId={profile?.user?.uuid} />
    </Container>
  );
};
