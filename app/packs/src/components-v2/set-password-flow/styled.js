import { buildColor, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${mobileStyles(css`
    justify-content: flex-start;
  `)}
`;

export const StepCounterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 16px;
  padding: 0;
`;

export const InnerContainer = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px 16px;
  gap: 8px;

  ${mobileStyles(css`
    justify-content: flex-start;
  `)}
`;

export const ActionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
  padding: 0 16px;

  ${mobileStyles(css`
    padding: 16px;
    border-top: 1px solid ${buildColor("surfaceHover01")};
  `)}
`;
