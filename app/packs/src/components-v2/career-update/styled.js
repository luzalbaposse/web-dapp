import { Typography, buildColor, desktopStyles, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 16px;
  border-bottom: 1px solid ${buildColor("surfaceHover02")};

  &:last-child {
    border-bottom: none;
  }

  ${mobileStyles(css`
    padding: 24px 16px;
  `)}

  ${desktopStyles(css`
    padding: 24px 0;
  `)}
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

export const StyledUpdateContent = styled(Typography)`
  white-space: pre-line;
`;

export const UpdatesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
