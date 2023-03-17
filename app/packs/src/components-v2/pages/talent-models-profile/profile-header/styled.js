import { buildColor } from "@talentprotocol/design-system";
import styled from "styled-components";

export const Container = styled.div``;

export const BannerContainer = styled.div`
  position: relative;
  display: column;
  gap: 14px;
`;

export const Banner = styled.img`
  width: 100%;
  height: 82px;
  object-fit: cover;
`;

export const AvatarContainer = styled.div`
  position: absolute;
  z-index: 1;
  border: 4px solid ${buildColor("bg01")};
  border-radius: 50%;
  left: 24px;
  top: 33px;
`;

export const ActionArea = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 16px;
  gap: 16px;
`;

export const InfoArea = styled.div`
  diplay: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 24px;
`;

export const DetailedInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
