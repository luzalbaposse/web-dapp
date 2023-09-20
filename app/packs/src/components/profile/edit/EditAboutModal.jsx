import React, { useEffect, useState } from "react";
import cx from "classnames";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { patch, getAuthToken } from "src/utils/requests";
import Uppy from "@uppy/core";
import AwsS3Multipart from "@uppy/aws-s3-multipart";
import TextArea from "src/components/design_system/fields/textarea";
import Divider from "src/components/design_system/other/Divider";
import Button from "src/components/design_system/button";
import { H5, P2 } from "src/components/design_system/typography";
import { ToastBody } from "src/components/design_system/toasts";
import { useWindowDimensionsHook } from "src/utils/window";
import { useProfileFetcher } from "src/hooks/use-profile-fetcher";

const EditAboutModal = ({ show, hide, setProfile, username }) => {
  const { profile, fetchProfile } = useProfileFetcher();
  const { mobile } = useWindowDimensionsHook();
  const [editedTalent, setEditedTalent] = useState(undefined);
  const [aboutBannerFileInput, setAboutBannerFileInput] = useState(null);
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
      }
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
          <H5 bold text="Edit About" />
        </Modal.Header>
        <Divider />
        <Modal.Body
          className={cx(
            "d-flex flex-column align-items-center justify-content-between",
            mobile ? "px-4 pt-4 pb-7" : "px-6 pt-5 pb-6"
          )}
          style={{ maxHeight: mobile ? "" : "700px", overflowY: "overlay" }}
        >
          <div className="w-100 mb-5">
            <div className="d-flex justify-content-between align-items-center">
              <P2 className="text-primary-01" bold>
                About <span className="text-danger">*</span>
              </P2>
            </div>
            <TextArea
              className="mb-2"
              onChange={e => changeCareerGoalAttribute("pitch", e.target.value)}
              value={editedTalent.career_goal?.pitch || ""}
              rows={3}
              required={true}
              error={validationErrors?.pitch}
            />
            <P2 className="text-primary-04" text="Let people know more about you and what you are looking for" />
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
