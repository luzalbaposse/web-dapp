import { buildColor } from "@talentprotocol/design-system";
import styled from "styled-components";

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid ${buildColor("surfaceHover02")};
`;

export const TagsRow = styled.div`
  display: flex;
  gap: 4px;
`;

export const DropDownContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
`;

export const GoalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const GoalImage = styled.img`
  border-radius: 8px;
  max-width: 100%;
  object-fit: cover;
`;
