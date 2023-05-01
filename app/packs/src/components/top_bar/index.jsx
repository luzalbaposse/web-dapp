import React, { useState, useEffect, useCallback, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import transakSDK from "@transak/transak-sdk";

import Web3ModalConnect from "../login/Web3ModalConnect";
import { destroy } from "../../utils/requests";

import { OnChain } from "src/onchain";
import { parseAndCommify, chainIdToName } from "src/onchain/utils";

import { useWindowDimensionsHook } from "src/utils/window";

import ThemeContainer, { ThemeContext } from "src/contexts/ThemeContext";
import Notifications from "src/components/notifications";
import UserMenu from "src/components/user_menu";
import Tab from "src/components/design_system/tab";
import Button from "src/components/design_system/button";
import MobileTopBar from "src/components/top_bar/MobileTopBar";
import { Polygon, Celo } from "src/components/icons";
import EarnMenu from "src/components/menus/EarnMenu";

import { H5 } from "src/components/design_system/typography";
import { Container, IconContainer, InnerContainer } from "./styled";
import { Icon, Typography } from "@talentprotocol/design-system";
import SearchDropdown from "./SearchDropdown";

//const WARNING_MESSAGE =
("Token minting is temporarily paused while we are upgrading our smart contracts. This is a temporary warning.");

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

const TransakDone = ({ show, hide }) => (
  <Modal show={show} onHide={hide} centered dialogClassName="remove-background">
    <Modal.Header closeButton>
      <Modal.Title>Thank you for your support</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>
        You have successfully acquired cUSD on the CELO network. It usually takes a couple minutes to finish processing
        and for you to receive your funds, you'll get a confirmation email from transak once you do. After that you're
        ready to start supporting talent!
      </p>
    </Modal.Body>
  </Modal>
);

const newTransak = (width, height, env, apiKey) => {
  const envName = env ? env.toUpperCase() : "STAGING";

  return new transakSDK({
    apiKey: apiKey, // Your API Key
    environment: envName, // STAGING/PRODUCTION
    defaultCryptoCurrency: "CUSD",
    fiatCurrency: "EUR",
    defaultPaymentMethod: "credit_debit_card",
    themeColor: "000000",
    hostURL: window.location.origin,
    widgetHeight: `${height}px`,
    widgetWidth: `${width}px`,
    networks: "celo,polygon",
    cryptoCurrencyList: "CUSD,USDC"
  });
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
  const { height, width } = useWindowDimensionsHook();
  const [transakDone, setTransakDone] = useState(false);
  const [activeTab, setActiveTab] = useState(url.pathname);
  const [chainName, setChainName] = useState("Celo");
  const theme = useContext(ThemeContext);

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(user.walletId);
  };

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.origin}${user.sign_up_path}`);
  };

  const onClickTransak = e => {
    e.preventDefault();

    const _width = width > 450 ? 450 : width;
    const _height = height > 700 ? 700 : height;

    const transak = newTransak(_width, _height, railsContext.contractsEnv, railsContext.transakApiKey);
    transak.init();

    // To get all the events
    transak.on(transak.ALL_EVENTS, data => {
      console.log(data);
    });

    // This will trigger when the user marks payment is made.
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (/*orderData*/) => {
      transak.close();
      setTransakDone(true);
    });
  };

  const signOut = async () => {
    await disconnectWallet();

    destroy(signOutPath).then(() => {
      window.location.replace("/");
    });
  };

  const disconnectWallet = async (/*account*/) => {
    const onChain = new OnChain(railsContext.contractsEnv);

    onChain.disconnect();
  };

  const setupChain = useCallback(
    async (forceConnect = false) => {
      const onChain = new OnChain(railsContext.contractsEnv);

      const account = await onChain.connectedAccount(forceConnect);

      if (account) {
        setAccount(account.toLowerCase());
        setWalletConnected(true);

        await onChain.loadStableToken();
        const balance = await onChain.getStableBalance(true);

        if (balance) {
          setStableBalance(balance);
        }

        const chainId = await onChain.getChainID();
        const chainName = chainIdToName(chainId, railsContext.contractsEnv);
        setChainName(chainName);
      }
    },
    [walletConnected]
  );

  const onWalletConnect = async account => {
    await setupChain(true);

    if (account) {
      setAccount(account.toLowerCase());
    }
  };

  useEffect(() => {
    setupChain();
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
        onClickTransak={onClickTransak}
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
    <div className="navbar-container">
      <nav className={`navbar ${theme.mode()} d-flex justify-content-between align-items-center`}>
        <TransakDone show={transakDone} hide={() => setTransakDone(false)} />
        <a href="/" className="mr-6">
          <H5 bold className="mb-0">
            Talent Protocol
          </H5>
        </a>
        <div className="d-flex align-items-center">
          <Tab href="/talent" text="Explore" type="white" active={activeTab.includes("/talent")} className="mr-4" />
          <Tab href="/portfolio" text="Portfolio" type="white" active={activeTab === "/portfolio"} className="mr-4" />
          <Tab href="/network" text="Network" type="white" active={activeTab === "/network"} className="mr-4" />
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
          <EarnMenu />
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
            onClickTransak={onClickTransak}
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
