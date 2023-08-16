import React from "react";
import { Container, TagsContainer } from "./styled";
import { Tag, Typography } from "@talentprotocol/design-system";

export const Tags = ({}) => {
  return (
    <Container>
      <Typography specs={{ type: "medium", variant: "p1" }} color="primary01">
        Tags
      </Typography>
      <TagsContainer>
        <Tag backgroundColor="bg01" size="small" textColor="primary02" borderColor="surfaceHover02" label="Something" />
        <Tag backgroundColor="bg01" size="small" textColor="primary02" borderColor="surfaceHover02" label="Something" />
        <Tag backgroundColor="bg01" size="small" textColor="primary02" borderColor="surfaceHover02" label="Something" />
        <Tag
          backgroundColor="bg01"
          size="small"
          textColor="primary02"
          borderColor="surfaceHover02"
          label="Sometasdasdhing"
        />
        <Tag backgroundColor="bg01" size="small" textColor="primary02" borderColor="surfaceHover02" label="Something" />
        <Tag backgroundColor="bg01" size="small" textColor="primary02" borderColor="surfaceHover02" label="Something" />
        <Tag
          backgroundColor="bg01"
          size="small"
          textColor="primary02"
          borderColor="surfaceHover02"
          label="Some2131231231132wthing"
        />
        <Tag backgroundColor="bg01" size="small" textColor="primary02" borderColor="surfaceHover02" label="Something" />
        <Tag backgroundColor="bg01" size="small" textColor="primary02" borderColor="surfaceHover02" label="Something" />
        <Tag backgroundColor="bg01" size="small" textColor="primary02" borderColor="surfaceHover02" label="Something" />
        <Tag backgroundColor="bg01" size="small" textColor="primary02" borderColor="surfaceHover02" label="Something" />
        <Tag backgroundColor="bg01" size="small" textColor="primary02" borderColor="surfaceHover02" label="Something" />
        <Tag backgroundColor="bg01" size="small" textColor="primary02" borderColor="surfaceHover02" label="Something" />
        <Tag backgroundColor="bg01" size="small" textColor="primary02" borderColor="surfaceHover02" label="Something" />
        <Tag backgroundColor="bg01" size="small" textColor="primary02" borderColor="surfaceHover02" label="Something" />
      </TagsContainer>
    </Container>
  );
};
