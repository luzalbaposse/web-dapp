import React, { useState } from "react";
import { QuestData, QuestDataRow, QuestEntry, QuestReward, RewardTag } from "./styled";
import { Icon, Tag, Typography } from "@talentprotocol/design-system";
import PersonaVerificationConfirmationModal from "src/components/profile/PersonaVerificationConfirmationModal";

export const VerifyQuest = ({ quest, username, railsContext }) => {
  const [showWithPersonaModal, setShowWithPersonaModal] = useState(false);

  const onQuestClick = questType => {
    if (questType == "verify_identity") {
      setShowWithPersonaModal(true);
    }
  };

  return (
    <QuestEntry isCompleted={!!quest.completed_at} onClick={() => onQuestClick(quest.quest_type)}>
      {!quest.completed_at && (
        <PersonaVerificationConfirmationModal
          show={showWithPersonaModal}
          setShow={setShowWithPersonaModal}
          hide={() => setShowWithPersonaModal(false)}
          username={username}
          railsContext={railsContext}
        />
      )}
      <QuestData>
        <QuestDataRow>
          {!!quest.completed_at && <Icon name="check" size={16} color="primary" />}
          <Typography specs={{ variant: "p2", type: "medium" }} color={!!quest.completed_at ? "primary" : "primary01"}>
            {quest.title}
          </Typography>
          {quest.new && <Tag textColor="bg01" backgroundColor="primary" size="small" label="New" />}
          <Tag textColor="primary-text" backgroundColor="primaryTint02" size="small" label="Partner" />
        </QuestDataRow>
        <Typography specs={{ variant: "p3", type: "regular" }} color={!!quest.completed_at ? "primary" : "primary04"}>
          {quest.description}
        </Typography>
      </QuestData>
      <QuestReward>
        <RewardTag>
          <Icon name="flash" size={12} />
          <Typography
            specs={{ variant: "label3", type: "medium" }}
            color={!!quest.completed_at ? "primary" : "primary02"}
          >
            + {quest.experience_points_amount.toLocaleString()}
          </Typography>
        </RewardTag>
      </QuestReward>
    </QuestEntry>
  );
};
