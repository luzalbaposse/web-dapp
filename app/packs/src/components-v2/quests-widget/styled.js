import { buildColor } from "@talentprotocol/design-system";
import styled from "styled-components";

export const Container = styled.section`
  grid-area: QuestsWidget;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 8px;
`;

export const QuestEntry = styled.div`
  padding: 8px;
  display: flex;
  justify-content: space-between;
  border: 1px solid ${buildColor("surfaceHover02")};
  border-radius: 8px;
`;

export const QuestData = styled.div`
  display: flex;
  flex-direction: column;
`;

export const QuestReward = styled.div`
  display: flex;
  align-items: center;
`;

export const RewardTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  border: 1px solid ${buildColor("surfaceHover02")};
  border-radius: 4px;
  gap: 10px;
`;
