import React from "react";
import ThemeContainer from "src/contexts/ThemeContext";
import { H5 } from "src/components/design_system/typography";
import { TalentThemeProvider, buildColor, Button } from "@talentprotocol/design-system";

export const LoggedOutTopBar = ({}) => {
  return (
    <div className="navbar-container" style={{ borderBottom: `1px solid ${buildColor("surfaceHover02")}` }}>
      <nav className={`navbar d-flex`}>
        <a href="/" style={{ flexGrow: 1 }}>
          <H5 bold className="mb-0">
            Talent Protocol
          </H5>
        </a>
        <div className="d-flex" style={{ gap: "4px" }}>
          <Button hierarchy="primary" size="small" href="/join" text="Sign up" />
          <Button hierarchy="secondary" size="small" href="/" text="Sign in" />
        </div>
      </nav>
    </div>
  );
};

export default (props, railsContext) => {
  return () => (
    <TalentThemeProvider>
      <ThemeContainer {...props}>
        <LoggedOutTopBar {...props} railsContext={railsContext} />
      </ThemeContainer>
    </TalentThemeProvider>
  );
};
