import { buildColor } from "@talentprotocol/design-system";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const TabsContainer = styled.div`
  padding: 24px 0 0;
  border-bottom: 1px solid ${buildColor("surfaceHover02")};

  :nth-child(1) {
    & div:first-child {
      padding-left: 8px;
    }
    & div:last-child {
      padding-right: 8px;
    }
  }
`;

export const AreaContainer = styled.section`
  padding: 24px 0 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-x: hidden;
  height: 100%;

  ::-webkit-scrollbar {
    display: none;
  }
`;
