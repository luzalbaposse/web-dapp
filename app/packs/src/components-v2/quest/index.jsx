import React from "react";
import { QuestData, QuestDataRow, QuestEntry, QuestReward, RewardTag } from "./styled";
import { Icon, Typography } from "@talentprotocol/design-system";
import { VerifyHumanityQuest } from "./verifyHumanityQuest";

const QUEST_TYPE_MAP = {
  profile_picture: "/u/__username__",
  three_talent_subscribe: "/talent",
  three_journey_entries: "/u/__username__#journey",
  send_career_update: "/home",
  verify_identity: "/u/__username__",
  five_subscribers: "/quests?tab=invites",
  supporting_three: "/talent",
  connect_wallet: "",
  complete_profile: "/u/__username__",
  verify_humanity: ""
};

export const Quest = ({ quest, username, railsContext }) => {
  if (quest.quest_type == "verify_humanity") {
    return <VerifyHumanityQuest quest={quest} username={username} railsContext={railsContext} />;
  }
  return (
    <QuestEntry
      isCompleted={!!quest.completed_at}
      href={
        !!quest.completed_at || !QUEST_TYPE_MAP[quest.quest_type]
          ? undefined
          : QUEST_TYPE_MAP[quest.quest_type].replace("__username__", username)
      }
    >
      <QuestData>
        <QuestDataRow>
          {!!quest.completed_at && <Icon name="check" size={16} color="primary" />}
          <Typography specs={{ variant: "p2", type: "medium" }} color={!!quest.completed_at ? "primary" : "primary01"}>
            {quest.title}
          </Typography>
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
