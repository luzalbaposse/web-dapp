import { buildColor, desktopStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${desktopStyles(css`
    border: 1px solid ${buildColor("surfaceHover02")};
    border-radius: 24px;
    padding-bottom: 16px;
  `)}
`;

export const TitleContainer = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${desktopStyles(css`
    padding: 16px;
  `)}
`;

export const BuildersList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 16px;
`;

export const BuilderEntry = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 16px 0 0;

  :nth-child(1) {
    padding-top: 0;
  }
`;

export const SupportButtonContainer = styled.div`
  padding: 8px 0 0 56px;
`;

export const ViewAllContainer = styled.div`
  padding: 16px 0 0 16px;
`;
