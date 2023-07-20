import React, { useEffect, useMemo, useRef, useState } from "react";
import { ShowMoreContainer, StyledTypography, StyledTypographyLink } from "./styled";
import { TextLink } from "@talentprotocol/design-system";

export const Activity = ({ content, originUser, targetUser }) => {
  const [didRender, setDidRender] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    setDidRender(true);
  }, [ref]);
  const renderedContent = useMemo(() => {
    const contentArray = content.split("@origin");
    if (contentArray.length > 1) {
      if (contentArray[1].includes("@target") && !!targetUser) {
        const targetContentArray = contentArray[1].split("@target");
        return (
          <>
            {contentArray[0]}
            {originUser.name}
            {targetContentArray[0]}
            <StyledTypographyLink href={`/u/${targetUser.username}`}>{targetUser.name}</StyledTypographyLink>
            {targetContentArray[1]}
            {contentArray[2]}
          </>
        );
      } else {
        return (
          <>
            {contentArray[0]}
            <StyledTypographyLink href={`/u/${originUser.username}`}>{originUser.name}</StyledTypographyLink>
            {contentArray[1]}
          </>
        );
      }
    }
    return <>{content}</>;
  }, [content, originUser, targetUser]);
  return (
    <>
      <StyledTypography
        typographyRef={ref}
        specs={{ variant: "p2", type: "regular" }}
        color="primary03"
        shouldShowMore={showMore}
      >
        {renderedContent}
      </StyledTypography>
      {didRender && !showMore && ref.current && ref.current.scrollHeight > ref.current.clientHeight && (
        <ShowMoreContainer onClick={() => setShowMore(true)}>
          <TextLink color="primary01" text="...Show more" size="small" />
        </ShowMoreContainer>
      )}
    </>
  );
};
