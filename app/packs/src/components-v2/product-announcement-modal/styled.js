import { mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 100%;
`;

export const Image = styled.img`
  border-radius: 8px;
  width: 100%;
  max-height: 300px;
`;

export const LinkContainer = styled.div`
  margin-right: 24px;
`;
