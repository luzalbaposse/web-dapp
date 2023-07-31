import { buildColor } from "@talentprotocol/design-system";
import styled from "styled-components";

export const PageContainer = styled.div`
  padding-top: 64px;
`;

export const DesktopPageContainer = styled.div`
  display: flex;
  height: 100vh;
  max-height: 100vh;
  padding-top: 68px;
  max-width: 1224px;
  min-width: 1224px;
  margin: auto;
`;

export const DesktopColumn = styled.div`
  display: flex;
  border-right: 1px solid ${buildColor("surfaceHover02")};

  :nth-child(1) {
    flex-basis: 288px;
    min-width: 288px;
    max-width: 288px;
    padding: 24px 24px 0 0;
  }

  :nth-child(2) {
    flex-grow: 1;
    min-width: 648px;
    max-width: 648px;
  }

  :nth-child(3) {
    display: flex;
    flex-direction: column;
    flex-basis: 288px;
    min-width: 288px;
    max-width: 288px;
    padding: 24px 0 0 24px;
    gap: 24px;
    border: none;
    flex-direction: column;
    overflow-y: auto;

    ::-webkit-scrollbar{
        display: none;
      }
  }
`;
