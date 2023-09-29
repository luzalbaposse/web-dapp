import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import debounce from "lodash/debounce";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import Uppy from "@uppy/core";
import { FileInput } from "@uppy/react";
import AwsS3Multipart from "@uppy/aws-s3-multipart";

import { post, patch, getAuthToken } from "src/utils/requests";
import { useTheme } from "src/contexts/ThemeContext";

import TalentProfilePicture from "src/components/talent/TalentProfilePicture";
import TextInput from "src/components/design_system/fields/textinput";
import TextArea from "src/components/design_system/fields/textarea";
import Divider from "src/components/design_system/other/Divider";
import Button from "src/components/design_system/button";
import LoadingButton from "../../button/LoadingButton";
import { ToastBody } from "src/components/design_system/toasts";
import { Delete } from "src/components/icons";
import { H5, P2 } from "src/components/design_system/typography";
import { lightTextPrimary01 } from "src/utils/colors";

import { useWindowDimensionsHook } from "src/utils/window";
import { useProfileFetcher } from "src/hooks/use-profile-fetcher";

import cx from "classnames";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Typography, Dropdown, Checkbox } from "@talentprotocol/design-system";
import { StyledTypographyLink, DropdownContainer } from "./styled";
import { goalsService, electionsService } from "src/api";
dayjs.extend(customParseFormat);

const returnYear = date => {
  if (date) {
    return dayjs(date).format("YYYY");
  } else {
    return "";
  }
};

const returnMonth = date => {
  if (date) {
    return dayjs(date).format("MMMM");
  } else {
    return "";
  }
};

const GoalExperience = ({
  mobile,
  changeAttribute,
  currentJourneyItem,
  hide,
  saveGoal,
  updateGoal,
  deleteGoal,
  editType,
  validationErrors,
  uppyBanner,
  deleteImage,
  activeElection,
  performingRequest,
  elections
}) => {
  const [dueMonth, setDueMonth] = useState(returnMonth(currentJourneyItem.due_date));
  const [dueYear, setDueYear] = useState(returnYear(currentJourneyItem.due_date));
  const [electionSelected, setElectionSelected] = useState({ value: "" });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const checkboxRef = useRef(null);

  const progressOptions = [
    { value: "planned", title: "Planned" },
    { value: "doing", title: "Doing" },
    { value: "accomplished", title: "Accomplished" },
    { value: "abandoned", title: "Abandoned" },
    { value: "paused", title: "Paused" }
  ];

  const monthOptions = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const electionOptions = elections?.map(election => ({
    value: election.name,
    type: election.slug
  }));

  const yearOptions = (() => {
    const max = new Date().getFullYear() + 20;
    const min = new Date().getFullYear() - 30;

    const years = [];
    for (let i = max; i >= min; i--) {
      years.push(i);
    }
    return years;
  })();

  useEffect(() => {
    if (dueMonth != "" && dueYear != "") {
      changeAttribute("due_date", dayjs(`${dueMonth}-${dueYear}`, "MMMM-YYYY").format("DD-MM-YYYY"));
    } else {
      changeAttribute("due_date", "");
    }
  }, [dueMonth, dueYear]);

  const selectTakeoffApplication = election => {
    if (election) {
      const thisElection = elections.find(e => e.slug == election.type);
      setElectionSelected(election);
      changeAttribute("progress", "planned");
      changeAttribute("title", election.value);
      changeAttribute("election_selected", election.type);
      setDueMonth(dayjs(thisElection.voting_end_date, "YYYY-MM-DD").format("MMMM"));
      setDueYear(dayjs(thisElection.voting_end_date, "YYYY-MM-DD").format("YYYY"));
    } else {
      changeAttribute("election_selected", null);
      changeAttribute("title", "");
    }
  };

  console.log("elections", elections);

  return (
    <>
      <Modal.Header closeButton className="px-5">
        <H5 bold text={`${editType} ${currentJourneyItem.category}`} />
      </Modal.Header>
      <Divider />
      <Modal.Body
        className={cx(
          "d-flex flex-column align-items-center justify-content-between",
          mobile ? "px-4 pt-4 pb-7" : "px-6 pt-5 pb-6"
        )}
        style={{
          maxHeight: mobile ? "" : "700px",
          overflowY: "overlay"
        }}
      >
        {activeElection && (
          <DropdownContainer>
            <Dropdown
              options={electionOptions}
              selectOption={option => {
                selectTakeoffApplication(option);
              }}
              selectedOption={electionSelected}
              placeholder="Take Off Scholarships"
              label="Take Off Scholarships"
              isDisabled={!activeElection || editType !== "Add"}
            />
            {electionSelected.value && (
              <Checkbox
                isChecked={termsAccepted}
                checkboxRef={checkboxRef}
                onCheckboxClick={() => setTermsAccepted(!termsAccepted)}
              >
                <Typography specs={{ variant: "p2", type: "regular" }} className="flex">
                  I'm applying to {electionSelected.value}, and I agree to the{" "}
                  <StyledTypographyLink
                    target="_blank"
                    href={elections.find(e => e.slug == electionSelected.type)?.terms_and_conditions_url}
                  >
                    terms and conditions
                  </StyledTypographyLink>
                  .
                </Typography>
              </Checkbox>
            )}
          </DropdownContainer>
        )}
        <div className="w-100 mb-5">
          <TextInput
            title="Title"
            onChange={e => changeAttribute("title", e.target.value)}
            value={currentJourneyItem.title}
            placeholder="Ex: Finding a co-founder for my startup"
            required={true}
            error={validationErrors?.title}
            disabled={electionSelected.value}
          />
        </div>
        <div className="w-100 mb-5">
          <label htmlFor="inputProgress">
            <P2 className="mb-2 text-primary-01" bold>
              Career Goal Status
              <span className="ml-1 text-danger">*</span>
            </P2>
          </label>
          <Form.Control
            as="select"
            onChange={e => changeAttribute("progress", e.target.value)}
            value={currentJourneyItem.progress}
            placeholder="Please Select"
            disabled={electionSelected.value}
            className={cx("height-auto", "mr-2", validationErrors?.progress && "border-danger")}
          >
            <option value=""></option>
            {progressOptions.map(item => (
              <option value={item.value} key={`progress-${item.value}`}>
                {item.title}
              </option>
            ))}
          </Form.Control>
        </div>
        <div className="w-100 mb-5">
          <TextArea
            title={electionSelected.value ? "Application Letter" : "Description"}
            onChange={e => changeAttribute("description", e.target.value)}
            value={currentJourneyItem.description}
            maxLength={800}
            maxLengthText
            rows={3}
          />
        </div>
        <div className="w-100 mb-5">
          <label htmlFor="inputDueMonth">
            <P2 className="mb-2 text-primary-01" bold>
              Expected Due Date <span className="text-danger">*</span>
            </P2>
          </label>
          <div className="d-flex flex-row justify-content-between">
            <Form.Control
              as="select"
              onChange={e => setDueMonth(e.target.value)}
              value={dueMonth}
              placeholder="Month"
              disabled={electionSelected.value}
              className={cx("height-auto", "mr-2", validationErrors?.dueDate && "border-danger")}
            >
              <option value=""></option>
              {monthOptions.map(month => (
                <option value={month} key={`due-${month}`}>
                  {month}
                </option>
              ))}
            </Form.Control>
            <Form.Control
              as="select"
              onChange={e => setDueYear(e.target.value)}
              value={dueYear}
              placeholder="Year"
              disabled={electionSelected.value}
              className={cx("height-auto", "ml-2", validationErrors?.dueDate && "border-danger")}
            >
              <option value=""></option>
              {yearOptions.map(year => (
                <option value={year} key={`due-${year}`}>
                  {year}
                </option>
              ))}
            </Form.Control>
          </div>
        </div>
        {!electionSelected.value && (
          <div className="w-100 mb-5">
            <P2 className="mb-2 text-primary-01" bold text="Media" />
            <FileInput
              uppy={uppyBanner}
              pretty
              inputName="profiles[]"
              locale={{
                strings: {
                  chooseFiles: "Add media"
                }
              }}
            />
            <div className={cx("d-flex", "flex-wrap", mobile ? "justify-content-center" : "justify-content-between")}>
              {currentJourneyItem.images?.map(image => (
                <div className="position-relative" key={`${image.image_url}`}>
                  <TalentProfilePicture
                    className="position-relative mt-2"
                    style={{ borderRadius: "24px" }}
                    src={image.image_url}
                    straight
                    height={213}
                    width={272}
                  />
                  <Button
                    className="position-absolute"
                    style={{ top: "16px", right: "8px" }}
                    type="white-subtle"
                    size="icon"
                    onClick={() => deleteImage(image.image_url)}
                  >
                    <Delete color={lightTextPrimary01} size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal.Body>
      <Divider />
      <Modal.Footer className="px-6 py-3 justify-content-between" style={{ borderTop: "none" }}>
        {editType !== "Add" && (
          <LoadingButton
            loading={performingRequest}
            disabled={performingRequest}
            type="danger-outline"
            text={`Delete ${currentJourneyItem.category}`}
            onClick={deleteGoal}
          />
        )}
        <div style={{ marginLeft: editType === "Add" ? "auto" : 0 }}>
          <Button disabled={performingRequest} className="mr-2" type="white-ghost" text="Cancel" onClick={hide} />
          <LoadingButton
            loading={performingRequest}
            disabled={performingRequest || (electionSelected.value && !termsAccepted)}
            type="primary-default"
            text="Save"
            onClick={editType === "Add" ? saveGoal : updateGoal}
          />
        </div>
      </Modal.Footer>
    </>
  );
};

const EditJourneyModal = ({
  show,
  hide,
  talent,
  refreshWindow,
  editType,
  setJourneyItem,
  journeyItem = {},
  username
}) => {
  const { profile, fetchProfile } = useProfileFetcher();
  useEffect(() => {
    if (!!talent || !!profile) return;
    fetchProfile(username);
  }, [username, profile]);
  const { mobile } = useWindowDimensionsHook();
  const { mode } = useTheme();
  const [currentJourneyItem, setCurrentJourneyItem] = useState({
    id: journeyItem?.id || "",
    title: journeyItem?.title || "",
    start_date: journeyItem?.start_date ? dayjs(journeyItem.start_date, "YYYY-MM-DD").format("YYYY-MM") : "",
    end_date: journeyItem?.end_date ? dayjs(journeyItem.end_date, "YYYY-MM-DD").format("YYYY-MM") : "",
    due_date: journeyItem?.due_date ? dayjs(journeyItem.due_date, "YYYY-MM-DD").format("YYYY-MM") : "",
    description: journeyItem?.description || "",
    link: journeyItem?.link || "",
    institution: journeyItem?.institution || "",
    in_progress: journeyItem?.in_progress || false,
    progress: journeyItem?.progress || "",
    category: journeyItem?.category || "",
    images: journeyItem?.images || [],
    electionStatus: journeyItem.election_status
  });
  const [performingRequest, setPerformingRequest] = useState(false);
  const [elections, setElections] = useState(null);
  const [activeElection, setActiveElection] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    title: false,
    startDate: false,
    dueDate: false,
    progress: false,
    description: false,
    institution: false,
    status: false
  });

  const goalErrors = () => {
    const errors = {};
    if (currentJourneyItem.title == "") {
      errors.title = true;
    }
    if (currentJourneyItem.due_date == "") {
      errors.dueDate = true;
    }
    if (currentJourneyItem.progress == "") {
      errors.progress = true;
    }

    return errors;
  };

  const uppyBanner = new Uppy({
    meta: { type: "avatar" },
    restrictions: {
      maxFileSize: 5120000,
      allowedFileTypes: [".jpg", ".png", ".jpeg", ".gif"],
      maxNumberOfFiles: 10
    },
    autoProceed: true
  });

  uppyBanner.use(AwsS3Multipart, {
    limit: 4,
    companionUrl: "/",
    companionHeaders: {
      "X-CSRF-Token": getAuthToken()
    }
  });

  const saveGoal = async () => {
    const errors = goalErrors();

    if (Object.keys(errors).length > 0) {
      return setValidationErrors(errors);
    }
    setPerformingRequest(true);

    const response = await post("/api/v1/goals", {
      goal: currentJourneyItem
    });

    if (response && !response.error) {
      refreshWindow();

      toast.success(<ToastBody heading="Success!" body={"Goal created successfully."} mode={mode} />, {
        autoClose: 1500
      });
    } else {
      toast.error(<ToastBody heading="Error!" body={response?.error} mode={mode} />);
    }

    setPerformingRequest(false);
    exitModal();
  };

  const updateGoal = async () => {
    const errors = goalErrors();

    if (Object.keys(errors).length > 0) {
      return setValidationErrors(errors);
    }

    setPerformingRequest(true);
    const response = await patch(`/api/v1/goals/${currentJourneyItem.id}`, {
      goal: currentJourneyItem
    });

    if (response && !response.error) {
      toast.success(<ToastBody heading="Success!" body={"Goal updated successfully."} mode={mode} />, {
        autoClose: 1500
      });
      refreshWindow();
    } else {
      toast.error(<ToastBody heading="Error!" body={response?.error} mode={mode} />);
      refreshWindow();
    }
    setPerformingRequest(false);
    exitModal();
  };

  const deleteGoal = async () => {
    setPerformingRequest(true);
    const response = await goalsService.deleteGoal(currentJourneyItem.id);

    if (!response.error) {
      toast.success(<ToastBody heading="Success!" body={"Goal deleted successfully."} mode={mode} />, {
        autoClose: 1500
      });
      refreshWindow();
    } else {
      toast.error(<ToastBody heading="Error" body={response.error} mode={mode} />, {
        autoClose: 1500
      });
      refreshWindow();
    }

    setPerformingRequest(false);
    exitModal();
  };

  const deleteImage = imageUrl => {
    const index = currentJourneyItem.images.findIndex(image => image.image_url === imageUrl);

    const newImages = [...currentJourneyItem.images.slice(0, index), ...currentJourneyItem.images.slice(index + 1)];

    setCurrentJourneyItem(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const changeAttribute = (attribute, value) => {
    setValidationErrors(prev => ({ ...prev, [attribute]: false }));
    setCurrentJourneyItem(prev => ({ ...prev, [attribute]: value }));
  };

  const exitModal = () => {
    setCurrentJourneyItem({
      id: "",
      title: "",
      start_date: "",
      end_date: "",
      due_date: "",
      description: "",
      link: "",
      institution: "",
      in_progress: false,
      progress: "",
      category: ""
    });
    setJourneyItem(null);
    hide();
  };

  useEffect(() => {
    uppyBanner.on("restriction-failed", () => {
      uppyBanner.reset();
    });
    uppyBanner.on("upload-success", (file, response) => {
      setCurrentJourneyItem(prev => ({
        ...prev,
        images: [
          ...prev.images,
          {
            image_url: response.uploadURL,
            image_data: {
              // eslint-disable-next-line no-useless-escape
              id: response.uploadURL.match(/\/cache\/([^\?]+)/)[1], // extract key without prefix
              storage: "cache",
              metadata: {
                size: file.size,
                filename: file.name,
                mime_type: file.type
              }
            }
          }
        ]
      }));
    });
    uppyBanner.on("upload", () => {});
  }, [uppyBanner]);

  useEffect(() => {
    electionsService.getElections().then(res => {
      if (res.data?.elections?.length > 0) {
        setActiveElection(true);
        setElections(res.data?.elections);
      }
    });
  }, []);

  const debouncedSaveGoal = debounce(() => saveGoal(), 400);
  const debouncedUpdateGoal = debounce(() => updateGoal(), 400);
  const debouncedDeleteGoal = debounce(() => deleteGoal(), 400);

  return (
    <Modal
      scrollable={true}
      show={show}
      onHide={exitModal}
      centered
      dialogClassName={mobile ? "mw-100 mh-100 m-0" : "remove-background"}
      contentClassName={mobile ? "h-100" : ""}
      fullscreen="true"
      className="edit-modal"
    >
      <GoalExperience
        mobile={mobile}
        changeAttribute={changeAttribute}
        currentJourneyItem={currentJourneyItem}
        hide={exitModal}
        saveGoal={debouncedSaveGoal}
        updateGoal={debouncedUpdateGoal}
        deleteGoal={debouncedDeleteGoal}
        mode={mode}
        editType={editType}
        validationErrors={validationErrors}
        uppyBanner={uppyBanner}
        deleteImage={deleteImage}
        activeElection={activeElection}
        performingRequest={performingRequest}
        elections={elections}
      />
    </Modal>
  );
};

export default EditJourneyModal;
