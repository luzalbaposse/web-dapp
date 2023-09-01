import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Input, Tag, Typography, Button } from "@talentprotocol/design-system";
import { ConfirmPasswordContainer, Container, DeleteAccountContainer, TagsContainer } from "./styled";
import { useEditProfileStore } from "src/contexts/state";

export const AccountForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);
  const { profile } = useEditProfileStore();
  return (
    <Container>
      <Input label="Username" defaultValue={profile?.username} />
      <Input label="Email Address" defaultValue={profile?.user.email} />
      <Typography specs={{ type: "medium", variant: "p1" }} color="primary01">
        Change Password
      </Typography>
      <Input label="Current Password" placeholder="******" rightIcon="eye-disabled" iconColor="primary03" />
      <ConfirmPasswordContainer>
        <Input label="Confirm Password" placeholder="******" rightIcon="eye-disabled" iconColor="primary03" />
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
      {!isLoading && createPortal(<Button hierarchy="primary" size="small" text="Save" />, document.getElementById("save-button"))}
    </Container>
  );
};
