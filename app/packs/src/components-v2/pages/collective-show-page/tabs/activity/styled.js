import { mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.div`
  margin: auto;
  width: 648px;

  ${mobileStyles(css`
    width: 100%;
  `)}
`;
