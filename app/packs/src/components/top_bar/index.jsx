import { Icon, Typography, buildColor } from "@talentprotocol/design-system";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { Container, IconContainer, InnerContainer } from "./styled";
import { destroy } from "../../utils/requests";
import { H5 } from "src/components/design_system/typography";
import { OnChain } from "src/onchain";
import { parseAndCommify, chainIdToName } from "src/onchain/utils";
import { Polygon, Celo } from "src/components/icons";
import { useWindowDimensionsHook } from "src/utils/window";
import Button from "src/components/design_system/button";
import ExploreDropdown from "./ExploreDropdown";
import MobileTopBar from "src/components/top_bar/MobileTopBar";
import Notifications from "src/components/notifications";
import SearchDropdown from "./SearchDropdown";
import Tab from "src/components/design_system/tab";
import ThemeContainer, { ThemeContext } from "src/contexts/ThemeContext";
import UserMenu from "src/components/user_menu";
import Web3ModalConnect from "../login/Web3ModalConnect";
import "animate.css";

const NotificationsIndicator = () => {
  return (
    <div className="position-relative">
      <span
        className="position-absolute badge border border-light rounded-circle bg-danger p-1"
        style={{ height: 0, width: 0, left: -23, top: -10 }}
      >
        &nbsp;
      </span>
    </div>
  );
};

export const TopBar = ({
  user,
  signOutPath,
  railsContext,
  hasUnreadMessages,
  pendingNetworkRequest,
  isUserImpersonated,
  impersonatedUsername,
  stopImpersonationPath
}) => {
  const sessionItem = railsContext.disableSmartContractsMessage.replace(" ", "-").substring(0, 3);
  const [isWarningEnabled, setIsWarningEnabled] = useState(() => {
    if (railsContext.disableSmartContracts != "true") {
      return false;
    }
    if (typeof window !== "undefined") {
      const hasDisabledWarning = sessionStorage.getItem(sessionItem);
      if (!hasDisabledWarning) return true;
      return false;
    }
    return false;
  });
  const url = new URL(document.location);
  const [walletConnected, setWalletConnected] = useState(false);
  const [stableBalance, setStableBalance] = useState(0);
  const [account, setAccount] = useState("");
  const { width } = useWindowDimensionsHook();
  const [activeTab, setActiveTab] = useState(url.pathname);
  const [chainName, setChainName] = useState("Celo");
  const theme = useContext(ThemeContext);

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(user.walletId);
  };

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.origin}${user.sign_up_path}`);
  };

  const signOut = async () => {
    window.web3Interactor.disconnect();
    destroy(signOutPath).then(() => {
      window.location.replace("/");
    });
  };

  const setupChain = useCallback(
    async (errorCallback = () => null) => {
      try {
        const onChain = new OnChain(railsContext.contractsEnv);

        const account = onChain.connectedAccount();

        if (account) {
          setAccount(account.toLowerCase());
          setWalletConnected(true);

          const balance = await onChain.getStableBalance(true);

          if (balance) {
            setStableBalance(balance);
          }

          const chainId = await onChain.getChainID();
          const chainName = chainIdToName(chainId, railsContext.contractsEnv);
          setChainName(chainName);
        }
      } catch (e) {
        console.log(e);
        errorCallback();
      }
    },
    [walletConnected]
  );

  const onWalletConnect = async account => {
    await setupChain();

    if (account) {
      setAccount(account.toLowerCase());
    }
  };

  useEffect(() => {
    let maxTries = 5;
    const errorCallback = () => {
      setTimeout(() => {
        if (!!maxTries) {
          setupChain(errorCallback);
          maxTries--;
        }
        return;
      }, 500);
    };
    setupChain(errorCallback);
  }, []);

  useEffect(() => {
    setActiveTab(url.pathname);
  }, [url.pathname]);

  const showConnectButton = () => {
    if (!account || !user.walletId) {
      return true;
    } else if (account != user.walletId) {
      return true;
    } else {
      return false;
    }
  };

  const inviteNumbers = () => {
    if (!user.invitesLeft) {
      return "";
    }
    if (!user.totalInvites) {
      return `${user.invitesLeft}/*`;
    } else {
      return `${user.invitesLeft}/${user.totalInvites}`;
    }
  };

  const toggleTheme = () => {
    theme.toggleTheme();
  };

  const stableCoinName = () => {
    if (chainName == "Celo") {
      return "cUSD";
    } else {
      return "USDC";
    }
  };

  const stableCoinIcon = () => {
    return chainName == "Polygon" ? <Polygon className="mr-1" /> : <Celo className="mr-1" />;
  };

  const connectedButton = (extraClasses = "") => (
    <Button
      onClick={copyAddressToClipboard}
      type="white-subtle"
      size="normal"
      mode={theme.mode()}
      className={`${extraClasses} font-weight-normal p-1 pl-2 navbar-wallet-button-radius`}
    >
      {parseAndCommify(stableBalance)} <span className="text-primary-04">{stableCoinName()}</span>{" "}
      <span className="text-primary-01 background-bg-01 py-1 px-2 navbar-wallet-display-radius medium">
        {stableCoinIcon()} {user.displayWalletId}
      </span>
    </Button>
  );

  const userHasInvitesLeft = user.invitesLeft > 0;

  const walletConnectButton = () => (
    <Web3ModalConnect userId={user.id} onConnect={onWalletConnect} railsContext={railsContext} mode={theme.mode()} />
  );

  const stopImpersonation = () => {
    destroy(stopImpersonationPath).then(() => {
      window.location.replace("/");
    });
  };

  if (width < 992) {
    return (
      <MobileTopBar
        mode={theme.mode()}
        user={user}
        toggleTheme={toggleTheme}
        showConnectButton={showConnectButton}
        connectedButton={connectedButton}
        walletConnectButton={walletConnectButton}
        copyCodeToClipboard={copyCodeToClipboard}
        inviteNumbers={inviteNumbers()}
        userHasInvitesLeft={userHasInvitesLeft}
        signOut={signOut}
      >
        {isWarningEnabled && (
          <Container>
            <InnerContainer>
              <Typography specs={{ variant: "p3", type: "bold" }} color="primary01">
                Alert:
              </Typography>
              <Typography specs={{ variant: "p3", type: "regular" }} color="primary02">
                {railsContext.disableSmartContractsMessage}
              </Typography>
              <IconContainer
                onClick={() => {
                  setIsWarningEnabled(false);
                  sessionStorage.setItem(sessionItem, "true");
                }}
              >
                <Icon name="remove" color="primary" size={12} />
              </IconContainer>
            </InnerContainer>
          </Container>
        )}
      </MobileTopBar>
    );
  }

  return (
    <div className="navbar-container" style={{ borderBottom: `1px solid ${buildColor("surfaceHover02")}` }}>
      <nav className={`navbar ${theme.mode()} d-flex justify-content-between align-items-center`}>
        <a href="/" className="mr-6">
          <H5 bold className="mb-0">
            Talent Protocol
          </H5>
        </a>
        <div className="d-flex align-items-center">
          <ExploreDropdown active={activeTab.includes("/talent") || activeTab.includes("/collectives")} />
          <Tab href="/wallet" text="Wallet" type="white" active={activeTab === "/wallet"} className="mr-4" />
          <Tab
            href="/connection"
            text="Connections"
            type="white"
            active={activeTab === "/connection"}
            className="mr-4"
          />
          {pendingNetworkRequest && <NotificationsIndicator />}
          <Tab
            href="/messages"
            text="Messages"
            type="white"
            active={activeTab === "/messages"}
            className="mr-4"
            disabled={isUserImpersonated}
          />
          {hasUnreadMessages && <NotificationsIndicator />}
          <Tab href="/quests" text="Quests" type="white" active={activeTab === "/quests"} className="mr-4" />
        </div>
        <div className="d-flex" style={{ height: 34 }}>
          {isUserImpersonated && (
            <Button onClick={stopImpersonation} type="white-subtle" className="mr-2">
              Stop Impersonation {impersonatedUsername}
            </Button>
          )}
          {!showConnectButton() && connectedButton("mr-2")}
          {showConnectButton() && walletConnectButton()}
          <UserMenu
            user={user}
            copyCodeToClipboard={copyCodeToClipboard}
            toggleTheme={toggleTheme}
            mode={theme.mode()}
            userHasInvitesLeft={userHasInvitesLeft}
            inviteNumbers={inviteNumbers}
            signOut={signOut}
          />
          <SearchDropdown className="talent-button white-subtle-button" />
          <Notifications mode={theme.mode()} />
        </div>
      </nav>
      {isWarningEnabled && (
        <Container>
          <InnerContainer>
            <Typography specs={{ variant: "p3", type: "bold" }} color="primary01">
              Alert:
            </Typography>
            <Typography specs={{ variant: "p3", type: "regular" }} color="primary02">
              {railsContext.disableSmartContractsMessage}
            </Typography>
            <IconContainer
              onClick={() => {
                setIsWarningEnabled(false);
                sessionStorage.setItem(sessionItem, "true");
              }}
            >
              <Icon name="remove" color="primary01" size={12} />
            </IconContainer>
          </InnerContainer>
        </Container>
      )}
    </div>
  );
};

export default (props, railsContext) => {
  return () => (
    <ThemeContainer {...props}>
      <TopBar {...props} railsContext={railsContext} />
    </ThemeContainer>
  );
};
