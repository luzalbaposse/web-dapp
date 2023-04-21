import { buildColor, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  position: relative;

  height: 100%;
`;

export const ContentContainer = styled.section`
  // Fixed bottom height
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: scroll;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
  padding-top: 8px;
  width: 100%;
  padding-bottom: 24px;
  border-bottom: 1px solid ${buildColor("surfaceHover02")};
`;

export const DetailsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 16px;
  padding-top: 16px;
  border-bottom: 1px solid ${buildColor("surfaceHover02")};
`;

export const DetailsRow = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 4px;
  margin-top: 4px;
`;

export const FixedBottom = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  height: 48px;
`;

export const BottomDivider = styled.div`
  width: calc(100% + 32px);
  height: 1px;
  min-height: 1px;
  background-color: ${buildColor("surfaceHover02")};
  overflow: hidden;
  margin-left: -16px;

  ${mobileStyles(css`
    margin-bottom: 0;
  `)}
`;

export const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  gap: 8px;
  margin-top: 16px;

  ${mobileStyles(css`
    padding: 0 0 0 0;
  `)}
`;
