import React, { useMemo } from "react";
import { Web3Modal } from "@web3modal/react";
import { TalentThemeProvider, getTheme } from "@talentprotocol/design-system";
import ThemeContainer from "src/contexts/ThemeContext";
import { TopBar } from "src/components/top_bar";
import { useIndexBooster } from "../index-booster";

export const NavbarProxy = props => {
  const { walletConnectConfig } = useIndexBooster({
    railsContext: props.railsContext,
    userId: props.user.id,
    walletId: props.user.walletId
  });
  const MemoedWeb3ModaluseMemo = useMemo(() => {
    return (
      <Web3Modal
        projectId={walletConnectConfig.projectId}
        ethereumClient={walletConnectConfig.ethereumClient}
        themeMode={getTheme().isDarkTheme ? "dark" : "light"}
      />
    );
  }, [walletConnectConfig]);
  return (
    <>
      <TopBar {...props} />
      {MemoedWeb3ModaluseMemo}
    </>
  );
};

export default (props, railsContext) => {
  return () => (
    <ThemeContainer {...props}>
      <TalentThemeProvider>
        <NavbarProxy {...props} railsContext={railsContext} />
      </TalentThemeProvider>
    </ThemeContainer>
  );
};
