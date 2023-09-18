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

export const AboutForm = ({ setIsDirty }) => {
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

  const onTagsUpdate = useCallback(
    tags => {
      setCurrentTags(tags);
      setTagsSuggestions([]);
      setIsDirty(true);
    },
    [setCurrentTags, setTagsSuggestions, setIsDirty]
  );

  const refs = {
    about: useRef(),
    website: useRef(),
    twitter: useRef(),
    linkedin: useRef(),
    behance: useRef(),
    youtube: useRef(),
    github: useRef(),
    lens: useRef(),
    farcaster: useRef(),
    instagram: useRef(),
    tiktok: useRef()
  };

  const updateAbout = useCallback(() => {
    if (currentTags.length < 3) {
      toast.error(<ToastBody heading="Insufficient tags" body={"You need at least 3 tags"} />);
      return;
    }
    if (currentTags.length > 10) {
      toast.error(<ToastBody heading="Exceeded maximum tags" body={"You can't add more than 10 tags"} />);
      return;
    }
    editProfileService
      .editAbout(profile?.username, {
        talent: {
          profile: {
            about: refs.about.current.value,
            website: refs.website.current.value,
            twitter: refs.twitter.current.value,
            linkedin: refs.linkedin.current.value,
            behance: refs.behance.current.value,
            youtube: refs.youtube.current.value,
            github: refs.github.current.value,
            lens: refs.lens.current.value,
            farcaster: refs.farcaster.current.value,
            instagram: refs.instagram.current.value,
            tiktok: refs.tiktok.current.value
          }
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
            behance: refs.behance.current.value,
            youtube: refs.youtube.current.value,
            github: refs.github.current.value,
            lens: refs.lens.current.value,
            farcaster: refs.farcaster.current.value,
            instagram: refs.instagram.current.value,
            tiktok: refs.tiktok.current.value
          },
          tags: currentTags
        });
        toast.success(<ToastBody heading="Success!" body="Account updated successfully." />, { autoClose: 1500 });
      })
      .catch(err => {
        console.error(err);
        toast.error(<ToastBody heading="Error" body={"Something happened while updating your profile"} />);
      });
    setIsDirty(false);
  }, [refs, profile]);

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  return (
    !isLoading &&
    !!profile && (
      <Container>
        <TextArea
          textAreaRef={refs.about}
          label="About me"
          placeholder="You can write about your experience, passions or achievements."
          defaultValue={profile?.profile.about}
          onChange={() => setIsDirty(true)}
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
              label="Website"
              placeholder="www."
              defaultValue={profile?.profile.website || "www."}
              onChange={() => setIsDirty(true)}
            />
            <Input
              inputRef={refs.linkedin}
              label="LinkedIn"
              placeholder="linkedin.com/in/"
              defaultValue={profile?.profile.linkedin || "linkedin.com/in/"}
              onChange={() => setIsDirty(true)}
            />
          </LinksRow>
          <LinksRow>
            <Input
              inputRef={refs.twitter}
              label="Twitter"
              placeholder="twitter.com/"
              defaultValue={profile?.profile.twitter || "twitter.com/"}
              onChange={() => setIsDirty(true)}
            />
            <Input
              inputRef={refs.github}
              label="Github"
              placeholder="github.com/"
              defaultValue={profile?.profile.github || "github.com/"}
              onChange={() => setIsDirty(true)}
            />
          </LinksRow>
          <LinksRow>
            <Input
              inputRef={refs.behance}
              label="Behance"
              placeholder="behance.net/"
              defaultValue={profile?.profile.behance || "behance.net/"}
              onChange={() => setIsDirty(true)}
            />
            <Input
              inputRef={refs.instagram}
              label="Instagram"
              placeholder="instagram.com/"
              defaultValue={profile?.profile.instagram || "instagram.com/"}
              onChange={() => setIsDirty(true)}
            />
          </LinksRow>
          <LinksRow>
            <Input
              inputRef={refs.lens}
              label="Lens"
              placeholder="lens.xyz/"
              defaultValue={profile?.profile.lens || "lens.xyz/"}
              onChange={() => setIsDirty(true)}
            />
            <Input
              inputRef={refs.farcaster}
              label="Farcaster"
              placeholder="farcaster.xyz/"
              defaultValue={profile?.profile.farcaster || "farcaster.xyz/"}
              onChange={() => setIsDirty(true)}
            />
          </LinksRow>
          <LinksRow>
            <Input
              inputRef={refs.youtube}
              label="Youtube"
              placeholder="youtube.com/"
              defaultValue={profile?.profile.youtube || "youtube.com/"}
              onChange={() => setIsDirty(true)}
            />
            <Input
              inputRef={refs.tiktok}
              label="Tik Tok"
              placeholder="tiktok.net/"
              defaultValue={profile?.profile.tiktok || "tiktok.net/"}
              onChange={() => setIsDirty(true)}
              style={{ width: "48%" }}
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
