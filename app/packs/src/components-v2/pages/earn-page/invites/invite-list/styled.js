import { Typography, buildColor, desktopStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;

  ${desktopStyles(css`
    width: 1128px;
    max-width: 1128px;
    margin: auto;
    padding: 24px 0 0;
  `)}
`;

export const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-grow: 1;
  gap: 8px;
`;

export const DesktopCopyInviteLinkContainer = styled.div`
  display: none;

  ${desktopStyles(css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  `)}
`;

export const StyledTypography = styled(Typography)`
  white-space: pre-line;
  display: inline;
  direction: ltr;
  gap: 4px;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  width: 100%;

  ${desktopStyles(css`
    margin 52px auto 0;
  `)}
`;

export const ListItem = styled.a`
  display: flex;
  padding: 18px 16px;
  gap: 16px;
  border-bottom: 1px solid ${buildColor("surfaceHover02")};
  cursor: pointer;

  > :nth-child(1) {
    flex-grow: 1;
    justify-content: flex-start;
  }

  :hover {
    background-color: ${buildColor("surface02")};
  }
`;

export const RewardTag = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  border: 1px solid ${buildColor("surfaceHover02")};
  border-radius: 4px;
  gap: 8px;
  white-space: nowrap;
`;

export const LoadMoreContainer = styled.div`
  margin: 16px auto 0;

  ${desktopStyles(css`
    margin: 32px auto 0;
  `)}
`;

export const InviteLinkArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  gap: 8px;

  ${desktopStyles(css`
    display: none;
  `)}
`;

export const InviteLink = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 290px;
`;

export const InvitesRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
