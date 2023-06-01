import { buildColor } from "@talentprotocol/design-system";
import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${buildColor("primaryTint02")};
  padding-top: 40px;
`;

export const ScoreRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 38px;
`;
