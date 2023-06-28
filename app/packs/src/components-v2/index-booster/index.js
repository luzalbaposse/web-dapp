import { useWalletConnectConfigBootstrap } from "./hooks/use-wallet-connect-config-bootstrap";

export const useIndexBooster = ({ railsContext, userId, walletId }) => {
  const walletConnectConfig = useWalletConnectConfigBootstrap({ railsContext, userId, walletId });
  return { walletConnectConfig };
};
