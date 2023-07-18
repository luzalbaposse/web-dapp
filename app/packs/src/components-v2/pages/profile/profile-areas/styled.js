import { buildColor } from "@talentprotocol/design-system";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const TabsContainer = styled.div`
  display: flex;
  padding: 24px 24px 0;
  border-bottom: 1px solid ${buildColor("surfaceHover02")};
`;

export const AreaContainer = styled.section`
  padding: 24px 0 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`;
