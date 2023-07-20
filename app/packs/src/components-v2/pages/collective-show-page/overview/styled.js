import { buildColor, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const BannerContainer = styled.div`
  display: flex;

  @media (max-width: 991px) {
    padding: 0 15px;
  }
`;

export const CardsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(3, 1fr);

  ${mobileStyles(css`
    grid-template-columns: 1fr;
  `)}
`;

export const DataContainer = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  max-width: 60%;

  ${mobileStyles(css`
    flex-direction: column;
    padding: 0 24px;
    max-width: 100%;
  `)}
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Logo = styled.img`
  background-color: ${buildColor("bg01")};
  border: 4px solid ${buildColor("bg01")};
  border-radius: 8px;
  height: 120px;
  width: 120px;
  object-fit: cover;
`;

export const LogoColumn = styled.div`
  padding: 0 15px;
  z-index: 1;
`;

export const LogoContainer = styled.div`
  margin-top: 225px;
  z-index: 1;

  @media (max-width: 991px) {
    margin-top: 50px;
  }
`;

export const MemberAvatar = styled.div`
  border: 2px solid ${buildColor("bg01")};
  border-radius: 50%;
  margin-left: -10px;
`;

export const MemberAvatars = styled.div`
  align-items: center;
  display: flex;
  margin-left: 10px;
`;

export const MemberCount = styled.div`
  align-items: center;
  display: flex;
  gap: 4px;
`;

export const MembersContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const SpinnerContainer = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 200px;
  min-height: 400px;
`;

export const Tag = styled.div`
  background-color: ${buildColor("primaryTint02")};
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

export const Title = styled.div`
  align-items: center;
  display: flex;
  gap: 4px;
`;

export const VerifiedIcon = styled.img`
  height: 20px;
  width: 20px;
`;
