import React, { useContext } from "react";
import ThemeContainer, { ThemeContext } from "src/contexts/ThemeContext";
import { P2 } from "src/components/design_system/typography";
import Divider from "src/components/design_system/other/Divider";

const SubdomainFooter = props => {
  return (
    <div>
      <Divider className="my-lg-6 mb-5 mt-0" />
      <div className="footer px-3 px-lg-0">
        <div className="my-4 d-flex flex-lg-row flex-column justify-content-between">
          <P2
            className="text-primary-03 mr-4 mb-2"
            text={`Copyright © ${new Date().getFullYear()} ${props.displayName}`}
          />
          <P2 className="text-primary-03 mb-lg-6 mb-5 mr-4">
            Create a profile like this on{" "}
            <a
              href={`https://beta.talentprotocol.com/join/${props.username}`}
              target="_blank"
              className="font-weight-bold text-primary-01"
            >
              Talent Protocol
            </a>
          </P2>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line no-unused-vars
export default (props, _railsContext) => {
  return () => (
    <ThemeContainer {...props}>
      <SubdomainFooter {...props} />
    </ThemeContainer>
  );
};
