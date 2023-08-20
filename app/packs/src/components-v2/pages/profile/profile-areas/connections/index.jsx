import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";
import { get } from "src/utils/requests";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import debounce from "lodash/debounce";

import { H5, P2 } from "src/components/design_system/typography";
import ThemedButton from "src/components/design_system/button";
import { useWindowDimensionsHook } from "src/utils/window";
import { useTheme } from "src/contexts/ThemeContext";

import { Spinner } from "@talentprotocol/design-system";
import { talentsService } from "src/api";
import { Container, SpinnerContainer } from "./styled";
import { SearchForm } from "./search-form";
import { ConnectionsTable } from "./connections-table";
import { DROPDOWN_OPTIONS } from "./constants";

import cx from "classnames";

export const Connections = ({ currentUser, urlData }) => {
  const url = new URL(document.location);
  const canUpdate = currentUser.username == urlData.username;

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

  return !talent || !userId ? (
    <SpinnerContainer>
      <Spinner color="primary" size={48} />
    </SpinnerContainer>
  ) : (
    <Container>
      <div className="row justify-content-center">
        <div className="col-6 col-lg-3 d-flex justify-content-center">
          <P2 className={cx("text-primary-01 mr-1", mobile && "ml-5")} bold text={talent?.supporters_count || "0"} />
          <P2 className="text-primary-04" text="Stakers" />
        </div>
        <div className="col-6 col-lg-3 d-flex justify-content-center">
          <P2 className="text-primary-01 mr-1" bold text={talent?.supporting_count || "0"} />
          <P2 className="text-primary-04" text="Staking" />
        </div>
        <div className="col-6 col-lg-3 d-flex justify-content-center">
          <P2 className={cx("text-primary-01 mr-1", mobile && "ml-5")} bold text={talent?.subscribers_count || "0"} />
          <P2 className="text-primary-04" text="Subscribers" />
        </div>
        <div className="col-6 col-lg-3 d-flex justify-content-center">
          <P2 className="text-primary-01 mr-1" bold text={talent?.subscribing_count || "0"} />
          <P2 className="text-primary-04" text="Subscribing" />
        </div>
      </div>
      {talent?.connections_count !== 0 && (
        <>
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
        </>
      )}

      {talent?.connections_count == 0 && canUpdate && (
        <>
          <H5 bold text={"You don't have any Connections members"} className="text-primary-01 text-center mt-7 mb-2" />
          <P2
            bold
            text={"Connections are compound by people that support your career and people you are supporting!"}
            className="text-primary-03 text-center"
          />
          <div className="d-flex flex-column justify-content-center my-5">
            <ThemedButton onClick={() => (window.location.href = `/talent`)} type="primary-default" className="mx-auto">
              Connect with talent
            </ThemedButton>
          </div>
        </>
      )}
      {showLoadMoreConnections() && (
        <div className="d-flex flex-column justify-content-center">
          <ThemedButton onClick={() => loadMoreConnections()} type="white-default" className="mx-auto">
            Show More
          </ThemedButton>
        </div>
      )}
    </Container>
  );
};
