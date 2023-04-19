import { mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

export const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 50px;

  ${mobileStyles(css`
    padding: 0 16px;
    margin-bottom: 40px;
  `)}
`;
