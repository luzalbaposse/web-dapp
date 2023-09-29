import { Button, Typography } from "@talentprotocol/design-system";
import { BottomContainer, Container, UsersContainer } from "./styled";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { leaderboardService } from "../../../../api";
import { LeaderboardEntry } from "../../../leaderboard-entry";

const ITEMS_PER_PAGE = 10;

export const Leaderboard = ({ profile }) => {
  const [leaderboardEntries, setLeaderboardEntries] = useState([]);
  const [page, setPage] = useState(1);
  const [currentUserInfo, setCurrentUserInfo] = useState({ position: undefined, score: undefined });
  const [isEndOfResults, setIsEndOfResults] = useState(false);

  useEffect(() => {
    if (!profile) return;

    leaderboardService
      .getExperiencePointsLeaderboard(ITEMS_PER_PAGE, page, profile.id)
      .then(({ data }) => {
        setLeaderboardEntries(entries => [...entries, ...data.leaderboard.results]);
        setCurrentUserInfo(data.leaderboard.talent_result);
      })
      .catch(err => {
        setIsEndOfResults(true);
        console.error(err);
      });
  }, [page, profile]);

  const handleLoadMore = useCallback(() => {
    setPage(page => page + 1);
  }, []);

  const currentUserEntry = useMemo(() => {
    return { ...profile, ...currentUserInfo };
  }, [profile, currentUserInfo]);

  const memoEntries = useMemo(() => {
    return (
      <>
        {leaderboardEntries.map((entry, i) => (
          <LeaderboardEntry key={i} position={i + 1} entry={entry} profile={profile} />
        ))}
        {!leaderboardEntries.some(user => user?.id === currentUserEntry?.id) && (
          <LeaderboardEntry
            key={profile?.id}
            position={currentUserEntry.position}
            entry={currentUserEntry}
            profile={profile}
          />
        )}
      </>
    );
  }, [profile, currentUserEntry, leaderboardEntries]);
  return (
    <Container>
      <Typography specs={{ variant: "p2", type: "medium" }} color="primary03" className="ml-3 ml-lg-0">
        Top members of all-time
      </Typography>
      <UsersContainer>{memoEntries}</UsersContainer>
      <BottomContainer>
        {leaderboardEntries.length % ITEMS_PER_PAGE === 0 && !isEndOfResults && (
          <Button onClick={handleLoadMore} hierarchy="secondary" text="Load more" size="medium" />
        )}
      </BottomContainer>
    </Container>
  );
};
