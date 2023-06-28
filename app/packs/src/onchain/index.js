import React from "react";
import { newKit, CeloContract } from "@celo/contractkit";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { waitForTransaction } from "wagmi/actions";
import TalentToken from "../abis/recent/TalentToken.json";
import Staking from "../abis/recent/Staking.json";
// import TalentFactory from "../abis/recent/TalentFactory.json";
import TalentFactoryV3 from "../abis/recent/TalentFactoryV3.json";
import StableToken from "../abis/recent/StableToken.json";
import CommunityUser from "../abis/recent/CommunityUser.json";
import TalentSponsorship from "../abis/TalentSponsorship.json";
import Addresses from "./addresses.json";
import { ipfsToURL } from "./utils";
import { externalGet } from "src/utils/requests";
import { getWalletClient, getPublicClient } from "@wagmi/core";
import { formatUnits, parseUnits } from "viem";
import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";

class OnChain {
  constructor(env) {
    this.account = null;
    this.env = env || "development";
  }

  getChainID() {
    return window.web3Interactor.getChainId();
  }

  connectedAccount() {
    if (!window.web3Interactor?.isWalletConnected()) return;
    this.account = window.web3Interactor.wallet.address;
    return window.web3Interactor.wallet.address;
  }

  async readFromContract({ abi, address }, functionName, args = []) {
    const chainId = window.web3Interactor.getChainId();

    const client = await getPublicClient({
      chainId: chainId
    });

    return await client.readContract({
      abi,
      address,
      functionName,
      args
    });
  }

  async writeToContract({ abi, address }, functionName, args = []) {
    const account = this.connectedAccount();
    if (!account) {
      return;
    }

    const chainId = window.web3Interactor.getChainId();

    const walletClient = await getWalletClient({
      chainId
    });

    const client = await getPublicClient({
      chainId
    });

    const { request } = await client.simulateContract({
      abi,
      address,
      functionName,
      account,
      args
    });

    const hash = await walletClient.writeContract(request);

    if (!hash) {
      return false;
    }

    return { hash, chainId, client, walletClient };
  }

  // NO LONGER USED WITH VIRTUAL WALLET => WILL BE DELETED
  getEnvBlockExplorerUrls(chainId = 42220) {
    if (Addresses[this.env][chainId]) {
      return Addresses[this.env][chainId]["paramsForMetamask"]["blockExplorerUrls"][0];
    } else {
      return "/";
    }
  }

  async switchChain(chainId = 42220) {
    await window.web3Interactor.swithNetwork(chainId);
  }

  async recognizedChain() {
    if (Addresses[this.env][window.web3Interactor.getChainId()]) {
      return true;
    } else {
      return false;
    }
  }

  retrieveAccount() {
    if (window.web3Interactor?.isWalletConnected()) {
      this.account = window.web3Interactor.wallet.address;
      return true;
    }
    return false;
  }

  factoryConfig() {
    const chainId = window.web3Interactor.getChainId();

    return {
      abi: TalentFactoryV3.abi,
      address: Addresses[this.env][chainId]["factory"]
    };
  }

  async stableConfig() {
    const chainId = window.web3Interactor.getChainId();
    let address = "";
    if (!Addresses[this.env][chainId]["stableAddress"]) {
      const celoKit = newKit(Addresses[this.env][chainId]["rpcURL"]);
      address = await celoKit.registry.addressFor(CeloContract.StableToken);
    } else {
      address = Addresses[this.env][chainId]["stableAddress"];
    }

    return {
      abi: StableToken.abi,
      address
    };
  }

  stakingConfig() {
    const chainId = window.web3Interactor.getChainId();

    return {
      abi: Staking.abi,
      address: Addresses[this.env][chainId]["staking"]
    };
  }

  sponsorshipConfig() {
    const chainId = window.web3Interactor.getChainId();

    return {
      abi: TalentSponsorship.abi,
      address: Addresses[this.env][chainId]["sponsorship"]
    };
  }

  talentTokenConfig(address) {
    return {
      abi: TalentToken.abi,
      address
    };
  }

  stableDecimals() {
    const chainId = window.web3Interactor.getChainId();
    return Addresses[this.env][chainId]["stableDecimals"];
  }

  // CONTRACT INTERACTION

  sponsorshipTokenOptions() {
    return Addresses[this.env]["sponsorshipTokens"];
  }

  async getTokenBalanceERC20(address, decimals) {
    try {
      if ((await this.recognizedChain()) && this.retrieveAccount()) {
        const account = this.connectedAccount();

        const balance = await this.readFromContract(
          {
            abi: StableToken.abi,
            address
          },
          "balanceOf",
          [account]
        );
        const balanceFormatted = formatUnits(balance, decimals);

        return balanceFormatted;
      } else {
        return "0.0";
      }
    } catch (error) {
      console.log(error);
      return "0.0";
    }
  }

  async getStableBalanceERC20() {
    try {
      if ((await this.recognizedChain()) && this.retrieveAccount()) {
        const account = this.connectedAccount();

        const balance = await this.readFromContract(await this.stableConfig(), "balanceOf", [account]);
        const decimals = await this.readFromContract(await this.stableConfig(), "decimals");
        const balanceFormatted = formatUnits(balance, decimals);

        return balanceFormatted;
      } else {
        return "0.0";
      }
    } catch (error) {
      console.log(error);
      return "0.0";
    }
  }

  async createTalent(name, symbol) {
    const { hash } = await this.writeToContract(this.factoryConfig(), "createTalent", [this.account, name, symbol]);

    if (!hash) {
      return false;
    }

    const receipt = await waitForTransaction({ hash });

    const event = receipt.events?.find(e => {
      return e.event === "TalentCreated";
    });

    return event;
  }

  async calculateEstimatedReturns(token, _account) {
    const account = this.connectedAccount();
    if (!account && !_account) {
      return;
    }

    const timestamp = dayjs().unix();

    const result = await this.readFromContract(this.stakingConfig(), "calculateEstimatedReturns", [
      _account || account,
      token,
      timestamp
    ]);

    return result;
  }

  async createStake(token, _amount) {
    const amount = parseUnits(_amount, this.stableDecimals());

    const { hash } = await this.writeToContract(this.stakingConfig(), "stakeStable", [token, amount]);

    try {
      await waitForTransaction({ hash });
    } catch (err) {
      console.error(err);
      toast.error(
        <ToastBody
          heading="Transaction Error"
          body="The transaction couldn't be processed. Try later or contact us if the problem persists."
        />
      );
    }

    return hash;
  }

  async claimRewards(token) {
    const { hash } = await this.writeToContract(this.stakingConfig(), "claimRewards", [token]);

    try {
      await waitForTransaction({ hash });
    } catch (err) {
      console.error(err);
      toast.error(
        <ToastBody
          heading="Transaction Error"
          body="The transaction couldn't be processed. Try later or contact us if the problem persists."
        />
      );
    }

    return hash;
  }

  async approveStable(_amount) {
    const amount = parseUnits(_amount, this.stableDecimals());
    const config = await this.stableConfig();
    const stakingConfig = await this.stakingConfig();

    const { hash } = await this.writeToContract(config, "approve", [stakingConfig.address, amount]);

    try {
      await waitForTransaction({ hash });
    } catch (err) {
      console.error(err);
      toast.error(
        <ToastBody
          heading="Transaction Error"
          body="The transaction couldn't be processed. Try later or contact us if the problem persists."
        />
      );
    }

    return hash;
  }

  async getStableAllowance(formatted = false) {
    const account = this.connectedAccount();
    if (!account) {
      return;
    }

    const result = await this.readFromContract(await this.stableConfig(), "allowance", [
      account,
      this.stakingConfig().address
    ]);

    if (formatted) {
      return formatUnits(result, this.stableDecimals());
    } else {
      return result;
    }
  }

  async createSponsorship(talentAddress, tokenAddress, tokenDecimals, _amount) {
    const amount = parseUnits(_amount, tokenDecimals);

    const { hash, client } = await this.writeToContract(this.sponsorshipConfig(), "sponsor", [
      talentAddress,
      amount,
      tokenAddress
    ]);

    try {
      await waitForTransaction({ hash });
    } catch (err) {
      console.error(err);
      toast.error(
        <ToastBody
          heading="Transaction Error"
          body="The transaction couldn't be processed. Try later or contact us if the problem persists."
        />
      );
    }

    if (!hash) {
      return false;
    }

    const transaction = await client.getTransactionReceipt({
      hash
    });

    return transaction;
  }

  async claimSponsorship(sponsor, tokenAddress) {
    const { hash, client } = await this.writeToContract(this.sponsorshipConfig(), "withdrawToken", [
      sponsor,
      tokenAddress
    ]);

    try {
      await waitForTransaction({ hash });
    } catch (err) {
      console.error(err);
      toast.error(
        <ToastBody
          heading="Transaction Error"
          body="The transaction couldn't be processed. Try later or contact us if the problem persists."
        />
      );
    }

    if (!hash) {
      return false;
    }

    const transaction = await client.getTransactionReceipt({
      hash
    });

    return transaction;
  }

  async revokeSponsorship(talentAddress, tokenAddress) {
    const { hash, client } = await this.writeToContract(this.sponsorshipConfig(), "revokeSponsor", [
      talentAddress,
      tokenAddress
    ]);

    try {
      await waitForTransaction({ hash });
    } catch (err) {
      console.error(err);
      toast.error(
        <ToastBody
          heading="Transaction Error"
          body="The transaction couldn't be processed. Try later or contact us if the problem persists."
        />
      );
    }

    if (!hash) {
      return false;
    }

    const transaction = await client.getTransactionReceipt({
      hash
    });

    return transaction;
  }

  async approveSponsorship(address, decimals, _amount) {
    const amount = parseUnits(_amount, decimals);

    const { hash } = await this.writeToContract(this.talentTokenConfig(address), "approve", [
      this.sponsorshipConfig().address,
      amount
    ]);

    try {
      await waitForTransaction({ hash });
    } catch (err) {
      console.error(err);
      toast.error(
        <ToastBody
          heading="Transaction Error"
          body="The transaction couldn't be processed. Try later or contact us if the problem persists."
        />
      );
    }

    if (!hash) {
      return false;
    }

    return hash;
  }

  async getStableBalance(formatted = false) {
    const account = this.connectedAccount();
    if (!account) {
      return;
    }

    const result = await this.readFromContract(await this.stableConfig(), "balanceOf", [account]);

    if (formatted) {
      return formatUnits(result, this.stableDecimals());
    } else {
      return result;
    }
  }

  async maxPossibleStake(tokenAddress, formatted = false) {
    const result = await this.readFromContract(this.stakingConfig(), "stakeAvailability", [tokenAddress]);

    if (formatted) {
      return formatUnits(result, 18);
    } else {
      return result;
    }
  }

  async getTokenAvailability(token, chainId = 44787, formatted = false) {
    const client = await getPublicClient({
      chainId
    });

    const result = await client.readContract({
      ...this.talentTokenConfig(token),
      functionName: "mintingAvailability"
    });

    if (formatted) {
      return formatUnits(result, 18);
    } else {
      return result;
    }
  }

  async isAddressWhitelisted(address, chainId) {
    const client = await getPublicClient({
      chainId
    });

    const result = await client.readContract({
      ...this.factoryConfig(),
      functionName: "whitelist",
      args: [address]
    });

    return result;
  }

  async whitelistAddress(address) {
    const { hash } = await this.writeToContract(this.talentFactory(), "whitelistAddress", [address]);

    try {
      await waitForTransaction({ hash });
    } catch (err) {
      console.error(err);
      toast.error(
        <ToastBody
          heading="Transaction Error"
          body="The transaction couldn't be processed. Try later or contact us if the problem persists."
        />
      );
    }

    if (!hash) {
      return false;
    }

    return true;
  }

  // ONCHAIN UTILS

  async addTokenToWallet(contract_id, symbol) {
    const account = this.connectedAccount();
    if (!account) {
      return;
    }

    const chainId = window.web3Interactor.getChainId();
    const walletClient = await getWalletClient({
      chainId
    });
    await walletClient.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20", // Initially only supports ERC20, but eventually more!
        options: {
          address: contract_id, // The address that the token is at.
          symbol: symbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: 18 // The number of decimals in the token
        }
      }
    });

    return;
  }

  async getNFTImg(contract_id, token_id) {
    const chainId = window.web3Interactor.getChainId();

    const client = await getPublicClient({
      chainId
    });

    const uri = await client.readContract({
      abi: CommunityUser.abi,
      address: contract_id,
      functionName: "tokenURI",
      args: [token_id]
    });

    const url = ipfsToURL(uri);
    const result = await externalGet(url);

    const imageUrl = ipfsToURL(result.image);

    return imageUrl;
  }
}

export { OnChain };
