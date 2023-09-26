import React from "react";
import { newKit, CeloContract } from "@celo/contractkit";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { waitForTransaction } from "wagmi/actions";
import TalentToken from "../abis/recent/TalentToken.json";
import StakingV3 from "../abis/recent/StakingV3.json";
import TalentFactoryV3 from "../abis/recent/TalentFactoryV3.json";
import StableToken from "../abis/recent/StableToken.json";
import CommunityUser from "../abis/recent/CommunityUser.json";
import TalentSponsorship from "../abis/TalentSponsorship.json";
import VirtualTAL from "../abis/recent/VirtualTAL.json";
import Addresses from "./addresses.json";
import { ipfsToURL } from "./utils";
import { externalGet } from "src/utils/requests";
import { getWalletClient, getPublicClient } from "@wagmi/core";
import { formatUnits, parseUnits, parseAbiItem } from "viem";
import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";

class OnChain {
  constructor(env) {
    this.account = null;
    this.env = env || "development";
  }

  async getChainID() {
    return await window.web3Interactor.getChainId();
  }

  connectedAccount() {
    try {
      if (!window.web3Interactor?.isWalletConnected()) return;
      this.account = window.web3Interactor.wallet.address;
      return window.web3Interactor.wallet.address;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async readFromContract({ abi, address }, functionName, args = []) {
    const chainId = await window.web3Interactor.getChainId();

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

    const chainId = await window.web3Interactor.getChainId();

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

  getEnvBlockExplorerUrls(chainId = 42220) {
    if (Addresses[this.env][chainId]) {
      return Addresses[this.env][chainId]["paramsForMetamask"]["blockExplorerUrls"][0];
    } else {
      return "/";
    }
  }

  async switchChain(chainId = 42220) {
    await window.web3Interactor.switchNetwork(chainId);
  }

  async recognizedChain() {
    if (Addresses[this.env][await window.web3Interactor.getChainId()]) {
      return true;
    } else {
      return false;
    }
  }

  availableChainIds() {
    return Object.keys(Addresses[this.env]).map(key => Addresses[this.env][key]["chainId"]);
  }

  retrieveAccount() {
    if (window.web3Interactor?.isWalletConnected()) {
      this.account = window.web3Interactor.wallet.address;
      return true;
    }
    return false;
  }

  async factoryConfig() {
    const chainId = await window.web3Interactor.getChainId();

    return {
      abi: TalentFactoryV3.abi,
      address: Addresses[this.env][chainId]["factory"]
    };
  }

  async stableConfig() {
    const chainId = await window.web3Interactor.getChainId();
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

  async stakingConfig() {
    const chainId = await window.web3Interactor.getChainId();

    return {
      abi: StakingV3.abi,
      address: Addresses[this.env][chainId]["staking"]
    };
  }

  async sponsorshipConfig() {
    const chainId = await window.web3Interactor.getChainId();

    return {
      abi: TalentSponsorship.abi,
      address: Addresses[this.env][chainId]["sponsorship"]
    };
  }

  async virtualTALConfig() {
    const chainId = await window.web3Interactor.getChainId();

    return {
      abi: VirtualTAL.abi,
      address: Addresses[this.env][chainId]["virtualTAL"]
    };
  }

  talentTokenConfig(address) {
    return {
      abi: TalentToken.abi,
      address
    };
  }

  async stableDecimals() {
    const chainId = await window.web3Interactor.getChainId();
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
    const factoryConfig = await this.factoryConfig();
    const { hash, client } = await this.writeToContract(factoryConfig, "createTalent", [this.account, name, symbol]);

    if (!hash) {
      return false;
    }

    const receipt = await waitForTransaction({ hash });

    const logs = await client.getLogs({
      address: factoryConfig.address,
      event: parseAbiItem("event TalentCreated(address indexed talent, address indexed token)"),
      blockHash: receipt.blockHash
    });

    return logs?.find(e => e.eventName === "TalentCreated");
  }

  async calculateEstimatedReturns(_account) {
    const account = this.connectedAccount();
    if (!account && !_account) {
      return;
    }

    const timestamp = dayjs().unix();

    const result = await this.readFromContract(await this.stakingConfig(), "calculateEstimatedReturns", [
      _account || account,
      timestamp
    ]);

    return result;
  }

  async pendingTalentRewards(talent_token) {
    if (!talent_token) {
      return;
    }

    const result = await this.readFromContract(await this.stakingConfig(), "calculateTalentRewards", [talent_token]);

    return result;
  }

  async talLocked(_account) {
    const account = this.connectedAccount();
    if (!(_account || account)) {
      return;
    }

    const result = await this.readFromContract(await this.stakingConfig(), "globalStakes", [_account || account]);

    return result;
  }

  async getTALBalance(_account, formatted = false) {
    const account = this.connectedAccount();
    if (!(_account || account)) {
      return;
    }

    const result = await this.readFromContract(await this.virtualTALConfig(), "getBalance", [_account || account]);

    if (formatted) {
      return formatUnits(result, 18);
    } else {
      return result;
    }
  }

  async createStake(token, _amount) {
    const amount = parseUnits(_amount, this.stableDecimals());

    const { hash } = await this.writeToContract(await this.stakingConfig(), "stakeStable", [token, amount]);

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
    const { hash } = await this.writeToContract(await this.stakingConfig(), "claimRewards", [token]);

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

  async claimRewardsToVirtualTAL() {
    const { hash, client } = await this.writeToContract(await this.stakingConfig(), "claimRewardsToVirtualTAL", []);

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

    const transaction = await client.getTransactionReceipt({
      hash
    });

    return [transaction, hash];
  }

  async claimTalentRewardsToVirtualTAL(tokenAddress) {
    if (!tokenAddress) {
      return;
    }

    const { hash, client } = await this.writeToContract(
      await this.stakingConfig(),
      "withdrawTalentRewardsToVirtualTAL",
      [tokenAddress]
    );

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

    const transaction = await client.getTransactionReceipt({
      hash
    });

    return [transaction, hash];
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
      (await this.stakingConfig()).address
    ]);

    if (formatted) {
      return formatUnits(result, this.stableDecimals());
    } else {
      return result;
    }
  }

  async createSponsorship(talentAddress, tokenAddress, tokenDecimals, _amount) {
    const amount = parseUnits(_amount, tokenDecimals);

    const { hash, client } = await this.writeToContract(await this.sponsorshipConfig(), "sponsor", [
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
    const { hash, client } = await this.writeToContract(await this.sponsorshipConfig(), "withdrawToken", [
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
    const { hash, client } = await this.writeToContract(await this.sponsorshipConfig(), "revokeSponsor", [
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
      (await this.sponsorshipConfig()).address,
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
    const result = await this.readFromContract(await this.stakingConfig(), "stakeAvailability", [tokenAddress]);

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
      ...(await this.factoryConfig()),
      functionName: "whitelist",
      args: [address]
    });

    return result;
  }

  async whitelistAddress(address) {
    const { hash } = await this.writeToContract(await this.factoryConfig(), "whitelistAddress", [address]);

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

  async unstakeTalentToken(token, _amount) {
    if (!token) {
      return;
    }
    const amount = parseUnits(_amount);

    const { hash, client } = await this.writeToContract(await this.stakingConfig(), "sellTalentTokenForVirtualTAL", [
      token,
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

    const transaction = await client.getTransactionReceipt({
      hash
    });

    return transaction;
  }

  // ONCHAIN UTILS

  async addTokenToWallet(contract_id, symbol) {
    const account = this.connectedAccount();
    if (!account) {
      return;
    }

    const chainId = await window.web3Interactor.getChainId();
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
    const chainId = await window.web3Interactor.getChainId();

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
