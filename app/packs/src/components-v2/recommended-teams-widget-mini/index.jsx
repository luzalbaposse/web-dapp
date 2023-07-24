import React, { useEffect, useState } from "react";
import { Avatar, Tag, Typography, MembersList, TextLink } from "@talentprotocol/design-system";
import {
  Container,
  EntryContainer,
  InfoColumn,
  InfoGroup,
  Tags,
  TeamsList,
  TitleContainer,
  VerifiedNameRow,
  ViewAllContainer
} from "./styled";
import { camelCaseObject } from "src/utils/transformObjects";
import { organizations } from "src/api/organizations";

export const RecommendedTeamsWidgetMini = ({ }) => {
  const [collectives, setCollectives] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", 1);
    params.set("per_page", 3);
    loadCollectives(params);
  }, []);

  const loadCollectives = params => {
    organizations
      .getOrganizations(params.toString())
      .then(({ data }) => {
        if (data.organizations) {
          setCollectives(data.organizations.slice(0, 2).map(organization => ({ ...camelCaseObject(organization) })));
        }
      })
      .catch(() => { });
  };

  return (
    <Container>
      <TitleContainer>
        <Typography specs={{ variant: "h5", type: "bold" }}>Recommended Collectives</Typography>
      </TitleContainer>
      <TeamsList>
        {collectives.map((collective, index) => (
          <EntryContainer href={`/collectives/${collective.slug}`} key={collective.slug || index}>
            <Avatar size="md" profileURL={`/collectives/${collective.slug}`} url={collective.logoUrl} />
            <InfoColumn>
              <InfoGroup>
                <VerifiedNameRow>
                  <Typography specs={{ variant: "label2", type: "medium" }} color="primary01">
                    {collective.name}
                  </Typography>
                  {/* <Icon name="verified-2" size={22} color="primary" /> */}
                </VerifiedNameRow>
                <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
                  {collective.description}
                </Typography>
              </InfoGroup>
              <Tags>
                <Tag
                  backgroundColor="primaryTint02"
                  textColor="primaryText"
                  size="small"
                  label={collective.type === "team" ? "Company" : "Community"}
                />
              </Tags>
              {collective.users.length > 0 && (
                <MembersList
                  membersImages={collective.users
                    .filter((user, index) => index < 4)
                    .map(user => user.profilePictureUrl)}
                  totalMembers={collective.users.length}
                />
              )}
            </InfoColumn>
            {/* <Button hierarchy="primary" size="small" href="/discovery/top-100-talent?page=1" text="Go to page" /> */}
          </EntryContainer>
        ))}
        <ViewAllContainer>
          <TextLink href="/collectives" text="View all" rightIcon="carret" color="primary" size="medium" />
        </ViewAllContainer>
      </TeamsList>
    </Container>
  );
};
