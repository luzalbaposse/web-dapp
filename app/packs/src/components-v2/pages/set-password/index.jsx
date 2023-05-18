import React, { useMemo } from "react";
import { TalentThemeProvider } from "@talentprotocol/design-system";
import {
  Container,
  DesktopColoredContainer,
  DesktopInnerContainer,
  DesktopSimpleContainer,
  DesktopSimpleInnerContainer
} from "./styled";
import { useWindowDimensionsHook } from "../../../utils/window";
import { OnboardingDesktopSlider } from "../../onboarding-desktop-slider";
import { SetPasswordFLow } from "../../set-password-flow";

export const SetPasswordPage = props => {
  const url = new URL(window.location.href);
  const inviteCode = url.pathname.split("/")[2];
  const urlParams = {
    token: url.searchParams.get("token"),
    userId: inviteCode.toLowerCase() !== "join" ? inviteCode : ""
  };
  const parsedProps = {
    ...props,
    ...urlParams
  };
  const { mobile } = useWindowDimensionsHook(false);
  const pageContent = useMemo(() => {
    if (mobile) return <SetPasswordFLow {...parsedProps} />;
    return (
      <DesktopInnerContainer>
        <DesktopColoredContainer>
          <OnboardingDesktopSlider />
        </DesktopColoredContainer>
        <DesktopSimpleContainer>
          <DesktopSimpleInnerContainer>
            <SetPasswordFLow {...parsedProps} />
          </DesktopSimpleInnerContainer>
        </DesktopSimpleContainer>
      </DesktopInnerContainer>
    );
  }, [mobile, props]);
  return (
    <TalentThemeProvider>
      <style>
        {`
          #helpkit-launcherButton--talentprotocol {
            display: none;
          }
        `}
      </style>
      <Container>{pageContent}</Container>
    </TalentThemeProvider>
  );
};

export default props => {
  return <SetPasswordPage {...props} />;
};
