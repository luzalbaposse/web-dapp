import { Typography, buildColor, desktopStyles, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 15px 0 24px;
`;

export const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;

  ${desktopStyles(css`
    padding: 0;
  `)}
`;

export const FilterContainer = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  min-width: 224px;
`;

export const UpdatesContainer = styled.div`
  display: flex;
  flex-direction: column;

  > :nth-child(1) {
    margin-top: -9px;
  }

  ${desktopStyles(css`
    gap: 24px;
  `)}
`;

export const StyledTypography = styled(Typography)`
  white-space: pre-line;
  display: inline;
  direction: ltr;
  gap: 4px;
  ${({ shouldShowMore }) =>
    !shouldShowMore &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    `}
`;

export const StyledTypographyLink = styled.a`
  color: ${buildColor("primary01")} !important;
  font-weight: 700;
  outline: none;

  :hover {
    text-decoration: underline;
  }
`;

export const Update = styled.article`
  padding: 0 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${buildColor("surfaceHover02")};
  display: flex;
  flex-direction: column;

  ${mobileStyles(css`
    :last-child {
      border-bottom: none;
    }
  `)}

  ${desktopStyles(css`
    border: 1px solid ${buildColor("surfaceHover02")};
    border-radius: 24px;
  `)}
`;

export const UpdateTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 0 16px;
  justify-content: space-between;
`;

export const TitleDateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const UpdateContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

export const ReplyArea = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 16px;
`;

export const LoadMoreContainer = styled.div`
  padding: 24px 16px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ActivityContainer = styled.div`
  position: relative;
  word-break: break-word;
`;

export const ShowMoreContainer = styled.div`
  position: absolute;
  bottom: -2px;
  right: 0;
  background: red;
  background-color: ${buildColor("bg01")};
`;
