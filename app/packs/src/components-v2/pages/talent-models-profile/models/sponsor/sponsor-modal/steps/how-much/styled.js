import { mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const OutterContainer = styled.div`
  ${mobileStyles(css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `)}
`;

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  flex-gow: 1;
  gap: 8px;
`;

export const ClaimArea = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ClaimAreaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ClaimAreaInput = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 4px;
`;

export const ClaimAreaInputContainer = styled.div`
  flex-basis: 200%;
`;

export const BottomContainer = styled.div`
  width: 100%;
  padding-top: 34px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 34px 0;
`;
