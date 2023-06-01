import { desktopStyles, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  gap: 8px;

  ${mobileStyles(css`
    padding: 16px;
  `)}
`;

export const TitleContainer = styled.div`
  width: 100%;
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${desktopStyles(css`
    padding: 16px 0 8px;
  `)}
`;
