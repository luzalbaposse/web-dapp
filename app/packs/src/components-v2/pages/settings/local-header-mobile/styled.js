import { buildColor, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";
import { NavLinks } from "../nav-links";

export const HeaderContainer = styled.div`
  position: fixed;
  top: 67px;
  left: 0;
  width: 100%;
  padding: 16px 0;
  z-index: 1;
  background: ${buildColor("bg01")};
  border-bottom: 1px solid ${buildColor("surfaceHover02")};

  ${mobileStyles(css`
    padding: 16px;
  `)}
`;

export const InnerHeaderContainer = styled.div`
  max-width: 1224px;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

export const HamburguerContainer = styled.div`
  position: fixed;
  height: calc(100% - 126px);
  width: 100%;
  bottom: 0;
  padding: 0 16px;
  background: ${buildColor("bg01")};
  z-index: 1;
  animation-duration: 0.25s;
  opacity: 0;
`;

export const StyledNavLinks = styled(NavLinks)`
  margin-top: 16px;
`;
