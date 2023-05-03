import React from "react";
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

export const RecommendedTeamsWidget = ({}) => {
  return (
    <Container>
      <TitleContainer>
        <Typography specs={{ variant: "h5", type: "bold" }}>Recommended Teams</Typography>
      </TitleContainer>
      <TeamsList>
        <EntryContainer>
          <Avatar size="md" />
          <InfoColumn>
            <InfoGroup>
              <VerifiedNameRow>
                <Typography specs={{ variant: "label2", type: "medium" }}>Team Name</Typography>
                <Icon name="verified-2" size={22} color="primary" />
              </VerifiedNameRow>
              <Typography specs={{ variant: "p3", type: "regular" }}>
                Something.........REALSADLASKD LKASL KLSA KDLAKS LKASLDK
              </Typography>
            </InfoGroup>
            <Tags>
              <Tag backgroundColor="primaryTint02" textColor="primaryText" size="small" label="Payments" />
              <Tag backgroundColor="primaryTint02" textColor="primaryText" size="small" label="Crypto" />
              <Tag backgroundColor="primaryTint02" textColor="primaryText" size="small" label="$UTK" />
            </Tags>
            <MembersList
              membersImages={[
                "https://i.pravatar.cc/300?img=1",
                "https://i.pravatar.cc/301?img=1",
                "https://i.pravatar.cc/302?img=1",
                "https://i.pravatar.cc/303?img=1"
              ]}
              totalMembers={100}
            />
          </InfoColumn>
        </EntryContainer>
        <EntryContainer>
          <Avatar size="md" />
          <InfoColumn>
            <InfoGroup>
              <VerifiedNameRow>
                <Typography specs={{ variant: "label2", type: "medium" }}>Team Name</Typography>
                <Icon name="verified-2" size={22} color="primary" />
              </VerifiedNameRow>
              <Typography specs={{ variant: "p3", type: "regular" }}>
                Something.........REALSADLASKD LKASL KLSA KDLAKS LKASLDK
              </Typography>
            </InfoGroup>
            <Tags>
              <Tag backgroundColor="primaryTint02" textColor="primaryText" size="small" label="Payments" />
              <Tag backgroundColor="primaryTint02" textColor="primaryText" size="small" label="Crypto" />
              <Tag backgroundColor="primaryTint02" textColor="primaryText" size="small" label="$UTK" />
            </Tags>
            <MembersList
              membersImages={[
                "https://i.pravatar.cc/300?img=1",
                "https://i.pravatar.cc/301?img=1",
                "https://i.pravatar.cc/302?img=1",
                "https://i.pravatar.cc/303?img=1"
              ]}
              totalMembers={100}
            />
          </InfoColumn>
        </EntryContainer>
        <EntryContainer>
          <Avatar size="md" />
          <InfoColumn>
            <InfoGroup>
              <VerifiedNameRow>
                <Typography specs={{ variant: "label2", type: "medium" }}>Team Name</Typography>
                <Icon name="verified-2" size={22} color="primary" />
              </VerifiedNameRow>
              <Typography specs={{ variant: "p3", type: "regular" }}>
                Something.........REALSADLASKD LKASL KLSA KDLAKS LKASLDK
              </Typography>
            </InfoGroup>
            <Tags>
              <Tag backgroundColor="primaryTint02" textColor="primaryText" size="small" label="Payments" />
              <Tag backgroundColor="primaryTint02" textColor="primaryText" size="small" label="Crypto" />
              <Tag backgroundColor="primaryTint02" textColor="primaryText" size="small" label="$UTK" />
            </Tags>
            <MembersList
              membersImages={[
                "https://i.pravatar.cc/300?img=1",
                "https://i.pravatar.cc/301?img=1",
                "https://i.pravatar.cc/302?img=1",
                "https://i.pravatar.cc/303?img=1"
              ]}
              totalMembers={100}
            />
          </InfoColumn>
        </EntryContainer>
      </TeamsList>
    </Container>
  );
};
