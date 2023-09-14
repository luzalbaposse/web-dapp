import React, { useEffect, useState, useRef } from "react";
import { TextLink, ModalDialog, Typography, Button } from "@talentprotocol/design-system";
import {
  HamburguerContainer,
  HeaderContainer,
  InnerHeaderContainer,
  StyledNavLinks,
  DialogContainer,
  DialogButtonsRow
} from "./styled";
import { useEditProfileStore } from "src/contexts/state";

export const LocalHeaderMobile = ({ username, goToPage, openHamburguer, isHamburguerOpen, page }) => {
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);
  const hamburguerRef = useRef(undefined);
  const { subFormCallback } = useEditProfileStore();

  useEffect(() => {
    if (hamburguerRef.current) {
      setTimeout(() => {
        hamburguerRef.current.style.opacity = 1;
      }, 250);
    }
  }, [hamburguerRef]);
  return (
    <>
      <HeaderContainer>
        <InnerHeaderContainer>
          <TextLink
            color="primary01"
            text={isHamburguerOpen ? "Edit Profile" : page}
            leftIcon="back-arrow"
            href={!subFormCallback ? `/u/${username}` : undefined}
            size="small"
            onClick={e => {
              if (!subFormCallback) return openHamburguer(e);
              setIsDiscardModalOpen(true);
            }}
          />
          <div id="save-button"></div>
        </InnerHeaderContainer>
      </HeaderContainer>
      <HamburguerContainer
        ref={hamburguerRef}
        className={
          !isHamburguerOpen ? "animate__animated animate__slideOutLeft" : "animate__animated animate__slideInLeft"
        }
      >
        <StyledNavLinks goToPage={goToPage} />
      </HamburguerContainer>
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
