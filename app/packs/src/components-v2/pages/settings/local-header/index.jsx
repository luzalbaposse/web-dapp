import React, { useState } from "react";
import { Button, ModalDialog, TextLink, Typography } from "@talentprotocol/design-system";
import { DialogButtonsRow, DialogContainer, HeaderContainer, InnerHeaderContainer } from "./styled";
import { useEditProfileStore } from "src/contexts/state";

export const LocalHeader = ({ username }) => {
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);
  const { subFormCallback } = useEditProfileStore();
  return (
    <>
      <HeaderContainer>
        <InnerHeaderContainer>
          <TextLink
            color="primary01"
            href={!subFormCallback ? `/u/${username}` : undefined}
            text={"Edit Profile"}
            leftIcon="back-arrow"
            size="small"
            onClick={() => {
              if (!subFormCallback) return;
              setIsDiscardModalOpen(true);
            }}
          />
          <div id="save-button"></div>
        </InnerHeaderContainer>
      </HeaderContainer>
      <ModalDialog isOpen={isDiscardModalOpen} closeModal={() => setIsDiscardModalOpen(false)} title="Discard changes?">
        <DialogContainer>
          <Typography specs={{ type: "regular", variant: "p1" }} color="primary04">
            This can't be undone and you'll loose your changes.
          </Typography>
          <DialogButtonsRow>
            <Button
              hierarchy="danger"
              size="medium"
              text="Discard"
              onClick={() => {
                setIsDiscardModalOpen(false);
                subFormCallback();
              }}
            />
          </DialogButtonsRow>
        </DialogContainer>
      </ModalDialog>
    </>
  );
};
