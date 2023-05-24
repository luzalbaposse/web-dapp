import { buildColor, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  margin-bottom: 40px;

  ${mobileStyles(css`
    padding: 0 16px;
  `)}
`;

export const NewSubscribersContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 40px;
  margin-top: 24px;
  border-radius: 24px;
  border: 1px solid ${buildColor("surfaceHover02")};
  gap: 24px;

  ${mobileStyles(css`
    padding: 16px;
  `)}
`;

export const NewSubscribersList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NewSubscribersRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  gap: 16px;
  border-bottom: 1px solid ${buildColor("surfaceHover02")};

  :last-child {
    border-bottom: 0;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 8px;
`;

export const LoadMoreContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
`;

export const SubscribersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 40px;

  ${mobileStyles(css`
    padding: 0 16px;
  `)}
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 24px;

  ${mobileStyles(css`
    gap: 16px;
  `)}
`;
