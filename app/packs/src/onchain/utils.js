import { ethers } from "ethers";
import Addresses from "./addresses.json";

export const parseAndCommify = (value, nrOfDecimals = 2) => {
  return ethers.utils.commify(parseFloat(value).toFixed(nrOfDecimals));
};

export const parseStableAmount = (amount, decimals = 18) => {
  try {
    const balanceFormatted = ethers.utils.formatUnits(`${amount}`, decimals);

    return balanceFormatted;
  } catch (error) {
    console.log(error);
    return "0.0";
  }
};

export const ipfsToURL = ipfsAddress => {
  if (ipfsAddress.includes("http")) {
    return ipfsAddress;
  }
  return "https://ipfs.io/" + ipfsAddress.replace("://", "/");
};

export const chainIdToName = (chainId, env) => {
  if (Addresses[env][chainId]) {
    return Addresses[env][chainId].chainName;
  }
};

export const chainNameToId = (chainName, env) => {
  const chainId = Object.keys(Addresses[env]).filter(item => Addresses[env][item].chainName == chainName);

  if (chainId.length == 0) {
    return undefined;
  }

  return Addresses[env][chainId[0]].chainId;
};

export const getAllChainOptions = env => {
  return Object.keys(Addresses[env])
    .filter(item => item != "sponsorshipTokens")
    .map(chain => ({
      name: Addresses[env][chain].chainName,
      id: Addresses[env][chain].chainId
    }));
};

export const CHAIN_RPC_URLS = {
  1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  137: "https://polygon.llamarpc.com",
  42220: "https://forno.celo.org",
  44787: "https://alfajores-forno.celo-testnet.org",
  80001: "https://matic-mumbai.chainstacklabs.com"
};
