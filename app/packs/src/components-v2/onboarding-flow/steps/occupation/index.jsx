import { Pills, Typography } from "@talentprotocol/design-system";
import React, { useCallback, useEffect, useState } from "react";
import { TitleRow, PillsContainer } from "./styled";

export const OccupationStep = ({ user, setUser, setIsNextDisable }) => {
  const [tags, setTags] = useState(
    [
      {
        content: "AI",
        isSelected: false
      },
      {
        content: "Analyst",
        isSelected: false
      },
      {
        content: "Artist",
        isSelected: false
      },
      {
        content: "Blockchain",
        isSelected: false
      },
      {
        content: "Community",
        isSelected: false
      },
      {
        content: "Consultant",
        isSelected: false
      },
      {
        content: "Content",
        isSelected: false
      },
      {
        content: "Creator",
        isSelected: false
      },
      {
        content: "Crypto",
        isSelected: false
      },
      {
        content: "Data",
        isSelected: false
      },
      {
        content: "Designer",
        isSelected: false
      },
      {
        content: "Developer",
        isSelected: false
      },
      {
        content: "Engineer",
        isSelected: false
      },
      {
        content: "Founder",
        isSelected: false
      },
      {
        content: "Growth",
        isSelected: false
      },
      {
        content: "Investor",
        isSelected: false
      },
      {
        content: "Manager",
        isSelected: false
      },
      {
        content: "Marketing",
        isSelected: false
      },
      {
        content: "Mobile",
        isSelected: false
      },
      {
        content: "Product",
        isSelected: false
      },
      {
        content: "Project Manager",
        isSelected: false
      },
      {
        content: "Researcher",
        isSelected: false
      },
      {
        content: "Sales",
        isSelected: false
      },
      {
        content: "Security",
        isSelected: false
      },
      {
        content: "Social Media",
        isSelected: false
      },
      {
        content: "Startups",
        isSelected: false
      },
      {
        content: "Strategist",
        isSelected: false
      },
      {
        content: "Student",
        isSelected: false
      },
      {
        content: "UX/UI",
        isSelected: false
      },
      {
        content: "Video",
        isSelected: false
      },
      {
        content: "Web3",
        isSelected: false
      },
      {
        content: "Writer",
        isSelected: false
      }
    ].map(value => {
      const parsedValue = { ...value };
      if (user.tags.includes(value.content)) {
        parsedValue.isSelected = true;
      }
      return parsedValue;
    })
  );
  const updatePills = useCallback(
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
    },
    [tags, setTags, user, setUser]
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
          What best describes your occupation?
        </Typography>
        <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
          Choose one or more tags. You can add more later.
        </Typography>
      </TitleRow>
      <PillsContainer>
        <Pills onClick={updatePills} pillList={tags} />
      </PillsContainer>
    </>
  );
};
