import React, { useEffect, useState } from "react";
import Divider from "src/components/design_system/other/Divider";
import { Spinner } from "@talentprotocol/design-system";
import { loggedInUserStore } from "src/contexts/state";
import { useProfileFetcher } from "src/hooks/use-profile-fetcher";

import ThemeContainer from "src/contexts/ThemeContext";
import { useWindowDimensionsHook } from "src/utils/window";
import Button from "src/components/design_system/button";

import Poaps from "./web3/poaps";
import Nfts from "./web3/nfts";
import Tokens from "./web3/tokens";
import Overview from "./overview";
import About from "./About";
import Journey from "./Journey";
import Network from "./Network";
import Token from "./Token";
import LaunchToken from "./LaunchToken";
import ApplyToLaunchToken from "./ApplyToLaunchToken";
import Perks from "./Perks";

const Show = ({ railsContext, withPersonaRequest, profileSubdomain }) => {
  const [selectedSection, setSelectedSection] = useState("");
  const [showLastDivider, setShowLastDivider] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const talentTokenPrice = 0.1;
  const [isLoading, setIsLoading] = useState(true);

  const { profile, fetchProfile, setProfile } = useProfileFetcher();
  const { currentUser, fetchCurrentUser } = loggedInUserStore();

  const user = profile?.user;
  const talentToken = profile?.talent_token;
  const canUpdate = user?.uuid == currentUser?.id && !previewMode;

  const { mobile } = useWindowDimensionsHook();

  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser();
    }
    if (typeof window === "undefined") return;
    setTimeout(() => {
      setSelectedSection(window.location.hash);
    }, 800);
  }, []);

  useEffect(() => {
    if (profileSubdomain) {
      fetchProfile(window.location.hostname).then(() => setIsLoading(false));
      return;
    }
    if (typeof window === "undefined") return;
    const username = window.location.href.split("/u/")[1].split("/profile")[0];
    fetchProfile(username).then(() => setIsLoading(false));
  }, [fetchProfile]);

  const changeSection = newSection => {
    setSelectedSection(newSection);
  };

  const buttonType = section => {
    if (section == selectedSection) {
      return "white-default";
    } else if (!selectedSection && section == "#about") {
      return "white-default";
    } else {
      return "white-ghost";
    }
  };

  useEffect(() => {
    if (selectedSection) {
      const element = document.getElementById(selectedSection);
      if (!element) return;
      const scrollDiv = element.offsetTop;
      window.scrollTo({ top: scrollDiv - 70, behavior: "smooth" });
      window.history.replaceState({}, document.title, `${user.username}${selectedSection}`);
    }
  }, [selectedSection]);

  const onWalletConnect = account => {
    setProfile(prev => ({
      ...prev,
      user: {
        ...prev.user,
        wallet_id: account
      }
    }));
  };

  const getCurrentTokenSection = () => {
    if ((user?.profile_type == "approved" || user?.profile_type == "talent") && !talentToken?.contract_id) {
      return LaunchToken;
    }

    if (user?.profile_type != "approved" && user?.profile_type != "talent") {
      return ApplyToLaunchToken;
    }

    return Token;
  };

  const CurrentTokenSection = getCurrentTokenSection();

  if (isLoading || !profile) {
    return (
      <div
        className="d-flex flex-column align-items-center align-content-center"
        style={{ minHeight: "400px", marginTop: "200px" }}
      >
        <Spinner />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column lg-h-100 p-0">
      <Overview
        className="mb-2"
        profile={profile}
        setProfile={setProfile}
        currentUserId={currentUser?.id}
        currentUserAdmin={currentUser?.admin}
        currentUserModerator={currentUser?.moderator}
        railsContext={railsContext}
        changeSection={changeSection}
        talentTokenPrice={talentTokenPrice}
        canUpdate={canUpdate}
        previewMode={previewMode}
        setPreviewMode={setPreviewMode}
        isCurrentUserImpersonated={currentUser?.impersonated}
        withPersonaRequest={withPersonaRequest}
        profileSubdomain={profileSubdomain}
      />
      <Divider className="my-6" />
      <div className="d-flex justify-content-lg-center overflow-x-scroll mx-4">
        <Button className="mr-2" type={buttonType("#about")} text="About" onClick={() => changeSection("#about")} />
        <Button
          className="mr-2"
          type={buttonType("#journey")}
          text="Journey"
          onClick={() => changeSection("#journey")}
        />
        {(talentToken.contract_id || canUpdate) && (
          <Button
            className="mr-2"
            type={buttonType("#token")}
            text={talentToken.ticker ? `$${talentToken.ticker}` : "Token"}
            onClick={() => changeSection("#token")}
          />
        )}
        <Button
          className="mr-2"
          type={buttonType("#network")}
          text="Network"
          onClick={() => changeSection("#network")}
        />
        {((user.wallet_id && user.visible_digital_collectibles) || canUpdate) && (
          <Button
            type={buttonType("#digital-collectibles")}
            text={"Digital Collectibles"}
            onClick={() => changeSection("#digital-collectibles")}
          />
        )}
      </div>
      <div className="my-7 w-100 col-12" id="#about">
        <About profile={profile} setProfile={setProfile} canUpdate={canUpdate} previewMode={previewMode} />
      </div>
      {mobile && <Divider />}
      <div className="my-7 w-100 col-12" id="#journey">
        <Journey talent={profile} setTalent={setProfile} canUpdate={canUpdate} />
      </div>
      <div className="my-7 w-100" id={"#token"}>
        {talentToken.contractId && <Perks talent={profile} canUpdate={canUpdate} />}
        <CurrentTokenSection
          talent={profile}
          talentTokenPrice={talentTokenPrice}
          setProfile={setProfile}
          railsContext={railsContext}
          waitingApproval={user.profile_type == "waiting_for_approval"}
          canUpdate={canUpdate}
        />
      </div>
      <div className="my-7 w-100 col-12" id="#network">
        <Network userId={user.uuid} talent={profile} canUpdate={canUpdate} />
      </div>
      {(showLastDivider || canUpdate) && <Divider className="my-6" />}
      <div className="mt-7 w-100" id="#digital-collectibles">
        <Poaps
          user={user}
          canUpdate={canUpdate}
          setShowLastDivider={setShowLastDivider}
          setTalent={setProfile}
          railsContext={railsContext}
          onWalletConnect={onWalletConnect}
        />
        <Nfts
          user={user}
          canUpdate={canUpdate}
          setShowLastDivider={setShowLastDivider}
          setTalent={setProfile}
          railsContext={railsContext}
          onWalletConnect={onWalletConnect}
        />
        <Tokens
          user={user}
          canUpdate={canUpdate}
          setShowLastDivider={setShowLastDivider}
          setTalent={setProfile}
          railsContext={railsContext}
          onWalletConnect={onWalletConnect}
        />
      </div>
    </div>
  );
};

export default (props, railsContext) => {
  return () => (
    <ThemeContainer>
      <Show {...props} railsContext={railsContext} />
    </ThemeContainer>
  );
};
