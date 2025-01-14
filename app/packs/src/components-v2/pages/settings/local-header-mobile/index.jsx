import React, { useEffect, useRef } from "react";
import { TextLink } from "@talentprotocol/design-system";
import { HamburguerContainer, HeaderContainer, InnerHeaderContainer, StyledNavLinks } from "./styled";
import { useEditProfileStore } from "src/contexts/state";

export const LocalHeaderMobile = ({
  username,
  goToPage,
  openHamburguer,
  isHamburguerOpen,
  page,
  setIsDiscardModalOpen,
  isDirty
}) => {
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
            href={!subFormCallback && !isDirty ? `/u/${username}` : undefined}
            size="small"
            onClick={e => {
              if (!subFormCallback && !isDirty) return openHamburguer(e);
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
    </>
  );
};
