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
import { OnboardingFlow } from "../../onboarding-flow";
import { useWindowDimensionsHook } from "../../../utils/window";
import { OnboardingDesktopSlider } from "../../onboarding-desktop-slider";

const OnboardingPage = props => {
  const { mobile } = useWindowDimensionsHook(false);

  const code = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    const inviteCode = window.location.pathname.split("/").pop();
    return inviteCode.toLowerCase() !== "join" ? inviteCode : "";
  }, []);
  const pageContent = useMemo(() => {
    if (mobile) return <OnboardingFlow {...props} code={code} />;
    return (
      <DesktopInnerContainer>
        <DesktopColoredContainer>
          <OnboardingDesktopSlider />
        </DesktopColoredContainer>
        <DesktopSimpleContainer>
          <DesktopSimpleInnerContainer>
            <OnboardingFlow {...props} isDesktop code={code} />
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

export default (props, railsContext) => {
  return () => (
    <ThemeContainer>
      <OnboardingPage {...props} railsContext={railsContext} />
    </ThemeContainer>
  );
};
