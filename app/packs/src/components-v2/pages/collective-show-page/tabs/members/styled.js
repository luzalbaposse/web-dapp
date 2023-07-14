import { mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const CardContainer = styled.div`
  margin: auto;
`;

export const Container = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(4, 1fr);

  ${mobileStyles(css`
    grid-template-columns: 1fr;
  `)}
`;
