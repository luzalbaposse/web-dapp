import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Icon, Tag, Typography, MembersList } from "@talentprotocol/design-system";
import {
  Container,
  EntryContainer,
  InfoColumn,
  InfoGroup,
  Tags,
  TeamsList,
  TitleContainer,
  VerifiedNameRow
} from "./styled";
import lamansinetaImg from "./assets/la-mansineta.png";
import top100TalentsImg from "./assets/top-100-talents.jpeg";
import talentHouseImg from "./assets/talent-house.png";

export const RecommendedTeamsWidget = ({}) => {
  const [members, setMembers] = useState({
    top100: [],
    talentHouse: [],
    laMansineta: []
  });
  useEffect(() => {
    Promise.all([
      axios.get("/api/v1/talent?page=1&discovery_row_id=15&per_page=4"),
      axios.get("/api/v1/talent?page=1&discovery_row_id=6&per_page=4"),
      axios.get("/api/v1/talent?page=1&discovery_row_id=12&per_page=4")
    ])
      .then(res => {
        setMembers({
          top100: res[0].data,
          talentHouse: res[1].data,
          laMansineta: res[2].data
        });
      })
      .catch(err => {
        console.error(err);
      });
  }, []);
  return (
    <Container>
      <TitleContainer>
        <Typography specs={{ variant: "h5", type: "bold" }}>Recent Collections</Typography>
      </TitleContainer>
      <TeamsList>
        <EntryContainer href="/discovery/top-100-talent?page=1">
          <Avatar size="md" profileURL="/discovery/top-100-talent?page=1" url={top100TalentsImg} />
          <InfoColumn>
            <InfoGroup>
              <VerifiedNameRow>
                <Typography specs={{ variant: "label2", type: "medium" }} color="primary01">
                  Top 100 Talent
                </Typography>
                {/* <Icon name="verified-2" size={22} color="primary" /> */}
              </VerifiedNameRow>
              <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
                This list of 100 people was curated by the Talent Protocol team to introduce you to the diverse talent
                we have in our community. All of them have an incredible potential and we highly recommend you to
                support them.
              </Typography>
            </InfoGroup>
            <Tags>
              <Tag backgroundColor="primaryTint02" textColor="primaryText" size="small" label="@TOP-100-TALENT" />
            </Tags>
            {!!members.top100.length && (
              <MembersList
                membersImages={[
                  members.top100.talents[0].profile_picture_url,
                  members.top100.talents[1].profile_picture_url,
                  members.top100.talents[2].profile_picture_url,
                  members.top100.talents[3].profile_picture_url
                ]}
                totalMembers={members.top100.pagination.total}
              />
            )}
          </InfoColumn>
          {/* <Button hierarchy="primary" size="small" href="/discovery/top-100-talent?page=1" text="Go to page" /> */}
        </EntryContainer>
        <EntryContainer href="/discovery/talent-house?page=1">
          <Avatar size="md" profileURL="/discovery/talent-house?page=1" url={talentHouseImg} />
          <InfoColumn>
            <InfoGroup>
              <VerifiedNameRow>
                <Typography specs={{ variant: "label2", type: "medium" }} color="primary01">
                  Talent House
                </Typography>
                <Icon name="verified-2" size={22} color="primary" />
              </VerifiedNameRow>
              <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
                High-potential builders and enthusiasts who are taking their first step into Web3 through Talent
                Protocol's initiative Talent House
              </Typography>
            </InfoGroup>
            <Tags>
              <Tag backgroundColor="primaryTint02" textColor="primaryText" size="small" label="@TALENT-HOUSE" />
            </Tags>
            {!!members.talentHouse.length && (
              <MembersList
                membersImages={[
                  members.talentHouse.talents[0].profile_picture_url,
                  members.talentHouse.talents[1].profile_picture_url,
                  members.talentHouse.talents[2].profile_picture_url,
                  members.talentHouse.talents[3].profile_picture_url
                ]}
                totalMembers={members.talentHouse.pagination.total}
              />
            )}
          </InfoColumn>
          {/* <Button hierarchy="primary" size="small" href="/discovery/talent-house?page=1" text="Go to page" /> */}
        </EntryContainer>
        <EntryContainer href="/discovery/la-mansineta?page=1">
          <Avatar size="md" profileURL="/discovery/talent-house?page=1" url={lamansinetaImg} />
          <InfoColumn>
            <InfoGroup>
              <VerifiedNameRow>
                <Typography specs={{ variant: "label2", type: "medium" }} color="primary01">
                  La Mansineta
                </Typography>
                <Icon name="verified-2" size={22} color="primary" />
              </VerifiedNameRow>
              <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
                Adopción, Web3 y Unión 🧶 Subite a #LaMansineta Somos tu ✈️ vuelo a crypto, constructores de la receta
                de comunidades y del virus de adopción 🌎 @TalentHouseWeb3 🧩
              </Typography>
            </InfoGroup>
            <Tags>
              <Tag backgroundColor="primaryTint02" textColor="primaryText" size="small" label="@LA-MANSINETA" />
              <Tag backgroundColor="primaryTint02" textColor="primaryText" size="small" label="LATAM" />
            </Tags>
            {!!members.laMansineta.length && (
              <MembersList
                membersImages={[
                  members.laMansineta.talents[0].profile_picture_url,
                  members.laMansineta.talents[1].profile_picture_url,
                  members.laMansineta.talents[2].profile_picture_url,
                  members.laMansineta.talents[3].profile_picture_url
                ]}
                totalMembers={members.laMansineta.pagination.total}
              />
            )}
          </InfoColumn>
          {/* <Button hierarchy="primary" size="small" href="/discovery/la-mansineta?page=1" text="Go to page" /> */}
        </EntryContainer>
      </TeamsList>
    </Container>
  );
};
