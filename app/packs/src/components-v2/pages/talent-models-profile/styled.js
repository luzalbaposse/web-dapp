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
