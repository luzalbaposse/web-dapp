import { buildColor, desktopStyles, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  max-width: 1153px;
  padding: 0 16px 48px;
  margin: 40px auto 0;
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${mobileStyles(css`
    border-bottom: 1px solid ${buildColor("surfaceHover02")};
  `)}

  ${desktopStyles(css`
    padding: 0 0 48px;
  `)}
`;

export const TitleContainer = styled.div`
  max-width: 327px;
  margin: auto;
  text-align: center;

  ${desktopStyles(css`
    max-width: 100%;
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
