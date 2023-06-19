import React from "react";
import { QuestData, QuestDataRow, QuestEntry, QuestReward, RewardTag } from "./styled";
import { Icon, Tag, Typography } from "@talentprotocol/design-system";
import { useIDKit, IDKitWidget } from "@worldcoin/idkit";
import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";
import { questsService } from "src/api";

export const VerifyHumanityQuest = ({ quest, username, railsContext }) => {
  const { open, setOpen } = useIDKit();

  const verifyHumanityProof = data => {
    questsService
      .completeQuest(quest.quest_type, { worldcoin_proof: data })
      .then(({ data }) => {
        if (data.error) {
          toast.error(<ToastBody heading="Error!" body={data.error} />, {
            autoClose: 3000
          });
        }
        setOpen(false);
        window.location.reload();
      })
      .catch(data => {
        toast.error(<ToastBody heading="Error!" body={"It was not possible to verify your humanity."} />, {
          autoClose: 3000
        });
        setOpen(false);
        console.error("error", data);
      });
  };

  const onQuestClick = questType => {
    if (questType == "verify_humanity") {
      setOpen(true);
    }
  };

  return (
    <QuestEntry isCompleted={!!quest.completed_at} onClick={() => onQuestClick(quest.quest_type)}>
      {!quest.completed_at && open && (
        <IDKitWidget
          app_id={railsContext.worldcoinAppId}
          action={railsContext.worldcoinQuestAction}
          signal={`signal-${username}`}
          credential_types={["orb"]}
          handleVerify={verifyHumanityProof}
        />
      )}
      <QuestData>
        <QuestDataRow>
          {!!quest.completed_at && <Icon name="check" size={16} color="primary" />}
          <Typography specs={{ variant: "p2", type: "medium" }} color={!!quest.completed_at ? "primary" : "primary01"}>
            {quest.title}
          </Typography>
          <Tag color="primary" backgroundColor="primaryTint02" size="small" label="Partner" /> 
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
