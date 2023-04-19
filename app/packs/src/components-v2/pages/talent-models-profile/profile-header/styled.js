import { buildColor, desktopStyles, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.div`
  max-width: 1153px;
  margin: auto;
  position: relative;
`;

export const BannerContainer = styled.div`
  display: column;
  gap: 14px;
`;

export const Banner = styled.img`
  width: 100%;
  height: 82px;
  object-fit: cover;
  border-radius: 0px 0px 8px 8px;

  ${desktopStyles(css`
    height: 282px;
  `)}
`;

export const AvatarContainer = styled.div`
  position: absolute;
  z-index: 1;
  border: 4px solid ${buildColor("bg01")};
  border-radius: 50%;
  left: 16px;
  top: 33px;

  ${desktopStyles(css`
    top: 231px;
  `)}
`;

export const ActionArea = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 19px 16px 0;
  gap: 16px;

  ${mobileStyles(css`
    margin: 16px;
  `)}
`;

export const InfoArea = styled.div`
  diplay: flex;
  flex-direction: column;
  gap: 4px;

  ${mobileStyles(css`
    padding: 0 24px;
  `)}
`;

export const DetailedInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
