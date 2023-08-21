import { buildColor, desktopStyles, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${mobileStyles(css``)}

  ${desktopStyles(css`
    border: 1px solid ${buildColor("surfaceHover02")};
    border-radius: 24px;
  `)}
`;

export const TitleContainer = styled.div`
  width: 100%;
  padding: 16px 0px 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TeamsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 16px;
  gap: 8px;
`;

export const EntryContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-top: 8px;
  padding-bottom: 8px;
  gap: 16px;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  color: ${buildColor("primary01")};

  a {
    white-space: nowrap;
  }

  :hover {
    color: ${buildColor("primary01")};
  }

  * {
    cursor: pointer;
  }
`;

export const InfoColumn = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

export const EllipsisContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;

  ${({ ellipsisAt }) =>
    !!ellipsisAt &&
    css`
      p,
      label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: ${ellipsisAt}px;
      }
    `}
`;

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ViewAllContainer = styled.div`
  padding-bottom: 16px;
`;
