import { buildColor } from "@talentprotocol/design-system";
import styled from "styled-components";

export const Container = styled.section`
    padding: 0 16px;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    border-bottom: 1px solid ${buildColor("surfaceHover02")};
    padding-bottom: 48px;
`