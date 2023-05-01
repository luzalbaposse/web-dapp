import { ethers } from "ethers";
import { newKit, CeloContract } from "@celo/contractkit";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import TalentToken from "../abis/recent/TalentToken.json";
import Staking from "../abis/recent/Staking.json";
// import TalentFactory from "../abis/recent/TalentFactory.json";
import TalentFactoryV3 from "../abis/recent/TalentFactoryV3.json";
import StableToken from "../abis/recent/StableToken.json";
import CommunityUser from "../abis/recent/CommunityUser.json";
import TalentSponsorship from "../abis/TalentSponsorship.json";

import Addresses from "./addresses.json";
import { ERROR_MESSAGES } from "../utils/constants";
import { ipfsToURL } from "./utils";
import { externalGet } from "src/utils/requests";
import { CHAIN_RPC_URLS } from "src/onchain/utils";

class OnChain {
  constructor(env) {
    this.account = null;
    this.talentFactory = null;
    this.staking = null;
    this.sponsorship = null;
    this.stabletoken = null;
    this.stableDecimals = null;
    this.celoKit = null;
    this.signer = null;
    this.env = env || "development";

    this.web3Modal = this.initializeWeb3Modal();
  }

  initializeWeb3Modal = () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          rpc: CHAIN_RPC_URLS
        }
      }
    };

    return new Web3Modal({
      cacheProvider: true,
      providerOptions
    });
  };

  // LOAD WEB3

  async web3ModalConnect(forceConnect = false) {
    try {
      if (!this.web3Modal) {
        this.web3Modal = await this.initializeWeb3Modal();
      }

      let web3ModalInstance;
      if (forceConnect) {
        web3ModalInstance = await this.web3Modal.connect();
      } else if (this.web3Modal && this.web3Modal.cachedProvider) {
        this.web3Modal.resetState();
        web3ModalInstance = await this.web3Modal.connect();
      } else {
        return undefined;
      }

      return web3ModalInstance;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async connectedAccount(forceConnect = false) {
    try {
      const web3ModalInstance = await this.web3ModalConnect(forceConnect);

      if (web3ModalInstance !== undefined) {
        const provider = new ethers.providers.Web3Provider(web3ModalInstance);
        web3ModalInstance.on("chainChanged", (/*_chainId*/) => window.location.reload());

        const signer = await provider.getSigner();
        this.signer = signer;
        const account = await signer.getAddress();
        this.account = account;

        return this.account;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async disconnect() {
    const web3Modal = await this.initializeWeb3Modal();

    if (web3Modal.cachedProvider) {
      web3Modal.clearCachedProvider();
    }
  }

  async getChainID() {
    const web3ModalInstance = await this.web3ModalConnect();

    const provider = new ethers.providers.Web3Provider(web3ModalInstance);

    const network = await provider.getNetwork();

    return network.chainId;
  }

  getEnvBlockExplorerUrls(chainId = 42220) {
    if (Addresses[this.env][chainId]) {
      return Addresses[this.env][chainId]["paramsForMetamask"]["blockExplorerUrls"][0];
    } else {
      return "/";
    }
  }

  async switchChain(chainId = 42220) {
    const chainHex = ethers.utils.hexValue(ethers.utils.hexlify(chainId));

    try {
      const web3ModalInstance = await this.web3ModalConnect();

      await web3ModalInstance.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainHex }]
      });
    } catch (error) {
      console.log(error);
      // metamask mobile throws an error but that error has no code
      // https://github.com/MetaMask/metamask-mobile/issues/3312
      if (!error.code || error.code === 4902) {
        const web3ModalInstance = await this.web3ModalConnect();

        await web3ModalInstance.request({
          method: "wallet_addEthereumChain",
          params: [Addresses[this.env][chainId]["paramsForMetamask"]]
        });
        await web3ModalInstance.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainHex }]
        });
      }
    }
  }

  async recognizedChain() {
    const web3ModalInstance = await this.web3ModalConnect();
    if (web3ModalInstance !== undefined) {
      const chainId = await this.getChainID();

      if (Addresses[this.env][chainId]) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // this function is barely used use connectedAccount instead
  async retrieveAccount() {
    try {
      const web3ModalInstance = await this.web3ModalConnect(true);

      if (web3ModalInstance !== undefined) {
        const provider = new ethers.providers.Web3Provider(web3ModalInstance);
        await web3ModalInstance.enable();

        web3ModalInstance.on("chainChanged", (/*_chainId*/) => window.location.reload());
        const signer = await provider.getSigner();
        this.signer = signer;
        const account = await signer.getAddress();
        this.account = account;

        if (!(await this.recognizedChain())) {
          this.switchChain();
        }

        return this.account;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // CONTRACT INTERACTION

  async loadFactory() {
    try {
      const web3ModalInstance = await this.web3ModalConnect();
      let provider;

      const chainId = await this.getChainID();
      if (web3ModalInstance !== undefined) {
        provider = new ethers.providers.Web3Provider(web3ModalInstance);
      } else {
        provider = new ethers.providers.JsonRpcProvider(Addresses[this.env][chainId]["rpcURL"]);
      }

      if (await this.recognizedChain()) {
        const factoryAddress = Addresses[this.env][chainId]["factory"];

        this.talentFactory = new ethers.Contract(factoryAddress, TalentFactoryV3.abi, provider);

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async loadStaking() {
    try {
      const web3ModalInstance = await this.web3ModalConnect();
      let provider;

      if (web3ModalInstance !== undefined) {
        provider = new ethers.providers.Web3Provider(web3ModalInstance);
      } else {
        provider = new ethers.providers.JsonRpcProvider(Addresses[this.env][chainId]["rpcURL"]);
      }
      const chainId = await this.getChainID();

      if (await this.recognizedChain()) {
        const stakingAddress = Addresses[this.env][chainId]["staking"];

        this.staking = new ethers.Contract(stakingAddress, Staking.abi, provider);

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getStableBalanceERC20() {
    try {
      const web3ModalInstance = await this.web3ModalConnect();
      let provider;
      // to change to polygon and muumbai
      if (web3ModalInstance !== undefined) {
        provider = new ethers.providers.Web3Provider(web3ModalInstance);
      } else {
        provider = new ethers.providers.JsonRpcProvider(Addresses[this.env][chainId]["rpcURL"]);
      }
      const chainId = await this.getChainID();

      if (await this.recognizedChain()) {
        this.stabletoken = new ethers.Contract(
          Addresses[this.env][chainId]["stableAddress"],
          StableToken.abi,
          provider
        );
        this.stableDecimals = await this.stabletoken.decimals();
        const balance = await this.stabletoken.balanceOf(this.account);
        const balanceFormatted = ethers.utils.formatUnits(balance, this.stableDecimals);

        return balanceFormatted;
      } else {
        return "0.0";
      }
    } catch (error) {
      console.log(error);
      return "0.0";
    }
  }

  async loadSponsorship() {
    try {
      const web3ModalInstance = await this.web3ModalConnect();
      let provider;
      let chainId;

      if (web3ModalInstance !== undefined) {
        provider = new ethers.providers.Web3Provider(web3ModalInstance);
      } else {
        chainId = await this.getChainID();
        provider = new ethers.providers.JsonRpcProvider(Addresses[this.env][chainId]["rpcURL"]);
      }

      if (await this.recognizedChain()) {
        chainId = await this.getChainID();
        const sponsorshipAddress = Addresses[this.env][chainId]["sponsorship"];

        this.sponsorship = new ethers.Contract(sponsorshipAddress, TalentSponsorship.abi, provider);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async loadStableToken() {
    try {
      const web3ModalInstance = await this.web3ModalConnect();
      let provider;

      if (web3ModalInstance !== undefined) {
        provider = new ethers.providers.Web3Provider(web3ModalInstance);
      } else {
        const chainId = await this.getChainID();
        provider = new ethers.providers.JsonRpcProvider(Addresses[this.env][chainId]["rpcURL"]);
      }

      if (await this.recognizedChain()) {
        const chainId = await this.getChainID();
        this.celoKit = newKit(Addresses[this.env][chainId]["rpcURL"]);

        let stableTokenAddress;

        if (!Addresses[this.env][chainId]["stableAddress"]) {
          stableTokenAddress = await this.celoKit.registry.addressFor(CeloContract.StableToken);
          this.stableDecimals = 18;
        } else {
          stableTokenAddress = Addresses[this.env][chainId]["stableAddress"];
          this.stableDecimals = Addresses[this.env][chainId]["stableDecimals"] || 18;
        }

        this.stabletoken = new ethers.Contract(stableTokenAddress, StableToken.abi, provider);

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async createTalent(name, symbol) {
    if (!this.talentFactory) {
      return;
    }

    const tx = await this.talentFactory
      .connect(this.signer)
      .createTalent(this.account, name, symbol)
      .catch(e => {
        if (e.data?.message.includes(ERROR_MESSAGES.ticker_reserved)) {
          return { error: "Ticker is already in use" };
        } else if (e.code === 4001) {
          return { canceled: "User canceled the request" };
        } else if (e.data.message) {
          return { error: e.data.message };
        }
        return { error: e };
      });

    if (tx.error || tx.canceled) {
      return tx;
    }

    const receipt = await tx.wait();

    const event = receipt.events?.find(e => {
      return e.event === "TalentCreated";
    });

    return event;
  }

  async calculateEstimatedReturns(token, _account) {
    if (!this.staking || !(_account || this.account)) {
      return;
    }

    const timestamp = dayjs().unix();

    const result = await this.staking.calculateEstimatedReturns(_account || this.account, token, timestamp);

    return result;
  }

  async getToken(address) {
    const web3ModalInstance = await this.web3ModalConnect();
    let provider;

    if (web3ModalInstance !== undefined) {
      provider = new ethers.providers.Web3Provider(web3ModalInstance);
    } else {
      const chainId = await this.getChainID();
      provider = new ethers.providers.JsonRpcProvider(Addresses[this.env][chainId]["rpcURL"]);
    }
    if (await this.recognizedChain()) {
      return new ethers.Contract(address, TalentToken.abi, provider);
    } else {
      return false;
    }
  }

  async createStake(token, _amount) {
    if (!this.staking) {
      return;
    }

    const amount = ethers.utils.parseUnits(_amount, this.stableDecimals);

    // estimate the gas price before submitting the TX
    // so that we can manually override the gas limit
    // - this doesn't increase the cost, since the cost will
    //   be whatever it is, it simply allows a higher value
    const estimatedGasPrice = await this.staking.connect(this.signer).estimateGas.stakeStable(token, amount);

    const tx = await this.staking.connect(this.signer).stakeStable(token, amount, {
      gasLimit: estimatedGasPrice.mul(130).div(100) // increase amount by 30%
    });

    const receipt = await tx.wait();

    return receipt;
  }

  async claimRewards(token) {
    if (!this.staking) {
      return;
    }

    const tx = await this.staking.connect(this.signer).claimRewards(token);

    const receipt = await tx.wait();

    return receipt;
  }

  async approveStable(_amount) {
    if (!this.staking || !this.stabletoken) {
      return;
    }

    const tx = await this.stabletoken
      .connect(this.signer)
      .approve(this.staking.address, ethers.utils.parseUnits(_amount, this.stableDecimals));

    const result = await tx.wait();

    return result;
  }

  async getStableAllowance(formatted = false) {
    if (!this.stabletoken || !this.account) {
      return "0";
    }

    const result = await this.stabletoken.allowance(this.account, this.staking.address);

    if (formatted) {
      return ethers.utils.formatUnits(result, this.stableDecimals);
    } else {
      return result;
    }
  }

  async createSponsorship(talent, _amount) {
    if (!this.sponsorship) {
      return;
    }

    const amount = ethers.utils.parseUnits(_amount, this.stableDecimals);
    const tx = await this.sponsorship.connect(this.signer).sponsor(talent, amount, this.stabletoken.address);
    const receipt = await tx.wait();

    return receipt;
  }

  async claimSponsorship(sponsor, stableAddress) {
    if (!this.sponsorship) {
      return;
    }

    console.log("sponsorship", this.sponsorship);
    console.log("sponsor", sponsor);
    console.log("stableAddress", stableAddress);
    console.log("signer", this.signer);

    const tx = await this.sponsorship.connect(this.signer).withdrawToken(sponsor, stableAddress);
    const receipt = await tx.wait();

    return receipt;
  }

  async revokeSponsorship(talentAddress, stableAddress) {
    if (!this.sponsorship) {
      return;
    }

    console.log("sponsorship", this.sponsorship);
    console.log("talentAddress", talentAddress);
    console.log("stableAddress", stableAddress);
    console.log("signer", this.signer);

    const tx = await this.sponsorship.connect(this.signer).revokeSponsor(talentAddress, stableAddress);
    const receipt = await tx.wait();

    return receipt;
  }

  async approveStableSponsorship(_amount) {
    if (!this.sponsorship || !this.stabletoken) {
      return;
    }

    return await this.stabletoken
      .connect(this.signer)
      .approve(this.sponsorship.address, ethers.utils.parseUnits(_amount, this.stableDecimals));
  }

  async getStableBalance(formatted = false) {
    if (!this.stabletoken || !this.account) {
      return;
    }

    const result = await this.stabletoken.balanceOf(this.account);

    if (formatted) {
      return ethers.utils.formatUnits(result, this.stableDecimals);
    } else {
      return result;
    }
  }

  async maxPossibleStake(tokenAddress, formatted = false) {
    if (!this.staking) {
      return;
    }

    const result = await this.staking.stakeAvailability(tokenAddress);

    if (formatted) {
      return ethers.utils.formatUnits(result);
    } else {
      return result;
    }
  }

  async getTokenAvailability(token, chainId = 44787, formatted = false) {
    if (!token || chainId !== (await this.getChainID())) {
      return;
    }

    const result = await token.mintingAvailability();

    if (formatted) {
      return ethers.utils.formatUnits(result);
    } else {
      return result;
    }
  }

  async isAddressWhitelisted(address, chainId) {
    const provider = new ethers.providers.JsonRpcProvider(Addresses[this.env][chainId]["rpcURL"]);

    const factoryAddress = Addresses[this.env][chainId]["factory"];
    const talentFactory = new ethers.Contract(factoryAddress, TalentFactoryV3.abi, provider);

    try {
      return await talentFactory.whitelist(address);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async whitelistAddress(address) {
    try {
      if (!this.talentFactory) {
        return;
      }

      const tx = await this.talentFactory.connect(this.signer).whitelistAddress(address);

      await tx.wait();

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // ONCHAIN UTILS

  async addTokenToWallet(contract_id, symbol) {
    const web3ModalInstance = await this.web3ModalConnect();

    if (!web3ModalInstance) {
      return;
    }
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await web3ModalInstance.request({
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

      if (wasAdded) {
        console.log("Added token to metamask");
      } else {
        console.log("Token not added to metamask");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getNFTImg(contract_id, token_id) {
    const web3ModalInstance = await this.web3ModalConnect();
    let provider;

    if (web3ModalInstance !== undefined) {
      provider = new ethers.providers.Web3Provider(web3ModalInstance);
    } else {
      const chainId = await this.getChainID();
      provider = new ethers.providers.JsonRpcProvider(Addresses[this.env][chainId]["rpcURL"]);
    }

    const nft = new ethers.Contract(contract_id, CommunityUser.abi, provider);
    const uri = await nft.tokenURI(token_id);

    const url = ipfsToURL(uri);
    const result = await externalGet(url);

    const imageUrl = ipfsToURL(result.image);

    return imageUrl;
  }
}

export { OnChain };
