import React, { useEffect, useContext, useState } from "react";
import { ethers } from "ethers";
import Divider from "src/components/design_system/other/Divider";

import ThemeContainer from "src/contexts/ThemeContext";
import { camelCaseObject } from "src/utils/transformObjects";
import { useWindowDimensionsHook } from "src/utils/window";
import Button from "src/components/design_system/button";

import {
  ApolloProvider,
  useQuery,
  GET_TALENT_PORTFOLIO_FOR_ID_SIMPLE,
  client,
} from "src/utils/thegraph";

import Poaps from "./web3/poaps";
import Nfts from "./web3/nfts";
import Tokens from "./web3/tokens";
import Overview from "./Overview";
import About from "./About";
import Journey from "./Journey";
import Community from "./Community";
import Token from "./Token";

const Show = ({ talent, railsContext, currentUserId }) => {
  const localTalent = camelCaseObject(talent);
  const canUpdate = talent.user.id == currentUserId;
  const [selectedSection, setSelectedSection] = useState(window.location.hash);
  const [listLoaded, setListLoaded] = useState(false);
  const [showLastDivider, setShowLastDivider] = useState(false);
  const [tokenData, setTokenData] = useState({
    price: 0.1,
    totalSupply: 0,
  });

  const { loading, data } = useQuery(GET_TALENT_PORTFOLIO_FOR_ID_SIMPLE, {
    variables: { id: localTalent.token.contractId?.toLowerCase() },
    skip: listLoaded,
  });

  const { mobile } = useWindowDimensionsHook();

  const changeSection = (newSection) => {
    setSelectedSection(newSection);
  };

  const buttonType = (section) => {
    if (section == selectedSection) {
      return "white-default";
    } else if (!selectedSection && section == "#About") {
      return "white-default";
    } else {
      return "white-ghost";
    }
  };

  useEffect(() => {
    if (selectedSection) {
      const scrollDiv = document.getElementById(selectedSection).offsetTop;
      window.scrollTo({ top: scrollDiv - 70, behavior: "smooth" });
      window.history.replaceState(
        {},
        document.title,
        `${localTalent.user.username}${selectedSection}`
      );
    }
  }, [selectedSection]);

  useEffect(() => {
    if (loading || !data || !data.talentToken) {
      if (!loading) {
        setListLoaded(true);
      }
      return;
    }

    setListLoaded(true);
    setTokenData({
      ...tokenData,
      totalSupply: ethers.utils.formatUnits(data.talentToken.totalSupply || 0),
    });
  }, [data, loading]);

  return (
    <div className="d-flex flex-column lg-h-100 p-0 mt-7">
      <Overview
        className="mb-2"
        talent={localTalent}
        tokenData={tokenData}
        currentUserId={currentUserId}
        railsContext={railsContext}
        changeSection={changeSection}
      />
      <Divider className="my-6" />
      <div className="d-flex justify-content-lg-center overflow-x-scroll mx-4">
        <Button
          className="mr-2"
          type={buttonType("#About")}
          text="About"
          onClick={() => changeSection("#About")}
        />
        <Button
          className="mr-2"
          type={buttonType("#Journey")}
          text="Journey"
          onClick={() => changeSection("#Journey")}
        />
        <Button
          className="mr-2"
          type={buttonType(`#${localTalent.token.ticker}`)}
          text={localTalent.token.ticker}
          onClick={() => changeSection(`#${localTalent.token.ticker}`)}
        />
        <Button
          className="mr-2"
          type={buttonType("#Community")}
          text="Community"
          onClick={() => changeSection("#Community")}
        />
        <Button
          type={buttonType("#DigitalCollectibles")}
          text="Digital Collectibles"
          onClick={() => changeSection("#DigitalCollectibles")}
        />
      </div>
      <div className="my-7 w-100" id="#About">
        <About talent={localTalent} />
      </div>
      {mobile && <Divider />}
      <div className="my-7 w-100" id="#Journey">
        <Journey talent={localTalent} />
      </div>
      <div className="my-7 w-100" id={`#${localTalent.token.ticker}`}>
        <Token
          tokenData={tokenData}
          talent={localTalent}
          env={railsContext.contractsEnv}
        />
      </div>
      <div className="my-7 w-100" id="#Community">
        <Community
          userId={localTalent.user.id}
          talent={localTalent}
          canUpdate={canUpdate}
        />
      </div>
      {(showLastDivider || canUpdate) && <Divider className="my-6" />}
      <div className="mt-7 w-100" id="#DigitalCollectibles">
        <Poaps
          userId={localTalent.user.id}
          canUpdate={canUpdate}
          setShowLastDivider={setShowLastDivider}
        />
        <Nfts
          userId={localTalent.user.id}
          canUpdate={canUpdate}
          setShowLastDivider={setShowLastDivider}
        />
        <Tokens
          userId={localTalent.user.id}
          canUpdate={canUpdate}
          setShowLastDivider={setShowLastDivider}
        />
      </div>
    </div>
  );
};

export default (props, railsContext) => {
  return () => (
    <ThemeContainer>
      <ApolloProvider client={client(props.talent.token.chain_id)}>
        <Show {...props} railsContext={railsContext} />
      </ApolloProvider>
    </ThemeContainer>
  );
};
