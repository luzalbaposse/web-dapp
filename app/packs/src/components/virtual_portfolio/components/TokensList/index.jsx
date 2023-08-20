import React, { useState } from "react";
import { ethers } from "ethers";

import Table from "src/components/design_system/table";
import Divider from "src/components/design_system/other/Divider";
import TalentProfilePicture from "src/components/talent/TalentProfilePicture";
import {
  DetailsCell,
  DetailsCellRight,
  Container,
  ConnectionModalTop,
  ConnectionModalTitle,
  ConnectionModalContent,
  ConnectionModalRow,
  ConnectionModalFooter
} from "./styled";
import ThemedButton from "src/components/design_system/button";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import { parseAndCommify } from "src/onchain/utils";
import { formattedConnectionType } from "src/utils/viewHelpers";

import { Icon, Typography, Button, Modal, useModal } from "@talentprotocol/design-system";

const tokenAmount = tal => {
  const amount = ethers.utils.parseUnits(tal.toString(), 0);
  return parseAndCommify(ethers.utils.formatUnits(amount, 18));
};

const talAmount = tal => {
  const amount = ethers.utils.parseUnits(tal.toString(), 0);
  return parseAndCommify(ethers.utils.formatUnits(amount, 18));
};

const dollarAmount = tal => {
  const amount = ethers.utils.parseUnits(tal.toString(), 0).div(50);
  return parseAndCommify(ethers.utils.formatUnits(amount, 18));
};

const ConnectionDetailsModal = ({ token, modalState, closeModal, clearToken }) => {
  const onClose = () => {
    closeModal();
    clearToken();
  };

  if (!token || !modalState.isOpen) {
    return;
  }

  return (
    <Modal title="Connection details" isOpen={modalState.isOpen} closeModal={onClose}>
      <Container>
        <ConnectionModalTop>
          <TalentProfilePicture src={token.profile_picture_url} userId={token.id} height={24} />
          <Typography specs={{ variant: "label2", type: "regular" }} color="primary01">
            {token.display_name}
          </Typography>
        </ConnectionModalTop>
        <ConnectionModalTitle>
          <Typography specs={{ variant: "h3", type: "bold" }} color="primary01">
            {`${tokenAmount(token.amount)} $${token.ticker}`}
          </Typography>
          <Typography specs={{ variant: "p2", type: "medium" }} color={"primary03"}>{`$${dollarAmount(
            token.tal_amount
          )}`}</Typography>
        </ConnectionModalTitle>
        <Divider className="mt-6 mb-4" />
        <ConnectionModalContent>
          <ConnectionModalRow>
            <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
              {"Since"}
            </Typography>
            <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
              {dayjs(token.first_time_bought_at).format("MMM DD, YYYY")}
            </Typography>
          </ConnectionModalRow>
          <ConnectionModalRow>
            <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
              {"Connection"}
            </Typography>
            <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
              {formattedConnectionType(token.connection_type)}
            </Typography>
          </ConnectionModalRow>
          <ConnectionModalRow>
            <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
              {"$TAL Staked"}
            </Typography>
            <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
              {`${talAmount(token.tal_amount)} $TAL`}
            </Typography>
          </ConnectionModalRow>
        </ConnectionModalContent>
        <ConnectionModalFooter>
          <Button size="small" hierarchy="tertiary" isDisabled={true} text="Unstake" onClick={() => null} />
          <Button
            size="small"
            hierarchy="primary"
            text={`Stake more on $${token.ticker}`}
            isDisabled={true}
            onClick={() => null}
          />
        </ConnectionModalFooter>
      </Container>
    </Modal>
  );
};

const TokenRow = ({ token, onClick }) => {
  return (
    <Table.Tr key={token.id} className="border-bottom-black" onClick={() => onClick(token)}>
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
            {`${tokenAmount(token.amount)} $${token.ticker}`}
          </Typography>
          <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
            {`$${dollarAmount(token.tal_amount)}`}
          </Typography>
        </DetailsCellRight>
      </Table.Td>
    </Table.Tr>
  );
};

const TokensList = ({ theme, tokens, showLoadMoreTokens, loadMoreTokens }) => {
  const modalState = useModal();
  const [selectedToken, setSelectedToken] = useState();

  const showConnectionDetails = token => {
    setSelectedToken(token);
    modalState.openModal();
  };

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
          <ConnectionDetailsModal
            token={selectedToken}
            modalState={modalState}
            closeModal={modalState.closeModal}
            clearToken={() => setSelectedToken(null)}
          />
          <Table mode={theme} className="table-mobile-full-width">
            <Table.Body className="">
              {tokens.map(token => (
                <TokenRow key={token.id} token={token} onClick={t => showConnectionDetails(t)} />
              ))}
            </Table.Body>
          </Table>
          {showLoadMoreTokens() && (
            <div className="d-flex flex-column justify-content-center my-6">
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
