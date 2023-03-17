import { buildColor } from "@talentprotocol/design-system";
import styled from "styled-components";

export const Container = styled.section`
  margin-top: 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${buildColor("surfaceHover02")};
`;

export const TitleContainer = styled.div`
  max-width: 327px;
  margin: auto;
`;