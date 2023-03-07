import styled, { css } from "styled-components";
import { buildColor } from "@talentprotocol/design-system";
import { mobileStyles } from "@talentprotocol/design-system/breakpoints";

export const ActionArea = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-top: 1px solid ${buildColor("surfaceHover01")};


  ${mobileStyles(css`
    border-top: 1px solid ${buildColor("surfaceHover01")};
  `)}
`;
