import React, { useEffect, useState, useMemo } from "react";
import debounce from "lodash/debounce";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

import { patch, get, getAuthToken } from "src/utils/requests";

import Uppy from "@uppy/core";
import { FileInput } from "@uppy/react";
import AwsS3Multipart from "@uppy/aws-s3-multipart";
import AsyncCreatableSelect from "react-select/async-creatable";
import { components } from "react-select";

import CameraButton from "images/camera-button.png";
import DeleteButton from "images/delete-button.png";
import TalentBanner from "images/overview.gif";
import TalentProfilePicture from "src/components/talent/TalentProfilePicture";
import Divider from "src/components/design_system/other/Divider";
import TextInput from "src/components/design_system/fields/textinput";
import TextArea from "src/components/design_system/fields/textarea";
import Button from "src/components/design_system/button";
import UserTags from "src/components/talent/UserTags";
import TagsWithIndex from "src/components/design_system/tag/TagsWithIndex";
import { H5, P2, P3 } from "src/components/design_system/typography";
import { ToastBody } from "src/components/design_system/toasts";
import { CAREER_NEEDS_OPTIONS } from "src/utils/constants";

import { useWindowDimensionsHook } from "src/utils/window";

import cx from "classnames";

const Option = props => {
  return (
    <components.Option {...props}>
      <div className="d-flex justify-content-between">
        {props.children}
        <P2 text={`${props.data.count || 0}`} />
      </div>
    </components.Option>
  );
};

const EditOverviewModal = ({ show, hide, profile, setProfile, mode }) => {
  const { mobile } = useWindowDimensionsHook();
  const [editedTalent, setEditedTalent] = useState(profile);
  const [profileFileInput, setProfileFileInput] = useState(null);
  const [bannerFileInput, setBannerFileInput] = useState(null);
  const [selectedCareerNeeds, setSelectedCareerNeeds] = useState(
    editedTalent.career_goal.career_needs.map(need => need.title)
  );
  const [selectedTags, setSelectedTags] = useState(
    editedTalent.tags.map(tag => ({
      value: tag.description,
      label: tag.description
    }))
  );
  const [validationErrors, setValidationErrors] = useState({
    legal_first_name: false,
    legal_last_name: false,
    display_name: false,
    occupation: false,
    location: false,
    headline: false
  });

  const talentErrors = () => {
    const errors = {};
    if (editedTalent.user.display_name == "") {
      errors.display_name = true;
    }
    if (editedTalent.profile.occupation == "") {
      errors.occupation = true;
    }
    if (editedTalent.profile.location == "") {
      errors.location = true;
    }
    if (editedTalent.profile.headline == "") {
      errors.headline = true;
    }

    return errors;
  };

  const uppyProfile = new Uppy({
    meta: { type: "avatar" },
    restrictions: {
      maxFileSize: 5120000,
      allowedFileTypes: [".jpg", ".png", ".jpeg"]
    },
    autoProceed: true
  });

  const uppyBanner = new Uppy({
    meta: { type: "avatar" },
    restrictions: {
      maxFileSize: 5120000,
      allowedFileTypes: [".jpg", ".png", ".jpeg", ".gif"]
    },
    autoProceed: true
  });

  uppyProfile.use(AwsS3Multipart, {
    limit: 4,
    companionUrl: "/",
    companionHeaders: {
      "X-CSRF-Token": getAuthToken()
    }
  });

  uppyBanner.use(AwsS3Multipart, {
    limit: 4,
    companionUrl: "/",
    companionHeaders: {
      "X-CSRF-Token": getAuthToken()
    }
  });

  profileFileInput?.addEventListener("change", event => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      try {
        uppyProfile.addFile({
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

  bannerFileInput?.addEventListener("change", event => {
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

    const response = await patch(`/api/v1/talent/${profile.user.id}`, {
      user: {
        ...editedTalent.user
      },
      talent: {
        ...editedTalent
      },
      tags: selectedTags.map(tag => tag.value),
      career_needs: selectedCareerNeeds
    });

    if (response && !response.error) {
      setProfile(prev => ({
        ...prev,
        ...response
      }));

      toast.success(<ToastBody heading="Success!" body={"Header created successfully."} />, { autoClose: 1500 });
    } else {
      toast.error(<ToastBody heading="Error!" body={response?.error} mode={mode} />);
    }

    hide();
  };

  useEffect(() => {
    uppyProfile.on("restriction-failed", () => {
      uppyProfile.reset();
    });
    uppyProfile.on("upload-success", (file, response) => {
      setEditedTalent(prev => ({
        ...prev,
        profile_picture_url: response.uploadURL,
        profile_picture_data: {
          // eslint-disable-next-line  no-useless-escape
          id: response.uploadURL.match(/\/cache\/([^\?]+)/)[1], // extract key without prefix
          new_upload: true,
          storage: "cache",
          metadata: {
            size: file.size,
            filename: file.name,
            mime_type: file.type
          }
        }
      }));
    });
    uppyProfile.on("upload", () => {});
  }, [uppyProfile]);

  useEffect(() => {
    uppyBanner.on("restriction-failed", () => {
      uppyBanner.reset();
    });
    uppyBanner.on("upload-success", (file, response) => {
      setEditedTalent(prev => ({
        ...prev,
        banner_url: response.uploadURL,
        banner_data: {
          // eslint-disable-next-line  no-useless-escape
          id: response.uploadURL.match(/\/cache\/([^\?]+)/)[1], // extract key without prefix
          storage: "cache",
          new_upload: true,
          metadata: {
            size: file.size,
            filename: file.name,
            mime_type: file.type
          }
        }
      }));
    });
    uppyBanner.on("upload", () => {});
  }, [uppyBanner]);

  useEffect(() => {
    if (show) {
      setProfileFileInput(document.getElementById("profileFileInput"));
      setBannerFileInput(document.getElementById("bannerFileInput"));
    } else {
      // TODO: get code context and improve this
      // eslint-disable-next-line no-undef
      setEditedTalent(talent);
    }
  }, [show]);

  const changeUserAttribute = (attribute, value) => {
    setValidationErrors(prev => ({ ...prev, [attribute]: false }));
    setEditedTalent(prev => ({
      ...prev,
      user: {
        ...prev.user,
        [attribute]: value
      }
    }));
  };

  const changeProfileAttribute = (attribute, value) => {
    setValidationErrors(prev => ({ ...prev, [attribute]: false }));
    setEditedTalent(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [attribute]: value
      }
    }));
  };

  const getTags = (query, callback) => {
    get(`/api/v1/tags?description=${query}`).then(response => {
      return callback(
        response.map(tag => ({
          value: tag.description,
          label: tag.description,
          count: tag.user_tags_count
        }))
      );
    });
  };

  const debouncedGetTags = debounce(getTags, 300);

  const onChangeTags = tags => {
    setSelectedTags(
      tags.map(tag => ({
        value: tag.value,
        label: tag.label.toLowerCase()
      }))
    );
    setEditedTalent(prev => ({
      ...prev,
      tags: tags.map(tag => tag.label.toLowerCase())
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

  const headlineHighlightedWords = useMemo(() => {
    return editedTalent.profile.headline?.split(" ") || "";
  }, [editedTalent.profile.headline]);

  const changeHeadlineHighlightedWords = tagIndex => {
    let highlightedHeadlineWordsIndex = editedTalent.profile.highlighted_headline_words_index || [];

    if (highlightedHeadlineWordsIndex.includes(tagIndex)) {
      const index = highlightedHeadlineWordsIndex.indexOf(tagIndex);
      highlightedHeadlineWordsIndex.splice(index, 1);
      setEditedTalent(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          highlighted_headline_words_index: [...highlightedHeadlineWordsIndex]
        }
      }));
    } else {
      setEditedTalent(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          highlighted_headline_words_index: [...highlightedHeadlineWordsIndex, tagIndex]
        }
      }));
    }
  };

  const deleteBannerImg = () => {
    setEditedTalent(prev => ({
      ...prev,
      banner_url: null,
      banner_data: null
    }));
  };

  const debouncedSaveProfile = debounce(() => saveProfile(), 400);

  return (
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
        <H5 bold text="Edit Header" />
      </Modal.Header>
      <Divider />
      <Modal.Body
        className={cx(
          "d-flex flex-column align-items-center justify-content-between",
          mobile ? "px-4 pt-4 pb-7" : "px-6 pt-5 pb-6"
        )}
        style={{ maxHeight: mobile ? "" : "700px", overflowY: "overlay" }}
      >
        {mobile ? (
          <div className="mb-4 d-flex flex-column align-items-center">
            <TalentProfilePicture
              className="mb-2 cursor-pointer"
              style={{ borderRadius: "24px" }}
              src={editedTalent.banner_url || TalentBanner}
              straight
              height={257}
              width={328}
            />
            <P3 className="text-primary-04 mb-2" text="JPG,PNG,GIF,URL(Video). Recommend 900x700. Max 5MB" />
            <div className="d-flex justify-content-center mb-4">
              <FileInput
                uppy={uppyBanner}
                pretty
                inputName="banners[]"
                locale={{
                  strings: {
                    chooseFiles: "Choose masterhead image"
                  }
                }}
              />
            </div>
            <div className="mb-4">
              <div className="d-flex flex-column align-items-center">
                <TalentProfilePicture
                  className="mb-2 cursor-pointer"
                  style={{ borderRadius: "24px" }}
                  src={editedTalent.profile_picture_url}
                  userId={editedTalent.id}
                  height={112}
                  width={112}
                />
                <P3 className="text-primary-04 mb-2" text="JPG or PNG. Max 5MB" />
                <FileInput
                  uppy={uppyProfile}
                  pretty
                  inputName="profiles[]"
                  locale={{
                    strings: {
                      chooseFiles: "Choose Profile Picture"
                    }
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="d-flex align-items-center mb-5">
            <div className="position-relative mr-5">
              <TalentProfilePicture
                className="position-relative"
                src={editedTalent.profile_picture_url}
                userId={editedTalent.id}
                height={112}
              />
              <div className="rounded-circle edit-image"></div>
              <label htmlFor="profileFileInput">
                <TalentProfilePicture
                  className="position-absolute cursor-pointer"
                  style={{ top: "36px", left: "36px" }}
                  src={CameraButton}
                  height={40}
                />
              </label>
              <input id="profileFileInput" className="d-none" type="file" accept=".jpg,.png,.jpeg"></input>
            </div>
            <div className="position-relative">
              <TalentProfilePicture
                className="position-relative banner-profile cursor-pointer"
                src={editedTalent.banner_url || TalentBanner}
                straight
                height={332}
                width={424}
              />
              <div className="edit-image" style={{ borderRadius: "24px" }}></div>
              <label htmlFor="bannerFileInput">
                <TalentProfilePicture
                  className="position-absolute cursor-pointer"
                  style={{ top: "145px", left: "160px" }}
                  src={CameraButton}
                  height={40}
                />
              </label>
              <input id="bannerFileInput" className="d-none" type="file" accept=".jpg,.png,.jpeg,.gif"></input>
              <button
                className="button-link position-absolute"
                style={{ top: "145px", left: "210px" }}
                onClick={deleteBannerImg}
              >
                <TalentProfilePicture className="cursor-pointer" src={DeleteButton} height={40} />
              </button>
            </div>
          </div>
        )}
        <div className="w-100 d-flex flex-wrap">
          <div className="w-100 mb-5">
            <TextInput
              className="mb-2"
              title="First Name"
              onChange={e => changeUserAttribute("legal_first_name", e.target.value)}
              value={editedTalent.user.legal_first_name}
              error={validationErrors?.legal_first_name}
              disabled={editedTalent.with_persona_id}
            />
            <P2
              className="text-primary-04"
              text="Your legal first name that will be used when verifying your account"
            />
          </div>
          <div className="w-100 mb-5">
            <TextInput
              className="mb-2"
              title="Last Name"
              onChange={e => changeUserAttribute("legal_last_name", e.target.value)}
              value={editedTalent.user.legal_last_name}
              error={validationErrors?.legal_last_name}
              disabled={editedTalent.with_persona_id}
            />
            <P2 className="text-primary-04" text="Your legal last name that will be used when verifying your account" />
          </div>
          <div className="w-100 mb-5">
            <TextInput
              className="mb-2"
              title="Display Name"
              onChange={e => changeUserAttribute("display_name", e.target.value)}
              value={editedTalent.user.display_name}
              required={true}
              error={validationErrors?.display_name}
            />
            <P2 className="text-primary-04" text="The name that we will generally use" />
          </div>
          <div className="w-100 mb-5">
            <TextInput
              title="Location"
              onChange={e => changeProfileAttribute("location", e.target.value)}
              value={editedTalent.profile.location}
              required={true}
              error={validationErrors?.location}
            />
          </div>
        </div>
        <div className="w-100 mb-5">
          <TextInput
            title="Occupation"
            className="mb-2"
            onChange={e => changeProfileAttribute("occupation", e.target.value)}
            value={editedTalent.profile.occupation}
            required={true}
            error={validationErrors?.occupation}
          />
          <P2
            className="text-primary-04"
            text="We know you are a lot of things, but let us know your main occupation"
          />
        </div>
        <div className="w-100 mb-5">
          <div className="mb-2 d-flex justify-content-between align-items-center">
            <P2 className="text-primary-01" bold>
              Headline <span className="text-danger">*</span>
            </P2>
            <div className="d-flex">
              <P3 className="text-primary-01" bold text={editedTalent.profile.headline?.length || "0"} />
              <P3 className="text-primary-04" bold text="/70" />
            </div>
          </div>
          <TextArea
            onChange={e => changeProfileAttribute("headline", e.target.value)}
            value={editedTalent.profile.headline || ""}
            maxLength={70}
            rows={3}
            required={true}
            error={validationErrors?.headline}
          />
        </div>
        <div className="w-100 mb-2">
          <P2 className="text-primary-01 mb-2" bold text="Highlight headline keywords" />
          <TagsWithIndex
            tags={headlineHighlightedWords}
            tagsIndexSelected={editedTalent.profile.highlighted_headline_words_index || []}
            className="mr-2 mb-4"
            clickable={false}
            onClick={tagIndex => changeHeadlineHighlightedWords(tagIndex)}
          />
        </div>
        <div className="w-100 mb-5">
          <P2 className="mb-2 text-primary-01" bold text="Tags" />
          <AsyncCreatableSelect
            classNamePrefix="select"
            isMulti
            cacheOptions
            onChange={tags => onChangeTags(tags)}
            defaultOptions
            value={selectedTags}
            loadOptions={debouncedGetTags}
            components={{ Option }}
          />
        </div>
        <div className="mb-5">
          <P2 className="mb-2 text-primary-01" bold text="Availability Highlight" />
          <UserTags
            tags={CAREER_NEEDS_OPTIONS}
            tagsSelected={selectedCareerNeeds}
            className="mr-2 mb-4"
            clickable={false}
            onClick={tag => changeSelectedCareerNeeds(tag)}
          />
        </div>
        <div className="w-100 mb-5">
          <H5 className="mb-5 text-primary-01" bold text="Links" />
          <div className="mb-5">
            <TextInput
              title="Website"
              onChange={e => changeProfileAttribute("website", e.target.value)}
              value={editedTalent.profile.website || ""}
            />
          </div>
          <div className="mb-5">
            <TextInput
              title="LinkedIn"
              onChange={e => changeProfileAttribute("linkedin", e.target.value)}
              value={editedTalent.profile.linkedin || ""}
            />
          </div>
          <div className="mb-5">
            <TextInput
              title="Twitter"
              onChange={e => changeProfileAttribute("twitter", e.target.value)}
              value={editedTalent.profile.twitter || ""}
            />
          </div>
          <div className="mb-5">
            <TextInput
              title="Lens"
              onChange={e => changeProfileAttribute("lens", e.target.value)}
              value={editedTalent.profile.lens || ""}
            />
          </div>
          <div className="mb-5">
            <TextInput
              title="Mastodon"
              onChange={e => changeProfileAttribute("mastodon", e.target.value)}
              value={editedTalent.profile.mastodon || ""}
            />
          </div>
          <div className="mb-5">
            <TextInput
              title="Telegram"
              onChange={e => changeProfileAttribute("telegram", e.target.value)}
              value={editedTalent.profile.telegram || ""}
            />
          </div>
          <div>
            <TextInput
              title="Github"
              onChange={e => changeProfileAttribute("github", e.target.value)}
              value={editedTalent.profile.github || ""}
            />
          </div>
        </div>
      </Modal.Body>
      <Divider />
      <Modal.Footer className="px-6 py-3" style={{ borderTop: "none" }}>
        <Button className="mr-2" type="white-ghost" text="Cancel" onClick={hide} />
        <Button type="primary-default" text="Save" onClick={debouncedSaveProfile} />
      </Modal.Footer>
    </Modal>
  );
};

export default EditOverviewModal;
