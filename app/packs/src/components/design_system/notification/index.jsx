import { Button, Typography } from "@talentprotocol/design-system";
import cx from "classnames";
import React from "react";
import { verifiedIcon } from "src/utils/viewHelpers";
import Divider from "src/components/design_system/other/Divider";
import TalentProfilePicture from "src/components/talent/TalentProfilePicture";

const Notification = ({
  buttonLabel,
  buttonUrl,
  description,
  mode,
  onClick,
  secondaryButtonLabel,
  secondaryButtonUrl,
  showDivider = true,
  sourceName,
  sourceProfilePictureUrl,
  sourceVerified = false,
  timeInformation,
  unread = false
}) => {
  if (!sourceName) return null;

  return (
    <>
      <div className={cx("notification", mode)}>
        <TalentProfilePicture height={40} src={sourceProfilePictureUrl} />
        <div className={cx("w-100", !unread && "read")}>
          <div className="align-items-center d-flex justify-content-between">
            <div className="align-items-center d-flex">
              <Typography color="primary01" specs={{ variant: "p2", type: "bold" }}>
                {sourceName}
              </Typography>
              {sourceVerified && <img className="ml-1" height={16} src={verifiedIcon(mode, !unread)} width={16} />}
            </div>
            {timeInformation && (
              <Typography color="primary02" specs={{ variant: "p3", type: "regular" }}>
                {timeInformation}
              </Typography>
            )}
          </div>
          {description && (
            <Typography
              className="notification-description text-truncate"
              color="primary02"
              specs={{ variant: "p3", type: "regular" }}
            >
              {description}
            </Typography>
          )}
          {unread && (buttonLabel || secondaryButtonLabel) && (
            <div className="notification-buttons">
              {secondaryButtonLabel && (
                <Button
                  hierarchy="secondary"
                  onClick={e => {
                    e.stopPropagation();
                    onClick(secondaryButtonUrl);
                  }}
                  size="small"
                  text={secondaryButtonLabel}
                />
              )}
              {buttonLabel && (
                <Button
                  hierarchy="primary"
                  onClick={e => {
                    e.stopPropagation();
                    onClick(buttonUrl);
                  }}
                  size="small"
                  text={buttonLabel}
                />
              )}
            </div>
          )}
        </div>
      </div>
      {showDivider && (
        <div className="notification-divider">
          <Divider />
        </div>
      )}
    </>
  );
};

export default Notification;
