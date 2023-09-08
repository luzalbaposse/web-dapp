import React, { useCallback, useEffect, useRef, useState } from "react";
import { noop } from "lodash";
import { toast } from "react-toastify";
import { Container, Row } from "./styled";
import { Button, Checkbox, Dropdown, Input } from "@talentprotocol/design-system";
import { createPortal } from "react-dom";
import { talentsService } from "../../../../../api/talents";
import { useEditProfileStore } from "src/contexts/state";
import { ToastBody } from "src/components/design_system/toasts";

const MONTHS = [
  { value: "January" },
  { value: "February" },
  { value: "March" },
  { value: "April" },
  { value: "May" },
  { value: "June" },
  { value: "July" },
  { value: "August" },
  { value: "September" },
  { value: "October" },
  { value: "November" },
  { value: "December" }
];
const YEARS = new Array(200).fill(0).map((_, i) => ({ value: 1907 + i }));

export const AddExperienceForm = ({ username, category, milestone, backCallback }) => {
  const { profile, updateSubFormCallback } = useEditProfileStore();
  useEffect(() => {
    updateSubFormCallback(backCallback);
    return () => {
      updateSubFormCallback(undefined);
    };
  }, [updateSubFormCallback]);
  const storeMilestone = useCallback(() => {
    if (milestone) {
      talentsService
        .updateMilestone(profile.id, milestone)
        .then(({ data }) => {})
        .catch(err => {
          console.error(err);
          toast.error(<ToastBody heading="Error" body={"Something happened while updating your profile"} />);
        });
    } else {
      talentsService
        .createMilestone(profile.id, milestone)
        .then(({ data }) => {})
        .catch(err => {
          console.error(err);
          toast.error(<ToastBody heading="Error" body={"Something happened while updating your profile"} />);
        });
    }
  }, [username, milestone, profile]);
  const refs = {
    title: useRef(null),
    organization: useRef(null),
    currentlyWorkingHere: useRef(null)
  };
  const dateInfo = {
    startDateMonth: new Date(milestone.start_date).getMonth(),
    startDateYear: new Date(milestone.start_date).getFullYear().toString(),
    endDateMonth: milestone.end_date && new Date(milestone.end_date).getMonth(),
    endDateYear: milestone.end_date && new Date(milestone.end_date).getFullYear()
  };
  const [dateState, setDateState] = useState({
    startDateMonth: MONTHS[dateInfo.startDateMonth],
    startDateYear: { value: dateInfo.startDateYear ? dateInfo.startDateYear : undefined },
    endDateMonth: MONTHS[dateInfo.endDateMonth],
    endDateYear: { value: dateInfo.endDateYear ? dateInfo.endDateYear : undefined }
  });
  return (
    <Container>
      <Input
        inputRef={refs.title}
        label="Title"
        placeholder="Ex: Senior Product Designer"
        defaultValue={milestone.title}
      />
      <Input
        inputRef={refs.organization}
        label={category === "position" ? "Organization" : "Institution"}
        placeholder="Ex: Talent Protocol"
        defaultValue={milestone.institution}
      />
      <Checkbox
        label={`I currently ${category === "position" ? "work on this position" : "study on this institution"}`}
      />
      <Row>
        <Dropdown
          selectOption={option => setDateState({ ...dateState, startDateMonth: option })}
          selectedOption={dateState.startDateMonth}
          options={MONTHS}
          label="Start Date"
          placeholder="Month"
        />
        <Dropdown
          selectOption={option => setDateState({ ...dateState, startDateYear: option })}
          selectedOption={dateState.startDateYear}
          options={YEARS}
          placeholder="Year"
        />
      </Row>
      <Row>
        <Dropdown
          selectOption={option => setDateState({ ...dateState, endDateMonth: option })}
          selectedOption={dateState.endDateMonth}
          options={MONTHS}
          label="End Date"
          placeholder="Month"
        />
        <Dropdown
          selectOption={option => setDateState({ ...dateState, endDateYear: option })}
          selectedOption={dateState.endDateYear}
          options={YEARS}
          placeholder="Year"
        />
      </Row>
      {createPortal(
        <Button hierarchy="primary" size="small" text="Save" onClick={storeMilestone} />,
        document.getElementById("save-button")
      )}
    </Container>
  );
};
