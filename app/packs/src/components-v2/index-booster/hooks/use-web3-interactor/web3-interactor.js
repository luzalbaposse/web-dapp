import { noop } from "lodash";
import { switchNetwork, disconnect } from "@wagmi/core";
import { fromHex } from "viem";

export class Web3Interactor {
  constructor() {
    this.wallet = void 0;
    this.env = void 0;
    this.openModal = noop;
    this.closeModal = noop;
  }

  setEnv = env => {
    this.env = env;
  };

  setWallet = wallet => {
    this.wallet = wallet;
  };

  setOpenModalConnect = openModal => {
    this.openModal = openModal;
  };

  setCloseModalConnect = closeModal => {
    this.closeModal = closeModal;
  };

  openModalConnect = () => {
    if (this.isWalletConnected) return;
    this.openModal();
  };

  closeModalConnect = () => {
    this.closeModal();
  };

  isWalletConnected = () => this.wallet?.isConnected && this.wallet?.status === "connected";

  swithNetwork = async chainId => {
    await switchNetwork({
      chainId
    });
  };

  getProvider = () => {
    if (!this.isWalletConnected()) {
      throw new Error("Wallet is not connected");
    }
    return this.wallet?.connector.options.getProvider();
  };

  getChainId = () => {
    if (!this.isWalletConnected()) {
      throw new Error("Wallet is not connected");
    }
    return fromHex(this.wallet?.connector.options.getProvider()?.chainId, "number");
  };

  disconnect = () => {
    disconnect();
  };
}
