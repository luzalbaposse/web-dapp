import { buildColor, desktopStyles, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 8px;

  ${mobileStyles(css``)}

  ${desktopStyles(css`
    border: 1px solid ${buildColor("surfaceHover02")};
    border-radius: 24px;
  `)}
`;

export const TitleContainer = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${desktopStyles(css`
    padding: 24px;
  `)}
`;

export const TeamsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 16px;
  gap: 16px 32px;
`;

export const EntryContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px 0;
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
  gap: 16px;
`;

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 232px;

    ${desktopStyles(css`
      max-width: 332px;
    `)}
  }
`;

export const VerifiedNameRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const Tags = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
