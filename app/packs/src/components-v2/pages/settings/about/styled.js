import styled, { css } from "styled-components";
import { mobileStyles } from "@talentprotocol/design-system";

export const Container = styled.section`
  padding: 94px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const LinksArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const LinksRow = styled.div`
  display: flex;
  gap: 24px;

  ${mobileStyles(css`
    flex-direction: column;
  `)}
`;
