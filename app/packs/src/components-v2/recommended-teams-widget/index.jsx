import React, { useEffect, useState } from "react";
import { Avatar, Icon, Typography, MembersList, TextLink } from "@talentprotocol/design-system";
import {
  Container,
  EntryContainer,
  InfoColumn,
  InfoGroup,
  TeamsList,
  TitleContainer,
  ViewAllContainer,
  EllipsisContainer
} from "./styled";
import { camelCaseObject } from "src/utils/transformObjects";
import { organizations } from "src/api/organizations";

export const RecommendedTeamsWidget = ({ ellipsisAt = 350 }) => {
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
          setCollectives(data.organizations.slice(0, 3).map(organization => ({ ...camelCaseObject(organization) })));
        }
      })
      .catch(() => {});
  };

  return (
    collectives.length > 0 && (
      <Container>
        <TitleContainer>
          <Typography specs={{ variant: "p1", type: "medium" }} color="primary01">
            Recommended Collectives
          </Typography>
        </TitleContainer>
        <TeamsList>
          {collectives.map((collective, index) => (
            <EntryContainer href={`/collectives/${collective.slug}`} key={collective.slug || index}>
              <Avatar size="md" square={true} profileURL={`/collectives/${collective.slug}`} url={collective.logoUrl} />
              <InfoColumn>
                <InfoGroup>
                  <EllipsisContainer ellipsisAt={!!collective.verified ? ellipsisAt - 20 : ellipsisAt}>
                    <Typography specs={{ variant: "label2", type: "medium" }} color="primary01">
                      {collective.name}
                    </Typography>
                    {!!collective.verified && <Icon name="verified-2" size={16} />}
                  </EllipsisContainer>
                  <EllipsisContainer ellipsisAt={ellipsisAt}>
                    <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
                      {collective.description}
                    </Typography>
                  </EllipsisContainer>
                </InfoGroup>
                {collective.users.length > 0 && (
                  <MembersList
                    membersImages={collective.users.map(user => user.profilePictureUrl)}
                    totalMembers={collective.membersCount}
                  />
                )}
              </InfoColumn>
              {/* <Button hierarchy="primary" size="small" href="/discovery/top-100-talent?page=1" text="Go to page" /> */}
            </EntryContainer>
          ))}
          <ViewAllContainer>
            <TextLink href="/collectives" text="Show more" rightIcon="carret" color="primary" size="small" />
          </ViewAllContainer>
        </TeamsList>
      </Container>
    )
  );
};
