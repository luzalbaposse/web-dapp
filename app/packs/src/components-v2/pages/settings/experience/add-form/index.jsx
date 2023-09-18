import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Container, Row, PortalContainer } from "./styled";
import { Button, Checkbox, Dropdown, Input } from "@talentprotocol/design-system";
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
const START_YEARS = new Array(80)
  .fill(0)
  .map((_, i) => ({ value: new Date().getFullYear() - 79 + i }))
  .reverse();
const END_YEARS = new Array(80)
  .fill(0)
  .map((_, i) => ({ value: new Date().getFullYear() - 79 + i }))
  .reverse();

export const AddExperienceForm = ({ username, category, milestone, backCallback, setIsDirty }) => {
  const [isInProgress, setIsInProgress] = useState(!!milestone?.in_progress);
  const [updating, setUpdating] = useState(false);
  const [errors, setErrors] = useState({
    title: false,
    organization: false,
    startDate: false
  });

  const saveEnabled = Object.keys(errors).every(err => errors[err] === false);
  const { profile, updateSubFormCallback, updateProfileState } = useEditProfileStore();

  useEffect(() => {
    if (Object.keys(milestone).length > 0) {
      setUpdating(true);
    }
  }, []);

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
    setIsDirty(false);
  }, [username, milestone, profile, dateState, isInProgress]);

  const deleteMilestone = () => {
    talentsService.deleteMilestone(profile.id, milestone.id).then(() => {
      const index = profile.milestones.findIndex(mil => mil.id === milestone.id);
      const newMilestones = [...profile.milestones.slice(0, index), ...profile.milestones.slice(index + 1)];

      updateProfileState({
        ...profile,
        milestones: newMilestones
      });
      toast.success(<ToastBody heading="Success!" body="Experience deleted successfully." />, { autoClose: 1500 });
      backCallback();
    });
  };

  const validateErrors = (title, value) => {
    const newErrors = { ...errors, [title]: value.length === 0 ? true : false };

    setErrors({ ...newErrors });
  };

  useEffect(() => {
    if (dateState.startDateMonth?.value && dateState.startDateYear?.value) {
      setErrors(prev => ({ ...prev, startDate: false }));
    } else {
      setErrors(prev => ({ ...prev, startDate: true }));
    }
  }, [dateState]);

  return (
    <Container>
      <Input
        inputRef={refs.title}
        label={category === "Position" ? "Title" : "Degree"}
        placeholder={category === "Position" ? "Senior Product Designer" : "Degree in Engineering"}
        defaultValue={milestone.title}
        hasError={errors.title}
        shortDescription={errors.title && "Mandatory field"}
        onChange={e => {
          validateErrors("title", e.target.value);
          setIsDirty(true);
        }}
      />
      <Input
        inputRef={refs.organization}
        label={category === "Position" ? "Organization" : "Institution"}
        placeholder={category === "Position" ? "Talent Protocol" : "Stanford University"}
        defaultValue={milestone.institution}
        hasError={errors.organization}
        shortDescription={errors.organization && "Mandatory field"}
        onChange={e => {
          validateErrors("organization", e.target.value);
          setIsDirty(true);
        }}
      />
      <Checkbox
        label={`I currently ${category === "Position" ? "work on this position" : "study on this institution"}`}
        isChecked={milestone.in_progress}
        checkboxRef={refs.inProgress}
        onCheckboxClick={() => {
          setIsInProgress(!isInProgress);
          setIsDirty(true);
        }}
      />
      <Row>
        <Dropdown
          selectOption={option => {
            setDateState({ ...dateState, startDateMonth: option }), setIsDirty(true);
          }}
          selectedOption={dateState.startDateMonth}
          options={MONTHS}
          label="Start Date"
          required={true}
          placeholder="Month"
        />
        <Dropdown
          selectOption={option => {
            setDateState({ ...dateState, startDateYear: option });
            setIsDirty(true);
          }}
          selectedOption={dateState.startDateYear || { value: new Date().getFullYear() }}
          options={START_YEARS}
          placeholder="Year"
        />
      </Row>
      <Row>
        <Dropdown
          selectOption={option => {
            setDateState({ ...dateState, endDateMonth: option });
            setIsDirty(true);
          }}
          selectedOption={dateState.endDateMonth}
          options={MONTHS}
          label="End Date"
          placeholder="Month"
          isDisabled={isInProgress}
        />
        <Dropdown
          selectOption={option => {
            setDateState({ ...dateState, endDateYear: option });
            setIsDirty(true);
          }}
          selectedOption={dateState.endDateYear || { value: new Date().getFullYear() }}
          options={END_YEARS}
          placeholder="Year"
          isDisabled={isInProgress}
        />
      </Row>
      {createPortal(
        <PortalContainer>
          {updating && <Button hierarchy="secondary" size="small" text="Delete" onClick={deleteMilestone} />}
          <Button
            hierarchy="primary"
            size="small"
            text={updating ? "Update" : "Save"}
            onClick={storeMilestone}
            isDisabled={!saveEnabled}
          />
        </PortalContainer>,
        document.getElementById("save-button")
      )}
    </Container>
  );
};
