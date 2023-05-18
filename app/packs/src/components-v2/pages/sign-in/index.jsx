import React, { useMemo } from "react";
import { TalentThemeProvider } from "@talentprotocol/design-system";
import ThemeContainer from "src/contexts/ThemeContext";
import {
  Container,
  DesktopColoredContainer,
  DesktopInnerContainer,
  DesktopSimpleContainer,
  DesktopSimpleInnerContainer
} from "./styled";
import { SignInFlow } from "../../sign-in-flow";
import { useWindowDimensionsHook } from "../../../utils/window";
import { OnboardingDesktopSlider } from "../../onboarding-desktop-slider";

const SignInPage = props => {
  const { mobile } = useWindowDimensionsHook(false);
  const pageContent = useMemo(() => {
    if (mobile) return <SignInFlow {...props} />;
    return (
      <DesktopInnerContainer>
        <DesktopColoredContainer>
          <OnboardingDesktopSlider />
        </DesktopColoredContainer>
        <DesktopSimpleContainer>
          <DesktopSimpleInnerContainer>
            <SignInFlow {...props} />
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
  return (
    <ThemeContainer>
      <SignInPage {...props} />
    </ThemeContainer>
  );
};
