import React from "react";
import { ethers } from "ethers";

import Table from "src/components/design_system/table";
import TalentProfilePicture from "src/components/talent/TalentProfilePicture";
import { DetailsCell, DetailsCellRight } from "./styled";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import { parseAndCommify } from "src/onchain/utils";

import { Icon, Typography, Button } from "@talentprotocol/design-system";

const TokenRow = ({ token }) => {
  const talAmount = () => {
    const amount = ethers.utils.parseUnits(token.amount.toString(), 0);
    return parseAndCommify(ethers.utils.formatUnits(amount, 18));
  };

  const dollarAmount = () => {
    const amount = ethers.utils.parseUnits(token.tal_amount.toString(), 0).div(50);
    return parseAndCommify(ethers.utils.formatUnits(amount, 18));
  };

  return (
    <Table.Tr key={token.id} className="border-bottom-black">
      <Table.Td className="pl-3 lg-pl-0 py-3">
        <div className="d-flex align-items-center">
          <TalentProfilePicture src={token.profile_picture_url} userId={token.id} height={40} />
          <DetailsCell>
            <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
              {token.display_name}
            </Typography>
            <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
              {token.occupation}
            </Typography>
          </DetailsCell>
        </div>
      </Table.Td>
      <Table.Td className="pr-3 lg-pr-0 py-3">
        <DetailsCellRight>
          <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
            {`${talAmount()} $${token.ticker}`}
          </Typography>
          <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
            {`$${dollarAmount()}`}
          </Typography>
        </DetailsCellRight>
      </Table.Td>
    </Table.Tr>
  );
};

const TokensList = ({ theme, tokens, showLoadMoreTokens, loadMoreTokens, blockExplorerUrl }) => {
  return (
    <>
      {tokens.length === 0 && (
        <>
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ marginTop: 88, marginBottom: 88 }}
          >
            <Icon name={"binoculars"} size={48} color="primary04" />
            <Typography specs={{ variant: "h5", type: "bold" }} className="mt-4" color="primary04">
              {"You're not supporting any talent"}
            </Typography>
            <Typography specs={{ variant: "p2", type: "regular" }} color="primary04">
              {"All your talent tokens will be listed here."}
            </Typography>
            <Button hierarchy="secondary" size="medium" text={"See all talent"} href={"/talent"} className="mt-4" />
          </div>
        </>
      )}
      {tokens.length > 0 && (
        <>
          <Table mode={theme} className="table-mobile-full-width">
            <Table.Body className="">
              {tokens.map(token => (
                <TokenRow key={token.id} token={token} explorerURL={blockExplorerUrl} />
              ))}
            </Table.Body>
          </Table>
          {showLoadMoreTokens() && (
            <div className="d-flex flex-column justify-content-center">
              <ThemedButton onClick={() => loadMoreTokens()} type="white-default" className="mx-auto">
                Show More
              </ThemedButton>
            </div>
          )}
          {!showLoadMoreTokens() && (
            <div className="d-flex flex-row justify-content-center my-6">
              <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
                {"You've reached the end of the list"}
              </Typography>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TokensList;
