import { buildColor, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Backdrop = styled.div`
  height: 100%;
  display: flex !important;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export const InnerContainer = styled.div`
  background-color: ${buildColor("bg01")};
  padding: 24px;
  border-radius: 20px;
  flex-direction: column;
  row-gap: 16px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  width: 500px;
  text-align: center;
  margin: 12px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  row-gap: 8px;
  flex-direction: row;
  align-items: flex-end;
  margin-top: 16px;
  align-items: center;

  ${mobileStyles(css`
    flex-direction: column;
    row-gap: 8px;
  `)}
`;

export const FooterRight = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 16px;
  align-items: center;

  ${mobileStyles(css`
    flex-direction: column-reverse;
    row-gap: 8px;
    width: 100%;
  `)}
`;
