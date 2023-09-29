import React, { useMemo } from "react";
import { TitleContainer } from "../styled";
import { Typography } from "@talentprotocol/design-system";
import { RewardCard } from "../../../rewardCard";
import { rewardsService } from "../../../../api/rewards";
import { Container, DesktopGrid } from "./styled";
import { useQuery } from "@tanstack/react-query";

export const Rewards = ({ profile }) => {
  const { data: rewards, refetch } = useQuery({
    queryKey: ["experienceRewards"],
    queryFn: async () => {
      const { data } = await rewardsService.getRewards();
      return data.rewards;
    }
  });

  const memoizedRewards = useMemo(
    () =>
      (rewards || []).map(reward => (
        <RewardCard key={reward.title} refetch={refetch} reward={reward} profile={profile} />
      )),
    [refetch, profile, rewards]
  );

  return (
    <Container>
      <TitleContainer>
        <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
          Claim Rewards
        </Typography>
        <Typography specs={{ variant: "p2", type: "medium" }} color="primary03">
          The more Experience Points you have, the more rewards you can access. XP are your reputation, so they are
          never lost, but you can only claim each reward once.
        </Typography>
      </TitleContainer>
      <DesktopGrid>{memoizedRewards}</DesktopGrid>
    </Container>
  );
};
