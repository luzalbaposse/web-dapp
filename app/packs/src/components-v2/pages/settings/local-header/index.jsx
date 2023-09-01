import React from "react";
import { TextLink } from "@talentprotocol/design-system";
import { HeaderContainer, InnerHeaderContainer } from "./styled";

export const LocalHeader = ({ username }) => {
  return (
    <HeaderContainer>
      <InnerHeaderContainer>
        <TextLink color="primary01" href={`/u/${username}`} text={"Edit Profile"} leftIcon="back-arrow" size="small" />
        <div id="save-button"></div>
      </InnerHeaderContainer>
    </HeaderContainer>
  );
};
