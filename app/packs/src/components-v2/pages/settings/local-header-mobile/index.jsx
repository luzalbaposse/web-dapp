import React from "react";
import { noop } from "lodash";
import { TextLink } from "@talentprotocol/design-system";
import { HamburguerContainer, HeaderContainer, InnerHeaderContainer, StyledNavLinks } from "./styled";

export const LocalHeaderMobile = ({ username, goToPage, openHamburguer, isHamburguerOpen, page }) => {
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
