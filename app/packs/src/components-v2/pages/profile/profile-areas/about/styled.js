import { buildColor, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px 24px 24px;
  gap: 24px;

  ${mobileStyles(css`
    padding: 24px;
  `)}
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${buildColor("surfaceHover02")};
`;
