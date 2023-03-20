import { Modal } from "@talentprotocol/design-system";
import React, { useState } from "react";
import { HowMuchStep } from "./steps/how-much";
import { TransactionStep } from "./steps/transaction";

export const SponsorModal = ({ modalState, profile }) => {
  const [token, setToken] = useState("USDC");
  return (
    <Modal title="Sponsorship" isOpen={true || modalState.isOpen} closeModal={modalState.closeModal}>
      <TransactionStep profile={profile} />
      {/*<HowMuchStep token={token} setToken={setToken} />*/}
    </Modal>
  );
};
