import { buildColor } from "@talentprotocol/design-system";
import styled from "styled-components";

export const QuestEntry = styled.a`
  outline: none;
  text-decoration: none;
  padding: 8px;
  color: ${buildColor("primary01")};
  display: flex;
  justify-content: space-between;
  border: 1px solid ${buildColor("surfaceHover02")};
  border-radius: 8px;
  gap: 16px;
  cursor: default;

  ${({ isCompleted }) =>
    isCompleted
      ? `
    border: 1px solid ${buildColor("primary")};
    color: ${buildColor("primary")};


    :visited, :hover, :active {
      color: ${buildColor("primary")};
    }
  `
      : `
    cursor: pointer;
    
    :hover, :active {
      color: ${buildColor("primary01")};
      border: 1px solid ${buildColor("primary04")};
    }
  `}
`;

export const QuestData = styled.div`
  display: flex;
  flex-direction: column;
`;

export const QuestDataRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  > :last-child {
    margin-left: -4px;
  }

  > :first-child {
    margin-left: 0;
  }
`;

export const QuestReward = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const RewardTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  border: 1px solid ${buildColor("surfaceHover02")};
  border-radius: 4px;
  gap: 8px;
  white-space: nowrap;
`;
