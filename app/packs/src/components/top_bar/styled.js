import { buildColor } from "@talentprotocol/design-system";
import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    margin: auto;
    padding: 4px 16px;
    background: ${buildColor("warning")}
`;

export const InnerContainer = styled.div`
    width: 100%;
    max-width: 1160px;
    margin: auto;
    display: flex;
    gap: 4px;
    align-items: center;

    & :nth-child(2) {
        flex-grow: 1;
    }

    & :nth-child(3) {
        cursor: pointer;
    }
`;

export const IconContainer = styled.div``;