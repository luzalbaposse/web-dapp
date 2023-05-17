import React, { useEffect, useMemo, useRef, useState } from "react";
import { ShowMoreContainer, StyledTypography } from "./styled";
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
        return (
          <>
            <span>{contentArray[0]}</span>
            <TextLink href={`/u/${originUser.username}`} text={`@${originUser.name}`} color="primary01" size="small" />
            <span>{contentArray[1]}</span>
            <TextLink href={`/u/${targetUser.username}`} text={`@${targetUser.name}`} color="primary01" size="small" />
            <span>{contentArray[2]}</span>
          </>
        );
      } else {
        return (
          <>
            <span>{contentArray[0]}</span>
            <TextLink href={`/u/${originUser.username}`} text={`@${originUser.name}`} color="primary01" size="small" />
            <span>{contentArray[1]}</span>
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
      {didRender && !showMore && ref.current.scrollHeight > ref.current.clientHeight && (
        <ShowMoreContainer onClick={() => setShowMore(true)}>
          <TextLink color="primary01" text="...Show more" size="small" />
        </ShowMoreContainer>
      )}
    </>
  );
};
