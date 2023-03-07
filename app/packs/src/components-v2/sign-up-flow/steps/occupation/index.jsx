import { Pills, Typography } from "@talentprotocol/design-system";
import React, { useCallback, useState } from "react";
import { TitleRow, PillsContainer } from "./styled";

export const OccupationStep = ({ user, setUser, setIsNextDisable }) => {
  const [careerNeeds, setCareerNeeds] = useState(
    (user.careerNeeds.length && user.careerNeeds) || [
      {
        content: "Web3",
        isSelected: false
      },
      {
        content: "Crypto",
        isSelected: false
      },
      {
        content: "Blockchain",
        isSelected: false
      },
      {
        content: "NFTs",
        isSelected: false
      },
      {
        content: "Startups",
        isSelected: false
      },
      {
        content: "Marketing",
        isSelected: false
      },
      {
        content: "Design",
        isSelected: false
      },
      {
        content: "Entreprenership",
        isSelected: false
      },
      {
        content: "Defi",
        isSelected: false
      },
      {
        content: "Strategy",
        isSelected: false
      },
      {
        content: "Product",
        isSelected: false
      },
      {
        content: "Education",
        isSelected: false
      },
      {
        content: "Founder",
        isSelected: false
      },
      {
        content: "Developer",
        isSelected: false
      },
      {
        content: "Product Design",
        isSelected: false
      },
      {
        content: "Music",
        isSelected: false
      },
      {
        content: "Innovation",
        isSelected: false
      },
      {
        content: "Writer",
        isSelected: false
      },
      {
        content: "Content creator",
        isSelected: false
      }
    ]
  );
  const updatePills = useCallback(
    index => {
      const parsedCareerNeeds = [...careerNeeds];
      parsedCareerNeeds[index].isSelected = !parsedCareerNeeds[index].isSelected;
      setCareerNeeds(parsedCareerNeeds);
      setUser({
        ...user,
        careerNeeds: parsedCareerNeeds.reduce((acc, el) => {
          if (el.isSelected) {
            acc.push(el.content);
          }
          return acc;
        }, [])
      });
      if (parsedCareerNeeds.some(pill => pill.isSelected)) {
        setIsNextDisable(false);
      } else {
        setIsNextDisable(true);
      }
    },
    [careerNeeds, setCareerNeeds, user, setUser]
  );
  return (
    <>
      <TitleRow>
        <Typography specs={{ variant: "h3", type: "bold" }} color="primary01">
          What best describes your occupation?
        </Typography>
        <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
          Choose up to 5 tags. You can add more later.
        </Typography>
      </TitleRow>
      <PillsContainer>
        <Pills onClick={updatePills} pillList={careerNeeds} />
      </PillsContainer>
    </>
  );
};
