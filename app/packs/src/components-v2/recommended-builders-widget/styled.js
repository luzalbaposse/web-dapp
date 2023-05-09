import { buildColor, desktopStyles } from "@talentprotocol/design-system";
import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 30px;

  ${desktopStyles(css`
    border: 1px solid ${buildColor("surfaceHover02")};
    border-radius: 24px;
    margin-top: 76px;
  `)}
`;

export const TitleContainer = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${desktopStyles(css`
    padding: 24px;
  `)}
`;

export const BuildersList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 16px;
`;

export const BuilderEntry = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
`;
