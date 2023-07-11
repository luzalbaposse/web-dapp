import { mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
`;

export const Divider = styled.div`
  margin-bottom: 56px;
  margin-top: 56px;

  ${mobileStyles(css`
    margin-bottom: 40px;
    margin-top: 40px;
  `)}
`;

export const SpinnerContainer = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 200px;
  min-height: 400px;
`;

export const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 16px;

  ${mobileStyles(css`
    padding: 0 16px;
  `)}
`;
