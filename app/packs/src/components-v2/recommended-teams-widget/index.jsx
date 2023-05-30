import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Tag, Typography, MembersList, TextLink } from "@talentprotocol/design-system";
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
import { discoveryRowsService } from "src/api/discovery-rows";

export const RecommendedTeamsWidget = ({}) => {
  const [discoveryRows, setDiscoveryRows] = useState([]);

  useEffect(() => {
    loadRows();
  }, []);

  const loadRows = async () => {
    const rowsResponse = await discoveryRowsService.getDiscoveryRows(1, 3, true);

    let discoveryRows = [];
    const rows = rowsResponse.data.discovery_rows;
    let talentsResponse = await axios.get(`/api/v1/talent?page=1&discovery_row_id=${rows[0].id}&per_page=4`);
    discoveryRows = [
      {
        discoveryRow: rows[0],
        talentsData: talentsResponse.data
      }
    ];
    talentsResponse = await axios.get(`/api/v1/talent?page=1&discovery_row_id=${rows[1].id}&per_page=4`);
    discoveryRows = [
      ...discoveryRows,
      {
        discoveryRow: rows[1],
        talentsData: talentsResponse.data
      }
    ];
    talentsResponse = await axios.get(`/api/v1/talent?page=1&discovery_row_id=${rows[2].id}&per_page=4`);
    discoveryRows = [
      ...discoveryRows,
      {
        discoveryRow: rows[2],
        talentsData: talentsResponse.data
      }
    ];

    setDiscoveryRows(discoveryRows);
  };
  return (
    <Container>
      <TitleContainer>
        <Typography specs={{ variant: "h5", type: "bold" }}>Recommended Collections</Typography>
        <TextLink href="/discovery" text="View all" rightIcon="carret" color="primary" size="medium" />
      </TitleContainer>
      <TeamsList>
        {discoveryRows.map(row => (
          <EntryContainer href={`/discovery/${row.discoveryRow.slug}?page=1`}>
            <Avatar
              size="md"
              profileURL={`/discovery/${row.discoveryRow.slug}?page=1`}
              url={row.discoveryRow.partnership.logo_url}
            />
            <InfoColumn>
              <InfoGroup>
                <VerifiedNameRow>
                  <Typography specs={{ variant: "label2", type: "medium" }} color="primary01">
                    {row.discoveryRow.title}
                  </Typography>
                  {/* <Icon name="verified-2" size={22} color="primary" /> */}
                </VerifiedNameRow>
                <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
                  {row.discoveryRow.description}
                </Typography>
              </InfoGroup>
              <Tags>
                <Tag
                  backgroundColor="primaryTint02"
                  textColor="primaryText"
                  size="small"
                  label={`@${row.discoveryRow.slug.toUpperCase()}`}
                />
              </Tags>
              {!!row.talentsData.length && (
                <MembersList
                  membersImages={[
                    row.talentsData.talents[0].profile_picture_url,
                    row.talentsData.talents[1].profile_picture_url,
                    row.talentsData.talents[2].profile_picture_url,
                    row.talentsData.talents[3].profile_picture_url
                  ]}
                  totalMembers={row.talents.pagination.total}
                />
              )}
            </InfoColumn>
            {/* <Button hierarchy="primary" size="small" href="/discovery/top-100-talent?page=1" text="Go to page" /> */}
          </EntryContainer>
        ))}
      </TeamsList>
    </Container>
  );
};
