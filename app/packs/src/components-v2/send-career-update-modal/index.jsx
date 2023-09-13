import { Button, Modal, Pills, TextArea, TextLink, Typography } from "@talentprotocol/design-system";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Container, ModalFooter, InLineTextWithComponents, EntryContainer, PillsContainer } from "./styled";
import { useCareerUpdatesStore } from "src/contexts/state";

const bootstrapGoals = goals => () =>
  goals.map(goal => ({ content: goal.title, isSelected: false, isDisabled: false, id: goal.id }));

export const SendCareerUpdateModal = ({ isOpen, closeModal, profile }) => {
  const { createCareerUpdate } = useCareerUpdatesStore();
  const textAreaRef = React.useRef(null);
  const [pills, setPills] = useState(bootstrapGoals(profile.goals));

  useEffect(() => {
    if (isOpen) {
      setPills(bootstrapGoals(profile.goals));
    }
  }, [isOpen]);

  const sendCareerUpdate = useCallback(() => {
    const message = textAreaRef.current.value;
    if (message.replace(/\s+/g, "") == "") {
      return;
    }
    const selectedPills = pills.reduce((acc, pill) => {
      if (pill.isSelected) {
        acc.push({ id: pill.id });
      }
      return acc;
    }, []);
    createCareerUpdate(message, selectedPills).then(() => {
      closeModal();
    });
  }, [textAreaRef, pills, closeModal]);
  const modalFooter = useMemo(
    () => (
      <ModalFooter>
        <Button hierarchy="tertiary" text="Cancel" onClick={closeModal} size="small" />
        <Button hierarchy="primary" text="Send Update" onClick={sendCareerUpdate} size="small" />
      </ModalFooter>
    ),
    [closeModal, sendCareerUpdate]
  );
  const handlePillClick = useCallback(
    index => {
      const newPills = [...pills];
      newPills[index].isSelected = !newPills[index].isSelected;
      setPills(newPills);
    },
    [pills]
  );
  return (
    <Modal title="Career update" isOpen={isOpen} closeModal={closeModal} footer={modalFooter}>
      <Container>
        <InLineTextWithComponents specs={{ variant: "p2", type: "regular" }} color="primary03">
          Share your progress with your subscribers. They will receive a DM, so make sure you end with a question or an
          ask.
        </InLineTextWithComponents>
        <EntryContainer>
          <TextArea placeholder={`What's new in your career, ${profile?.name}?`} textAreaRef={textAreaRef} />
          <InLineTextWithComponents specs={{ variant: "p2", type: "regular" }} color="primary04">
            Need help writing your career update? Check some tips
            <TextLink
              color="primary"
              text="here."
              size="small"
              href="https://blog.talentprotocol.com/supporter-updates-guide/"
              newPage
            />
          </InLineTextWithComponents>
        </EntryContainer>
        <PillsContainer>
          <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
            Tag your goals
          </Typography>
          {!!pills.length ? (
            <Pills pillList={pills} onClick={handlePillClick} />
          ) : (
            <EntryContainer>
              <InLineTextWithComponents specs={{ variant: "p2", type: "regular" }} color="primary04">
                Updates are even more useful if associated with goals. Create your first goal
                <TextLink color="primary" text="here." size="small" href={`/u/${profile.username}`} />
              </InLineTextWithComponents>
            </EntryContainer>
          )}
        </PillsContainer>
      </Container>
    </Modal>
  );
};
