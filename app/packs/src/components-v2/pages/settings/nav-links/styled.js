import { buildColor } from "@talentprotocol/design-system";
import styled from "styled-components";

export const Container = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 58px;
`;

export const Link = styled.a`
  cursor: pointer;

  label {
    cursor: pointer;
  }

  label:hover {
    color: ${buildColor("primary01")};
  }
`;
