import { buildColor, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: scroll;
  width: 100%;
`;

export const BottomContainer = styled.div`
  width: 100%;
  margin: 16px 0 0 0;
  display: flex;
  flex-direction: row-reverse;
  gap: 8px;

  ${mobileStyles(css`margin: 0 0 0 0;`)}
`;

export const BottomDivider = styled.div`
  width: calc(100% + 32px);
  height: 1px;
  background-color: ${buildColor("surfaceHover02")};
  overflow: hidden;
  margin-left: -16px;
  margin-top: auto;
  margin-bottom: -16px;

  ${mobileStyles(css`margin-bottom: 0;`)}
`;
