import React from "react";
import { Verified2 } from "./Verified2";
import { AvatarLight } from "./AvatarLight";
import { TagLight } from "./TagLight";
import { ButtonLight } from "./ButtonLight";
import "./style.css";

export const SeeProposal = () => {
  return (
    <div className={"community-vote-community-vote-wrapper"}>
      <div className={"community-vote-community-vote"}>
        <div className={"community-vote-frame"}>
          <img
            className={"community-vote-group"}
            src={
                "https://cdn.galxe.com/galaxy/bitget/49d0cb13-c2c6-4908-a9a0-fe09a4b4e659.jpeg?optimizer=image&width=800&quality=100"
            }
          />
          <div className={"community-vote-frame-1264"}>
            <div className={"community-vote-frame-1265"}>
              <div className={"community-vote-frame-1040"}>
                <div className={"community-vote-frame-1259"}>
                  <div className={"community-vote-element-jan"}>26 Jan, 2023</div>
                  <TagLight color="primary" layout="subtle" size="small" tagLabelLightText="Active" />
                </div>
                <p className={"community-vote-this-is-a-trustable-merch-provider"}>
                  This is a trustable Merch provider
                </p>
              </div>
              <div className={"community-vote-frame-1263"}>
                <AvatarLight
                  avatarPlaceholderLightPhotoTrueSizeXsColorDefaultStyle={{
                    minWidth: "32px",
                    width: "unset",
                  }}
                  size="md"
                  state="Default"
                  text="Utrust"
                  token={false}
                />
                <Verified2
                  style={{
                    height: "20.25px",
                    marginRight: "-0.15px",
                    minWidth: "20.29px",
                    width: "unset",
                  }}
                />
              </div>
            </div>
            <p
              className={
                "community-vote-her-career-took-off-in-when-she-started-streaming-strategy-games-on-twitch-in-the-years-of-live-streaming-she-s-amassed-hundreds-of-thousands-of-followers-and-worked-with-fortune-companies-and-AAA-game-developers"
              }
            >
              Her career took off in 2016 when she started streaming strategy games on Twitch. In the 5 years of live
              streaming, she&#39;s amassed hundreds of thousands of followers and worked with Fortune 500 companies and
              AAA game developers.
            </p>
            <div className={"community-vote-group-358"}>
              <div className={"community-vote-text-wrapper"}>Voted Yes</div>
              <div className={"community-vote-element"}>1583</div>
            </div>
            <div className={"community-vote-group-359"}>
              <div className={"community-vote-text-wrapper"}>Voted No</div>
              <div className={"community-vote-element"}>72</div>
            </div>
          <div className={"community-vote-frame-1258"}>
              <ButtonLight
                buttonLabelLightText="Cancel"
                hierarchy="secondary"
                layout="label only"
                size="small"
                state="default"
                stretched={false}
              />
              <div className={"community-vote-frame-1241"}>
                <ButtonLight
                  buttonLabelLightText="Vote No"
                  hierarchy="tertiary"
                  layout="label only"
                  size="small"
                  state="default"
                  stretched={false}
                />
                <ButtonLight
                  buttonLabelLightText="Vote Yes"
                  hierarchy="primary"
                  layout="label only"
                  size="small"
                  state="default"
                  stretched={false}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={"community-vote-top-nav-dark"} onClick={() => window.open("/proposals", "_self")}>
          <div className={"community-vote-rectangle"} />
          <div className={"community-vote-frame-1242"}>
            <div className={"community-vote-frame-1029"}>
              <div
                className={"community-vote-frame-1028"}
                style={{
                  backgroundImage:
                    "url(https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/arrow-2@2x.png)",
                }}
              />
            </div>
            <p className={"community-vote-p"}>This is a trustable Merch provider</p>
          </div>
        </div>
        <div className={"community-vote-non-modal-dialog-footer-light-mobile"}>
          <div className={"community-vote-overlap-group"}>
            <div className={"community-vote-frame-1258"}>
              <ButtonLight
                buttonLabelLightText="Cancel"
                hierarchy="secondary"
                layout="label only"
                size="small"
                state="default"
                stretched={false}
              />
              <div className={"community-vote-frame-1241"}>
                <ButtonLight
                  buttonLabelLightText="Vote No"
                  hierarchy="tertiary"
                  layout="label only"
                  size="small"
                  state="default"
                  stretched={false}
                />
                <ButtonLight
                  buttonLabelLightText="Vote Yes"
                  hierarchy="primary"
                  layout="label only"
                  size="small"
                  state="default"
                  stretched={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeProposal;
