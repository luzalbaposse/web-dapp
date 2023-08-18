import React from "react";
import { Container, TagsContainer } from "./styled";
import { Tag, Typography } from "@talentprotocol/design-system";

export const Tags = ({ tags = [] }) => {
  return (
    <Container>
      <Typography specs={{ type: "medium", variant: "p1" }} color="primary01">
        Tags
      </Typography>
      <TagsContainer>
        {tags.map(tag => (
          <Tag
            key={tag.id}
            backgroundColor="bg01"
            size="small"
            textColor="primary02"
            borderColor="surfaceHover02"
            label={tag.description}
          />
        ))}
      </TagsContainer>
    </Container>
  );
};
