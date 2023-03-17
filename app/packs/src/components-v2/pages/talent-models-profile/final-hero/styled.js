import { buildColor } from "@talentprotocol/design-system";
import styled from "styled-components";

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 48px 16px 62px;
    gap: 24px;
`;

export const Headline = styled.div`
    text-align: center;

    h4 {
        display: inline;
    }
`;

export const SocialList = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;

export const ActionArea = styled.div`
    margin-top: 24px;

    button {
        margin: auto;
    }

    button:nth-child(2) {
        margin-top: 8px;
    }
`;



