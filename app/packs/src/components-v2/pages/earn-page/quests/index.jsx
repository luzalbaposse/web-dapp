import React, { useEffect, useMemo, useState } from "react";
import { Container, DesktopGrid, TitleContainer } from "./styled";
import { Typography } from "@talentprotocol/design-system";
import { Quest } from "../../../quest";
import { questsService } from "../../../../api";

export const Quests = ({ profile }) => {
  const [quests, setQuests] = useState([]);
  useEffect(() => {
    if (!profile) return;
    questsService
      .getQuests(profile.id, 20, 1)
      .then(({ data }) => {
        setQuests(data.quests.sort(a => (a.completed_at ? -1 : 1)));
      })
      .catch(() => {});
  }, [profile]);

  const memoizedQuests = useMemo(
    () => quests.map(quest => <Quest key={quest.title} quest={quest} username={profile.username} />),
    [quests]
  );
  return (
    <Container>
      {!!quests.length && (
        <>
          <TitleContainer>
            <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
              Complete quests to win points
            </Typography>
            <Typography specs={{ variant: "p2", type: "medium" }} color="primary03">
              Experience Points (XP) are a fun way to track your personal progress, build your reputation within the
              Talent Protocol community and earn rewards.
            </Typography>
          </TitleContainer>
          <DesktopGrid>{memoizedQuests}</DesktopGrid>
        </>
      )}
    </Container>
  );
};
