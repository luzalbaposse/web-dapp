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
  // const [account, setAccount] = useState({
  //   signer: null,
  //   senderAddress: null
  // });
  // const [client, setClient] = useState(null);

  // useEffect(() => {
  //   init();
  // }, []);

  // const init = async () => {
  //   const newOnChain = new OnChain(contractsEnv);
  //   const senderAddress = await newOnChain.connectedAccount();
  //   await newOnChain.switchChain(137);

  //   setAccount({
  //     signer: newOnChain.signer,
  //     senderAddress: senderAddress
  //   });
  // };

  // useEffect(() => {
  //   if (account.signer && account.senderAddress) {
  //     initXmtp();
  //   }
  // }, [account]);

  // const initXmtp = async () => {
  //   let keys = loadKeys(account.senderAddress);
  //   if (!keys) {
  //     keys = await Client.getKeys(account.signer, { env: "production" });
  //     storeKeys(account.senderAddress, keys);
  //   }

  //   const client = await Client.create(null, {
  //     env: "production",
  //     privateKeyOverride: keys
  //   });

  //   setClient(client);
  // };

  // const loadKeys = walletAddress => {
  //   const val = localStorage.getItem(buildLocalStorageKey(walletAddress));
  //   return val ? Buffer.from(val, ENCODING) : null;
  // };

  // const storeKeys = (walletAddress, keys) => {
  //   localStorage.setItem(buildLocalStorageKey(walletAddress), Buffer.from(keys).toString(ENCODING));
  // };

  // const buildLocalStorageKey = walletAddress => `xmtp:keys:${walletAddress}`;

  // const submitMessage = async () => {
  // Will change to iterate over the followers with xmtp
  // const to = "0x33041027dd8F4dC82B6e825FB37ADf8f15d44053";
  // const options = {
  //   conversationId: `talentprotocol.com/${account.senderAddress}-${to}`,
  //   metadata: {
  //     title: "Talent Protocol conversation"
  //   }
  // };
  // const conversation = await client.conversations.newConversation(to, options);

  // await conversation.send(message);

  // hide();
  // };

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
        toast.success(
          <ToastBody
            heading="Success!"
            body={"Your career update was created and send to your supporters and supporters"}
          />
        );
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
