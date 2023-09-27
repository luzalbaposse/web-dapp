import React, { useMemo } from "react";
import { Button, Typography } from "@talentprotocol/design-system";
import { Success } from "@talentprotocol/design-system/icon/icons/success";
import { Backdrop, Footer, FooterRight, InnerContainer, TextContainer } from "./styled";
import { useWindowDimensionsHook } from "../../utils/window";

const shopURL = "https://shop.talentprotocol.com/collections/all";
const shopUrlMapping = {
  "ExperienceRewards::Tshirt": "https://shop.talentprotocol.com/products/youll-never-build-alone-t-shirt",
  "ExperienceRewards::Cap": "https://shop.talentprotocol.com/products/dream-build-repeat-cap"
};
const talRewardsTypes = [
  "ExperienceRewards::TinyTal",
  "ExperienceRewards::SmallTal",
  "ExperienceRewards::MediumTal",
  "ExperienceRewards::LargeTal"
];

export const RewardClaimModal = ({ modalState, type, promoCode = "TEST1234" }) => {
  const { mobile } = useWindowDimensionsHook();
  const isTalReward = useMemo(() => talRewardsTypes.includes(type), [type]);

  if (!modalState.isOpen) return <></>;

  return (
    <Backdrop onClick={() => modalState.closeModal()}>
      <InnerContainer onClick={e => e.stopPropagation()}>
        <Success />
        <TextContainer>
          <Typography specs={{ variant: "h5", type: "bold" }}>You claimed this reward!</Typography>
          <Typography color="primary04" specs={{ variant: "p3" }}>
            {isTalReward ? (
              <>
                We’ve submitted the transaction and you’ll be credited as soon as possible on your Talent Protocol
                Wallet.
              </>
            ) : (
              <>
                To redeem your reward in our shop, simply enter the promocode <b> {promoCode} </b> during checkout.
              </>
            )}
          </Typography>
        </TextContainer>
        <Footer>
          <div className={mobile ? "w-100" : undefined}>
            {!isTalReward && (
              <Button
                isStretched={mobile}
                size={mobile ? "large" : "small"}
                text="Visit shop"
                hierarchy="secondary"
                onClick={() => window.open(shopUrlMapping[type] || shopURL, "_blank")}
              />
            )}
          </div>
          <FooterRight>
            <Button
              isStretched={mobile}
              size={mobile ? "large" : "small"}
              text="Dismiss"
              hierarchy="tertiary"
              onClick={() => modalState.closeModal()}
            />
            {!isTalReward ? (
              <Button
                isStretched={mobile}
                size={mobile ? "large" : "small"}
                text={"Copy promocode"}
                hierarchy="primary"
                rightIcon="copy"
                onClick={() => navigator.clipboard.writeText(promoCode)}
              />
            ) : (
              <Button
                isStretched={mobile}
                size={mobile ? "large" : "small"}
                text={"Go to wallet"}
                hierarchy="primary"
                onClick={() => window.open("/wallet")}
              />
            )}
          </FooterRight>
        </Footer>
      </InnerContainer>
    </Backdrop>
  );
};
