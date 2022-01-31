import React, { useContext } from "react";
import Talent from "src/components/icons/Talent";
import Chat from "src/components/icons/Chat";
import Wallet from "src/components/icons/Wallet";
import cx from "classnames";

import { useWindowDimensionsHook } from "src/utils/window";
import ThemeContainer, { ThemeContext } from "src/contexts/ThemeContext";

import BottomNavItem from "./BottomNavItem";

const UnreadMessagesIndicator = () => {
  return (
    <div class="position-relative">
      <span
        class="position-absolute badge border border-light rounded-circle bg-danger p-1"
        style={{ height: 0, width: 0, left: 15, top: -23 }}
      >
        &nbsp;
      </span>
    </div>
  );
};

export const BottomNav = ({
  talentPath,
  portfolioPath,
  messagesPath,
  hasUnreadMessages,
}) => {
  const { height, width } = useWindowDimensionsHook();
  const theme = useContext(ThemeContext);

  if (width >= 992) {
    return null;
  }

  return (
    <nav className={`navbar-bottom-mobile themed-border-top ${theme.mode()}`}>
      <div className="navbar-bottom-menu">
        <div className="navbar-bottom-menu-option">
          <BottomNavItem
            mode={theme.mode()}
            url={talentPath}
            secondaryUrl={"/"}
            routeName="Talent"
            Icon={Talent}
          />
        </div>
        <div className="navbar-bottom-menu-option">
          <BottomNavItem
            mode={theme.mode()}
            url={portfolioPath}
            routeName="Portfolio"
            Icon={Wallet}
          />
        </div>
        <div className="navbar-bottom-menu-option">
          <BottomNavItem
            mode={theme.mode()}
            url={messagesPath}
            routeName="Messages"
            Icon={Chat}
          />
          {hasUnreadMessages && <UnreadMessagesIndicator />}
        </div>
      </div>
    </nav>
  );
};

export default (props, railsContext) => {
  return () => (
    <ThemeContainer {...props}>
      <BottomNav {...props} />
    </ThemeContainer>
  );
};
