import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { Button, Icon, Typography } from "@talentprotocol/design-system";
import { talentsService } from "src/api";
import {
  Container,
  MilestoneTitleRow,
  DescriptionLine,
  Dot,
  EditButtonContainer,
  Entry,
  EntryColumn,
  IconContainer,
  StyledImage
} from "./styled";
import { ToastBody } from "src/components/design_system/toasts";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const ExperiencesComponent = ({ isOwner, username, openAddExperienceScreen }) => {
  const [milestones, setMilestones] = useState([]);
  useEffect(() => {
    if (!username) return;
    talentsService
      .getMilestones(username)
      .then(({ data }) => {
        setMilestones(data.milestones.sort((a, b) => new Date(b.start_date) - new Date(a.start_date)));
      })
      .catch(() => {
        console.error("Error getting user experiences");
        toast.error(<ToastBody heading="Error" body="There was a problem fetching user experiences." />);
      });
  }, [username]);

  const memoedExperiences = useMemo(() => {
    if (!milestones.length) return [[], []];
    return milestones.reduce(
      (acc, milestone) => {
        if (!(milestone.category === "Position" || milestone.category === "Education")) return acc;
        const renderedMilestone = (
          <Entry key={milestone.id}>
            {milestone.images.length ? (
              <StyledImage src={milestone.images[0].image_url} />
            ) : (
              <IconContainer>
                <Icon name={milestone.category === "Position" ? "tool-box" : "learn"} color="primary" size={18} />
              </IconContainer>
            )}
            <EntryColumn>
              <Typography specs={{ type: "medium", variant: "p2" }}>{milestone.title}</Typography>
              <DescriptionLine>
                <Typography specs={{ type: "regular", variant: "p3" }}>{milestone.institution}</Typography>
                <Dot />
                <Typography specs={{ type: "regular", variant: "p3" }}>
                  {dayjs(milestone.start_date).format("MMM YYYY")} -{" "}
                  {!!milestone.end_date ? dayjs(milestone.end_date).format("MMM YYYY") : "Present"}
                </Typography>
              </DescriptionLine>
            </EntryColumn>
            {isOwner && (
              <EditButtonContainer>
                <Button
                  hierarchy="secondary"
                  leftIcon="edit"
                  size="small"
                  iconColor="primary01"
                  onClick={() => {
                    openAddExperienceScreen(milestone.category.toLocaleLowerCase(), milestone);
                  }}
                />
              </EditButtonContainer>
            )}
          </Entry>
        );
        if (milestone.category === "Position") acc[0].push(renderedMilestone);
        else if (milestone.category === "Education") acc[1].push(renderedMilestone);
        return acc;
      },
      [[], []]
    );
  }, [milestones, isOwner, openAddExperienceScreen]);
  return (
    <>
      <Container>
        <MilestoneTitleRow>
          <Typography specs={{ type: "medium", variant: "p1" }}>Positions</Typography>
          {isOwner && (
            <Button
              onClick={() => openAddExperienceScreen("position")}
              leftIcon="add"
              hierarchy="secondary"
              size="small"
              iconColor="primary01"
            />
          )}
        </MilestoneTitleRow>
        {memoedExperiences[0]}
        {!memoedExperiences[0].length && (
          <Typography specs={{ type: "regular", variant: "p2" }} color="primary03">
            No position records available
          </Typography>
        )}
        <MilestoneTitleRow>
          <Typography specs={{ type: "medium", variant: "p1" }}>Education</Typography>
          {isOwner && (
            <Button
              onClick={() => openAddExperienceScreen("education")}
              leftIcon="add"
              hierarchy="secondary"
              size="small"
              iconColor="primary01"
            />
          )}
        </MilestoneTitleRow>
        {memoedExperiences[1]}
        {!memoedExperiences[1].length && (
          <Typography specs={{ type: "regular", variant: "p2" }} color="primary03">
            No education records available
          </Typography>
        )}
      </Container>
    </>
  );
};
