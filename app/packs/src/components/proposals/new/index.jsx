import React from "react";
import { SwitchLight } from "./SwitchLight";
import { InputFieldsLight } from "./InputFieldsLight";
import { ButtonLight } from "./ButtonLight";
import "./style.css";

export const NewProposal = () => {
  return (
    <div className={"community-submit-community-submit-wrapper"}>
      <div className={"community-submit-community-submit"}>
        <div className={"community-submit-overlap"}>
          <div className={"community-submit-frame"}>
            <div className={"community-submit-frame-4"}>
              <div className={"community-submit-frame-361"}>
                <div className={"community-submit-input-fields-light"}>
                  <div className={"community-submit-text-wrapper"}>SBT artwork</div>
                  <img
                    className={"community-submit-group"}
                    src={
                      "https://cdn.galxe.com/galaxy/bitget/49d0cb13-c2c6-4908-a9a0-fe09a4b4e659.jpeg?optimizer=image&width=800&quality=100"
                    }
                  />
                </div>
                <InputFieldsLight
                  bottomCaption={false}
                  button={false}
                  buttonDarkStyle={{
                    minWidth: "328px",
                  }}
                  description
                  icon={false}
                  label
                  size="base"
                  state="default"
                  style={{
                    width: "328px",
                  }}
                  text="Title"
                  text1="Please enter your SBT title"
                  textStyle={{
                    marginRight: "-152.00px",
                  }}
                  topRightCaption={false}
                />
                <InputFieldsLight
                  bottomCaption={false}
                  button={false}
                  buttonDarkStyle={{
                    minWidth: "328px",
                  }}
                  description={false}
                  icon={false}
                  label
                  size="big"
                  state="default"
                  style={{
                    width: "328px",
                  }}
                  text="Description"
                  topRightCaption={false}
                />
              </div>
              <div className={"community-submit-frame-1241"}>
                <div className={"community-submit-input-fields-light"}>
                  <div className={"community-submit-frame-1240"}>
                    <SwitchLight
                      layout="on"
                      stat="enable"
                      style={{
                        minWidth: "44px",
                        width: "unset",
                      }}
                    />
                    <div className={"community-submit-text-wrapper"}>Unlimited supply</div>
                  </div>
                  <div className={"community-submit-button-dark"}>
                    <div className={"community-submit-frame-1"}>
                      <div className={"community-submit-maximum-supply"}>Maximum supply</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={"community-submit-frame-2"}>
                <ButtonLight
                  onClick={() => window.open("/proposals", "_self")}
                  buttonLabelLightText="Cancel"
                  hierarchy="tertiary"
                  layout="label only"
                  size="small"
                  state="default"
                  stretched={false}
                />
                <ButtonLight
                  buttonLabelLightText="Confirm new proposal"
                  onClick={() => alert()}
                  hierarchy="primary"
                  layout="label only"
                  size="small"
                  state="default"
                  stretched={false}
                />
              </div>
            </div>
          </div>
          <div className={"community-submit-top-nav-dark"}>
            <div className={"community-submit-rectangle"} />
            <div className={"community-submit-frame-1242"}>
              <div className={"community-submit-frame-1029"}>
                <div
                  onClick={() => window.open("/proposals", "_self")}
                  className={"community-submit-frame-1028"}
                  style={{
                    backgroundImage:
                      "url(https://anima-uploads.s3.amazonaws.com/projects/63d17b550d6f95510a75a056/releases/63d17dffd4c21235ffab3b04/img/arrow-2@2x.png)",
                  }}
                />
              </div>
              <div className={"community-submit-text-wrapper"}>Submit your proposal</div>
            </div>
          </div>
        </div>
        <div className={"community-submit-div"}>
          <div className={"community-submit-talent-protocol"}>Talent Protocol</div>
          <div className={"community-submit-rectangle"} />
          <div className={"community-submit-frame-1239"}>
            <img
              className={"community-submit-img"}
              src={
                "https://anima-uploads.s3.amazonaws.com/projects/63d17b550d6f95510a75a056/releases/63d17dffd4c21235ffab3b04/img/search-3@2x.png"
              }
            />
            <img
              className={"community-submit-img"}
              src={
                "https://anima-uploads.s3.amazonaws.com/projects/63d17b550d6f95510a75a056/releases/63d17dffd4c21235ffab3b04/img/bell-3@2x.png"
              }
            />
            <img
              className={"community-submit-ellipse"}
              src={
                "https://anima-uploads.s3.amazonaws.com/projects/63d17b550d6f95510a75a056/releases/63d17dffd4c21235ffab3b04/img/ellipse-1-26@2x.png"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProposal;