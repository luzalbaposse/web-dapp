import { Button, Typography } from "@talentprotocol/design-system";
import cx from "classnames";
import React from "react";
import { verifiedIcon } from "src/utils/viewHelpers";
import Divider from "src/components/design_system/other/Divider";
import TalentProfilePicture from "src/components/talent/TalentProfilePicture";

const Notification = ({
  actionable,
  actions,
  description,
  id,
  mode,
  onClick,
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
              <Typography color={unread ? "primary01" : "primaryDisable"} specs={{ variant: "p2", type: "bold" }}>
                {sourceName}
              </Typography>
              {sourceVerified && <img className="ml-1" height={16} src={verifiedIcon(mode, !unread)} width={16} />}
            </div>
            {timeInformation && (
              <Typography color={unread ? "primary02" : "primaryDisable"} specs={{ variant: "p3", type: "regular" }}>
                {timeInformation}
              </Typography>
            )}
          </div>
          {description && (
            <Typography
              className="notification-description text-truncate"
              color={unread ? "primary02" : "primaryDisable"}
              specs={{ variant: "p3", type: "regular" }}
            >
              {description}
            </Typography>
          )}
          {actionable && actions.length > 0 && unread && (
            <div className="notification-buttons">
              {actions.map((action, index) => (
                <Button
                  hierarchy={action.hierarchy}
                  key={`notification-${id}-action-${index}`}
                  onClick={e => {
                    e.stopPropagation();
                    onClick(action);
                  }}
                  size="small"
                  text={action.label}
                />
              ))}
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
