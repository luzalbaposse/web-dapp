import styled from "styled-components";
import { buildColor } from "@talentprotocol/design-system";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TextInputContainer = styled.div`
  position: relative;
`;

export const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
`;

export const SearchIconContainer = styled.div`
  position: absolute;
  top: 9px;
  left: 10px;
  color: ${buildColor("primaryDisable")};
`;
