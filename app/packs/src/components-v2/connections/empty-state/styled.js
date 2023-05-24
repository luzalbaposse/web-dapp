import { mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 78px auto;
  flex-grow: 1;
  gap: 24px;

  ${mobileStyles(css`
    padding: 16px 16px 48px;
  `)}
`;

export const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
