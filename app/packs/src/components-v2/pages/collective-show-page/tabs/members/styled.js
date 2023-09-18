import { mobileStyles, buildColor } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const CardContainer = styled.div`
  margin: auto;
`;

export const Container = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(4, 1fr);

  ${mobileStyles(css`
    grid-template-columns: 1fr;
  `)}
`;

export const VoteTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const VoteDiv = styled.div`
  width: 1px;
  height: 32px;
  border-left: 1px solid ${buildColor("surfaceHover02")};
  margin-top: -8px;
  margin-bottom: -8px;
  margin-left: 16px;
  margin-right: 12px;
`;
