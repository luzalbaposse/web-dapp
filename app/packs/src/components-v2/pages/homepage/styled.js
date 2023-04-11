import { desktopStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.main`
  max-width: 1128px;
  padding: 66px 0 0;
  margin: 0 auto;

  ${desktopStyles(css`
    display: grid;
    grid-template-columns: 1fr 456px;
    grid-auto-rows: minmax(0, auto);
    gap: 24px;
    grid-template-areas: 
      "GMContainer GMContainer"
      "CompleteProfileWidget MyWallet"
      "QuestsWidget RecommendedBuilders"
      "ActivityWidget RecommendedTeams"
      "B LeaderboardWidget";
  `)}
`;