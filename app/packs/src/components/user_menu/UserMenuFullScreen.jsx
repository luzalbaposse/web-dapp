import React from "react";
import Modal from "react-bootstrap/Modal";

import TalentProfilePicture from "src/components/talent/TalentProfilePicture";
import Button from "src/components/design_system/button";
import { ArrowLeft, ArrowRight } from "src/components/icons";
import { P1, P2 } from "src/components/design_system/typography";

const UserMenuFullScreen = ({
  show,
  hide,
  mode,
  user,
  connectedButton,
  showConnectButton,
  walletConnectButton,
  signOut
}) => (
  <Modal show={show} fullscreen="true" onHide={hide} dialogClassName={"m-0 mh-100 mw-100"} backdrop={false}>
    <Modal.Body className="d-flex flex-column">
      <div className="d-flex flex-row justify-content-between w-100 pt-2">
        <Button onClick={hide} type="white-ghost" mode={mode}>
          <ArrowLeft color="currentColor" />
        </Button>
      </div>
      <div className="d-flex flex-row w-100 align-items-center my-2">
        <TalentProfilePicture src={user.profilePictureUrl} userId={user.id} height={48} className="mr-2" />
        <P2 className="text-black" bold text={`@${user.username}`} />
      </div>
      <div className="d-flex flex-column w-100 mb-3">
        {!showConnectButton() && connectedButton()}
        {showConnectButton() && walletConnectButton()}
      </div>
      <div className={`divider ${mode}`}></div>
      <Button
        onClick={() => (window.location.href = `/u/${user.username}`)}
        type="white-ghost"
        mode={mode}
        className="d-flex flex-row justify-content-between mt-3"
      >
        <P1 className="text-black" bold text="My Profile" />
        <ArrowRight color="currentColor" />
      </Button>
      <Button
        onClick={() => (window.location.href = `/talent`)}
        type="white-ghost"
        mode={mode}
        className="d-flex flex-row justify-content-between mt-3"
      >
        <P1 className="text-black" bold text="Explore" />
        <ArrowRight color="currentColor" />
      </Button>
      <Button
        onClick={() => (window.location.href = `/messages`)}
        type="white-ghost"
        mode={mode}
        className="d-flex flex-row justify-content-between mt-3"
      >
        <P1 className="text-black" bold text="Messages" />
        <ArrowRight color="currentColor" />
      </Button>
      <Button
        onClick={() => (window.location.href = `/wallet`)}
        type="white-ghost"
        mode={mode}
        className="d-flex flex-row justify-content-between mt-3"
      >
        <P1 className="text-black" bold text="Wallet" />
        <ArrowRight color="currentColor" />
      </Button>
      <Button
        onClick={() => (window.location.href = `/connection`)}
        type="white-ghost"
        mode={mode}
        className="d-flex flex-row justify-content-between mt-3"
      >
        <P1 className="text-black" bold text="Connections" />
        <ArrowRight color="currentColor" />
      </Button>
      <Button
        onClick={() => (window.location.href = `/quests`)}
        type="white-ghost"
        mode={mode}
        className="d-flex flex-row justify-content-between my-3"
      >
        <P1 className="text-black" bold text="Quests" />
        <ArrowRight color="currentColor" />
      </Button>
      <div className={`divider ${mode}`}></div>
      <Button
        onClick={() => (window.location.href = `/u/${user.username}/account_settings`)}
        type="white-ghost"
        mode={mode}
        className="d-flex flex-row justify-content-between mb-3 mt-1"
      >
        <P1 className="text-black" bold text="Settings" />
        <ArrowRight color="currentColor" />
      </Button>
      <Button onClick={signOut} type="white-subtle" mode={mode}>
        <P1 className="text-black" bold text="Sign out" />
      </Button>
    </Modal.Body>
  </Modal>
);

export default UserMenuFullScreen;
