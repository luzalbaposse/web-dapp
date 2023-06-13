import { Pills, Typography } from "@talentprotocol/design-system";
import React, { useState, useCallback, useEffect } from "react";
import { TitleRow, PillsContainer } from "./styled";

export const LookingForStep = ({ user, setUser, setIsNextDisable }) => {
  const [tags, setTags] = useState(
    [
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
    ].map(value => {
      const parsedValue = { ...value };
      if (user.careerNeeds.includes(value.content)) {
        parsedValue.isSelected = true;
      }
      return parsedValue;
    })
  );
  const [activeTags, setActiveTags] = useState([]);
  const updateTags = useCallback(
    index => {
      const parsedTags = [...tags];
      const tempActiveTags = parsedTags.filter(tag => tag.isSelected);
      if (tempActiveTags.length === 5 && !parsedTags[index].isSelected) return;
      parsedTags[index].isSelected = !parsedTags[index].isSelected;
      const localActiveTags = parsedTags.filter(tag => tag.isSelected);
      setTags(parsedTags);
      setActiveTags(localActiveTags);
      setUser({
        ...user,
        tags: localActiveTags
      });
    },
    [tags, setTags, user, setUser, setActiveTags]
  );
  useEffect(() => {
    requestAnimationFrame(() => {
      setIsNextDisable(false);
    });
  }, [setIsNextDisable]);
  return (
    <>
      <TitleRow>
        <Typography specs={{ variant: "h3", type: "bold" }} color="primary01">
          What are you looking for?
        </Typography>
        <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
          Choose one or more. You can add more later.
        </Typography>
      </TitleRow>
      <PillsContainer activeTagsSize={activeTags.length === 5} tags={tags}>
        <Pills pillList={tags} onClick={updateTags} />
      </PillsContainer>
    </>
  );
};
