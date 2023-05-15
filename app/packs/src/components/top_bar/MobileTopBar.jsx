import React, { useState } from "react";
import { H5 } from "src/components/design_system/typography";
import TalentProfilePicture from "src/components/talent/TalentProfilePicture";
import Notifications from "src/components/notifications";
import UserMenuFullScreen from "src/components/user_menu/UserMenuFullScreen";
import Button from "src/components/design_system/button";
import SearchDropdown from "./SearchDropdown";

const MobileUserMenu = ({
  mode,
  user,
  toggleTheme,
  connectedButton,
  showConnectButton,
  walletConnectButton,
  onClickTransak,
  copyCodeToClipboard,
  inviteNumbers,
  signOut,
  children
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const openTransak = e => {
    setShowMenu(false);
    onClickTransak(e);
  };

  return (
    <div className="navbar-container">
      <nav className={`navbar ${mode} justify-content-between`}>
        <a href="/">
          <H5 bold className="mb-0">
            Talent Protocol
          </H5>
        </a>

        <div className="d-flex flex-row" style={{ height: 26 }}>
          <SearchDropdown className="mr-1 talent-button white-ghost-button light none-size-button" />
          <Notifications mode={mode} hideBackground={true} />
          <Button onClick={() => setShowMenu(true)} type="white-ghost" mode={mode} className="ml-2" size="none">
            <TalentProfilePicture src={user.profilePictureUrl} height={20} userId={user.id} />
          </Button>
          <UserMenuFullScreen
            show={showMenu}
            hide={() => setShowMenu(false)}
            toggleTheme={toggleTheme}
            mode={mode}
            user={user}
            connectedButton={connectedButton}
            showConnectButton={showConnectButton}
            walletConnectButton={walletConnectButton}
            onClickTransak={openTransak}
            copyCodeToClipboard={copyCodeToClipboard}
            inviteNumbers={inviteNumbers}
            signOut={signOut}
          />
        </div>
      </nav>
      {children}
    </div>
  );
};

export default MobileUserMenu;
