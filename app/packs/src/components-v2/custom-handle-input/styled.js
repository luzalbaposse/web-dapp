import styled from "styled-components";
import { colors } from "../shared-styles";

export const Container = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  border: 1px solid ${({ isLight }) => (isLight ? colors.lightSurfaceHover02 : colors.darkSurfaceHover02)};
  border-radius: 8px;
  padding: 10px;
`;

export const InputArea = styled.div`
  outline: none;
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: 700;

  :empty:before {
    content: "${({ placeholder, value }) => !value && placeholder}";
  }

  :empty:after {
    content: "${({ value }) => value}";
  }
`;

export const Suffix = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: 400;
`;
