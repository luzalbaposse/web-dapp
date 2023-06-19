import React, { useEffect, useMemo, useState } from "react";
import { Container, TitleContainer } from "./styled";
import { TextLink, Typography } from "@talentprotocol/design-system";
import { questsService } from "../../api/quests";
import { Quest } from "../quest";

export const QuestsWidget = ({ profile, railsContext }) => {
  const [quests, setQuests] = useState([]);
  useEffect(() => {
    if (!profile) return;
    questsService
      .getQuests(profile.id, 20)
      .then(({ data }) => {
        setQuests(data.quests.sort(a => (a.completed_at ? -1 : 1)));
      })
      .catch(() => {});
  }, [profile]);

  const memoizedQuests = useMemo(
    () =>
      quests.map(quest => (
        <Quest key={quest.title} quest={quest} username={profile.username} railsContext={railsContext} />
      )),
    [quests]
  );

  if (quests.length == 0) {
    return <></>;
  }

  return (
    <Container>
      <TitleContainer>
        <Typography specs={{ variant: "h5", type: "bold" }}>Quests</Typography>
        <TextLink href="/earn" text="View all" rightIcon="carret" color="primary" size="medium" />
      </TitleContainer>
      {memoizedQuests}
    </Container>
  );
};
