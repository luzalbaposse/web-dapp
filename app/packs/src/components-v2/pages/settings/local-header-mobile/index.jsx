import React, { useEffect, useState, useRef } from "react";
import { TextLink, ModalDialog, Typography, Button } from "@talentprotocol/design-system";
import { HamburguerContainer, HeaderContainer, InnerHeaderContainer, StyledNavLinks } from "./styled";
import { useEditProfileStore } from "src/contexts/state";
import { DiscardModal } from "../discard-modal";

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
      <DiscardModal
        isOpen={isDiscardModalOpen}
        setIsDiscardModalOpen={setIsDiscardModalOpen}
        callBack={subFormCallback}
      />
    </>
  );
};
