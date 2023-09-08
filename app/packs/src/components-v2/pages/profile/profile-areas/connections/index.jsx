import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";
import { get } from "src/utils/requests";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import debounce from "lodash/debounce";

import { P2 } from "src/components/design_system/typography";
import ThemedButton from "src/components/design_system/button";
import { useWindowDimensionsHook } from "src/utils/window";
import { useTheme } from "src/contexts/ThemeContext";

import { talentsService } from "src/api";
import { SearchForm } from "./search-form";
import { ConnectionsTable } from "./connections-table";
import { DROPDOWN_OPTIONS } from "./constants";
import { QRCodeModal } from "src/components-v2/qr-code-modal";
import { SubscriptionButton } from "src/components-v2/subscription-button";
import { Button, Icon, Spinner, Typography, useModal } from "@talentprotocol/design-system";
import { Container, SpinnerContainer, EmptyStateContainer, EmptyStateButtonContainer } from "./styled";

import cx from "classnames";

export const Connections = ({ currentUser, urlData }) => {
  const url = new URL(document.location);
  const qrCodeModalState = useModal();
  const { mode } = useTheme();
  const { mobile } = useWindowDimensionsHook();
  const [talent, setTalent] = useState(null);
  const [connections, setConnections] = useState([]);
  const [pagination, setPagination] = useState({});
  const [userId, setUserId] = useState(undefined);
  const [keyword, setKeyword] = useState(url.searchParams.get("keyword") || "");
  const [connectionType, setConnectionType] = useState(
    DROPDOWN_OPTIONS.filter(option => option.type === url.searchParams.get("connection_type"))[0] || DROPDOWN_OPTIONS[0]
  );
  const canUpdate = currentUser?.username == urlData?.profileUsername;

  useEffect(() => {
    if (!urlData.profileUsername) return;
    talentsService.getSupportData(urlData.profileUsername).then(({ data }) => {
      setTalent(data.talent);
      setUserId(data.talent.username);
    });
  }, []);

  useEffect(() => {
    if (userId) {
      const params = new URLSearchParams(document.location.search);
      params.set("id", userId);

      get(`/api/v1/connections?${params.toString()}`).then(response => {
        if (response.error) {
          toast.error(<ToastBody heading="Error!" body={response.error} />);
        } else {
          setPagination(response.pagination);
          setConnections(response.connections);
          window.history.replaceState({}, document.title, `${url.pathname}?${params.toString()}`);
        }
      });
    }
  }, [userId]);

  const showLoadMoreConnections = () => {
    return pagination.cursor;
  };

  const loadMoreConnections = () => {
    const params = new URLSearchParams(document.location.search);
    params.set("cursor", pagination.cursor);
    params.set("id", userId);

    get(`/api/v1/connections?${params.toString()}`).then(response => {
      setConnections(prev => [...prev, ...response.connections]);
      setPagination(response.pagination);
      window.history.replaceState({}, document.title, `${url.pathname}?${params.toString()}`);
    });
  };

  const search = params => {
    params.set("cursor", "");

    get(`/api/v1/connections?${params.toString()}`).then(response => {
      setConnections(response.connections);
      setPagination(response.pagination);
      window.history.replaceState({}, document.title, `${url.pathname}?${params.toString()}`);
    });
  };

  const debouncedSetParamsAndSearch = useCallback(
    debounce((field, option) => setParamsAndSearch(field, option), 500),
    []
  );

  const setParamsAndSearch = (field, option) => {
    const params = new URLSearchParams(document.location.search);

    if (field === "connectionType") {
      if (option.value == "All") {
        params.delete("connection_type");
      } else {
        params.set("connection_type", option.type);
      }
      params.set("keyword", keyword);
    }

    if (field === "keyword") {
      if (connectionType.value != "All") {
        params.set("connection_type", connectionType.type);
      }

      params.set("keyword", option);
    }

    search(params);
  };

  const changeOptions = (field, option) => {
    if (field === "connectionType") {
      setConnectionType(option);
    }
    if (field === "keyword") {
      setKeyword(option);
    }
    debouncedSetParamsAndSearch(field, option);
  };

  const subscriptionCallback = (_username, subscription) => {
    if (subscription === "subscribe") {
      setTalent({ ...talent, subscribed_status: "Cancel request" });
    } else {
      setTalent({ ...talent, subscribed_status: "Subscribe" });
    }
  };

  console.log("talent", talent);

  return !talent || !userId ? (
    <SpinnerContainer>
      <Spinner color="primary" size={48} />
    </SpinnerContainer>
  ) : (
    <Container>
      {talent?.connections_count !== 0 ? (
        <>
          <div className="row justify-content-center">
            <div className="col-6 col-lg-3 d-flex justify-content-center">
              <P2
                className={cx("text-primary-01 mr-1", mobile && "ml-5")}
                bold
                text={talent?.supporters_count || "0"}
              />
              <P2 className="text-primary-04" text="Supporters" />
            </div>
            <div className="col-6 col-lg-3 d-flex justify-content-center">
              <P2 className="text-primary-01 mr-1" bold text={talent?.supporting_count || "0"} />
              <P2 className="text-primary-04" text="Supporting" />
            </div>
            <div className="col-6 col-lg-3 d-flex justify-content-center">
              <P2
                className={cx("text-primary-01 mr-1", mobile && "ml-5")}
                bold
                text={talent?.subscribers_count || "0"}
              />
              <P2 className="text-primary-04" text="Subscribers" />
            </div>
            <div className="col-6 col-lg-3 d-flex justify-content-center">
              <P2 className="text-primary-01 mr-1" bold text={talent?.subscribing_count || "0"} />
              <P2 className="text-primary-04" text="Subscribing" />
            </div>
          </div>
          <SearchForm
            options={DROPDOWN_OPTIONS}
            changeOptions={changeOptions}
            connectionType={connectionType}
            keyword={keyword}
            mobile={mobile}
          />
          <ConnectionsTable
            connections={connections}
            mode={mode()}
            ticker={talent?.talent_token.ticker}
            mobile={mobile}
          />
          {showLoadMoreConnections() && (
            <div className="d-flex flex-column justify-content-center">
              <ThemedButton onClick={() => loadMoreConnections()} type="white-default" className="mx-auto">
                Show More
              </ThemedButton>
            </div>
          )}
        </>
      ) : canUpdate ? (
        <EmptyStateContainer>
          <Icon name="binoculars" size={64} color="primary04" />
          <Typography specs={{ type: "regular", variant: "p1" }} color="primary04">
            It looks like you haven't connected with anyone yet. Invite your friends to be the firsts to subscribe to
            you.
          </Typography>
          <EmptyStateButtonContainer>
            <Button
              hierarchy="primary"
              size="medium"
              text="Share Profile"
              onClick={() => qrCodeModalState.openModal()}
            />
          </EmptyStateButtonContainer>
        </EmptyStateContainer>
      ) : (
        <EmptyStateContainer>
          <Icon name="binoculars" size={64} color="primary04" />
          <Typography specs={{ type: "regular", variant: "p1" }} color="primary04">
            Everyone starts somewhere. Be the first to subscribe to them and light up their day!
          </Typography>
          <EmptyStateButtonContainer>
            <SubscriptionButton
              username={talent.username}
              subscribedStatus={talent.subscribed_status}
              callback={subscriptionCallback}
            />
          </EmptyStateButtonContainer>
        </EmptyStateContainer>
      )}
      <QRCodeModal
        modalState={qrCodeModalState}
        url={`https://beta.talentprotocol.com/u/${talent.username}`}
        profilePicture={talent.profile_picture_url}
        text="Scan this QR code to open your profile."
        buttonText="Copy profile URL"
      />
    </Container>
  );
};
