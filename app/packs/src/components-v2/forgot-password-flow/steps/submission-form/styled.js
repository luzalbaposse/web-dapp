import { mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Form = styled.form`
  margin-top: 56px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${mobileStyles(css`
    margin-top: 32px;
  `)}
`;

export const EmailBox = styled.div``;
