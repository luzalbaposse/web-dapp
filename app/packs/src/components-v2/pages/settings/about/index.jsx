import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";
import { Button, Input, TextArea, Typography } from "@talentprotocol/design-system";
import { Container, LinksArea, LinksRow } from "./styled";
import { useEditProfileStore } from "src/contexts/state";
import { editProfileService } from "src/api/edit-profile";
import { ToastBody } from "src/components/design_system/toasts";

export const AboutForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { profile, updateProfileState } = useEditProfileStore();
  const refs = {
    pitch: useRef(),
    website: useRef(),
    twitter: useRef(),
    linkedin: useRef(),
    figma: useRef(),
    behance: useRef(),
    youtube: useRef()
  };
  const updateAbout = useCallback(() => {
    editProfileService
      .editAbout(profile?.username, {
        ...profile,
        profile: {
          ...profile?.profile,
          website: refs.website.current.value,
          twitter: refs.twitter.current.value,
          linkedin: refs.linkedin.current.value,
          figma: refs.figma.current.value,
          behance: refs.behance.current.value,
          youtube: refs.youtube.current.value
        }
      })
      .then(() => {
        updateProfileState({
          profile: {
            ...profile?.profile,
            website: refs.website.current.value,
            twitter: refs.twitter.current.value,
            linkedin: refs.linkedin.current.value,
            figma: refs.figma.current.value,
            behance: refs.behance.current.value,
            youtube: refs.youtube.current.value
          }
        });
      })
      .catch(err => {
        console.error(err);
        toast.error(<ToastBody heading="Error" body={"Something happened while updating your profile"} />);
      });
  }, [refs, profile]);
  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);
  return (
    <Container>
      <TextArea
        textAreaRef={refs.pitch}
        label="About me"
        placeholder="You can write about your experience, passions or achievements."
        defaultValue={profile?.career_goal.pitch}
      />
      <Typography specs={{ type: "medium", variant: "p1" }} color="primary01">
        On The Web
      </Typography>
      <div>Insert tags component here</div>
      <LinksArea>
        <LinksRow>
          <Input
            inputRef={refs.website}
            label="Personal Website"
            placeholder="www."
            defaultValue={profile?.profile.website}
          />
          <Input
            inputRef={refs.twitter}
            label="Twitter"
            placeholder="twitter.com/"
            defaultValue={profile?.profile.twitter}
          />
        </LinksRow>
        <LinksRow>
          <Input
            inputRef={refs.linkedin}
            label="LinkedIn"
            placeholder="linkedin.com/in/"
            defaultValue={profile?.profile.linkedin}
          />
          <Input inputRef={refs.figma} label="Figma" placeholder="figma.com/@" defaultValue={profile?.profile.figma} />
        </LinksRow>
        <LinksRow>
          <Input
            inputRef={refs.behance}
            label="Behance"
            placeholder="behance.net/"
            defaultValue={profile?.profile.behance}
          />
          <Input
            inputRef={refs.youtube}
            label="Youtube"
            placeholder="youtube.com/"
            defaultValue={profile?.profile.youtube}
          />
        </LinksRow>
      </LinksArea>
      {!isLoading &&
        createPortal(
          <Button hierarchy="primary" size="small" text="Save" onClick={updateAbout} />,
          document.getElementById("save-button")
        )}
    </Container>
  );
};
