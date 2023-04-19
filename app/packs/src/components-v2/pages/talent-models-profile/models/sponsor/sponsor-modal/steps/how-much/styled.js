import { mobileStyles, buildColor } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const OutterContainer = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 40px;
`;

export const ClaimArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ClaimAreaInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ClaimAreaAmountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

export const ClaimAreaInputContainer = styled.div`
  flex-basis: 200%;
`;

export const BottomContainer = styled.div`
  width: 100%;
  margin: 16px 0 0 0;
  display: flex;
  flex-direction: row-reverse;
  gap: 8px;

  ${mobileStyles(css`
    margin: 0 0 0 0;
  `)}
`;

export const BottomDivider = styled.div`
  width: calc(100% + 32px);
  height: 1px;
  background-color: ${buildColor("surfaceHover02")};
  overflow: hidden;
  margin-left: -16px;
  margin-top: auto;
  margin-bottom: -16px;

  ${mobileStyles(css`
    margin-bottom: 0;
  `)}
`;
