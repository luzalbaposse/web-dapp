import { desktopStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.main`
  margin: 66px 0 0;
  padding: 0;

  ${({ isLoading }) =>
    isLoading &&
    css`
      display: flex;
      justify-content: center;
      padding: 24px;
    `}
`;

export const ContentDesktopRow = styled.div`
  ${({ hasSupporters }) =>
    !hasSupporters &&
    css`
      justify-content: center;
    `}

  ${desktopStyles(css`
    max-width: 1153px;
    margin: auto;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    gap: 24px;
  `)}
`;
