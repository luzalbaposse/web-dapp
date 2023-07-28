import { mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const Container = styled.div`
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${mobileStyles(css`
    padding: 24px;
  `)}
`;
