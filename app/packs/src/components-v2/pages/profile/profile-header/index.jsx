import React, { useMemo, useCallback, useState } from "react";
import { noop } from "lodash";
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
  SpinnerContainer,
  TagContainer,
  TopRow,
  UserInfo
} from "./styled";
import { useDataFetcher } from "./hooks/use-data-fetcher";
import { useImpersonate } from "./hooks/use-impersonate";

export const ProfileHeader = ({ urlData, currentUser }) => {
  const data = useDataFetcher(urlData);
  const { impersonateUser } = useImpersonate();
  const qrCodeModalState = useModal();
  const [isEditMode, setIsEditMode] = useState(false);
  const dropdownMenu = useMemo(() => {
    if (!currentUser) return [];
    const menu = [{ value: "Share", iconColor: "primary01", iconName: "share-2" }];
    if (currentUser?.admin) {
      menu.push({ value: "Impersonate", iconColor: "primary01", iconName: "user" });
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
        case "Share":
        default:
          qrCodeModalState.openModal();
          return;
      }
    },
    [urlData.profileUsername]
  );
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
          <Actions>
            <ButtonDropdown selectOption={onSelectOption} options={dropdownMenu}>
              <Button size="small" hierarchy="secondary" leftIcon="navigation" iconColor="primary01" />
            </ButtonDropdown>
            {currentUser?.username !== data.profileOverview?.username && (
              <>
                <Button size="small" hierarchy="secondary" leftIcon="email" iconColor="primary01" />
                <Button size="small" hierarchy="secondary" text="Subscribe" />
              </>
            )}
          </Actions>
        </TopRow>
        <UserInfo>
          <Typography specs={{ type: "bold", variant: "h5" }} color="primary01">
            {data.profileOverview?.name}
          </Typography>
          <Icon name="verified-2" color="primary" size={18} />
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
          {data.supporters.talents?.length && (
            <>
              <MembersList membersImages={data.supporters.talents.map(supporter => supporter.profile_picture_url)} />
              <Typography specs={{ type: "small", variant: "label3" }} color="primary04">
                Supported by {data.supporters.pagination.total} other connections.
              </Typography>
            </>
          )}
        </MembersContainer>
        <DesktopActions>
          <ButtonDropdown selectOption={onSelectOption} options={dropdownMenu}>
            <Button size="small" hierarchy="secondary" leftIcon="navigation" iconColor="primary01" />
          </ButtonDropdown>
          {currentUser?.username !== data.profileOverview?.username && (
            <>
              <Button size="small" hierarchy="secondary" leftIcon="email" iconColor="primary01" />
              <Button size="small" hierarchy="secondary" text="Subscribe" />
            </>
          )}
        </DesktopActions>
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
    </>
  );
};
