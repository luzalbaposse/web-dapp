import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "src/components/design_system/button";
import { Celo, Polygon } from "src/components/icons";
import ethLogo from "images/eth-logo.png";
import gnosisLogo from "images/gnosis-logo.png";

const PickNetworkModal = ({ setChain }) => (
  <>
    <Modal.Header className="py-3 px-4 modal-border mb-4" closeButton>
      <Modal.Title>Choose the network</Modal.Title>
    </Modal.Header>
    <Modal.Body className="show-grid pt-0 pb-4 px-4">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-6 mb-4">
            <Button
              type={"white-subtle"}
              onClick={() => setChain(1)}
              className="network-button"
              size="extra-big"
            >
              <img src={ethLogo} className="token-img mr-3" />
              Ethereum
            </Button>
          </div>
          <div className="col-12 col-md-6 mb-4">
            <Button
              type={"white-subtle"}
              onClick={() => setChain(137)}
              className="network-button"
              size="extra-big"
            >
              <Polygon className="mr-3" width={48} />
              Polygon
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 mb-4">
            <Button
              type={"white-subtle"}
              onClick={() => setChain(42220)}
              className="network-button"
              size="extra-big"
            >
              <Celo className="mr-3" width={48} />
              Celo
            </Button>
          </div>
          <div className="col-12 col-md-6 mb-4">
            <Button
              type={"white-subtle"}
              onClick={() => setNetwork(100)}
              className="network-button"
              size="extra-big"
            >
              <img src={gnosisLogo} className="token-img mr-3" />
              Gnosis
            </Button>
          </div>
        </div>
      </div>
    </Modal.Body>
  </>
);

export default PickNetworkModal;
