import { mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

export const TabsContainer = styled.div`
  display: flex;

  ${mobileStyles(css`
    margin-bottom: 8px;
  `)}
`;
