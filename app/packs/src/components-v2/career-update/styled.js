import { Typography, buildColor, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 16px;
  border: 1px solid ${buildColor("surfaceHover02")};
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 24px;

  ${mobileStyles(css`
    padding: 24px 16px;
  `)}
`;

export const AvatarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ReplyArea = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 16px;
`;

export const StyledUpdateContent = styled(Typography)`
  white-space: pre-line;
`;

export const UpdatesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const VerifiedIcon = styled.img`
  width: 12px;
  height: 12px;
`;
