import { mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.main`
  margin: 56px 0 0;
  padding: 0;

  ${mobileStyles(css`
    margin: 66px 0 0;
  `)}
`;
