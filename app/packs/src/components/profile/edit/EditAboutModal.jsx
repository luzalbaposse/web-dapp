import React, { useEffect, useState } from "react";
import cx from "classnames";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { patch, getAuthToken } from "src/utils/requests";
import { useTheme } from "src/contexts/ThemeContext";
import Uppy from "@uppy/core";
import AwsS3Multipart from "@uppy/aws-s3-multipart";
import CameraButton from "images/camera-button.png";
import DeleteButton from "images/delete-button.png";
import AboutImageLight from "images/about-image-light.png";
import AboutImageDark from "images/about-image-dark.png";
import TalentProfilePicture from "src/components/talent/TalentProfilePicture";
import TextArea from "src/components/design_system/fields/textarea";
import Divider from "src/components/design_system/other/Divider";
import Button from "src/components/design_system/button";
import UserTags from "src/components/talent/UserTags";
import { H5, P2 } from "src/components/design_system/typography";
import { ToastBody } from "src/components/design_system/toasts";
import { CAREER_NEEDS_OPTIONS } from "src/utils/constants";
import { useWindowDimensionsHook } from "src/utils/window";
import { useProfileFetcher } from "src/hooks/use-profile-fetcher";

const EditAboutModal = ({ show, hide, setProfile, username }) => {
  const { profile, fetchProfile } = useProfileFetcher();
  const { mobile } = useWindowDimensionsHook();
  const { mode } = useTheme();
  const [editedTalent, setEditedTalent] = useState(undefined);
  const [aboutBannerFileInput, setAboutBannerFileInput] = useState(null);
  const [selectedCareerNeeds, setSelectedCareerNeeds] = useState([]);
  const [validationErrors, setValidationErrors] = useState({ pitch: false });

  useEffect(() => {
    if (!!profile) return;
    fetchProfile(
      username,
      err => {
        console.error(err);
        toast.error(<ToastBody heading="Error!" body="Failed to load profile data!" />);
      },
      profileData => {
        setEditedTalent(profileData);
        setSelectedCareerNeeds(() => profileData?.career_goal.career_needs.map(need => need.title));
      }
    );
  }, [username]);

  const talentErrors = () => {
    const errors = {};
    if (editedTalent.career_goal.pitch == "") {
      errors.pitch = true;
    }

    return errors;
  };

  const imageSrc = !!editedTalent
    ? editedTalent.career_goal.image_url || (mode() == "light" ? AboutImageLight : AboutImageDark)
    : "";

  const uppyBanner = new Uppy({
    meta: { type: "avatar" },
    restrictions: {
      maxFileSize: 5120000,
      allowedFileTypes: [".jpg", ".png", ".jpeg", ".gif"]
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

  aboutBannerFileInput?.addEventListener("change", event => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      try {
        uppyBanner.addFile({
          source: "file input",
          name: file.name,
          type: file.type,
          data: file
        });
      } catch (err) {
        if (err.isRestriction) {
          // handle restrictions
          console.log("Restriction error:", err);
        } else {
          // handle other errors
          console.error(err);
        }
      }
    });
  });

  const saveProfile = async () => {
    const errors = talentErrors();
    if (Object.keys(errors).length > 0) {
      return setValidationErrors(errors);
    }

    const talentResponse = await patch(`/api/v1/talent/${profile.user.id}`, {
      user: {
        ...editedTalent.user
      },
      talent: {
        ...editedTalent
      },
      career_needs: selectedCareerNeeds
    });

    const careerGoalResponse = await patch(
      `/api/v1/talent/${editedTalent.id}/career_goals/${editedTalent.career_goal.id}`,
      {
        talent: {
          ...editedTalent
        },
        career_goal: {
          ...editedTalent.career_goal
        }
      }
    );

    if (talentResponse) {
      setProfile(prev => ({
        ...prev,
        ...talentResponse
      }));
    }

    if (careerGoalResponse) {
      setProfile(prev => ({
        ...prev,
        career_goal: {
          ...prev.career_goal,
          ...careerGoalResponse
        }
      }));
    }

    toast.success(<ToastBody heading="Success!" body={"About section created successfully."} />, { autoClose: 1500 });

    hide();
  };

  useEffect(() => {
    uppyBanner.on("restriction-failed", () => {
      uppyBanner.reset();
    });
    uppyBanner.on("upload-success", (file, response) => {
      setEditedTalent(prev => ({
        ...prev,
        career_goal: {
          ...prev.career_goal,
          image_url: response.uploadURL,
          image_data: {
            // eslint-disable-next-line  no-useless-escape
            id: response.uploadURL.match(/\/cache\/([^\?]+)/)[1], // extract key without prefix
            storage: "cache",
            metadata: {
              size: file.size,
              filename: file.name,
              mime_type: file.type
            }
          }
        }
      }));
    });
    uppyBanner.on("upload", () => {});
  }, [uppyBanner]);

  useEffect(() => {
    if (show) {
      setAboutBannerFileInput(document.getElementById("aboutBannerFileInput"));
    } else {
      setEditedTalent(profile);
    }
  }, [show]);

  const changeCareerGoalAttribute = (attribute, value) => {
    setValidationErrors(prev => ({ ...prev, [attribute]: false }));
    setEditedTalent(prev => ({
      ...prev,
      career_goal: {
        ...prev.career_goal,
        [attribute]: value
      }
    }));
  };

  const deleteBannerImg = () => {
    setEditedTalent(prev => ({
      ...prev,
      career_goal: {
        ...prev.career_goal,
        image_url: null,
        image_data: null
      }
    }));
  };

  const changeSelectedCareerNeeds = tag => {
    if (selectedCareerNeeds.includes(tag)) {
      const array = selectedCareerNeeds;
      const index = array.indexOf(tag);
      array.splice(index, 1);
      setSelectedCareerNeeds([...array]);
    } else {
      setSelectedCareerNeeds(prev => [...prev, tag]);
    }
  };

  return (
    !!profile &&
    !!editedTalent && (
      <Modal
        scrollable={true}
        show={show}
        onHide={hide}
        centered
        dialogClassName={mobile ? "mw-100 mh-100 m-0" : "remove-background"}
        contentClassName={mobile ? "h-100" : ""}
        fullscreen="true"
        className="edit-modal"
      >
        <Modal.Header closeButton className="px-5">
          <H5 bold text="Edit I'm Open to" />
        </Modal.Header>
        <Divider />
        <Modal.Body
          className={cx(
            "d-flex flex-column align-items-center justify-content-between",
            mobile ? "px-4 pt-4 pb-7" : "px-6 pt-5 pb-6"
          )}
          style={{ maxHeight: mobile ? "" : "700px", overflowY: "overlay" }}
        >
          <div className="d-flex align-items-center position-relative mb-5">
            <TalentProfilePicture
              className="position-relative cursor-pointer"
              style={{ borderRadius: "24px" }}
              src={imageSrc}
              straight
              height={mobile ? 257 : 332}
              width={mobile ? 328 : 424}
            />
            <div className="edit-image" style={{ borderRadius: "24px" }}></div>
            <label htmlFor="aboutBannerFileInput">
              <TalentProfilePicture
                className="position-absolute cursor-pointer"
                style={{
                  top: mobile ? "110px" : "145px",
                  left: mobile ? "115px" : "160px"
                }}
                src={CameraButton}
                height={40}
              />
            </label>
            <input id="aboutBannerFileInput" className="d-none" type="file" accept=".jpg,.png,.jpeg,.gif"></input>
            <button
              className="button-link position-absolute"
              style={{
                top: mobile ? "110px" : "145px",
                left: mobile ? "165px" : "210px"
              }}
              onClick={deleteBannerImg}
            >
              <TalentProfilePicture className="cursor-pointer" src={DeleteButton} height={40} />
            </button>
          </div>
          <div className="w-100 mb-5">
            <div className="d-flex justify-content-between align-items-center">
              <P2 className="text-primary-01" bold>
                About <span className="text-danger">*</span>
              </P2>
            </div>
            <TextArea
              className="mb-2"
              onChange={e => changeCareerGoalAttribute("pitch", e.target.value)}
              value={editedTalent.career_goal.pitch || ""}
              rows={3}
              required={true}
              error={validationErrors?.pitch}
            />
            <P2 className="text-primary-04" text="Let people know more about you and what you are looking for" />
          </div>
          <div className="w-100 mb-5">
            <P2 className="text-primary-01 mb-2" bold text="I'm open to" />
            <UserTags
              tags={CAREER_NEEDS_OPTIONS}
              tagsSelected={selectedCareerNeeds}
              className="mr-2 mb-4"
              clickable={false}
              talent_id={`Edit-About`}
              onClick={tag => changeSelectedCareerNeeds(tag)}
            />
          </div>
        </Modal.Body>
        <Divider />
        <Modal.Footer className="px-6 py-3" style={{ borderTop: "none" }}>
          <Button className="mr-2" type="white-ghost" text="Cancel" onClick={hide} />
          <Button type="primary-default" text="Save" onClick={saveProfile} />
        </Modal.Footer>
      </Modal>
    )
  );
};

export default EditAboutModal;
