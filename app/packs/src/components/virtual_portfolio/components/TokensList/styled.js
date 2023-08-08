import styled, { css } from "styled-components";
import * as COLORS from "src/utils/colors";

export const ActionButton = styled.a`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  transition-duration: 0.25s;
  outline: none;

  ${({ theme }) => css`
    color: ${COLORS.PRIMARY_COLOR(theme)};

    :hover {
      text-decoration: underline;
    }
  `}
`;

export const DetailsCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-left: 16px;
`;

export const DetailsCellRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-left: 16px;
`;

export const RewardIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: #7857ed;
  color: white;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export const ConnectionModalTop = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

export const ConnectionModalTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 36px;
`;

export const ConnectionModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
`;

export const ConnectionModalRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ConnectionModalFooter = styled.div`
  display: flex;
  margin-top: auto;
  flex-direction: row;
  justify-content: end;
  gap: 4px;
  width: 100%;
  border-top: 1px solid #dadde1;
  padding-top: 16px;
`;
