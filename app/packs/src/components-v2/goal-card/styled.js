import { buildColor } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid ${buildColor("surfaceHover02")};
`;

export const TagsRow = styled.div`
  display: flex;
  gap: 4px;
`;

export const DropDownContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
`;

export const GoalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const GoalImage = styled.img`
  border-radius: 16px;
  max-width: 100%;
  object-fit: cover;
`;

export const VoteContainer = styled.a`
  display: flex;
  justify-content: flex-start;
  width: fit-content;
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

export const StyledTypographyLink = styled.a`
  font-weight: 700;
  outline: none;

  :hover {
    text-decoration: underline;
  }
`;
