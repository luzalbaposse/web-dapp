import styled from "styled-components";

export const NetworkSelection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 24px;
`;

export const BalanceSection = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const BalanceInformation = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;

  @media (min-width: 992px) {
    width: 50%;
  }

  @media (max-width: 992px) {
    overflow: scroll;
    margin-left: -16px;
    margin-right: -16px;
    padding-left: 16px;
    padding-right: 16px;
  }
`;

export const BalanceRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

export const SecondRowTitle = styled.div`
  display: none;

  @media (max-width: 992px) {
    margin-top: 8px;
    display: block;
  }
`;

export const Label = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  margin-bottom: 0px;
`;

export const TableOptions = styled.div`
  margin-top: 40px;
  margin-bottom: 24px;
  display: flex;
  justify-content: start;

  @media (min-width: 992px) {
    margin-top: 48px;
  }
`;

export const ModalRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SellAvailableModalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 32px;
`;

export const SellAreaButtons = styled.div`
  display: flex;
  justify-content: end;
  gap: 24px;
`;
