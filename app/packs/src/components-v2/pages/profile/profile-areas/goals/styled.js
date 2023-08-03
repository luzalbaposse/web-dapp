import { Typography } from "@talentprotocol/design-system";
import styled from "styled-components";

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 24px 24px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  text-align: center;
  padding-top: 40px;
`;

export const EmptyStateCopy = styled(Typography)`
  * {
    display: inline;
    word-break: break-word;
  }
`;
