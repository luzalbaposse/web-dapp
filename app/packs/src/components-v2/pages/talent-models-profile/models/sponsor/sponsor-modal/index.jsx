import { Modal } from "@talentprotocol/design-system";
import React, { useState } from "react";
import { HowMuchStep } from "./steps/how-much";

export const SponsorModal = ({ modalState, profile }) => {
  const [token, setToken] =  useState("USDC");
  return (
    <Modal title="Sponsorship" isOpen={modalState.isOpen} closeModal={modalState.closeModal}>
      <HowMuchStep token={token} setToken={setToken} />
    </Modal>
  );
};
