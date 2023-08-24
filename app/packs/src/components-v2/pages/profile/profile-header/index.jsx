import React, { useEffect, useMemo, useCallback, useState } from "react";
import {
  Avatar,
  Button,
  ButtonDropdown,
  Icon,
  MembersList,
  Spinner,
  Tag,
  Typography,
  useModal
} from "@talentprotocol/design-system";
import { QRCodeModal } from "src/components-v2/qr-code-modal";
import EditOverviewModalV2 from "src/components/profile/edit/EditOverviewModalV2";
import {
  Actions,
  Container,
  DesktopActions,
  LocationContainer,
  MembersContainer,
  Name,
  SpinnerContainer,
  TagContainer,
  TopRow,
  UserInfo
} from "./styled";
import { useDataFetcher } from "./hooks/use-data-fetcher";
import { useImpersonate } from "./hooks/use-impersonate";
import ApprovalConfirmationModal from "src/components/profile/ApprovalConfirmationModal";
import AdminVerificationConfirmationModal from "src/components/profile/AdminVerificationConfirmationModal";
import PersonaVerificationConfirmationModal from "src/components/profile/PersonaVerificationConfirmationModal";
import { useProfileOverviewStore } from "src/contexts/state";
import { SubscriptionButton } from "src/components-v2/subscription-button";

export const ProfileHeader = ({ urlData, currentUser, isMobile, railsContext, withPersonaRequest }) => {
  const data = useDataFetcher(urlData);
  const { profileOverview, fetchProfileOverview } = useProfileOverviewStore();
  const [localProfile, setLocalProfile] = useState(null);
  const { impersonateUser } = useImpersonate();
  const qrCodeModalState = useModal();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showWithPersonaModal, setShowWithPersonaModal] = useState(false);
  const dropdownMenu = useMemo(() => {
    if (!currentUser) return [];
    const menu = [{ value: "Share", iconColor: "primary01", iconName: "share-2" }];
    if (currentUser?.admin || currentUser?.moderator) {
      menu.push({ value: "Impersonate", iconColor: "primary01", iconName: "user" });
      if (!localProfile?.verified) {
        menu.push({ value: "Verify user", iconColor: "primary01", iconName: "check" });
      }
      if (localProfile?.profile_type === "waiting_for_approval") {
        menu.push({ value: "Approve", iconColor: "primary01", iconName: "check-chat" });
      }
    }
    if (currentUser?.username === urlData.profileUsername) {
      menu.push({ value: "Edit", iconColor: "primary01", iconName: "edit" });
      if (
        !localProfile?.verified &&
        !(
          localProfile?.with_persona_id ||
          withPersonaRequest.requests_counter > railsContext.withPersonaVerificationsLimit
        )
      ) {
        menu.push({ value: "Verify", iconColor: "primary01", iconName: "check" });
      }
    }
    return menu;
  }, [currentUser, urlData, localProfile]);
  const onSelectOption = useCallback(
    option => {
      switch (option.value) {
        case "Edit":
          setIsEditMode(true);
          return;
        case "Impersonate":
          impersonateUser(urlData.profileUsername);
          return;
        case "Approve":
          setShowApproveModal(true);
          return;
        case "Verify user":
          setShowVerifyModal(true);
          return;
        case "Verify":
          setShowWithPersonaModal(true);
          return;
        case "Share":
        default:
          qrCodeModalState.openModal();
          return;
      }
    },
    [urlData.profileUsername]
  );

  const callback = (_username, subscription) => {
    if (subscription === "subscribe") {
      setLocalProfile({ ...localProfile, subscribed_status: "Cancel Request" });
    } else {
      setLocalProfile({ ...localProfile, subscribed_status: "Subscribe" });
    }
  };

  const MemoedTag = useMemo(() => {
    if (!localProfile || currentUser?.username === localProfile?.username) return <></>;
    let tagLabel = null;

    if (localProfile?.is_subscribing) {
      tagLabel = "Subscriber";
    }
    if (localProfile?.is_supporting) {
      tagLabel = "Supporter";
    }

    if (!tagLabel) return <></>;
    return (
      <TagContainer>
        <Tag
          size="small"
          color="primary"
          label={tagLabel}
          backgroundColor="bg01"
          borderColor="surfaceHover02"
          textColor="primary02"
        />
      </TagContainer>
    );
  }, [localProfile, currentUser?.username]);

  useEffect(() => {
    if (!urlData.profileUsername) return;
    fetchProfileOverview(urlData.profileUsername);
  }, [urlData.profileUsername]);

  useEffect(() => {
    if (profileOverview) {
      setLocalProfile(profileOverview);
    }
  }, [profileOverview]);

  return !localProfile ? (
    <SpinnerContainer>
      <Spinner color="primary" size={48} />
    </SpinnerContainer>
  ) : (
    <>
      <Container>
        <TopRow>
          <Avatar
            size="lg"
            userId={1}
            url={localProfile.profile_picture_url}
            profileURL={`/u/${localProfile.username}`}
          />
          {isMobile && (
            <Actions>
              <ButtonDropdown selectOption={onSelectOption} options={dropdownMenu} opensOnRight>
                <Button size="small" hierarchy="secondary" leftIcon="navigation" iconColor="primary01" />
              </ButtonDropdown>
              {currentUser?.username !== localProfile.username ? (
                <>
                  <Button
                    size="small"
                    hierarchy="secondary"
                    leftIcon="email"
                    iconColor="primary01"
                    href={`/messages?user=${localProfile.username}`}
                  />
                  <SubscriptionButton
                    username={localProfile.username}
                    subscribedStatus={localProfile.subscribed_status}
                    callback={callback}
                  />
                </>
              ) : (
                <Button
                  size="small"
                  hierarchy="secondary"
                  text="Edit profile"
                  onClick={() => onSelectOption({ value: "Edit" })}
                />
              )}
            </Actions>
          )}
        </TopRow>
        <UserInfo>
          <Name specs={{ type: "bold", variant: "h5" }} color="primary01">
            {localProfile.name}
          </Name>
          {localProfile.verified && <Icon name="verified-2" color="primary" size={18} />}
        </UserInfo>
        {MemoedTag}
        <Typography specs={{ type: "regular", variant: "p1" }} color="primary01">
          {localProfile.headline}
        </Typography>
        {!!localProfile.location && (
          <LocationContainer>
            <Icon name="pin" color="primary04" size={16} />
            <Typography specs={{ type: "regular", variant: "p2" }} color="primary04">
              {localProfile.location}
            </Typography>
          </LocationContainer>
        )}
        <MembersContainer>
          {data.supporters.talents?.length ? (
            <>
              <MembersList membersImages={data.supporters.talents.map(supporter => supporter.profile_picture_url)} />
              <Typography specs={{ type: "small", variant: "label3" }} color="primary04" className="lh-0">
                Supported by {data.supporters?.pagination?.total} of your connections.
              </Typography>
            </>
          ) : (
            <Typography specs={{ type: "small", variant: "label3" }} color="primary04">
              None of your connections is supporting {localProfile.name}.
            </Typography>
          )}
        </MembersContainer>
        {!isMobile && (
          <DesktopActions>
            <ButtonDropdown selectOption={onSelectOption} options={dropdownMenu}>
              <Button size="small" hierarchy="secondary" leftIcon="navigation" iconColor="primary01" />
            </ButtonDropdown>
            {currentUser?.username !== localProfile.username ? (
              <>
                <Button
                  size="small"
                  hierarchy="secondary"
                  leftIcon="email"
                  iconColor="primary01"
                  href={`/messages?user=${localProfile.username}`}
                />
                <SubscriptionButton
                  username={localProfile.username}
                  subscribedStatus={localProfile.subscribed_status}
                  callback={callback}
                />
              </>
            ) : (
              <Button
                size="small"
                hierarchy="secondary"
                text="Edit profile"
                onClick={() => onSelectOption({ value: "Edit" })}
              />
            )}
          </DesktopActions>
        )}
      </Container>
      <QRCodeModal
        modalState={qrCodeModalState}
        url={`https://beta.talentprotocol.com/u/${localProfile.username}`}
        profilePicture={localProfile.profile_picture_url}
        text="Scan this QR code to open your profile."
        buttonText="Copy profile URL"
      />
      <EditOverviewModalV2
        show={isEditMode}
        hide={() => setIsEditMode(false)}
        profile={localProfile}
        username={localProfile.username}
        showOpenTo={false}
      />
      <ApprovalConfirmationModal
        show={showApproveModal}
        setShow={setShowApproveModal}
        hide={() => setShowApproveModal(false)}
        talent={localProfile}
        setProfile={() => {
          window.location.reload();
        }}
        railsContext={railsContext}
      />
      <AdminVerificationConfirmationModal
        show={showVerifyModal}
        setShow={setShowVerifyModal}
        hide={() => setShowVerifyModal(false)}
        talent={localProfile}
        setProfile={() => {
          window.location.reload();
        }}
      />
      {!localProfile.verified && (
        <PersonaVerificationConfirmationModal
          show={showWithPersonaModal}
          setShow={setShowWithPersonaModal}
          hide={() => setShowWithPersonaModal(false)}
          username={localProfile.username}
          railsContext={railsContext}
        />
      )}
    </>
  );
};
