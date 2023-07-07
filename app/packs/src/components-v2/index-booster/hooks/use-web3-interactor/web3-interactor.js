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

  isWalletConnected = () => this.wallet?.isConnected && this.wallet?.status === "connected" && this.wallet?.connector;

  switchNetwork = async chainId =>
    await switchNetwork({
      chainId
    });

  getProvider = async () => {
    if (!this.isWalletConnected()) {
      throw new Error("Wallet is not connected");
    }

    if (this.wallet?.connector.options?.getProvider) {
      return this.wallet?.connector.options?.getProvider();
    } else {
      return await this.wallet?.connector?.getProvider();
    }
  };

  getChainId = async () => {
    if (!this.isWalletConnected()) {
      throw new Error("Wallet is not connected");
    }

    const provider = await this.getProvider();

    return fromHex(provider?.chainId, "number");
  };

  disconnect = () => {
    disconnect();
  };
}
