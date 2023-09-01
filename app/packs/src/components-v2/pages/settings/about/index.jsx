import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button, Input, TextArea, Typography } from "@talentprotocol/design-system";
import { Container, LinksArea, LinksRow } from "./styled";
import { useEditProfileStore } from "src/contexts/state";

export const AboutForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);
  const { profile } = useEditProfileStore();
  return (
    <Container>
      <TextArea label="About me" placeholder="You can write about your experience, passions or achievements." defaultValue={profile?.career_goal.pitch} />
      <Typography specs={{ type: "medium", variant: "p1" }} color="primary01">
        On The Web
      </Typography>
      <div>Insert tags component here</div>
      <LinksArea>
        <LinksRow>
          <Input label="Personal Website" placeholder="www." defaultValue={profile?.profile.website}/>
          <Input label="Twitter" placeholder="twitter.com/" defaultValue={profile?.profile.twitter} />
        </LinksRow>
        <LinksRow>
          <Input label="LinkedIn" placeholder="linkedin.com/in/" defaultValue={profile?.profile.linkedin} />
          <Input label="Figma" placeholder="figma.com/@" defaultValue={profile?.profile.figma} />
        </LinksRow>
        <LinksRow>
          <Input label="Behance" placeholder="behance.net/" defaultValue={profile?.profile.behance} />
          <Input label="Youtube" placeholder="youtube.com/" defaultValue={profile?.profile.youtube} />
        </LinksRow>
      </LinksArea>
      {!isLoading && createPortal(<Button hierarchy="primary" size="small" text="Save" />, document.getElementById("save-button"))}
    </Container>
  );
};
