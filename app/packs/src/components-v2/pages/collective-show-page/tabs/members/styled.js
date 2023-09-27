import { mobileStyles, buildColor } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(4, 1fr);

  ${mobileStyles(css`
    grid-template-columns: 1fr;
  `)}
`;

export const VoteContainer = styled.div`
  display: flex;
  justify-content: end;
`;

export const VoteTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const VoteDiv = styled.div`
  width: 1px;
  height: 32px;
  margin-top: -8px;
  margin-bottom: -8px;
  margin-left: 16px;
  margin-right: 12px;

  ${({ color }) => css`
    border-left: 1px solid ${buildColor(color)};
  `}
`;
