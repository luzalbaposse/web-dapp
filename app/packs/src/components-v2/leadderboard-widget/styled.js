import { buildColor, desktopStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  padding: 30px 16px 48px;
  border-radius: 24px 24px 0px 0px;
  background: ${buildColor("primaryTint02")};
  overflow-x: hidden;

  ${desktopStyles(css`
    border: 1px solid ${buildColor("primaryTint01")};
    border-radius: 24px;
    padding: 24px;
  `)}
`;

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h5 {
    white-space: pre-line;
  }

  ${desktopStyles(css`
    padding-bottom: 24px;
  `)}
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Entry = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${buildColor("surfaceHover02")};
`;

export const EntryIdentification = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 16px 0;
`;

export const Footer = styled.div`
  margin-top: ${({ isEmpty }) => isEmpty ? "24" : "48"};
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 16px;

  button {
    margin-top: 8px;
  }
`;
