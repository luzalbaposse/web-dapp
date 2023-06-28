import styled, { css } from "styled-components";

export const TitleRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PillsContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${({ activeTagsSize, tags }) =>
    activeTagsSize && [
      css`
        * {
          cursor: not-allowed;

          label {
            cursor: not-allowed;
          }
        }
      `,
      ...tags.reduce((acc, tag, index) => {
        if (tag.isSelected) {
          acc.push(css`
            *:nth-child(${index + 1}) {
              cursor: pointer;

              label {
                cursor: pointer;
              }
            }
          `);
        }
        return acc;
      }, [])
    ]}
`;
