import React, { useState } from "react";
import { Button, TextLink, Modal, Typography } from "@talentprotocol/design-system";
import Checkbox from "src/components/design_system/checkbox";
import { OutterContainer, Container, BottomContainer, InnerContainer } from "./styled";

export const PhisingAwarenessModal = ({ url, modalState }) => {
  const [phishingAwarenessDisabled, setPhishingAwarenessDisabled] = useState(false);

  const onCheckboxClick = e => {
    sessionStorage.setItem("phishing-awareness-disabled", `${e.target.checked}`);
    setPhishingAwarenessDisabled(e.target.checked);
  };

  return (
    <Modal title="Before you go" isOpen={modalState.isOpen} closeModal={modalState.closeModal}>
      <OutterContainer>
        <Container>
          <InnerContainer>
            <Typography specs={{ variant: "p2", type: "regular" }} color="primary02">
              Always double check that the links that were sent to you are legitimate. It's a dangerous world out there.
            </Typography>
            <TextLink color="primary" text={url} href={url} newPage size="small" />
          </InnerContainer>
          <Checkbox checked={phishingAwarenessDisabled} onChange={e => onCheckboxClick(e)}>
            <Typography specs={{ variant: "p2", type: "regular" }} color="primary01">
              Don't show this again.
            </Typography>
          </Checkbox>
        </Container>
        <BottomContainer>
          <Button hierarchy="tertiary" size="small" text="Cancel" onClick={modalState.closeModal} />
          <Button
            hierarchy="primary"
            size="small"
            text="I understand"
            newPage
            href={url}
            onClick={modalState.closeModal}
          />
        </BottomContainer>
      </OutterContainer>
    </Modal>
  );
};
