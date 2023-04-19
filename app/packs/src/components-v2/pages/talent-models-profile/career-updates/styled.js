import { buildColor, desktopStyles, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  margin-top: 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 0 16px;

  ${mobileStyles(css`
    border-bottom: 1px solid ${buildColor("surfaceHover02")};
  `)}

  ${desktopStyles(css`
    flex-grow: 1;
    border-radius: 24px;
    max-width: 40vw;
  `)}
`;

export const TitleContainer = styled.div`
  max-width: 327px;
  margin: 0 auto 24px auto;

  ${desktopStyles(css`
    text-align: left;
    margin: 0 0 24px 0;
  `)}
`;

export const InputContainer = styled.div`
  margin-bottom: 24px;

  ${mobileStyles(css`
    padding: 0 16px;
  `)}
`;
