import styled, { css } from "styled-components";
import * as COLORS from "src/utils/colors";

export const ActionButton = styled.a`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  transition-duration: 0.25s;
  outline: none;

  ${({ theme }) => css`
    color: ${COLORS.PRIMARY_COLOR(theme)};

    :hover {
      text-decoration: underline;
    }
  `}
`;

export const DetailsCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-left: 16px;
`;

export const DetailsCellRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-left: 16px;
`;

export const RewardIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;

  ${({ theme }) =>
    css`
      background-color: ${COLORS.PRIMARY_COLOR(theme)};
      color: ${COLORS.TEXT_PRIMARY_01_INVERSE(theme)};
    `}
`;
