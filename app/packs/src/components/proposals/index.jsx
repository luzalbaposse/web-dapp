import React from "react";
import { TagLight } from "./TagLight";
import { AvatarLight } from "./AvatarLight";
import { Verified2 } from "./Verified2";
import { PillLight } from "./PillLight";
import { ButtonLight } from "./ButtonLight";
import "./style.css";

export const Proposals = () => {
  return (
    <div className={"community-community-wrapper"}>
      <div className={"community-community"}>
        <div className={"community-frame"}>
          <div className={"community-div"} onClick={() => window.open("/proposals/1", "_self")}>
            <img
              className={"community-group"}
              src={
                "https://cdn.galxe.com/galaxy/bitget/bb19083c-20d2-40a2-91da-3c9024da4a65.jpeg?optimizer=image&width=800&quality=100"
              }
            />
            <div className={"community-frame-1021"}>
              <div className={"community-frame-370"}>
                <div className={"community-frame-1259"}>
                  <div className={"community-element-jan"}>26 Jan, 2023</div>
                  <TagLight color="primary" layout="subtle" size="small" tagLabelLightText="Active" />
                </div>
                <p className={"community-this-is-a-trustable-merch-provider"}>This is a trustable Merch provider.</p>
              </div>
              <p className={"community-this-non-transferable-NFT-SBT-serves-as-a-recognition-of-your"}>
                This non-transferable NFT (SBT) serves as a recognition of your...
              </p>
            </div>
            <div className={"community-frame-1262"}>
              <AvatarLight
                avatarPlaceholderLightPhotoTrueSizeXsColorDefaultStyle={{
                  minWidth: "32px",
                  width: "unset",
                }}
                size="md"
                state="Default"
                text="Solana"
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
          <div className={"community-div"} onClick={() => window.open("/proposals/2", "_self")}>
            <img
              className={"community-group"}
              src={
                "https://cdn.galxe.com/galaxy/bitget/b45ea8ea-cdec-4ae8-8c50-5baa03b729fb.png?optimizer=image&width=800&quality=100"
              }
            />
            <div className={"community-frame-1021"}>
              <div className={"community-frame-370"}>
                <div className={"community-frame-1259"}>
                  <div className={"community-element-jan"}>26 Jan, 2023</div>
                  <TagLight color="primary" layout="subtle" size="small" tagLabelLightText="Active" />
                </div>
                <p className={"community-this-is-a-trustable-merch-provider"}>This is a trustable Merch provider.</p>
              </div>
              <p className={"community-this-non-transferable-NFT-SBT-serves-as-a-recognition-of-your"}>
                This non-transferable NFT (SBT) serves as a recognition of your...
              </p>
            </div>
            <div className={"community-frame-1262"}>
              <AvatarLight
                avatarPlaceholderLightPhotoTrueSizeXsColorDefaultStyle={{
                  minWidth: "32px",
                  width: "unset",
                }}
                size="md"
                state="Default"
                text="Polygon"
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
          <div className={"community-div"} onClick={() => window.open("/proposals/3", "_self")}>
            <img
              className={"community-group"}
              src={
                "https://cdn.galxe.com/galaxy/bitget/101d7daa-2e95-4653-aadf-40bac2b51084.jpeg?optimizer=image&width=800&quality=100"
              }
            />
            <div className={"community-frame-1021"}>
              <div className={"community-frame-370"}>
                <div className={"community-frame-1259"}>
                  <div className={"community-element-jan"}>26 Jan, 2023</div>
                  <TagLight color="primary" layout="subtle" size="small" tagLabelLightText="Active" />
                </div>
                <p className={"community-this-is-a-trustable-merch-provider"}>This is a trustable Merch provider.</p>
              </div>
              <p className={"community-this-non-transferable-NFT-SBT-serves-as-a-recognition-of-your"}>
                This non-transferable NFT (SBT) serves as a recognition of your...
              </p>
            </div>
            <div className={"community-frame-1262"}>
              <AvatarLight
                avatarPlaceholderLightPhotoTrueSizeXsColorDefaultStyle={{
                  minWidth: "32px",
                  width: "unset",
                }}
                size="md"
                state="Default"
                text="Polygon"
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
        </div>
        <div className={"community-frame-1261"}>
          <PillLight buttonLabelLightText="All" state="default" />
          <PillLight buttonLabelLightText="Active" state="active" />
          <PillLight buttonLabelLightText="Approved" state="default" />
          <PillLight buttonLabelLightText="Reproved" state="default" />
        </div>
        <div className={"community-page-header-light-mobile"}>
          <div className={"community-frame-1242"}>
            <div className={"community-frame-1243"}>
              <div className={"community-frame-1240"}>
                <div className={"community-page-title"}>Community Proposals</div>
                <p
                  className={
                    "community-below-are-listed-the-stats-for-NFT-collections-and-individual-assets-that-have-sold-for-the-highest-prices-we-the-data-list-in-descending-order"
                  }
                >
                  Submit a proposal or cast your vote on the projects you believe should be granted the ability to
                  create a non-transferable NFT (SBT).
                </p>
              </div>
              <div className={"community-frame-1244"}>
                <ButtonLight
                  buttonLabelLightText="Submit a proposal"
                  hierarchy="primary"
                  layout="label only"
                  size="large"
                  state="default"
                  stretched
                  onClick={() => window.open("/proposals/new","_self")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proposals;