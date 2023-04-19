import { buildColor, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  height: 100%;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
  padding-top: 8px;
  padding-bottom: 24px;
  width: 100%;
  margin-bottom: 24px;
`;

export const DetailsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 16px;
  padding-top: 16px;
  border-bottom: 1px solid ${buildColor("surfaceHover02")};
  border-top: 1px solid ${buildColor("surfaceHover02")};
`;

export const DetailsRow = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 4px;
  margin-top: 4px;
`;

export const BottomContainer = styled.div`
  width: 100%;
  margin: 16px 0 0 0;
  display: flex;
  flex-direction: row-reverse;
  gap: 8px;

  ${mobileStyles(css`
    margin: 0 0 0 0;
  `)}
`;

export const BottomDivider = styled.div`
  width: calc(100% + 32px);
  height: 1px;
  background-color: ${buildColor("surfaceHover02")};
  overflow: hidden;
  margin-left: -16px;
  margin-top: auto;
  margin-bottom: -16px;

  ${mobileStyles(css`
    margin-bottom: 0;
  `)}
`;
