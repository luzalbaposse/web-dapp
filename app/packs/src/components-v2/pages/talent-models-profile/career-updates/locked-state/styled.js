import { mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";
import BlurredBackgroundDesktop from "./assets/blurred-background-desktop.png";
import BlurredBackgroundMobile from "./assets/blurred-background-mobile.png";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-grow: 1;
  gap: 24px;
  background: url("${BlurredBackgroundDesktop}");
  background-size: cover;
  aspect-ratio: 648 / 240;

  ${mobileStyles(css`
    background: url("${BlurredBackgroundMobile}");
    padding: 16px 16px 48px;
    background-size: cover;
    aspect-ratio: 375 / 263;
  `)}
`;

export const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
