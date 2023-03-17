import { buildColor } from "@talentprotocol/design-system";
import styled from "styled-components";

export const Container = styled.div`
  padding: 24px 16px;
  border-bottom: 1px solid ${buildColor("surfaceHover02")};
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 16px;

  &:last-child {
    border-bottom: none;
  }
`;

export const AvatarHeader = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

export const ReplyArea = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 16px;
`;