import React, { useMemo, useCallback, useState } from "react";
import { noop } from "lodash";
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

export const ProfileHeader = ({ urlData, currentUser, isMobile, railsContext }) => {
  const data = useDataFetcher(urlData);
  const { impersonateUser } = useImpersonate();
  const qrCodeModalState = useModal();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const dropdownMenu = useMemo(() => {
    if (!currentUser) return [];
    const menu = [{ value: "Share", iconColor: "primary01", iconName: "share-2" }];
    if (currentUser?.admin) {
      menu.push({ value: "Impersonate", iconColor: "primary01", iconName: "user" });
      if (!data.profileOverview?.verified) {
        menu.push({ value: "Verify", iconColor: "primary01", iconName: "check" });
      }
      if (data.profileOverview?.profile_type === "waiting_for_approval") {
        menu.push({ value: "Approve", iconColor: "primary01", iconName: "check-chat" });
      }
    }
    if (currentUser?.username === urlData.profileUsername) {
      menu.push({ value: "Edit", iconColor: "primary01", iconName: "edit" });
    }
    return menu;
  }, [currentUser, urlData]);
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
        case "Verify":
          setShowVerifyModal(true);
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
      .sendSubscribeRequest(data.profileOverview?.username)
      .then(() => {
        toast.success(<ToastBody heading="Subscription request sent" />);
        window.location.reload();
      })
      .catch(() => {
        toast.error(<ToastBody heading="Something went wrong" />);
      });
  }, [data.profileOverview?.username]);
  const unsubscribe = useCallback(() => {
    talentsService
      .unsubscribe(data.profileOverview?.username)
      .then(() => {
        toast.success(<ToastBody heading="Unsiubscribed successfulyy" />);
        window.location.reload();
      })
      .catch(() => {
        toast.error(<ToastBody heading="Something went wrong" />);
      });
  }, [data.profileOverview?.username]);
  return !data.profileOverview ? (
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
            url={data.profileOverview?.profile_picture_url}
            profileURL={`/u/${data.profileOverview?.username}`}
          />
          {isMobile && (
            <Actions>
              <ButtonDropdown selectOption={onSelectOption} options={dropdownMenu}>
                <Button size="small" hierarchy="secondary" leftIcon="navigation" iconColor="primary01" />
              </ButtonDropdown>
              {currentUser?.username !== data.profileOverview?.username && (
                <>
                  <Button
                    size="small"
                    hierarchy="secondary"
                    leftIcon="email"
                    iconColor="primary01"
                    href={`/messages?user=${data.profileOverview?.username}`}
                  />
                  {data.profileOverview?.subscribing_status === "unsubscribed" ? (
                    <Button size="small" hierarchy="secondary" text="Subscribe" onClick={subscribe} />
                  ) : (
                    <Button size="small" hierarchy="secondary" text="Unsubscribe" onClick={unsubscribe} />
                  )}
                </>
              )}
            </Actions>
          )}
        </TopRow>
        <UserInfo>
          <Name specs={{ type: "bold", variant: "h5" }} color="primary01">
            {data.profileOverview?.name}
          </Name>
          {data.profileOverview?.verified && <Icon name="verified-2" color="primary" size={18} />}
        </UserInfo>
        <TagContainer>
          {currentUser?.username !== data.profileOverview?.username && (
            <Tag
              size="small"
              color="primary"
              label={
                data.profileOverview?.subscribing_status.charAt(0).toUpperCase() +
                data.profileOverview?.subscribing_status.slice(1)
              }
              backgroundColor="bg01"
              borderColor="surfaceHover02"
              textColor="primary02"
            />
          )}
        </TagContainer>
        <Typography specs={{ type: "regular", variant: "p1" }} color="primary01">
          {data.profileOverview?.headline}
        </Typography>
        <LocationContainer>
          <Icon name="pin" color="primary04" size={16} />
          <Typography specs={{ type: "regular", variant: "p2" }} color="primary04">
            {data.profileOverview?.location || "..."}
          </Typography>
        </LocationContainer>
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
              None of your connections is supporting {data.profileOverview?.name}.
            </Typography>
          )}
        </MembersContainer>
        {!isMobile && (
          <DesktopActions>
            <ButtonDropdown selectOption={onSelectOption} options={dropdownMenu}>
              <Button size="small" hierarchy="secondary" leftIcon="navigation" iconColor="primary01" />
            </ButtonDropdown>
            {currentUser?.username !== data.profileOverview?.username && (
              <>
                <Button
                  size="small"
                  hierarchy="secondary"
                  leftIcon="email"
                  iconColor="primary01"
                  href={`/messages?user=${data.profileOverview?.username}`}
                />
                {data.profileOverview?.subscribing_status === "unsubscribed" ? (
                  <Button size="small" hierarchy="secondary" text="Subscribe" onClick={subscribe} />
                ) : (
                  <Button size="small" hierarchy="secondary" text="Unsubscribe" onClick={unsubscribe} />
                )}
              </>
            )}
          </DesktopActions>
        )}
      </Container>
      <QRCodeModal
        modalState={qrCodeModalState}
        username={data.profileOverview?.username}
        profilePicture={data.profileOverview?.profile_picture_url}
        tal_domain={void 0}
      />
      <EditOverviewModalV2
        show={isEditMode}
        hide={() => setIsEditMode(false)}
        profile={data.profileOverview}
        username={data.profileOverview.username}
      />
      <ApprovalConfirmationModal
        show={showApproveModal}
        setShow={setShowApproveModal}
        hide={() => setShowApproveModal(false)}
        talent={data.profileOverview}
        setProfile={noop}
        railsContext={railsContext}
      />
      <AdminVerificationConfirmationModal
        show={showVerifyModal}
        setShow={setShowVerifyModal}
        hide={() => setShowVerifyModal(false)}
        talent={data.profileOverview}
        setProfile={() => { window.location.reload() }}
      />
    </>
  );
};
