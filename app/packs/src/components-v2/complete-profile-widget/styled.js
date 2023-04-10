import { buildColor } from "@talentprotocol/design-system";
import styled from "styled-components";

export const Container = styled.section`
  margin: 16px;
  display: flex;
  flex-direction: column;
  padding: 24px;
  border: 1px solid ${buildColor("surfaceHover02")};
  border-radius: 24px;
  gap: 16px;
`;

export const ProgressContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  background: radial-gradient(closest-side, white 89%, transparent 80% 100%),
    conic-gradient(${buildColor("primary")} ${({ progress }) => progress}%, ${buildColor("primaryDisable")} 0);
`;

export const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 8px;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 24px 0;
`;

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
