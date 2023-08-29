import React from "react";
import { TextLink } from "@talentprotocol/design-system";
import { HamburguerContainer, HeaderContainer, InnerHeaderContainer, StyledNavLinks } from "./styled";

export const LocalHeaderMobile = ({ username, goToPage, openHamburguer, isHamburguerOpen }) => {
  return (
    <>
      <HeaderContainer>
        <InnerHeaderContainer>
          <TextLink
            color="primary01"
            text={"Edit Profile"}
            leftIcon="back-arrow"
            size="small"
            onClick={openHamburguer}
          />
        </InnerHeaderContainer>
      </HeaderContainer>
      {isHamburguerOpen && (
        <HamburguerContainer>
          <StyledNavLinks goToPage={goToPage} />
        </HamburguerContainer>
      )}
    </>
  );
};
