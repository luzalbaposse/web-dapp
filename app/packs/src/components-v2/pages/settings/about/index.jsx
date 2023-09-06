import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";
import { Button, Input, TagsInput, TextArea, Typography } from "@talentprotocol/design-system";
import { Container, LinksArea, LinksRow } from "./styled";
import { useEditProfileStore } from "src/contexts/state";
import { editProfileService } from "src/api/edit-profile";
import { ToastBody } from "src/components/design_system/toasts";
import { debounce } from "lodash";
import { tagsService } from "src/api";

export const AboutForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTags, setCurrentTags] = useState([]);
  const [tagsSuggestions, setTagsSuggestions] = useState([]);
  const { profile, updateProfileState } = useEditProfileStore();
  useEffect(() => {
    if (!profile) return;
    setCurrentTags(profile.tags.map(tag => tag.description));
  }, [profile, setCurrentTags]);
  const getTags = useCallback(
    debounce(query => {
      tagsService
        .getTags(query)
        .then(({ data }) => {
          setTagsSuggestions(data);
        })
        .catch(err => {
          console.error(err);
          setTagsSuggestions([]);
        });
    }, 250),
    []
  );
  const onTagsUpdate = useCallback(tags => {
    setCurrentTags(tags);
  }, [setCurrentTags]);
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
        talent: {
          profile: {
            about: refs.pitch.current.value,
            website: refs.website.current.value,
            twitter: refs.twitter.current.value,
            linkedin: refs.linkedin.current.value,
            figma: refs.figma.current.value,
            behance: refs.behance.current.value,
            youtube: refs.youtube.current.value
          },
        },
        tags: currentTags
      })
      .then(() => {
        updateProfileState({
          ...profile,
          profile: {
            ...profile?.profile,
            website: refs.website.current.value,
            twitter: refs.twitter.current.value,
            linkedin: refs.linkedin.current.value,
            figma: refs.figma.current.value,
            behance: refs.behance.current.value,
            youtube: refs.youtube.current.value
          },
          tags: currentTags
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
    !isLoading &&
    !!profile && (
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
        <TagsInput
          onNewQueryTerm={getTags}
          suggestions={tagsSuggestions.map(tag => tag.description)}
          label="Tags"
          placeholder="Search skills, interests, roles"
          description="Min 3, up to 10"
          defaultTags={profile?.tags.map(tag => tag.description)}
          onTagsUpdate={onTagsUpdate}
        />
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
            <Input
              inputRef={refs.figma}
              label="Figma"
              placeholder="figma.com/@"
              defaultValue={profile?.profile.figma}
            />
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
    )
  );
};
