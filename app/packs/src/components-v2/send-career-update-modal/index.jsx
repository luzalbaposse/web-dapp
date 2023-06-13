import { Button, Modal, Pills, TextArea, TextLink, Typography } from "@talentprotocol/design-system";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Container, ModalFooter, InLineTextWithComponents, EntryContainer, PillsContainer } from "./styled";
import { toast } from "react-toastify";
import { careerUpdatesService } from "../../api";
import { ToastBody } from "src/components/design_system/toasts";

const bootstrapGoals = goals => () =>
  goals.map(goal => ({ content: goal.title, isSelected: false, isDisabled: false, id: goal.id }));

export const SendCareerUpdateModalV2 = ({ isOpen, closeModal, profile }) => {
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
    careerUpdatesService
      .sendUpdate(message, selectedPills)
      .then(() => {
        toast.success(
          <ToastBody heading="Success!" body={"Your career update was created and sent to your supporters."} />,
          { autoClose: 3000 }
        );
        closeModal();
      })
      .catch(error => {
        console.error(error);
        toast.error(<ToastBody heading="Error!" />, { autoClose: 3000 });
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
        <Typography specs={{ variant: "p1", type: "regular" }} color="primary03">
          Link this update to specific goals for a richer story. This helps your supporters understand
          the progress and context behind your journey.
        </Typography>
        <EntryContainer>
          <TextArea placeholder={`What's new in your career, ${profile?.name}?`} textAreaRef={textAreaRef} />
          <InLineTextWithComponents specs={{ variant: "p2", type: "regular" }} color="primary04">
            Do you need help writing your career update? Ask our community on discord for help
            <TextLink color="primary" text="on Discord." size="small" href="https://discord.gg/talentprotocol" />
          </InLineTextWithComponents>
        </EntryContainer>
        <PillsContainer>
          <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
            Tag your journey
          </Typography>
          {pills.length > 1 ? (
            <Pills pillList={pills} onClick={handlePillClick} />
          ) : (
            <EntryContainer>
              <InLineTextWithComponents specs={{ variant: "p2", type: "regular" }} color="primary04">
                Give your updates more depth with through your journey. Add your first goal to get started
                <TextLink color="primary" text="here." size="small" href={`/u/${profile.username}`} />
              </InLineTextWithComponents>
            </EntryContainer>
          )}
        </PillsContainer>
      </Container>
    </Modal>
  );
};
