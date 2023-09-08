import { buildColor, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

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

export const DialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const DialogButtonsRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 8px;
`;
