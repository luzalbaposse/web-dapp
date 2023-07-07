import { mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.div`
  align-items: center;
  display: flex;
  height: 34px;
  justify-content: space-between;
  margin-bottom: 40px;
  margin-top: 40px;

  ${mobileStyles(css`
    align-items: flex-start;
    flex-direction: column;
    height: auto;
    justify-content: flex-start;
  `)}
`;

export const Form = styled.form`
  position: relative;
  width: 265px;

  ${mobileStyles(css`
    margin-top: 16px;
    width: 100%;
  `)}
`;
