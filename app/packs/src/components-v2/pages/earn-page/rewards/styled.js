import { desktopStyles, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  padding: 24px 16px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DesktopGrid = styled.div`
  ${mobileStyles(css`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `)}

  ${desktopStyles(css`
    width: 1128px;
    max-width: 1128px;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 8px;
    column-gap: 24px;
  `)}
`;
