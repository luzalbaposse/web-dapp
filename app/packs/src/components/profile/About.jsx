import React, { useState } from "react";

import TalentProfilePicture from "src/components/talent/TalentProfilePicture";
import { H4, P1 } from "src/components/design_system/typography";
import { useWindowDimensionsHook } from "src/utils/window";
import { useTheme } from "src/contexts/ThemeContext";
import UserTags from "src/components/talent/UserTags";
import Button from "src/components/design_system/button";
import AboutImage from "images/open-to.gif";
import EditAboutwModal from "src/components/profile/edit/EditAboutModal";

import cx from "classnames";

const About = ({ className, talent, setTalent }) => {
  const { mobile } = useWindowDimensionsHook();
  const { mode } = useTheme();
  const [editMode, setEditMode] = useState(false);

  const imageSrc = talent.careerGoal.imageUrl || AboutImage;

  return (
    <div className={cx(className, mobile ? "" : "d-flex")}>
      <div className={cx(mobile ? "col-12 mx-auto" : "col-6")}>
        <TalentProfilePicture
          className="mb-3"
          src={imageSrc}
          height={mobile ? 230 : 350}
          width={mobile ? 328 : 469}
          straight
          style={{ borderRadius: "24px" }}
        />
      </div>
      <div
        className={cx(
          mobile ? "col-12" : "col-6",
          "d-flex flex-column justify-content-center"
        )}
      >
        <div>
          <div className="mb-4 d-flex align-items-center">
            <H4 className="mr-4 mb-0" text="I'm open to" />
            <Button
              type="primary-default"
              size="big"
              text="Edit"
              onClick={() => setEditMode(true)}
            />
          </div>
          <UserTags
            tags={talent.careerGoal.careerNeeds.map((need) => need.title)}
            className="mr-2 mb-4"
            clickable={false}
          />
        </div>
        <P1 text={talent.careerGoal.pitch} />
      </div>
      {editMode && (
        <EditAboutwModal
          show={editMode}
          hide={() => setEditMode(false)}
          talent={talent}
          setTalent={setTalent}
        />
      )}
    </div>
  );
};

export default About;
