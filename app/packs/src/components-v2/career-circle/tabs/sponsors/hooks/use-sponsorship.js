import { useCallback, useEffect, useState } from "react";
import { OnChain } from "../../../../../onchain";

export const useSponsorship = railsContext => {
  const [onchain, setOnchain] = useState(null);
  const [account, setAccount] = useState(null);
  const setupOnChain = useCallback(async () => {
    const newOnChain = new OnChain(railsContext.contractsEnv);
    const _account = await newOnChain.connectedAccount();
    await newOnChain.loadSponsorship();
    await newOnChain.loadStableToken();

    setOnchain(newOnChain);
    setAccount(_account);
  }, [setOnchain, setAccount]);

  useEffect(() => {
    setupOnChain();
  }, []);

  useEffect(() => {
    if (!onchain || !account) {
      return;
    }
    onchain
      .getSponsorsOfTalent()
      .then(res => {
        console.log("--------- success");
        console.log(res);
      })
      .catch(err => {
        console.log("--------- error");
        console.log(err);
      });
  }, [onchain, account]);

  return {
    onchain,
    account
  };
};
