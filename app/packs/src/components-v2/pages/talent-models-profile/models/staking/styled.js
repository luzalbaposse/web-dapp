import { buildColor } from "@talentprotocol/design-system";
import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    border: 1px solid ${buildColor("surfaceHover02")};
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    text-align: center;

    button {
        margin-top: 32px;
    }
`;

export const ImageContainer = styled.div`
    width: 88px;
    height: 88px;
    border-radius: 50%;
    background: ${buildColor("primaryTint02")};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 32px;
`;