import { buildColor } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  padding: 30px 0 16px;
  border-radius: 24px 24px 0px 0px;
  background: ${buildColor("primaryTint02")};
  overflow-x: hidden;
`;

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  ${({ withPadding }) =>
    withPadding &&
    css`
      padding: 0 16px;
    `};
`;

export const CardContainer = styled.div`
  width: 100%;
  display: inline-flex;
  gap: 16px;
  overflow: scroll;
  padding: 0 16px;
  margin: 40px 0;
`;

export const Card = styled.div`
  min-width: 252px;
  min-height: 188px;
  background: ${({ isPrimary }) => (isPrimary ? buildColor("primary") : "transparent")};
  border-radius: 16px;
  border: 1px solid ${buildColor("primary")};
`;

export const RecentActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 32px;
  padding: 0 16px;
`;

export const ActivityEntry = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ActivityAmount = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FooterActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8xp;
  padding: 0 16px;
`;
