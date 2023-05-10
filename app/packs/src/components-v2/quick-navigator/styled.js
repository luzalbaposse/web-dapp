import { desktopStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.nav`
  padding: 16px 48px;
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 24px;

  ${desktopStyles(css`
    display: none;
  `)}
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
