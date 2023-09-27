import { desktopStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.main`
  padding: 68px 0 42px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  margin-bottom: 36px;

  ${desktopStyles(css`
    width: 1128px;
    max-width: 1128px;
    margin: 24px auto 52px;

    p {
      max-width: 562px;
    }
  `)}
`;
