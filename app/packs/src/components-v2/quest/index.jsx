import React from "react";
import { QuestData, QuestDataRow, QuestEntry, QuestReward, RewardTag } from "./styled";
import { Icon, Tag, Typography } from "@talentprotocol/design-system";
import { VerifyHumanityQuest } from "./verify-humanity-quest";
import { questsService } from "src/api";
import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";
// import { VerifyQuest } from "./verify-quest";

const QUEST_TYPE_MAP = {
  active_goal: "u/__username__?tab=goals",
  complete_profile: "/u/__username__",
  connect_wallet: "",
  create_talent_mate: "https://mates.talentprotocol.com/",
  five_subscribers: "/quests?tab=invites",
  invite_three: "?tab=invites",
  profile_picture: "/u/__username__",
  send_career_update: "/home",
  sponsor_talent: "/talent",
  supporting_three: "/talent",
  three_journey_entries: "/u/__username__#journey",
  three_talent_subscribe: "/talent",
  three_token_holders: "/u/__username__#token",
  verify_humanity: "",
  verify_identity: "/u/__username__",
  galxe_verification: "",
  takeoff_vote: "/collectives/takeoff-istanbul"
};

export const Quest = ({ quest, username, railsContext, setRefreshQuests }) => {
  if (quest.quest_type == "verify_humanity") {
    return <VerifyHumanityQuest quest={quest} username={username} railsContext={railsContext} />;
  }
  if (quest.quest_type == "verify_identity") {
    return <></>;
    // return <VerifyQuest quest={quest} username={username} railsContext={railsContext} />;
  }

  const onQuestClick = event => {
    if (quest.quest_type == "galxe_verification" && !quest.completed_at) {
      event.preventDefault();

      questsService
        .completeQuest(quest.quest_type, { id: username })
        .then(() => {
          toast.success(<ToastBody heading="Verified!" body={"We have confirm you own a Galxe passport!"} />, {
            autoClose: 3000
          });
          setRefreshQuests(true);
        })
        .catch(error => {
          console.error(error);
          toast.error(<ToastBody heading="Error!" body={error.response.data.error} />, {
            autoClose: 5000
          });
        });
    }
  };

  return (
    <QuestEntry
      isCompleted={!!quest.completed_at}
      href={
        !!quest.completed_at || !QUEST_TYPE_MAP[quest.quest_type]
          ? undefined
          : QUEST_TYPE_MAP[quest.quest_type].replace("__username__", username)
      }
      target={QUEST_TYPE_MAP[quest.quest_type]?.includes("http") ? "_blank" : "_self"}
      onClick={e => onQuestClick(e)}
    >
      <QuestData>
        <QuestDataRow>
          {!!quest.completed_at && <Icon name="check" size={16} color="primary" />}
          <Typography specs={{ variant: "p2", type: "medium" }} color={!!quest.completed_at ? "primary" : "primary01"}>
            {quest.title}
          </Typography>
          {quest.new && <Tag textColor="bg01" backgroundColor="primary" size="small" label="New" />}
          {quest.sponsored && (
            <Tag textColor="primary-text" backgroundColor="primaryTint02" size="small" label="Partner" />
          )}
        </QuestDataRow>
        <Typography specs={{ variant: "p3", type: "regular" }} color={!!quest.completed_at ? "primary" : "primary04"}>
          {quest.description}
        </Typography>
      </QuestData>
      <QuestReward>
        {quest.tal_reward > 0 && (
          <RewardTag>
            <Typography
              specs={{ variant: "label3", type: "medium" }}
              color={!!quest.completed_at ? "primary" : "primary02"}
            >
              {quest.tal_reward.toLocaleString()} $TAL
            </Typography>
          </RewardTag>
        )}
        <RewardTag>
          <Icon name="flash" size={12} />
          <Typography
            specs={{ variant: "label3", type: "medium" }}
            color={!!quest.completed_at ? "primary" : "primary02"}
          >
            {quest.experience_points_amount.toLocaleString()}
          </Typography>
        </RewardTag>
      </QuestReward>
    </QuestEntry>
  );
};
