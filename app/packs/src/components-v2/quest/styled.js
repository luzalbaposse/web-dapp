import { buildColor, mobileStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

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

  ${mobileStyles(css`
    flex-direction: column;
  `)}
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

export const QuestStreakEntry = styled.a`
  border-radius: 8px;
  border: 1px solid ${buildColor("surfaceHover02")};
  color: ${buildColor("primary01")};
  display: flex;
  gap: 16px;
  justify-content: space-between;
  outline: none;
  padding: 8px;
  text-decoration: none;

  ${({ isCompleted }) =>
    isCompleted
      ? `cursor: default;`
      : `
        cursor: pointer;

        :hover, :active {
          border: 1px solid ${buildColor("primary04")};
          color: ${buildColor("primary01")};
        }
      `
  }
`;

export const QuestStreakData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const QuestStreakDataBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const QuestStreakDataRow = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  justify-content: space-between;
`;

export const QuestStreakProgressBar = styled.progress`
  appearance: none;
  -webkit-appearance: none;
  height: 4px;
  width: 100%;

  ::-webkit-progress-bar {
    background-color: ${buildColor("surfaceHover02")};
    border-radius: 24px;
  }

  ::-webkit-progress-value {
    ${({ isCompleted }) =>
      isCompleted
        ? `background-color: ${buildColor("primaryDisable")};`
        : `background-color: ${buildColor("primary")};`
    }
    border-radius: 24px;
  }
`;


export const QuestStreakLockedTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  border: 1px solid ${buildColor("surfaceHover02")};
  border-radius: 4px;
  gap: 8px;
  white-space: nowrap;
`;
