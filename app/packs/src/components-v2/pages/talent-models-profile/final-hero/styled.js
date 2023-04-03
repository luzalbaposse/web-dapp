import { buildColor, desktopStyles, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 48px 16px 62px;
  gap: 24px;

  ${desktopStyles(css`
    max-width: 1128px;
    margin: 56px auto 0;
    border: 1px solid ${buildColor("surfaceHover02")};
    border-radius: 24px;
    align-items: flex-start;
    padding: 40px;
  `)}
`;

export const Headline = styled.div`
  text-align: center;
  max-width: 327px;
  margin: auto;

  h4 {
    display: inline;
  }

  ${desktopStyles(css`
    margin: 0;
    max-width: 100%;
  `)}
`;

export const DesktopBottomContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${desktopStyles(css`
    display: flex;
    flex-direction: row;
    width: 100%;
  `)}
`;

export const SocialList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  ${mobileStyles(css`
    justify-content: center;
  `)}

  ${desktopStyles(css`
    flex-grow: 1;
  `)}
`;

export const ActionArea = styled.div`
  margin-top: 24px;

  a {
    margin: auto;
  }

  ${mobileStyles(css`
    a:nth-child(2) {
      margin-top: 8px;
    }
  `)}

  ${desktopStyles(css`
    margin: 0;
    display: flex;
    flex-direction: row;
    gap: 8px;
  `)}
`;

export const HighlightedWord = styled.span`
  color: ${buildColor("primary")};
`;
