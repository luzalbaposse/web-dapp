import { useMemo } from "react";
import { celo, polygon, celoAlfajores, polygonMumbai } from "wagmi/chains";
import { configureChains, createConfig } from "wagmi";
import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { useWeb3Interactor } from "../use-web3-interactor";

const SUPPORTED_CHAINS_PER_ENV = {
  production: [celo, polygon],
  staging: [celoAlfajores, polygonMumbai],
  development: [celoAlfajores, polygonMumbai]
};

export const useWalletConnectConfigBootstrap = ({ railsContext, userId, walletId }) => {
  const walletConnectConfig = useMemo(() => {
    if (!railsContext) return { ethereumClient: null, projectId: null };
    const chains = SUPPORTED_CHAINS_PER_ENV[railsContext.railsEnv];
    const projectId = railsContext.walletConnectProjectId;
    const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
    const wagmiConfig = createConfig({
      autoConnect: true,
      connectors: w3mConnectors({ projectId, version: 2, chains }),
      publicClient
    });
    const ethereumClient = new EthereumClient(wagmiConfig, chains);
    return { ethereumClient, projectId };
  }, [railsContext]);

  useWeb3Interactor(railsContext.railsEnv, walletConnectConfig, userId, walletId);
  return walletConnectConfig;
};
