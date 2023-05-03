import React, { useEffect, useState } from "react";
import { Container, Entry, EntryIdentification, Footer, ListContainer, TitleContainer } from "./styled";
import { Avatar, Button, TextLink, Typography } from "@talentprotocol/design-system";
import { leaderboardService } from "../../api/leaderboard";
import { toast } from "react-toastify";

export const LeadderboardWidget = ({ username }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [leadderBoardData, setLeadderBoardData] = useState([]);
  useEffect(() => {
    leaderboardService
      .getLeaderboard()
      .then(({ data }) => {
        const parsedData = data.users
          .reduce((acc, el) => {
            acc.push({
              ...el,
              count: data.results[el.id]
            });
            return acc;
          }, [])
          .sort((a, b) => b.count - a.count);
        setLeadderBoardData(parsedData.length > 5 ? parsedData.slice(0, 5) : parsedData);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);
  return (
    !isLoading && (
      <Container>
        <TitleContainer>
          <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
            Community Leaderboard
          </Typography>
          <TextLink text="Go to invites" rightIcon="carret" color="primary" size="small" href="/earn?tab=talent" />
        </TitleContainer>
        <ListContainer>
          {leadderBoardData.map((user, index) => (
            <Entry key={user.username}>
              <EntryIdentification>
                <Typography specs={{ variant: "label2", type: "medium" }} color="primary01">
                  #{index + 1}
                </Typography>
                <Avatar
                  userId={1}
                  occupation={`${user.count} invites`}
                  name={user.username}
                  size="md"
                  url={user.profile_picture_url}
                  profileURL={`/u/${user.username}`}
                />
              </EntryIdentification>
            </Entry>
          ))}
        </ListContainer>
        <Footer>
          <Typography specs={{ variant: "h4", type: "regular" }} color="primary01">
            <b>Help the</b> <i>community</i> <b>grow</b>
          </Typography>
          <Typography specs={{ variant: "p2", type: "regular" }} color="primary01">
            Invite your peers to join and earn rewards.
          </Typography>
          <Button
            hierarchy="primary"
            size="large"
            text="Copy your referral link"
            isStretched
            rightIcon="copy"
            onClick={() => {
              navigator.clipboard.writeText(`https://beta.talentprotocol.com/u/${username}`);
              toast.success("Copied to clipboard!", {
                autoClose: 3000
              });
            }}
          />
        </Footer>
      </Container>
    )
  );
};
