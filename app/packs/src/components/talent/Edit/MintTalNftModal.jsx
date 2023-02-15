import React from "react";
import Modal from "react-bootstrap/Modal";
import { P1, P2 } from "src/components/design_system/typography";
import Button from "src/components/design_system/button";
import { useWindowDimensionsHook } from "../../../utils/window";
import { ArrowLeft } from "src/components/icons";

const MintTalNftModal = ({ show, setShow }) => {
  if (!activeContract) {
    return null;
  }

  const { mobile } = useWindowDimensionsHook();

  return (
    <Modal
      scrollable={true}
      show={show}
      centered={mobile ? false : true}
      onHide={() => setShow(false)}
      dialogClassName={mobile ? "mw-100 mh-100 m-0" : "remove-background rewards-modal"}
      fullscreen={"md-down"}
    >
      <>
        <Modal.Header closeButton className="pt-4 px-4 pb-0">
          {mobile && (
            <button onClick={() => setShow(false)} className="text-black remove-background remove-border mr-3">
              <ArrowLeft color="currentColor" />
            </button>
          )}
          <P1 className="text-black" text="Mint your TAL NFT" bold />
        </Modal.Header>
        <Modal.Body className="show-grid px-4 pb-4 d-flex flex-column justify-content-between">
          <div>
            <P2 className="mb-6" text="Mint your own TAL NFT and reserve your handle .tal" />
          </div>
          <div className="d-flex mt-6 w-100">
            <Button className="mr-2 w-50" onClick={() => setShow(false)} text="Cancel" type="white-subtle" size="big" />
            <Button className="w-50" type="primary-default" size="big" onClick={() => null} text="Mint"></Button>
          </div>
        </Modal.Body>
      </>
    </Modal>
  );
};

export default MintTalNftModal;
