import { Pills, Typography } from "@talentprotocol/design-system";
import React, { useState, useCallback } from "react";
import { TitleRow, PillsContainer } from "./styled";

export const LookingForStep = ({ user, setUser, setIsNextDisable }) => {
  const [tags, setTags] = useState(
    (user.tags.length && user.tags) || [
      {
        content: "Full-time roles",
        isSelected: false
      },
      {
        content: "Part-time roles",
        isSelected: false
      },
      {
        content: "Freelancing or contract roles",
        isSelected: false
      },
      {
        content: "Internships",
        isSelected: false
      },
      {
        content: "Volunteering for impact projects",
        isSelected: false
      },
      {
        content: "Being matched with a mentor",
        isSelected: false
      },
      {
        content: "Finding a co-founder",
        isSelected: false
      },
      {
        content: "Meeting new people",
        isSelected: false
      },
      {
        content: "Finding and hiring talent",
        isSelected: false
      },
      {
        content: "Learning about web3",
        isSelected: false
      },
      {
        content: "Investing in talent",
        isSelected: false
      },
      {
        content: "Investing in projects",
        isSelected: false
      },
      {
        content: "Investing in startups",
        isSelected: false
      },
      {
        content: "Mentoring others",
        isSelected: false
      },
      {
        content: "Assisting others with their job search",
        isSelected: false
      }
    ]
  );
  const updateTags = useCallback(
    index => {
      const parsedTags = [...tags];
      parsedTags[index].isSelected = !parsedTags[index].isSelected;
      setTags(parsedTags);
      setUser({
        ...user,
        tags: parsedTags.reduce((acc, el) => {
          if (el.isSelected) {
            acc.push(el.content);
          }
          return acc;
        }, [])
      });
      if (parsedTags.some(pill => pill.isSelected)) {
        setIsNextDisable(false);
      } else {
        setIsNextDisable(true);
      }
    },
    [tags, setTags, user, setUser]
  );
  return (
    <>
      <TitleRow>
        <Typography specs={{ variant: "h3", type: "bold" }} color="primary01">
          What are you looking for?
        </Typography>
        <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
          Choose up to 5 tags. You can add more later.
        </Typography>
      </TitleRow>
      <PillsContainer>
        <Pills pillList={tags} onClick={updateTags} />
      </PillsContainer>
    </>
  );
};
