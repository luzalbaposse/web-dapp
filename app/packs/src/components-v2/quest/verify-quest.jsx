import React from "react";
import { QuestData, QuestDataRow, QuestEntry, QuestReward, RewardTag } from "./styled";
import { Icon, Tag, Typography } from "@talentprotocol/design-system";

export const VerifyQuest = ({ quest }) => {
  return (
    <QuestEntry isCompleted={!!quest.completed_at} onClick={() => null}>
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
