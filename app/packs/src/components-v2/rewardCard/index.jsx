import React, { useMemo, useState } from "react";
import { Button, Icon, Typography, useModal } from "@talentprotocol/design-system";
import { ToastBody } from "src/components/design_system/toasts";
import { CostIndicator, RewardContainer, RewardImage, RewardImageContainer, TextContainer } from "./styled";
import { rewardsService } from "../../api/rewards";
import { useMutation } from "@tanstack/react-query";
import { RewardClaimModal } from "../reward-claim-modal";
import { toast } from "react-toastify";

export const RewardCard = ({ reward, profile, refetch }) => {
  const modalState = useModal();
  const isSoldOut = useMemo(() => !reward.stock, [reward]);
  const isClaimed = useMemo(() => reward.claimed, [reward]);
  const hasEnoughXp = useMemo(() => profile?.experience_points_amount >= reward.cost, [profile, reward]);

  const [promoCode, setPromoCode] = useState(reward.merch_code || undefined);

  const claimReward = useMutation(rewardId => rewardsService.claimReward(rewardId), {
    onError: e =>
      toast.error(
        <ToastBody heading="Reward claim failed" body={"An error occured while trying to claim reward: " + e.message} />
      ),
    onSettled: () => refetch(),
    onSuccess: data => {
      setPromoCode(data.claim);
      modalState.openModal();
    }
  });

  const handleClaimReward = async () => {
    if (isSoldOut || isClaimed || !hasEnoughXp) return;
    claimReward.mutate(reward.uuid);
  };

  return (
    <>
      <RewardClaimModal type={reward.type} promoCode={promoCode} modalState={modalState} />
      <RewardContainer>
        <CostIndicator>
          {!isSoldOut && !isClaimed && <Icon name="flash" size={12} />}
          <Typography specs={{ variant: "label3", type: "medium" }} color={"primary02"}>
            {isClaimed ? "Claimed" : isSoldOut ? "Sold Out" : reward.cost.toLocaleString()}
          </Typography>
        </CostIndicator>
        <RewardImageContainer>
          <RewardImage src={reward.image_url} />
        </RewardImageContainer>
        <div>
          <TextContainer>
            <Typography specs={{ variant: "p1", type: "bold" }} color="primary01">
              {reward.title}
            </Typography>
            <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
              {reward.description}
            </Typography>
          </TextContainer>
          {isClaimed ? (
            <Button
              text="Reward claimed"
              hierarchy="secondary"
              size="large"
              isStretched
              isLoading={claimReward.isLoading}
              onClick={modalState.openModal}
            />
          ) : (
            <Button
              text={isClaimed ? "Reward claimed" : isSoldOut ? "Sold Out" : "Claim your Reward"}
              isDisabled={isSoldOut || !hasEnoughXp}
              hierarchy="primary"
              size="large"
              isStretched
              isLoading={claimReward.isLoading}
              onClick={handleClaimReward}
            />
          )}
        </div>
      </RewardContainer>
    </>
  );
};
