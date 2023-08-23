import { buildColor } from "@talentprotocol/design-system";
import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledImage = styled.img`
  border-radius: 4px;
  width: 24px;
  height: 24px;
`;

export const IconContainer = styled.div`
  border-radius: 4px;
  background: ${buildColor("primaryTint02")};
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${buildColor("primary04")};
`;
