import React from "react";
import { Container, QuestData, QuestEntry, QuestReward, RewardTag } from "./styled";
import { Icon, Typography } from "@talentprotocol/design-system";

export const QuestsWidget = () => {
  return (
    <Container>
      <QuestEntry>
        <QuestData>
          <Typography specs={{ variant: "p2", type: "medium" }}>Subscribe our Youtube channel</Typography>
          <Typography specs={{ variant: "p3", type: "regular" }} color="primary04">
            Start engaging with us.
          </Typography>
        </QuestData>
        <QuestReward>
          <RewardTag>
            <Icon name="flash" size={16} />
            <Typography specs={{ variant: "label3", type: "medium" }} color="primary02">
              2,150 PP
            </Typography>
          </RewardTag>
        </QuestReward>
      </QuestEntry>
      <QuestEntry>
        <QuestData>
          <Typography specs={{ variant: "p2", type: "medium" }}>Subscribe our Youtube channel</Typography>
          <Typography specs={{ variant: "label3", type: "medium" }} color="primary04">
            Start engaging with us.
          </Typography>
        </QuestData>
        <QuestReward>
          <RewardTag>
            <Icon name="flash" size={16} />
            <Typography specs={{ variant: "label3", type: "medium" }} color="primary02">
              2,150 PP
            </Typography>
          </RewardTag>
        </QuestReward>
      </QuestEntry>
      <QuestEntry>
        <QuestData>
          <Typography specs={{ variant: "p2", type: "medium" }}>Subscribe our Youtube channel</Typography>
          <Typography specs={{ variant: "label3", type: "medium" }} color="primary04">
            Start engaging with us.
          </Typography>
        </QuestData>
        <QuestReward>
          <RewardTag>
            <Icon name="flash" size={16} />
            <Typography specs={{ variant: "label3", type: "medium" }} color="primary02">
              2,150 PP
            </Typography>
          </RewardTag>
        </QuestReward>
      </QuestEntry>
    </Container>
  );
};
