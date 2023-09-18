import styled from "styled-components";

export const OutterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
`;

export const BottomContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  max-width: 360px;
  margin: 0 auto;
  gap: 8px;
  margin-top: 56px;
`;
