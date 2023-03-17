import { buildColor } from "@talentprotocol/design-system";
import styled from "styled-components";

export const Container = styled.section`
    padding: 16px;
    margin-top: 32px;
    text-align: center;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${buildColor("surfaceHover02")};
`;

export const ListContainer = styled.div`
    margin-top: 42px;
    display: flex;
    flex-direction: column;
`;

export const ListItem = styled.div`
    padding: 16px 0;
    display: flex;
    gap: 16px;
`;

export const ListItemInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ListItemInfoRow = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;
