import { buildColor } from "@talentprotocol/design-system";
import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding-top: 8px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${buildColor("surfaceHover02")};
`;

export const DetailsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 16px;
  border-bottom: 1px solid ${buildColor("surfaceHover02")};
`;

export const DetailsRow = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const BottomContainer = styled.div`
  width: 100%;
  padding-top: 34px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 34px 0;
`;
