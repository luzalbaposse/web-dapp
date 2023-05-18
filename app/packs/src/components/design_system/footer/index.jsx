import React from "react";
import ThemeContainer from "src/contexts/ThemeContext";
import { P2, H5 } from "src/components/design_system/typography";
import {
  TALENT_PROTOCOL_GITHUB,
  TALENT_PROTOCOL_DISCORD,
  TALENT_PROTOCOL_TWITTER,
  TALENT_PROTOCOL_TELEGRAM,
  ABOUT,
  BLOG,
  FAQ,
  TERMS_HREF,
  PRIVACY_HREF,
  BOUNTIES,
  API
} from "src/utils/constants";
import Tab from "src/components/design_system/tab";
import Divider from "src/components/design_system/other/Divider";

const Footer = () => {
  return (
    <div className="footer-container">
      <Divider className="my-lg-7 mb-7 mt-0" />
      <div className="footer d-flex flex-column">
        <div className="d-flex flex-lg-row flex-column mb-0 mb-lg-7">
          <div className="col-lg-3">
            <a href="/" className="mr-6">
              <H5 bold className="mb-0">
                Talent Protocol
              </H5>
            </a>
            <P2
              className="text-primary-03"
              text="Publish your goals, make meaningful connections and grow your circle of supporters."
            />
          </div>
          <div className="col-lg-3"></div>
          <div className="col-lg-2 d-flex flex-column mt-5 mt-lg-0">
            <P2 className="text-black mb-2" bold text="Project" />
            <Tab href={ABOUT} text="About" type="white" className="mb-2" target="_blank" />
            <Tab href={BLOG} text="Blog" type="white" className="mb-2" target="_blank" />
            <Tab href={BOUNTIES} text="Bounties" type="white" className="mb-2" target="_blank" />
            <Tab href={API} text="API" type="white" className="mb-2" target="_blank" />
          </div>
          <div className="col-lg-2 d-flex flex-column mt-5 mt-lg-0">
            <P2 className="text-black mb-2" bold text="Help" />
            <Tab href={FAQ} text="FAQ" type="white" className="mb-2" target="_blank" />
            <Tab href={TERMS_HREF} text="Terms of Service" type="white" className="mb-2" target="_blank" />
            <Tab href={PRIVACY_HREF} text="Privacy Policy" type="white" className="mb-2" target="_blank" />
          </div>
          <div className="col-lg-2 d-flex flex-column mt-5 mt-lg-0">
            <P2 className="text-black mb-2" bold text="Socials" />
            <Tab href={TALENT_PROTOCOL_TWITTER} text="Twitter" type="white" className="mb-2" target="_blank" />
            <Tab href={TALENT_PROTOCOL_DISCORD} text="Discord" type="white" className="mb-2" target="_blank" />
            <Tab href={TALENT_PROTOCOL_GITHUB} text="Github" type="white" className="mb-2" target="_blank" />
            <Tab href={TALENT_PROTOCOL_TELEGRAM} text="Telegram" type="white" className="mb-2" target="_blank" />
          </div>
        </div>
        <div className="my-5 mt-lg-0 px-2 px-lg-0">
          <Divider />
          <div className="mt-4 d-flex flex-lg-row flex-column">
            <P2
              className="text-primary-03 mb-3 mb-lg-0 mr-4"
              text={`Talent Protocol MTU © ${new Date().getFullYear()}`}
            />
            <P2 className="text-primary-03 mr-4 d-lg-block d-none" text="|" />
            <a href="mailto:contact@talentprotocol.com" target="self" className="mr-4 mb-3 mb-lg-0 text-primary-03">
              Contact us
            </a>
            <P2 className="text-primary-03 mr-4 d-lg-block d-none" text="|" />
            <P2 className="text-primary-03 mb-3 mb-lg-0">
              We would love to hear from you. Let us know your challenges and goals{" "}
              <a href="https://talentprotocol.typeform.com/productfeedback" target="_blank">
                here
              </a>
              .
            </P2>
          </div>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line no-unused-vars
export default props => {
  return (
    <ThemeContainer {...props}>
      <Footer {...props} />
    </ThemeContainer>
  );
};
