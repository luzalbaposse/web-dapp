import React, { useState } from "react";
import dayjs from "dayjs";

import TalentProfilePicture from "src/components/talent/TalentProfilePicture";
import { ethers } from "ethers";
import { H4, H5, P2 } from "src/components/design_system/typography";
import TalentBanner from "images/overview.gif";
import { useWindowDimensionsHook } from "src/utils/window";
import UserTags from "src/components/talent/UserTags";
import Button from "src/components/design_system/button";
import StakeModal from "src/components/token/StakeModal";
import { Globe, Calendar, Envelope, Share } from "src/components/icons";
import { lightTextPrimary04 } from "src/utils/colors";

import { formatNumberWithSymbol } from "src/utils/viewHelpers";
import EditOverviewModal from "src/components/profile/edit/EditOverviewModal";

import cx from "classnames";

const Overview = ({
  className,
  talent,
  setTalent,
  talentTokenPrice,
  currentUserId,
  railsContext,
  changeSection,
}) => {
  const joinedAt = dayjs(talent.user.createdAt).format("MMMM YYYY");
  const talentIsFromCurrentUser = talent.userId == currentUserId;

  const { mobile } = useWindowDimensionsHook();
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  return (
    <div className={cx(className)}>
      <div className={cx(mobile ? "" : "d-flex mb-7")}>
        <div className={cx(mobile ? "col-12" : "col-6")}>
          {mobile ? (
            <div className="d-flex flex-column">
              {talent.bannerUrl ? (
                <TalentProfilePicture
                  style={{ borderRadius: "24px" }}
                  className="align-self-end pull-bottom-content-70"
                  src={talent.bannerUrl}
                  straight
                  height={257}
                  width={328}
                />
              ) : (
                <TalentProfilePicture
                  className="align-self-end pull-bottom-content-70"
                  style={{ borderRadius: "24px" }}
                  src={TalentBanner}
                  straight
                  height={213}
                  width={272}
                />
              )}
              <TalentProfilePicture
                className="mb-3"
                src={talent.profilePictureUrl}
                height={120}
                border
              />
            </div>
          ) : (
            <TalentProfilePicture
              className="mb-3"
              src={talent.profilePictureUrl}
              height={120}
            />
          )}
          <H4
            className="mb-1 medium"
            text={talent.user.displayName || talent.user.username}
          />
          <P2 className="text-primary-03 mb-4" text={talent.occupation} />
          {mobile && (
            <div className="d-flex align-items-center mb-4">
              {talentIsFromCurrentUser ? (
                <>
                  <Button
                    className="mr-2"
                    type="primary-default"
                    text="Edit"
                    onClick={() => setEditMode(true)}
                  />
                  <Button
                    className="mr-2"
                    type="primary-default"
                    text={`Buy ${talent.token.ticker}`}
                    onClick={() => setShowStakeModal(true)}
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
                  <a
                    href={`/messages?user=${talent.user.id}`}
                    className="button-link"
                  >
                    <Button
                      className="mr-2"
                      type="white-outline"
                      size="big-icon"
                      onClick={() => null}
                    >
                      <Envelope
                        className="h-100"
                        color="currentColor"
                        size={16}
                        viewBox="0 0 24 24"
                      />
                    </Button>
                  </a>
                  <Button
                    type="primary-default"
                    size="big"
                    text="Support"
                    onClick={() => setShowStakeModal(true)}
                  />
                </>
              )}
            </div>
          )}
          <H5
            className="text-primary-01 mb-4"
            text={`--E ${talent.headline}`}
          />
          <UserTags
            tags={talent.tags.map((tag) => tag.description)}
            className="mr-2 mb-3"
          />
          <div className="mb-4 d-flex flex-wrap">
            <Button
              className="d-flex mr-2 mt-2 button-link p-0"
              onClick={() => changeSection("#token")}
            >
              <P2
                className="text-primary-01 mr-1"
                bold
                text={
                  talent.totalSupply
                    ? formatNumberWithSymbol(
                        ethers.utils.formatUnits(talent.totalSupply) *
                          talentTokenPrice
                      )
                    : "-"
                }
              />
              <P2 className="text-primary-04" text="Market Value" />
            </Button>
            <Button
              className="d-flex mr-2 mt-2 button-link p-0"
              onClick={() => changeSection("#Community")}
            >
              <P2
                className="text-primary-01 mr-1"
                bold
                text={talent.supportersCount || "0"}
              />
              <P2 className="text-primary-04" text="Supporters" />
            </Button>
            <Button
              className="d-flex mr-2 mt-2 button-link p-0"
              onClick={() => changeSection("#Community")}
            >
              <P2
                className="text-primary-01 mr-1"
                bold
                text={talent.supportingCount || "0"}
              />
              <P2 className="text-primary-04" text="Supporting" />
            </Button>
            <Button
              className="d-flex mr-2 mt-2 button-link p-0"
              onClick={() => changeSection("#Community")}
            >
              <P2
                className="text-primary-01 mr-1"
                bold
                text={talent.followersCount || "0"}
              />
              <P2 className="text-primary-04" text="Followers" />
            </Button>
          </div>
          <div className="d-flex align-items-center mb-4">
            <div className="mr-4 d-flex align-items-center">
              <Globe className="mr-2" size={16} color={lightTextPrimary04} />
              <P2 className="text-primary-03" text={talent.profile.location} />
            </div>
            <div className="mr-4 d-flex align-items-center">
              <Calendar className="mr-2" size={16} color={lightTextPrimary04} />
              <P2 className="text-primary-03" text={`Joined ${joinedAt}`} />
            </div>
          </div>
          {talent.user.invitedBy && (
            <div className="d-flex align-items-center">
              <P2 className="text-primary-04 mr-3" text="Invited by" />
              <TalentProfilePicture
                className="mr-2"
                src={talent.user.invitedBy.profilePictureUrl}
                height={32}
              />
              <P2 bold text={talent.user.invitedBy.name} />
            </div>
          )}
        </div>
        {!mobile && <div className="col-1"></div>}
        {!mobile && (
          <div
            className={cx(
              mobile ? "col-12" : "col-5 p-0",
              "d-flex flex-column align-items-end justify-content-center"
            )}
          >
            {talent.bannerUrl ? (
              <TalentProfilePicture
                className="banner-profile"
                src={talent.bannerUrl}
                straight
              />
            ) : (
              <TalentProfilePicture
                className="banner-profile"
                src={TalentBanner}
                straight
              />
            )}
          </div>
        )}
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <div></div>
        {!mobile && (
          <div className="d-flex align-items-center">
            {talentIsFromCurrentUser ? (
              <>
                <Button
                  className="mr-2"
                  type="primary-default"
                  size="big"
                  text="Edit"
                  onClick={() => setEditMode(true)}
                />
                <Button
                  className="mr-2"
                  type="primary-default"
                  size="big"
                  text={`Buy ${talent.token.ticker}`}
                  onClick={() => setShowStakeModal(true)}
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
                <a
                  href={`/messages?user=${talent.user.id}`}
                  className="button-link"
                >
                  <Button
                    className="mr-2"
                    type="white-outline"
                    size="big-icon"
                    onClick={() => null}
                  >
                    <Envelope
                      className="h-100"
                      color="currentColor"
                      size={16}
                      viewBox="0 0 24 24"
                    />
                  </Button>
                </a>
                <Button
                  type="primary-default"
                  size="big"
                  text="Support"
                  onClick={() => setShowStakeModal(true)}
                />
              </>
            )}
          </div>
        )}
      </div>
      <StakeModal
        show={showStakeModal}
        setShow={setShowStakeModal}
        tokenAddress={talent.token.contractId}
        tokenId={talent.token.id}
        userId={currentUserId}
        talentUserId={talent.userId}
        tokenChainId={talent.token.chainId}
        talentName={talent.user.displayName || talent.user.username}
        ticker={talent.token.ticker}
        talentIsFromCurrentUser={talentIsFromCurrentUser}
        railsContext={railsContext}
      />
      {editMode && (
        <EditOverviewModal
          show={editMode}
          hide={() => setEditMode(false)}
          talent={talent}
          setTalent={setTalent}
        />
      )}
    </div>
  );
};

export default Overview;
