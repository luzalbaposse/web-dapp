import { desktopStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const StyledTypographyLink = styled.a`
  font-weight: 700;
  outline: none;

  :hover {
    text-decoration: underline;
  }
`;

export const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2px;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 24px;
  width: 100%;

  ${desktopStyles(css`
    margin-bottom: 32px;
  `)}
`;
