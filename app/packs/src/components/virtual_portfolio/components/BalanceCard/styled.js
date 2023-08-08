import styled, { css } from "styled-components";
import * as COLORS from "src/utils/colors";

export const BalanceCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  min-width: 254px;
  min-height: 296px;
  border-radius: 16px;

  @media (max-width: 992px) {
    min-height: 208px;
  }

  ${({ theme, primary }) =>
    primary &&
    css`
      border: 1px solid ${COLORS.PRIMARY_COLOR(theme)};
      background-color: ${COLORS.PRIMARY_COLOR(theme)};
      color: ${COLORS.TEXT_PRIMARY_01_INVERSE(theme)};
    `}

  ${({ theme, primary }) =>
    !primary &&
    css`
      border: 1px solid ${COLORS.SURFACE_HOVER_02(theme)};
      background-color: none;
      color: ${COLORS.TEXT_PRIMARY_04(theme)};
    `}
`;

export const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BalanceTitle = styled.div`
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const BalanceValue = styled.div`
  margin-bottom: 4px;
  ${({ theme, highlightValues }) =>
    highlightValues &&
    css`
      color: ${COLORS.PRIMARY_COLOR(theme)};
    `}
`;

export const BalanceValueInDollars = styled.div`
  ${({ theme, highlightValues }) =>
    highlightValues &&
    css`
      color: ${COLORS.PRIMARY_COLOR(theme)};
    `}
`;
