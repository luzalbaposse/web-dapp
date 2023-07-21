import React from "react";

import { OnChain } from "src/onchain";
import { chainIdToName } from "src/onchain/utils";
import { ethers } from "ethers";
import { H3, P3, P2 } from "src/components/design_system/typography";
import Button from "src/components/design_system/button";
import { useWindowDimensionsHook } from "src/utils/window";
import { useTheme } from "src/contexts/ThemeContext";

import { formatNumberWithSymbol, shortenAddress } from "src/utils/viewHelpers";
import { parseAndCommify } from "src/onchain/utils";

import cx from "classnames";

const Token = ({ profile, talentTokenPrice, railsContext }) => {
  const { mobile } = useWindowDimensionsHook();
  const { mode } = useTheme();
  const talentToken = profile.talent_token;
  const totalSupply = ethers.utils.formatUnits(profile.total_supply);
  const maxSupply = ethers.utils.formatUnits(profile.max_supply);

  const addTokenToMetamask = async () => {
    const onChainAPI = new OnChain(railsContext.contractsEnv);

    const chainId = await window.web3Interactor.getChainId();
    if (chainId != talentToken.chain_id) {
      await onChainAPI.switchChain(talentToken.chain_id);
    }

    await onChainAPI.addTokenToWallet(talentToken.contract_id, talentToken.ticker);
  };

  return (
    <section className={cx("d-flex flex-column token-section", mobile ? "py-6" : "py-7")}>
      <div className="row">
        <div className={cx("col-12 col-lg-4", mobile && "mb-6")}>
          <H3
            text={`$${parseAndCommify(totalSupply * talentTokenPrice)}`}
            className="text-center inverted-text-primary-01"
          ></H3>
          <P3 className="text-center inverted-text-primary-03">Market Cap</P3>
        </div>
        <div className={cx("col-12 col-lg-4", mobile && "mb-6")}>
          <H3
            text={`${parseAndCommify(totalSupply)} $${talentToken.ticker}`}
            className="text-center inverted-text-primary-01"
          ></H3>
          <P3 className="text-center inverted-text-primary-03">Circulating Supply</P3>
        </div>
        <div className={cx("col-12 col-lg-4", mobile && "mb-6")}>
          <H3
            text={`${ethers.utils.commify(maxSupply)} $${talentToken.ticker}`}
            className="text-center inverted-text-primary-01"
          ></H3>
          <P3 className="text-center inverted-text-primary-03">Max Supply</P3>
        </div>
      </div>
      <div className={cx("row", mobile ? "" : "mt-7")}>
        <div className={cx("col-12 col-lg-4", mobile && "mb-6")}>
          <H3 text={profile.supporters_count || "0"} className="text-center inverted-text-primary-01"></H3>
          <P3 className="text-center inverted-text-primary-03">Supporters</P3>
        </div>
        <div className={cx("col-12 col-lg-4", mobile && "mb-6")}>
          <H3 text={formatNumberWithSymbol(0.1)} className="text-center inverted-text-primary-01"></H3>
          <P3 className="text-center inverted-text-primary-03">Current Price</P3>
        </div>
        <div className={cx("col-12 col-lg-4", mobile && "mb-6")}>
          <H3 text={shortenAddress(talentToken.contract_id)} className="text-center inverted-text-primary-01"></H3>
          <P3
            text={`${chainIdToName(talentToken.chain_id, railsContext.contractsEnv)} Network`}
            className="text-center inverted-text-primary-03"
          ></P3>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center mt-6">
        <Button
          className="mr-2 mt-2 mx-auto inverted-button"
          mode={mode() == "light" ? "dark" : "light"}
          type="white-default"
          onClick={() => addTokenToMetamask()}
        >
          <P2 bold text={`Add $${talentToken.ticker} to Metamask`} />
        </Button>
      </div>
    </section>
  );
};

export default Token;
