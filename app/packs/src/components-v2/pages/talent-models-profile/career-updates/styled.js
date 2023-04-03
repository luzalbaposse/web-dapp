import { buildColor, desktopStyles, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  margin-top: 32px;
  text-align: center;
  display: flex;
  flex-direction: column;

  ${mobileStyles(css`
    border-bottom: 1px solid ${buildColor("surfaceHover02")};
  `)}

  ${desktopStyles(css`
    flex-grow: 1;
    border-radius: 24px;
  `)}
`;

export const TitleContainer = styled.div`
  max-width: 327px;
  margin: auto;

  ${desktopStyles(css`
    margin: 0;
    text-align: left;
    margin-bottom: 24px;
  `)}
`;

export const InputContainer = styled.div`
  ${mobileStyles(css`
    padding: 0 16px;
  `)}
`;
