import React, { useState, useEffect } from "react";
import cx from "classnames";
import { patch, getAuthToken, post, destroy } from "src/utils/requests";
import { toast } from "react-toastify";
import Uppy from "@uppy/core";
import AwsS3Multipart from "@uppy/aws-s3-multipart";
import TalentProfilePicture from "src/components/talent/TalentProfilePicture";
import CameraButton from "images/camera-button.png";
import { useWindowDimensionsHook } from "src/utils/window";
import { useTheme } from "src/contexts/ThemeContext";
import { ToastBody } from "src/components/design_system/toasts";
import Button from "src/components/design_system/button";
import Tooltip from "src/components/design_system/tooltip";
import { Envelope, Spinner, Help } from "src/components/icons";
import { lightTextPrimary03 } from "src/utils/colors";
import EditOverviewModal from "src/components/profile/edit/EditOverviewModal";
import RejectTalentModal from "../RejectTalentModal";
import ApprovalConfirmationModal from "../ApprovalConfirmationModal";
import AdminVerificationConfirmationModal from "../AdminVerificationConfirmationModal";
import PersonaVerificationConfirmationModal from "../PersonaVerificationConfirmationModal";
import { Banner } from "src/components-v2/banner";
import { darkBg01, lightBg01 } from "src/utils/colors";
import { ProfileCard } from "src/components-v2/profile-card";
import { useModal } from "@talentprotocol/design-system";
import { SendCareerUpdateModalV2 } from "../../../components-v2/send-career-update-modal";

const Overview = ({
  className,
  profile,
  setProfile,
  talentTokenPrice,
  currentUserId,
  currentUserAdmin,
  currentUserModerator,
  railsContext,
  changeSection,
  canUpdate,
  previewMode,
  setPreviewMode,
  isCurrentUserImpersonated,
  withPersonaRequest,
  profileSubdomain,
  currentUserProfile
}) => {
  const { mobile } = useWindowDimensionsHook();
  const { mode } = useTheme();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showApprovalConfirmationModal, setShowApprovalConfirmationModal] = useState(false);
  const [showAdminVerificationConfirmationModal, setShowAdminVerificationConfirmationModal] = useState(false);
  const [showPersonaVerificationConfirmationModal, setShowPersonaVerificationConfirmationModal] = useState(false);
  const [isUploadingProfile, setIsUploadingProfile] = useState(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [overviewProfileFileInput, setOverviewProfileFileInput] = useState(null);
  const [overviewBannerFileInput, setOverviewBannerFileInput] = useState(null);

  const sendCareerUpdateModalState = useModal();

  const user = profile.user;
  const talentToken = profile.talent_token;

  const subscriptionButtonText = {
    pending: "Pending",
    subscribed: "Unsubscribe",
    unsubscribed: "Subscribe"
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

  overviewProfileFileInput?.addEventListener("change", event => {
    setIsUploadingProfile(true);
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
        setIsUploadingProfile(false);
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

  overviewBannerFileInput?.addEventListener("change", event => {
    setIsUploadingBanner(true);
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
        setIsUploadingBanner(false);
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

  const saveProfile = async updatedTalent => {
    const response = await patch(`/api/v1/talent/${currentUserId}`, {
      user: {
        ...updatedTalent.user
      },
      talent: {
        ...updatedTalent
      }
    });

    if (response) {
      setProfile(prev => ({
        ...prev,
        ...response
      }));
    }
  };

  const deleteBannerImg = () => {
    saveProfile({
      ...profile,
      banner_url: null,
      banner_data: null
    });
  };

  useEffect(() => {
    uppyProfile.on("restriction-failed", () => {
      uppyProfile.reset();
    });
    uppyProfile.on("upload-success", (file, response) => {
      setIsUploadingProfile(false);
      setIsUploadingBanner(false);
      saveProfile({
        ...profile,
        profile_picture_url: response.uploadURL,
        profile_picture_data: {
          new_upload: true,
          // eslint-disable-next-line no-useless-escape
          id: response.uploadURL.match(/\/cache\/([^\?]+)/)[1], // extract key without prefix
          storage: "cache",
          metadata: {
            size: file.size,
            filename: file.name,
            mime_type: file.type
          }
        }
      });
    });
    uppyProfile.on("upload", () => {});
  }, [uppyProfile]);

  useEffect(() => {
    uppyBanner.on("restriction-failed", () => {
      uppyBanner.reset();
    });
    uppyBanner.on("upload-success", (file, response) => {
      setIsUploadingProfile(false);
      setIsUploadingBanner(false);
      saveProfile({
        ...profile,
        banner_url: response.uploadURL,
        banner_data: {
          new_upload: true,
          // eslint-disable-next-line no-useless-escape
          id: response.uploadURL.match(/\/cache\/([^\?]+)/)[1], // extract key without prefix
          storage: "cache",
          metadata: {
            size: file.size,
            filename: file.name,
            mime_type: file.type
          }
        }
      });
    });
    uppyBanner.on("upload", () => {});
  }, [uppyBanner]);

  useEffect(() => {
    setOverviewProfileFileInput(document.getElementById("overviewProfileFileInput"));
    setOverviewBannerFileInput(document.getElementById("overviewBannerFileInput"));
  }, []);

  const impersonateUser = async () => {
    const params = {
      username: user.username
    };

    const response = await post(`/api/v1/impersonations`, params).catch(() => {
      return false;
    });

    if (response && !response.error) {
      toast.success(<ToastBody heading="Success!" body="Impersonation started successfully!" />);
      window.location.reload();
    }
  };

  const updateSubscription = async () => {
    let response;
    let new_status;

    if (profile.subscribing_status === "subscribed") {
      response = await destroy(`/api/v1/subscriptions?talent_id=${user.username}`);
      new_status = "unsubscribed";
    } else {
      response = await post(`/api/v1/subscriptions`, {
        talent_id: user.username
      });
      new_status = "pending";
    }

    if (response.success) {
      setProfile(prev => ({
        ...prev,
        subscribing_status: new_status
      }));
    } else {
      toast.error(<ToastBody heading="Unable to update subscription" body={response?.error} />);
    }
  };

  const showSubscribeButton = () => {
    return currentUserId && user.id != currentUserId && !profileSubdomain;
  };

  const verifyTooltipBody = () => {
    if (profile.with_persona_id) {
      return "Your verification is being processed";
    } else if (withPersonaRequest.requests_counter > railsContext.withPersonaVerificationsLimit) {
      return "The number of verifications we can do is limited. Please check back later to verify your account";
    } else {
      return "In order to verify your account we must match the legal name you provided with the ID provided";
    }
  };

  return (
    <div className={cx(className)}>
      <div className={cx(mobile ? "" : "d-flex")}>
        <div className={cx(mobile ? "col-12" : "col-6")} style={{ zIndex: 1 }}>
          {mobile ? (
            <div className="d-flex flex-column">
              {previewMode || !canUpdate ? (
                <>
                  <Banner bannerUrl={profile.banner_url} deleteBannerCallback={deleteBannerImg} />
                  <TalentProfilePicture
                    src={profile.profile_picture_url}
                    height={120}
                    style={{
                      marginTop: "56px",
                      border: `4px solid ${mode() === "dark" ? darkBg01 : lightBg01}`,
                      zIndex: 1
                    }}
                    border
                  />
                </>
              ) : (
                <>
                  <Banner
                    bannerUrl={profile.banner_url}
                    deleteBannerCallback={deleteBannerImg}
                    canUpdate
                    isUploading={isUploadingBanner}
                  />
                  <div
                    className="position-relative"
                    style={{
                      width: "120px",
                      height: "120px",
                      marginTop: "56px"
                    }}
                  >
                    <TalentProfilePicture
                      className="position-relative"
                      src={profile.profile_picture_url}
                      style={{
                        border: `4px solid ${mode() === "dark" ? darkBg01 : lightBg01}`,
                        zIndex: 1
                      }}
                      height={120}
                      border
                    />
                    <label htmlFor="overviewProfileFileInput">
                      <TalentProfilePicture
                        className="position-absolute cursor-pointer"
                        style={{ top: "40px", left: "40px", zIndex: 1 }}
                        src={CameraButton}
                        height={40}
                      />
                    </label>
                    <input
                      id="overviewProfileFileInput"
                      className="d-none"
                      type="file"
                      accept=".jpg,.png,.jpeg"
                    ></input>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div style={{ marginTop: "225px", zIndex: 1 }}>
              {previewMode || !canUpdate ? (
                <TalentProfilePicture
                  src={profile.profile_picture_url}
                  style={{
                    border: `4px solid ${mode() === "dark" ? darkBg01 : lightBg01}`,
                    zIndex: 1
                  }}
                  height={120}
                />
              ) : (
                <div className="position-relative" style={{ width: "120px", height: "120px", zIndex: 1 }}>
                  {isUploadingProfile ? (
                    <div class="h-100 d-flex justify-content-center align-items-center">
                      <Spinner className="mx-4" width={50} />
                    </div>
                  ) : (
                    <>
                      <TalentProfilePicture
                        className="position-relative"
                        src={profile.profile_picture_url}
                        style={{
                          border: `4px solid ${mode() === "dark" ? darkBg01 : lightBg01}`,
                          zIndex: 1
                        }}
                        height={120}
                      />
                      <div className="rounded-circle edit-image"></div>
                      <label htmlFor="overviewProfileFileInput">
                        <TalentProfilePicture
                          className="position-absolute cursor-pointer"
                          style={{ top: "36px", left: "36px", zIndex: 1 }}
                          src={CameraButton}
                          height={40}
                        />
                      </label>
                      <input
                        id="overviewProfileFileInput"
                        className="d-none"
                        type="file"
                        accept=".jpg,.png,.jpeg"
                      ></input>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {!mobile && <div className="col-1"></div>}
        {!mobile && (
          <>
            {previewMode || !canUpdate ? (
              <Banner bannerUrl={profile.banner_url} deleteBannerCallback={deleteBannerImg} />
            ) : (
              <Banner
                bannerUrl={profile.banner_url}
                deleteBannerCallback={deleteBannerImg}
                canUpdate
                isUploading={isUploadingBanner}
              />
            )}
          </>
        )}
      </div>
      <ProfileCard
        profile={profile}
        changeSection={changeSection}
        currentUserAdmin={currentUserAdmin}
        profileSubdomain={profileSubdomain}
        mobile={mobile}
        talentTokenPrice={talentTokenPrice}
        canUpdate={canUpdate}
        setShowCareerUpdateModal={sendCareerUpdateModalState.openModal}
      >
        {mobile ? (
          <>
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center">
                {previewMode ? (
                  <Button type="primary-default" text="Back to edit profile" onClick={() => setPreviewMode(false)} />
                ) : (
                  <>
                    {canUpdate ? (
                      <>
                        {!profile.verified && (
                          <Button
                            className="mr-2"
                            type="primary-default"
                            onClick={() => setShowPersonaVerificationConfirmationModal(true)}
                            disabled={
                              profile.with_persona_id ||
                              withPersonaRequest.requests_counter > railsContext.withPersonaVerificationsLimit
                            }
                          >
                            <div className="d-flex align-items-center">
                              Verify
                              <Tooltip
                                body={verifyTooltipBody()}
                                popOverAccessibilityId={"verify_tooltip"}
                                placement="top"
                              >
                                <Help className="cursor-pointer ml-1" color={lightTextPrimary03} />
                              </Tooltip>
                            </div>
                          </Button>
                        )}
                        <Button className="mr-2" type="primary-default" text="Edit" onClick={() => setEditMode(true)} />
                        <Button
                          style={{ whiteSpace: "pre" }}
                          className="mr-2"
                          type="primary-default"
                          text="Support"
                          onClick={() => window.location.replace(`/u/${user.username}/support`)}
                        />
                        <Button
                          className="mr-2"
                          type="white-outline"
                          text="Preview"
                          onClick={() => setPreviewMode(true)}
                        />
                      </>
                    ) : (
                      <>
                        {currentUserId && !profileSubdomain && (
                          <a href={`/messages?user=${user.username}`} className="button-link">
                            <Button className="mr-2" type="white-outline" size="big" onClick={() => null}>
                              <Envelope className="h-100" color="currentColor" size={16} viewBox="0 0 24 24" />
                            </Button>
                          </a>
                        )}
                        {showSubscribeButton() && (
                          <Button
                            className="mr-2"
                            type="white-outline"
                            size="big"
                            text={subscriptionButtonText[profile.subscribing_status]}
                            disabled={profile.subscribing_status == "pending"}
                            onClick={() => updateSubscription()}
                          />
                        )}
                        {!profileSubdomain && (
                          <Button
                            type="primary-default"
                            size="big"
                            text="Support"
                            onClick={() => window.location.replace(`/u/${user.username}/support`)}
                          />
                        )}
                        {profileSubdomain && (
                          <a
                            href={`https://beta.talentprotocol.com/join/${user.username}/support`}
                            className="button-link"
                            target="_blank"
                          >
                            <Button
                              type="primary-default"
                              size="big"
                              text={`Support ${
                                talentToken.ticker ? `$${talentToken.ticker}` : user.name
                              } on Talent Protocol`}
                              style={{ "min-width": "340px" }}
                              onClick={() => null}
                            />
                          </a>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
              {(currentUserAdmin || currentUserModerator) && (
                <div className="d-flex align-items-center mt-3">
                  {!profile.verified && (
                    <Button
                      type="primary-default"
                      className="mr-2"
                      text="Verify"
                      onClick={() => setShowAdminVerificationConfirmationModal(true)}
                    />
                  )}
                  {user.profile_type == "waiting_for_approval" && (
                    <>
                      <Button
                        type="primary-default"
                        className="mr-2"
                        text={"Approve"}
                        onClick={() => setShowApprovalConfirmationModal(true)}
                      />
                      <Button onClick={() => setShowRejectModal(true)} className="mr-2" type="white-subtle">
                        Reject
                      </Button>
                    </>
                  )}
                  {!isCurrentUserImpersonated && (
                    <Button
                      type="white-outline"
                      className="mr-2"
                      text="Impersonate"
                      onClick={() => impersonateUser()}
                    />
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div
            className="d-flex align-items-center justify-content-between"
            style={{ position: "absolute", transform: "translate(-100%, 0)" }}
          >
            {!mobile && (
              <div className="d-flex align-items-center">
                {(currentUserAdmin || currentUserModerator) && (
                  <>
                    {!profile.verified && (
                      <Button
                        className="mr-2"
                        size="big"
                        type="primary-default"
                        text="Verify"
                        onClick={() => setShowAdminVerificationConfirmationModal(true)}
                      />
                    )}
                    {user.profile_type == "waiting_for_approval" && (
                      <>
                        <Button
                          className="mr-2"
                          size="big"
                          type="primary-default"
                          text="Approve"
                          onClick={() => setShowApprovalConfirmationModal(true)}
                        />
                        <Button
                          onClick={() => setShowRejectModal(true)}
                          size="big"
                          type="white-subtle"
                          className="mr-7"
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {!isCurrentUserImpersonated && (
                      <Button
                        className="mr-2"
                        type="white-outline"
                        size="big"
                        text="Impersonate"
                        onClick={() => impersonateUser()}
                      />
                    )}
                  </>
                )}
                {previewMode ? (
                  <Button
                    type="white-outline"
                    text="Back to edit profile"
                    onClick={() => setPreviewMode(false)}
                    style={{ whiteSpace: "nowrap" }}
                  />
                ) : (
                  <>
                    {canUpdate ? (
                      <>
                        {!profile.verified && (
                          <Button
                            className="mr-2"
                            type="primary-default"
                            size="big"
                            onClick={() => setShowPersonaVerificationConfirmationModal(true)}
                            disabled={
                              profile.with_persona_id ||
                              withPersonaRequest.requests_counter > railsContext.withPersonaVerificationsLimit
                            }
                          >
                            <div className="d-flex align-items-center">
                              Verify
                              <Tooltip
                                body={verifyTooltipBody()}
                                popOverAccessibilityId={"verify_tooltip"}
                                placement="top"
                              >
                                <Help className="cursor-pointer ml-2" color={lightTextPrimary03} />
                              </Tooltip>
                            </div>
                          </Button>
                        )}
                        <Button
                          className="mr-2"
                          type="primary-default"
                          size="big"
                          text="Edit"
                          onClick={() => setEditMode(true)}
                        />
                        <Button
                          style={{ whiteSpace: "pre" }}
                          className="mr-2"
                          type="primary-default"
                          size="big"
                          text="Support"
                          onClick={() => window.location.replace(`/u/${user.username}/support`)}
                        />
                        <Button
                          className="mr-2"
                          type="white-outline"
                          size="big"
                          text="Preview"
                          onClick={() => setPreviewMode(true)}
                        />
                      </>
                    ) : (
                      <>
                        {currentUserId && !profileSubdomain && (
                          <a href={`/messages?user=${user.username}`} className="button-link">
                            <Button className="mr-2" type="white-outline" size="big" onClick={() => null}>
                              <Envelope className="h-100" color="currentColor" size={16} viewBox="0 0 24 24" />
                            </Button>
                          </a>
                        )}
                        {showSubscribeButton() && (
                          <Button
                            className="mr-2"
                            type="white-outline"
                            size="big"
                            text={subscriptionButtonText[profile.subscribing_status]}
                            disabled={profile.subscribing_status == "pending"}
                            onClick={() => updateSubscription()}
                          />
                        )}
                        {!profileSubdomain && (
                          <Button
                            type="primary-default"
                            size="big"
                            text="Support"
                            onClick={() => window.location.replace(`/u/${user.username}/support`)}
                          />
                        )}
                        {profileSubdomain && (
                          <a
                            href={`https://beta.talentprotocol.com/join/${user.username}/support`}
                            className="button-link"
                            target="_blank"
                          >
                            <Button
                              type="primary-default"
                              size="big"
                              style={{ "min-width": "350px" }}
                              text={`Support ${
                                talentToken.ticker ? `$${talentToken.ticker}` : user.name
                              } on Talent Protocol`}
                              onClick={() => null}
                            />
                          </a>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </ProfileCard>
      <AdminVerificationConfirmationModal
        show={showAdminVerificationConfirmationModal}
        setShow={setShowAdminVerificationConfirmationModal}
        hide={() => setShowAdminVerificationConfirmationModal(false)}
        talent={profile}
        setProfile={setProfile}
      />
      <PersonaVerificationConfirmationModal
        show={showPersonaVerificationConfirmationModal}
        setShow={setShowPersonaVerificationConfirmationModal}
        hide={() => setShowPersonaVerificationConfirmationModal(false)}
        talent={profile}
        setProfile={setProfile}
        railsContext={railsContext}
      />
      <ApprovalConfirmationModal
        show={showApprovalConfirmationModal}
        setShow={setShowApprovalConfirmationModal}
        hide={() => setShowApprovalConfirmationModal(false)}
        talent={profile}
        setProfile={setProfile}
        railsContext={railsContext}
      />
      <RejectTalentModal
        show={showRejectModal}
        setShow={setShowRejectModal}
        mobile={mobile}
        mode={mode()}
        talent={profile}
        setProfile={setProfile}
      />
      <SendCareerUpdateModalV2
        isOpen={sendCareerUpdateModalState.isOpen}
        closeModal={sendCareerUpdateModalState.closeModal}
        profile={currentUserProfile}
      />
      {editMode && (
        <EditOverviewModal show={editMode} hide={() => setEditMode(false)} profile={profile} setProfile={setProfile} />
      )}
    </div>
  );
};

export default Overview;
