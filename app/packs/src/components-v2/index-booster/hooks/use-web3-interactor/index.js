import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import { Web3Interactor } from "./web3-interactor";
import { patch } from "src/utils/requests";

const web3Interactor = new Web3Interactor();

export const useWeb3Interactor = (env, walletConfig, userId, walletId) => {
  const wallet = useAccount();
  const { open, close } = useWeb3Modal();
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.web3Interactor = web3Interactor;
    web3Interactor.setOpenModalConnect(open);
    web3Interactor.setCloseModalConnect(close);
    web3Interactor.setEnv(env);
  }, []);
  useEffect(() => {
    web3Interactor.setWallet(wallet);

    if (wallet.address && userId && walletId != wallet.address.toLowerCase()) {
      patch(`/api/v1/users/${userId}`, {
        wallet_id: wallet.address.toLowerCase()
      }).then(result => {
        if (result.errors || result.error) {
          return;
        }
        window.location.reload();
      });
    }
  }, [wallet, walletConfig]);
  return void 0;
};
