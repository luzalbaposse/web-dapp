import React, { useEffect, useMemo, useCallback, useState } from "react";
import { toast } from "react-toastify";
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
import { talentsService } from "src/api";
import { useDataFetcher } from "./hooks/use-data-fetcher";
import { useImpersonate } from "./hooks/use-impersonate";
import { ToastBody } from "src/components/design_system/toasts";
import ApprovalConfirmationModal from "src/components/profile/ApprovalConfirmationModal";
import AdminVerificationConfirmationModal from "src/components/profile/AdminVerificationConfirmationModal";
import PersonaVerificationConfirmationModal from "src/components/profile/PersonaVerificationConfirmationModal";
import { useProfileOverviewStore } from "src/contexts/state";

export const ProfileHeader = ({ urlData, currentUser, isMobile, railsContext, withPersonaRequest }) => {
  const data = useDataFetcher(urlData);
  const { profileOverview, fetchProfileOverview } = useProfileOverviewStore();
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
      if (!profileOverview?.verified) {
        menu.push({ value: "Verify user", iconColor: "primary01", iconName: "check" });
      }
      if (profileOverview?.profile_type === "waiting_for_approval") {
        menu.push({ value: "Approve", iconColor: "primary01", iconName: "check-chat" });
      }
    }
    if (currentUser?.username === urlData.profileUsername) {
      menu.push({ value: "Edit", iconColor: "primary01", iconName: "edit" });
      if (
        !profileOverview?.verified &&
        !(
          profileOverview?.with_persona_id ||
          withPersonaRequest.requests_counter > railsContext.withPersonaVerificationsLimit
        )
      ) {
        menu.push({ value: "Verify", iconColor: "primary01", iconName: "check" });
      }
    }
    return menu;
  }, [currentUser, urlData, profileOverview]);
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
  const subscribe = useCallback(() => {
    talentsService
      .sendSubscribeRequest(profileOverview?.username)
      .then(() => {
        toast.success(<ToastBody heading="Subscription request sent" />);
        window.location.reload();
      })
      .catch(() => {
        toast.error(<ToastBody heading="Something went wrong" />);
      });
  }, [profileOverview?.username]);
  const unsubscribe = useCallback(() => {
    talentsService
      .unsubscribe(profileOverview?.username)
      .then(() => {
        toast.success(<ToastBody heading="Unsiubscribed successfulyy" />);
        window.location.reload();
      })
      .catch(() => {
        toast.error(<ToastBody heading="Something went wrong" />);
      });
  }, [data.profileOverview?.username]);
  const MemoedTag = useMemo(() => {
    if (
      currentUser?.username === data.profileOverview?.username ||
      data.profileOverview?.subscribing_status === "unsubscribed"
    )
      return <></>;
    let tagLabel = "";
    switch (data.profileOverview?.subscribing_status) {
      case "subscribed":
        tagLabel = "Supporting";
        break;
      case "subscribing":
        tagLabel = "Supporting you";
        break;
      case "pending":
        tagLabel = "Pending";
        break;
      case "both_subscribed":
        tagLabel = "Both support";
        break;
      default:
        tagLabel = "";
        break;
    }
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
  }, [data.profileOverview, currentUser?.username]);
  useEffect(() => {
    if (!urlData.profileUsername) return;
    fetchProfileOverview(urlData.profileUsername);
  }, [urlData.profileUsername]);
  return !profileOverview ? (
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
            url={profileOverview?.profile_picture_url}
            profileURL={`/u/${profileOverview?.username}`}
          />
          {isMobile && (
            <Actions>
              <ButtonDropdown selectOption={onSelectOption} options={dropdownMenu} opensOnRight>
                <Button size="small" hierarchy="secondary" leftIcon="navigation" iconColor="primary01" />
              </ButtonDropdown>
              {currentUser?.username !== profileOverview?.username ? (
                <>
                  <Button
                    size="small"
                    hierarchy="secondary"
                    leftIcon="email"
                    iconColor="primary01"
                    href={`/messages?user=${profileOverview?.username}`}
                  />
                  {profileOverview?.subscribing_status === "unsubscribed" ? (
                    <Button size="small" hierarchy="secondary" text="Subscribe" onClick={subscribe} />
                  ) : (
                    <Button size="small" hierarchy="secondary" text="Unsubscribe" onClick={unsubscribe} />
                  )}
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
            {profileOverview?.name}
          </Name>
          {profileOverview?.verified && <Icon name="verified-2" color="primary" size={18} />}
        </UserInfo>
        {MemoedTag}
        <Typography specs={{ type: "regular", variant: "p1" }} color="primary01">
          {profileOverview?.headline}
        </Typography>
        {!!profileOverview?.location && (
          <LocationContainer>
            <Icon name="pin" color="primary04" size={16} />
            <Typography specs={{ type: "regular", variant: "p2" }} color="primary04">
              {profileOverview?.location}
            </Typography>
          </LocationContainer>
        )}
        <MembersContainer>
          {data.supporters.talents?.length ? (
            <>
              <MembersList membersImages={data.supporters.talents.map(supporter => supporter.profile_picture_url)} />
              <Typography specs={{ type: "small", variant: "label3" }} color="primary04">
                Supported by {data.supporters?.pagination?.total} of your connections.
              </Typography>
            </>
          ) : (
            <Typography specs={{ type: "small", variant: "label3" }} color="primary04">
              None of your connections is supporting {profileOverview?.name}.
            </Typography>
          )}
        </MembersContainer>
        {!isMobile && (
          <DesktopActions>
            <ButtonDropdown selectOption={onSelectOption} options={dropdownMenu}>
              <Button size="small" hierarchy="secondary" leftIcon="navigation" iconColor="primary01" />
            </ButtonDropdown>
            {currentUser?.username !== profileOverview?.username ? (
              <>
                <Button
                  size="small"
                  hierarchy="secondary"
                  leftIcon="email"
                  iconColor="primary01"
                  href={`/messages?user=${profileOverview?.username}`}
                />
                {profileOverview?.subscribing_status === "unsubscribed" ? (
                  <Button size="small" hierarchy="secondary" text="Subscribe" onClick={subscribe} />
                ) : (
                  <Button size="small" hierarchy="secondary" text="Unsubscribe" onClick={unsubscribe} />
                )}
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
        username={profileOverview?.username}
        profilePicture={profileOverview?.profile_picture_url}
      />
      <EditOverviewModalV2
        show={isEditMode}
        hide={() => setIsEditMode(false)}
        profile={profileOverview}
        username={profileOverview.username}
      />
      <ApprovalConfirmationModal
        show={showApproveModal}
        setShow={setShowApproveModal}
        hide={() => setShowApproveModal(false)}
        talent={profileOverview}
        setProfile={() => {
          window.location.reload();
        }}
        railsContext={railsContext}
      />
      <AdminVerificationConfirmationModal
        show={showVerifyModal}
        setShow={setShowVerifyModal}
        hide={() => setShowVerifyModal(false)}
        talent={profileOverview}
        setProfile={() => {
          window.location.reload();
        }}
      />
      {!profileOverview?.verified && (
        <PersonaVerificationConfirmationModal
          show={showWithPersonaModal}
          setShow={setShowWithPersonaModal}
          hide={() => setShowWithPersonaModal(false)}
          username={profileOverview?.username}
          railsContext={railsContext}
        />
      )}
    </>
  );
};
