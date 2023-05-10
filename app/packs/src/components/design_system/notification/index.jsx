import cx from "classnames";
import React from "react";
import { P2, P3 } from "src/components/design_system/typography";
import { verifiedIcon } from "src/utils/viewHelpers";
import Divider from "src/components/design_system/other/Divider";
import TalentProfilePicture from "src/components/talent/TalentProfilePicture";
import ThemedButton from "src/components/design_system/button";

const Notification = ({
  buttonLabel,
  description,
  mode,
  secondaryButtonLabel,
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
              <P2 bold mode={mode} text={sourceName} />
              {sourceVerified && <img className="ml-1" height={16} src={verifiedIcon(mode, !unread)} width={16} />}
            </div>
            {timeInformation && <P3 mode={mode} text={timeInformation} />}
          </div>
          {description && <P3 className="notification-description text-truncate" mode={mode} text={description} />}
          {unread && (buttonLabel || secondaryButtonLabel) && (
            <div className="notification-buttons">
              {secondaryButtonLabel && (
                <ThemedButton mode={mode} type="secondary-notification">
                  {secondaryButtonLabel}
                </ThemedButton>
              )}
              {buttonLabel && (
                <ThemedButton mode={mode} type="primary-default">
                  {buttonLabel}
                </ThemedButton>
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
