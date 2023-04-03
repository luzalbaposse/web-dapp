import { buildColor, desktopStyles, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  padding: 16px;
  margin-top: 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  ${({ hasSupporters }) =>
    !hasSupporters &&
    css`
      display: none;
    `}

  ${mobileStyles(css`
    border-bottom: 1px solid ${buildColor("surfaceHover02")};
  `)}

  ${desktopStyles(css`
    width: 100%;
    max-width: 456px;
    padding: 24px;
    border: 1px solid ${buildColor("surfaceHover02")};
    border-radius: 24px;
  `)}
`;

export const TitleContainer = styled.div`
  max-width: 327px;
  margin: auto;

  ${desktopStyles(css`
    margin: 0;
    text-align: left;
    margin-bottom: 8px;
  `)}
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  ${mobileStyles(css`
    margin-top: 42px;
  `)}
`;

export const ListItem = styled.a`
  padding: 16px 0;
  display: flex;
  gap: 16px;
`;
