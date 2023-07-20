import React from "react";
import { H4, P1 } from "src/components/design_system/typography";
import { useWindowDimensionsHook } from "src/utils/window";
import UserTags from "src/components/talent/UserTags";
import cx from "classnames";

const About = ({ className, profile }) => {
  const { mobile } = useWindowDimensionsHook();
  const careerGoal = profile?.career_goal;

  return (
    <div className={cx(className, mobile ? "" : "d-flex")}>
      <div className={cx(mobile ? "col-12" : "col-6", "d-flex flex-column justify-content-center")}>
        <div>
          <div className="mb-4 d-flex align-items-center">
            <H4 className="mr-4 mb-0" text="I'm open to" />
          </div>
          <UserTags
            tags={careerGoal?.career_needs.map(need => need.title)}
            className="mr-2 mb-4"
            clickable={false}
            talent_id={"show-about"}
          />
        </div>
        <P1 text={careerGoal?.pitch} />
      </div>
    </div>
  );
};

export default About;
