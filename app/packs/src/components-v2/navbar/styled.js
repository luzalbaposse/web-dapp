import { buildColor } from "@talentprotocol/design-system";
import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${buildColor("bg01")};
  border-bottom: 1px solid ${buildColor("surfaceHover02")};
  z-index: 1;
  padding: 16px 24px;
`;

export const InnerContainer = styled.div`
    max-width: 1128px;
    margin: auto;
    display: flex;
    align-items: center;
`;

export const LinksList = styled.nav`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const Link = styled.a`
  > :nth-child(1) {
    cursor: pointer;
    transition-duration: 0.25s;

    :hover {
      color: ${buildColor("primary01")};
    }
  }
`;
