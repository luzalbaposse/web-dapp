import { buildColor, desktopStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 24px;

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
`;

export const InfoColumn = styled.div`
  display: flex;
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
    max-width: 280px;
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
