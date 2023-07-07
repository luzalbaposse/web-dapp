import { Avatar, Icon, Tag, Typography } from "@talentprotocol/design-system";
import React from "react";
import { Banner } from "src/components-v2/banner";
import {
  BannerContainer,
  DataContainer,
  HeaderContainer,
  InfoColumn,
  Logo,
  LogoColumn,
  LogoContainer,
  MemberAvatar,
  MemberAvatars,
  MemberCount,
  MembersContainer,
  TagsContainer,
  Title
} from "./styled";
import SocialRow from "src/components/profile/SocialRow";

const Overview = ({ collective }) => {
  const mainTag = collective.type === "team" ? "Company" : "Community";
  const members = collective.users;
  const memberCount = members.length;

  return (
    <div>
      <BannerContainer>
        <LogoColumn>
          <LogoContainer>
            <Logo src={collective.logoUrl} />
          </LogoContainer>
        </LogoColumn>
        <Banner src={collective.bannerUrl} />
      </BannerContainer>
      <DataContainer>
        <InfoColumn>
          <HeaderContainer>
            <Title>
              <Typography color="primary01" specs={{ variant: "h4" }}>
                {collective.name}
              </Typography>
              {collective.verified && <Icon name="verified-2" size={20} />}
            </Title>
            <TagsContainer>
              <Tag backgroundColor="primary" key={mainTag} label={mainTag} size="medium" textColor="bg01" />
              {collective.tags.map(tag => (
                <Tag backgroundColor="primaryTint02" key={tag} label={tag} size="medium" textColor="primaryText" />
              ))}
            </TagsContainer>
            {collective.description && (
              <Typography color="primary03" specs={{ variant: "p1" }}>
                {collective.description}
              </Typography>
            )}
          </HeaderContainer>
          {collective.location && (
            <Typography color="primary03" specs={{ variant: "p2" }}>
              {collective.location}
            </Typography>
          )}
          <MembersContainer>
            {memberCount > 0 && (
              <MemberAvatars>
                {members.map(user => (
                  <MemberAvatar key={user.id}>
                    <Avatar size="sm" url={user.profile_picture_url} />
                  </MemberAvatar>
                ))}
              </MemberAvatars>
            )}
            <MemberCount>
              <Typography color="primary01" specs={{ type: "bold", variant: "p2" }}>
                {memberCount}
              </Typography>{" "}
              <Typography color="primary04" specs={{ variant: "p2" }}>
                {memberCount === 1 ? "member" : "members"}
              </Typography>
            </MemberCount>
          </MembersContainer>
          <SocialRow profile={collective} />
        </InfoColumn>
      </DataContainer>
    </div>
  );
};

export default Overview;
