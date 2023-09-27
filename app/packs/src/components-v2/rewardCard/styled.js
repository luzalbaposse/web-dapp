import { buildColor } from "@talentprotocol/design-system";
import styled from "styled-components";

export const RewardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 8px;
  border: 1px solid ${buildColor("surfaceHover02")};
  border-radius: 16px;
  padding: 12px;
  position: relative;
`;

export const TextContainer = styled.div`
  padding: 8px;
`;

export const RewardImageContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

export const RewardImage = styled.img`
  width: 100%;
`;

export const CostIndicator = styled.div`
  display: flex;
  position: absolute;
  top: 16px;
  right: 16px;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  border: 1px solid ${buildColor("surfaceHover02")};
  background-color: ${buildColor("bg01")};
  border-radius: 4px;
  gap: 8px;
  white-space: nowrap;
`;
