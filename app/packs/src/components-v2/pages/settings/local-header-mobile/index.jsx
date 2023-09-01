import React, { useEffect, useRef } from "react";
import { TextLink } from "@talentprotocol/design-system";
import { HamburguerContainer, HeaderContainer, InnerHeaderContainer, StyledNavLinks } from "./styled";

export const LocalHeaderMobile = ({ username, goToPage, openHamburguer, isHamburguerOpen, page }) => {
  const hamburguerRef = useRef(undefined);
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
            href={`/u/${username}`}
            size="small"
            onClick={openHamburguer}
          />
          <div id="save-button"></div>
        </InnerHeaderContainer>
      </HeaderContainer> (
        <HamburguerContainer ref={hamburguerRef} className={!isHamburguerOpen ? "animate__animated animate__slideOutLeft" : "animate__animated animate__slideInLeft"}>
          <StyledNavLinks goToPage={goToPage} />
        </HamburguerContainer>
      )
    </>
  );
};
