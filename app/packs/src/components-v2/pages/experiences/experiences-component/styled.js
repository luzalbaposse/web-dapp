import { buildColor } from "@talentprotocol/design-system";
import styled from "styled-components";

export const Container = styled.section`
  margin-top: 58px;
  padding: 24px;
  gap: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Entry = styled.div`
  display: flex;
  gap: 8px;
`;

export const StyledImage = styled.img`
  border-radius: 4px;
  width: 42px;
  height: 42px;
`;

export const IconContainer = styled.div`
  background: ${buildColor("primaryTint02")};
  border-radius: 4px;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EntryColumn = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const DescriptionLine = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${buildColor("primary04")};
`;

export const EditButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
