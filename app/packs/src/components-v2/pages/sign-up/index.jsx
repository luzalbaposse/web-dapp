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
import { SignUpFlow } from "../../sign-up-flow";
import { useWindowDimensionsHook } from "../../../utils/window";
import { OnboardingDesktopSlider } from "../../onboarding-desktop-slider";

const SignUpPage = props => {
  const { mobile } = useWindowDimensionsHook(false);

  const code = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    const inviteCode = window.location.pathname.split("/").pop();
    return inviteCode.toLowerCase() !== "join" ? inviteCode : "";
  }, []);

  const utmSource = useMemo(() => {
    const url = new URL(window.location);
    const searchParams = new URLSearchParams(url.search);
    return searchParams.get("utm_source");
  }, []);

  const pageContent = useMemo(() => {
    if (mobile) return <SignUpFlow {...props} code={code} utmSource={utmSource} />;
    return (
      <DesktopInnerContainer>
        <DesktopColoredContainer>
          <OnboardingDesktopSlider />
        </DesktopColoredContainer>
        <DesktopSimpleContainer>
          <DesktopSimpleInnerContainer>
            <SignUpFlow {...props} isDesktop code={code} utmSource={utmSource} />
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
      <SignUpPage {...props} railsContext={railsContext} />
    </ThemeContainer>
  );
};
