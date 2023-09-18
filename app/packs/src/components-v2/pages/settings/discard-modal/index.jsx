import React from "react";
import { ModalDialog, Typography, Button } from "@talentprotocol/design-system";
import { DialogContainer, DialogButtonsRow } from "./styled";

export const DiscardModal = ({ isOpen, setIsDiscardModalOpen, callBack }) => {
  return (
    <ModalDialog isOpen={isOpen} closeModal={() => setIsDiscardModalOpen(false)} title="Discard changes?">
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
              if (callBack) {
                callBack();
              }
            }}
          />
        </DialogButtonsRow>
      </DialogContainer>
    </ModalDialog>
  );
};
