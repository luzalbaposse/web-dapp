import React, { useMemo } from "react";
import { ethers } from "ethers";
import dayjs from "dayjs";
import SocialRow from "src/components/profile/SocialRow";
import customParseFormat from "dayjs/plugin/customParseFormat";
import TalentProfilePicture from "src/components/talent/TalentProfilePicture";
import { formatNumberWithSymbol, verifiedIcon } from "src/utils/viewHelpers";
import { Globe, Calendar } from "src/components/icons";
import { P2 } from "src/components/design_system/typography";
import { useTheme } from "src/contexts/ThemeContext";
import Button from "src/components/design_system/button";
import { lightTextPrimary04 } from "src/utils/colors";
import TextInput from "src/components/design_system/fields/textinput";
import {
  Container,
  InfoColumn,
  DataRow,
  NameLabel,
  HeadlinePiece,
  StyledUserTag,
  VerifiedIcon,
  ActionArea,
  TagsContainer,
  TalentDetails,
  TalentUserDetails,
  HeadlineContainer,
  TalentUserDetailsItem,
  InvitedByContainer,
  ApprovedByContainer
} from "./styles";

dayjs.extend(customParseFormat);

export const ProfileCard = ({
  profile,
  changeSection,
  currentUserAdmin,
  profileSubdomain,
  talentTokenPrice,
  mobile,
  children,
  setShowCareerUpdateModal,
  canUpdate
}) => {
  const { mode } = useTheme();

  const user = profile.user;
  const userProfile = profile.profile;
  const talentToken = profile.talent_token;
  const joinedAt = useMemo(() => {
    return dayjs(user?.created_at).format("MMMM YYYY");
  }, [user?.createdAt]);
  const Headline = useMemo(() => {
    if (!userProfile.headline) return <></>;
    const headlineArray = userProfile.headline?.split(" ");
    if (userProfile.highlighted_headline_words_index)
      return (
        <>
          <HeadlinePiece className="text-primary-01 mr-1" text="--E" />
          {headlineArray.map((word, index) => {
            if (userProfile.highlighted_headline_words_index.includes(index))
              return <HeadlinePiece className="text-primary mr-1" text={word} key={index} />;
            return <HeadlinePiece className="text-primary-01 mr-1" text={word} key={index} />;
          })}
        </>
      );
    return <HeadlinePiece className="text-primary-01" text={`--E ${userProfile.headline}`} />;
  }, [userProfile.headline]);

  return (
    <Container>
      <InfoColumn>
        <DataRow>
          <NameLabel className="medium mr-2" text={user?.name} />
          {profile.verified && <VerifiedIcon src={verifiedIcon(mode())} />}
        </DataRow>
        <DataRow>
          {talentToken?.contract_id && <P2 className="medium mr-2" text={`$${talentToken?.ticker}`} />}
          <P2 className="text-primary-03" text={profile.occupation} />
        </DataRow>
        {canUpdate && (
          <DataRow>
            <TextInput
              placeholder={`What's new in your career ${user?.name}?`}
              onClick={() => setShowCareerUpdateModal(true)}
              className="w-100 mt-3"
            />
          </DataRow>
        )}
        {!profileSubdomain && mobile && <ActionArea>{children}</ActionArea>}
        <HeadlineContainer>{Headline}</HeadlineContainer>
        <TagsContainer>
          <StyledUserTag
            tags={profile.tags.map(tag => tag.description)}
            clickable={!profileSubdomain}
            className="mr-2"
          />
        </TagsContainer>
        {!profileSubdomain && (
          <TalentDetails>
            <Button className="d-flex mr-2 mt-2 button-link p-0" onClick={() => changeSection("#token")}>
              <P2
                className="text-primary-01 mr-1"
                bold
                text={
                  profile.total_supply
                    ? formatNumberWithSymbol(ethers.utils.formatUnits(profile.total_supply) * talentTokenPrice)
                    : "-"
                }
              />
              <P2 className="text-primary-04" text="Market Value" />
            </Button>
            <Button className="d-flex mr-2 mt-2 button-link p-0" onClick={() => changeSection("#connections")}>
              <P2 className="text-primary-01 mr-1" bold text={profile.supporters_count || "0"} />
              <P2 className="text-primary-04" text="Supporters" />
            </Button>
            <Button className="d-flex mr-2 mt-2 button-link p-0" onClick={() => changeSection("#connections")}>
              <P2 className="text-primary-01 mr-1" bold text={profile.supporting_count || "0"} />
              <P2 className="text-primary-04" text="Supporting" />
            </Button>
            <Button className="d-flex mr-2 mt-2 button-link p-0" onClick={() => changeSection("#connections")}>
              <P2 className="text-primary-01 mr-1" bold text={profile.subscribers_count || "0"} />
              <P2 className="text-primary-04" text="Subscribers" />
            </Button>
          </TalentDetails>
        )}
        <TalentUserDetails>
          <TalentUserDetailsItem>
            <Globe className="mr-2" size={16} color={lightTextPrimary04} />
            <P2 className="text-primary-03" text={userProfile.location} />
          </TalentUserDetailsItem>
          {!profileSubdomain && (
            <>
              <TalentUserDetailsItem>
                <Calendar className="mr-2" size={16} color={lightTextPrimary04} />
                <P2 className="text-primary-03" text={`Joined ${joinedAt}`} />
              </TalentUserDetailsItem>
              {user?.invited_by && (
                <InvitedByContainer>
                  <P2 className="text-primary-04 mr-3" text="Invited by" />
                  <TalentProfilePicture className="mr-2" src={user?.profile_picture_url} height={32} />
                  <P2 bold text={user?.invited_by.name} />
                </InvitedByContainer>
              )}
            </>
          )}
          {currentUserAdmin && user?.approvedBy && (
            <ApprovedByContainer>
              <P2 className="text-primary-04 mr-3" text="Approved by" />
              <TalentProfilePicture className="mr-2" src={user?.approved_by.profile_picture_url} height={32} />
              <P2 bold text={user?.approved_by.name} />
            </ApprovedByContainer>
          )}
        </TalentUserDetails>
        <SocialRow profile={userProfile} />
      </InfoColumn>
      {profileSubdomain && mobile && <ActionArea>{children}</ActionArea>}
      {!mobile && <ActionArea>{children}</ActionArea>}
    </Container>
  );
};
