import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { Icon, Typography } from "@talentprotocol/design-system";
import { talentsService } from "src/api";
import { Container, DescriptionLine, Dot, Entry, EntryColumn, IconContainer } from "./styled";
import { ToastBody } from "src/components/design_system/toasts";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const Experiences = ({ username }) => {
  const [milestones, setMilestones] = useState([]);
  useEffect(() => {
    if (!username) return;
    talentsService
      .getMilestones(username)
      .then(({ data }) => {
        setMilestones(data.milestones);
      })
      .catch(() => {
        console.error("Error fetching user milestones");
        toast.error(<ToastBody heading="Error" body="There was a problem fetching user milestones." />);
      });
  }, [username]);

  const memoedExperiences = useMemo(() => {
    if (!milestones.length) return [[], []];
    return milestones.reduce(
      (acc, milestone) => {
        if (!(milestone.category === "Position" || milestone.category === "Education")) return acc;
        const renderedMilestone = (
          <Entry key={milestone.id}>
            <IconContainer>
              <Icon name="tool-box" color="primary" size={18} />
            </IconContainer>
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
          </Entry>
        );
        if (milestone.category === "Position") acc[0].push(renderedMilestone);
        else if (milestone.category === "Education") acc[1].push(renderedMilestone);
        return acc;
      },
      [[], []]
    );
  }, [milestones]);
  return (
    <Container>
      <Typography specs={{ type: "medium", variant: "p1" }}>Positions</Typography>
      {memoedExperiences[0]}
      <Typography specs={{ type: "medium", variant: "p1" }}>Education</Typography>
      {memoedExperiences[1]}
    </Container>
  );
};
