import { buildColor, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const NewSubscribersContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 40px;
  margin-top: 40px;
  border-radius: 24px;
  background: ${buildColor("primaryTint02")};
  border: 1px solid ${buildColor("primaryTint01")};
  gap: 24px;

  ${mobileStyles(css`
    border-radius: 24px 24px 0px 0px;
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
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 8px;
`;

export const LoadMoreContainer = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
`;

export const SubscribersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 40px;
  margin-top: 40px;

  ${mobileStyles(css`
    padding: 16px;
  `)}
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 24px;
  gap: 24px;
`;

export const SubscriberCard = styled.div`
  border: 1px solid #dadde1;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 264px;
  height: 260px;
  position: relative;

  ${mobileStyles(css`
    border-radius: 16px;
    width: 164px;
  `)}
`;

export const CardBanner = styled.div`
  height: 66px;
  width: 100%;
  margin-bottom: 56px;
  border-radius: 16px 16px 0 0;
  ${({ url }) =>
    url
      ? css`
          background: url(${url}) no-repeat center;
        `
      : css`
          background: ${buildColor("primaryTint01")};
        `}
`;

export const AvatarContainer = styled.div`
  position: absolute;
  top: 20px;
  border-radius: 50%;
  border: 2px solid ${buildColor("bg01")};
`;

export const SubscriberCardInfoContainer = styled.div`
  text-align: center;
  max-width: calc(100% - 32px);

  * {
    display: inline;
    margin-right: 4px;
  }
`;

export const ButtonContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: flex-end;
  padding: 16px 0;
`;
