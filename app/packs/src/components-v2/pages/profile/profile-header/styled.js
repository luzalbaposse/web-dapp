import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0 16px;
  padding-top: 16px;
  gap: 8px;
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const LocationContainer = styled.div`
  padding-top: 8px;
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const MembersContainer = styled.div`
  display: flex;
  gap: 4px;
  padding: 8px 0 16px;
  align-items: center;
`;
