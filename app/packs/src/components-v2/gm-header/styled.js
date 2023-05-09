import { desktopStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  ${desktopStyles(css`
    padding: 16px 0;
  `)}
`;

export const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${desktopStyles(css`
    a {
      display: none;
    }
  `)}
`;
