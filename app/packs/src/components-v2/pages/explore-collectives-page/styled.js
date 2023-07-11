import { mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  justify-items: center;

  ${mobileStyles(css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `)}
`;

export const Container = styled.div`
  padding-bottom: 40px;

  ${mobileStyles(css`
    padding: 1.5rem;
  `)}
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 48px;
`;

export const LoadMoreButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
`;
