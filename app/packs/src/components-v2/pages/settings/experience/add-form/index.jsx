import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Container, Row } from "./styled";
import { Button, Checkbox, Dropdown, Input, Typography } from "@talentprotocol/design-system";
import { createPortal } from "react-dom";
import { talentsService } from "../../../../../api/talents";
import { useEditProfileStore } from "src/contexts/state";
import { ToastBody } from "src/components/design_system/toasts";

dayjs.extend(customParseFormat);

const MONTHS = [
  { value: "January", index: "01" },
  { value: "February", index: "02" },
  { value: "March", index: "03" },
  { value: "April", index: "04" },
  { value: "May", index: "05" },
  { value: "June", index: "06" },
  { value: "July", index: "07" },
  { value: "August", index: "08" },
  { value: "September", index: "09" },
  { value: "October", index: "10" },
  { value: "November", index: "11" },
  { value: "December", index: "12" }
];
const YEARS = new Array(200).fill(0).map((_, i) => ({ value: 1907 + i }));

export const AddExperienceForm = ({ username, category, milestone, backCallback }) => {
  const [isInProgress, setIsInProgress] = useState(!!milestone?.in_progress);
  const { profile, updateSubFormCallback, updateProfileState } = useEditProfileStore();
  useEffect(() => {
    updateSubFormCallback(backCallback);
    return () => {
      updateSubFormCallback(undefined);
    };
  }, [updateSubFormCallback]);
  const refs = {
    title: useRef(null),
    organization: useRef(null),
    currentlyWorkingHere: useRef(null),
    inProgress: useRef(null)
  };
  const dateInfo = {
    startDateMonth: milestone.start_date && new Date(milestone.start_date).getMonth().toString(),
    startDateYear: milestone.start_date && new Date(milestone.start_date).getFullYear().toString(),
    endDateMonth: milestone.end_date && new Date(milestone.end_date).getMonth(),
    endDateYear: milestone.end_date && new Date(milestone.end_date).getFullYear()
  };
  const [dateState, setDateState] = useState({
    startDateMonth: MONTHS[dateInfo.startDateMonth],
    startDateYear: { value: dateInfo.startDateYear ? dateInfo.startDateYear : undefined },
    endDateMonth: MONTHS[dateInfo.endDateMonth],
    endDateYear: { value: dateInfo.endDateYear ? dateInfo.endDateYear : undefined }
  });
  const storeMilestone = useCallback(() => {
    if (milestone.id) {
      talentsService
        .updateMilestone(profile.id, {
          start_date: dayjs(`${dateState.startDateYear.value}-${dateState.startDateMonth.index}`, "YYYY-MM").format(
            "DD-MM-YYYY"
          ),
          end_date:
            (dateState.endDateMonth &&
              dateState.endDateYear &&
              dayjs(`${dateState.endDateYear.value}-${dateState.endDateMonth.index}`, "YYYY-MM").format(
                "DD-MM-YYYY"
              )) ||
            "",
          category,
          id: milestone.id,
          institution: refs.organization.current.value,
          title: refs.title.current.value,
          link: "",
          images: [],
          in_progress: isInProgress
        })
        .then(({ data }) => {
          const tempMilestones = [...profile.milestones];
          const index = tempMilestones.map(m => m.id).indexOf(milestone.id);
          if (index === -1) return;
          tempMilestones[index] = data;
          tempMilestones.push(data);
          updateProfileState({
            ...profile,
            milestones: tempMilestones
          });
          toast.success(<ToastBody heading="Success!" body="Experience updated successfully." />, { autoClose: 1500 });
          backCallback();
        })
        .catch(err => {
          console.error(err);
          toast.error(<ToastBody heading="Error" body={"Something happened while updating your profile"} />);
        });
    } else {
      talentsService
        .createMilestone(profile.id, {
          start_date:
            (dateState.startDateMonth?.value &&
              dateState.startDateYear?.value &&
              dayjs(`${dateState.startDateYear.value}-${dateState.startDateMonth.index}`, "YYYY-MM").format(
                "DD-MM-YYYY"
              )) ||
            "",
          end_date:
            (dateState.endDateMonth?.value &&
              dateState.endDateYear?.value &&
              dayjs(`${dateState.endDateYear.value}-${dateState.endDateMonth.index}`, "YYYY-MM").format(
                "DD-MM-YYYY"
              )) ||
            "",
          category,
          institution: refs.organization.current.value,
          title: refs.title.current.value,
          link: "",
          images: [],
          in_progress: isInProgress
        })
        .then(({ data }) => {
          const tempMilestones = [...profile.milestones];
          tempMilestones.push(data);
          updateProfileState({
            ...profile,
            milestones: tempMilestones
          });
          toast.success(<ToastBody heading="Success!" body="Experience added successfully." />, { autoClose: 1500 });
          backCallback();
        })
        .catch(err => {
          console.error(err);
          toast.error(<ToastBody heading="Error" body={"Something happened while updating your profile"} />);
        });
    }
  }, [username, milestone, profile, dateState, isInProgress]);
  console.log(profile.milestones);
  return (
    <Container>
      <Input
        inputRef={refs.title}
        label={category === "Position" ? "Title" : "Degree"}
        placeholder={category === "Position" ? "Senior Product Designer" : "Degree in Engineering"}
        defaultValue={milestone.title}
      />
      <Input
        inputRef={refs.organization}
        label={category === "Position" ? "Organization" : "Institution"}
        placeholder={category === "Position" ? "Talent Protocol" : "Stanford University"}
        defaultValue={milestone.institution}
      />
      <Checkbox
        label={`I currently ${category === "Position" ? "work on this position" : "study on this institution"}`}
        isChecked={milestone.in_progress}
        checkboxRef={refs.inProgress}
        onCheckboxClick={() => setIsInProgress(!isInProgress)}
      />
      <Typography specs={{ type: "bold", variant: "p2" }} color="primary01">
        Start date
      </Typography>
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
          selectedOption={dateState.startDateYear || { value: new Date().getFullYear() }}
          options={YEARS}
          placeholder="Year"
        />
      </Row>
      <Typography specs={{ type: "bold", variant: "p2" }} color="primary01">
        End date
      </Typography>
      <Row>
        <Dropdown
          selectOption={option => setDateState({ ...dateState, endDateMonth: option })}
          selectedOption={dateState.endDateMonth}
          options={MONTHS}
          label="End Date"
          placeholder="Month"
          isDisabled={isInProgress}
        />
        <Dropdown
          selectOption={option => setDateState({ ...dateState, endDateYear: option })}
          selectedOption={dateState.endDateYear}
          options={YEARS}
          placeholder="Year"
          isDisabled={isInProgress}
        />
      </Row>
      {createPortal(
        <Button hierarchy="primary" size="small" text="Save" onClick={storeMilestone} />,
        document.getElementById("save-button")
      )}
    </Container>
  );
};
