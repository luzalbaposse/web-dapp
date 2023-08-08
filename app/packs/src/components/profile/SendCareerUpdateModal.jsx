import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

import debounce from "lodash/debounce";
import { post } from "src/utils/requests";

import Button from "src/components/design_system/button";
import { useWindowDimensionsHook } from "src/utils/window";
import TextArea from "src/components/design_system/fields/textarea";
import Divider from "src/components/design_system/other/Divider";

import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";

// import { OnChain } from "src/onchain";
// import { Client } from "@xmtp/xmtp-js";
// const ENCODING = "binary";

const SendCareerUpdateModal = ({ show, hide, placeholder }) => {
  const { mobile } = useWindowDimensionsHook();
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.replace(/\s+/g, "") == "") {
      return;
    }

    const body = {
      career_update: {
        message: message
      }
    };

    post("/api/v1/career_updates", body).then(response => {
      if (response.error) {
        toast.error(<ToastBody heading="Error!" body={response.error} />);
      } else {
        toast.success(<ToastBody heading="Success!" body={"Your update was sent to your subscribers."} />);
        hide();
      }
    });
  };

  const debouncedNewMessage = debounce(() => sendMessage(), 200);

  const disabled = () => !message;

  return (
    <Modal
      scrollable={true}
      show={show}
      onHide={hide}
      centered
      dialogClassName={mobile ? "mw-100 mh-100 m-0" : "remove-background"}
      contentClassName={mobile ? "h-100" : ""}
      fullscreen="true"
    >
      <Modal.Header closeButton>
        <Modal.Title>Career Update</Modal.Title>
      </Modal.Header>
      <Divider />
      <Modal.Body>
        <TextArea
          placeholder={placeholder}
          onChange={e => setMessage(e.target.value)}
          value={message}
          rows="10"
          className="w-100 mt-4"
          required={true}
        />
      </Modal.Body>
      <Modal.Footer className="px-3 py-3">
        <Button className="mr-2" type="white-ghost" text="Cancel" onClick={hide} />
        <Button type="primary-default" text="Send Career Update" onClick={debouncedNewMessage} disabled={disabled()} />
      </Modal.Footer>
    </Modal>
  );
};

export default SendCareerUpdateModal;
