import React from "react";
import Modal from "react-bootstrap/Modal";
import MetamaskFox from "images/metamask-fox.svg";
import { Web3Button } from "@web3modal/react";
import { TALENT_PROTOCOL_DISCORD } from "src/utils/constants";
import { Container } from "./styled";

export const WalletConnectionError = ({ show, hide, mode }) => (
  <Modal show={show} onHide={hide} centered dialogClassName="remove-background">
    <Modal.Header closeButton>
      <Modal.Title>
        Metamask <img src={MetamaskFox} height={32} alt="Metamask Fox" />
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p className={mode}>
        We couldn't find metamask installed on your browser. You can install it{" "}
        <a href="https://metamask.io/download" target="_blank">
          here
        </a>
        .
      </p>
      <p className={mode}>
        If you think this is a mistake and you have metamask installed, reach out to us on{" "}
        <a href={TALENT_PROTOCOL_DISCORD} target="_blank">
          Discord
        </a>
        .
      </p>
    </Modal.Body>
  </Modal>
);

export const UnableToConnect = ({ show, hide }) => (
  <Modal show={show} onHide={hide} centered dialogClassName="remove-background">
    <Modal.Header closeButton>
      <Modal.Title>
        Metamask <img src={MetamaskFox} height={32} alt="Metamask Fox" />
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p className="text-danger">
        We already have the public key you tried to connect in our system. We do not allow multiple users to use the
        same wallet, please select a different one and try to connect again.
      </p>
    </Modal.Body>
  </Modal>
);

const Web3ModalConnect = ({}) => {
  return (
    <Container>
      <Web3Button balance="show" />
    </Container>
  );
};

export default Web3ModalConnect;
