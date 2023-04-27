import { Typography } from "@talentprotocol/design-system";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: overlay;
  width: 100%;
  padding-right: 8px;
  padding-left: 8px;
`;

export const Image = styled.img`
  border-radius: 8px;
  width: 100%;
  max-height: 300px;
`;

export const LinkContainer = styled.div`
  margin-right: 24px;
`;

export const StyledUpdateContent = styled(Typography)`
  white-space: pre-line;
`;
