import { buildColor, desktopStyles, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  max-width: 1128px;
  padding: 0 16px;
  margin: 40px auto 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 48px;

  ${mobileStyles(css`
    border-bottom: 1px solid ${buildColor("surfaceHover02")};
  `)}
`;

export const TitleContainer = styled.div`
  max-width: 327px;
  margin: auto;
  ${desktopStyles(css`
    margin: 0;
    text-align: left;
  `)}
`;

export const SupportModelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  ${desktopStyles(css`
    display: flex;
    flex-direction: row;
  `)}
`;
