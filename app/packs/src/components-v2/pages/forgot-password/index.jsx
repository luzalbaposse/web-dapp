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
import { ForgotPasswordFlow } from "../../forgot-password-flow";

export const ForgotPasswordPage = props => {
  const { mobile } = useWindowDimensionsHook(false);
  const pageContent = useMemo(() => {
    if (mobile) return <ForgotPasswordFlow {...props} />;
    return (
      <DesktopInnerContainer>
        <DesktopColoredContainer>
          <OnboardingDesktopSlider />
        </DesktopColoredContainer>
        <DesktopSimpleContainer>
          <DesktopSimpleInnerContainer>
            <ForgotPasswordFlow {...props} />
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
  return <ForgotPasswordPage {...props} />;
};
