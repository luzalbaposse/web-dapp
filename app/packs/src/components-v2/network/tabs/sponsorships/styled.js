import { buildColor, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  ${mobileStyles(css`
    padding: 0 16px;
  `)}

  margin-bottom: 40px;
`;

export const NewSponsorsContainer = styled.section`
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

export const NewSponsorsList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NewSponsorsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  padding: 16px 0;
  gap: 16px;
  border-bottom: 1px solid ${buildColor("surfaceHover02")};

  :last-child {
    border-bottom: 0;
  }
`;

export const MessageContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 24px;
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

export const SponsorsContainer = styled.div`
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
`;

export const SponsorCard = styled.div`
  border: 1px solid ${buildColor("surfaceHover02")};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 264px;
  height: 260px;
  position: relative;

  ${mobileStyles(css`
    width: 164px;
  `)}
`;

export const SponsoredCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
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

export const SponsorCardInfoContainer = styled.div`
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

export const TagsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;

  ${mobileStyles(css`
    flex-direction: column;
    gap: 16px;
  `)}
`;
