import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";

import { get } from "src/utils/requests";
import { ethers } from "ethers";
import { parseAndCommify } from "src/onchain/utils";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import debounce from "lodash/debounce";

import { H4, H5, P2, P3, Caption } from "src/components/design_system/typography";
import Tag from "src/components/design_system/tag";
import ThemedButton from "src/components/design_system/button";
import { useWindowDimensionsHook } from "src/utils/window";
import { useTheme } from "src/contexts/ThemeContext";
import TalentProfilePicture from "src/components/talent/TalentProfilePicture";
import Table from "src/components/design_system/table";
import { lightTextPrimary03, darkTextPrimary03 } from "src/utils/colors.js";
import TextInput from "src/components/design_system/fields/textinput";
import { Search, OrderBy } from "src/components/icons";
import Dropdown from "react-bootstrap/Dropdown";

import cx from "classnames";

const ConnectionTable = ({ connections, mode, mobile }) => {
  const formattedConnectionType = connection_type => {
    return {
      sponsor: "Sponsor",
      sponsored: "Sponsored",
      mutual_stake: "Mutual Stake",
      staker: "Staker",
      staking: "Staking",
      mutual_subscription: "Mutual Subscription",
      subscriber: "Subscriber",
      subscribing: "Subscribing"
    }[connection_type];
  };

  return (
    <Table mode={mode}>
      <Table.Head>
        <Table.Th>
          <Caption bold text="Talent" />
        </Table.Th>
        <Table.Th className={cx(mobile ? "text-right" : "")}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Caption bold text="Connection" />
          </div>
        </Table.Th>
      </Table.Head>
      <Table.Body>
        {connections.map(connection => (
          <Table.Tr
            key={connection.id}
            onClick={() => (window.location.href = `https://beta.talentprotocol.com/u/${connection.username}`)}
          >
            <Table.Td>
              <div className="d-flex align-items-center">
                <TalentProfilePicture src={connection.profile_picture_url} userId={connection.id} height={24} />
                <P2 text={connection.name} bold className="ml-2" />
              </div>
            </Table.Td>
            <Table.Td>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Tag className={cx("connection", `connection__${connection.connection_type}`, mobile ? "ml-auto" : "")}>
                  <div className="d-flex align-items-center">
                    <P2 mode={mode} text={formattedConnectionType(connection.connection_type)} bold role="button" />
                  </div>
                </Tag>
              </div>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Body>
    </Table>
  );
};

const SearchForm = ({ options, changeOptions, connectionType, keyword, mobile }) => {
  const selectedClass = option => (option.name == connectionType.name ? " text-primary" : "text-black");

  return (
    <div className="d-flex justify-content-between my-4">
      <div className="position-relative">
        <TextInput
          value={keyword}
          onChange={e => changeOptions(e, "keyword", e.target.value)}
          placeholder="Search"
          inputClassName={cx("pl-5", mobile ? "w-75" : "w-100")}
          className="w-100"
        />
        <Search color="currentColor" className="position-absolute chat-search-icon" />
      </div>
      <Dropdown>
        <Dropdown.Toggle
          className="talent-button white-subtle-button normal-size-button no-caret d-flex justify-content-between align-items-center"
          id="talent-filters-dropdown"
          bsPrefix=""
          as="div"
          style={{ height: 34, width: 150 }}
        >
          <P2 bold text={connectionType.name} className="mr-2 align-middle text-black text-ellipsis" />
          <OrderBy black />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {options.map(option => (
            <Dropdown.Item
              key={`tab-dropdown-${option.name}`}
              className="d-flex flex-row justify-content-between"
              onClick={e => changeOptions(e, "connectionType", option)}
            >
              <P3 bold text={option.name} className={selectedClass(option)} />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const Connections = ({ userId, talent, canUpdate }) => {
  const { mobile } = useWindowDimensionsHook();
  const [connections, setConnections] = useState([]);
  const [pagination, setPagination] = useState({});
  const { mode } = useTheme();
  const url = new URL(document.location);

  const options = [
    { name: "All", value: null },
    { name: "Sponsor", value: "sponsor" },
    { name: "Sponsored", value: "sponsored" },
    {
      name: "Mutual Stake",
      value: "mutual_stake"
    },
    { name: "Staker", value: "staker" },
    { name: "Staking", value: "staking" },
    {
      name: "Mutual Subscription",
      value: "mutual_subscription"
    },
    { name: "Subscriber", value: "subscriber" },
    { name: "Subscribing", value: "subscribing" }
  ];
  const connectionTypeOption = value => {
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) {
        return options[i];
      }
    }
    return null;
  };
  const [connectionType, setConnectionType] = useState(
    connectionTypeOption(url.searchParams.get("connection_type")) || {
      name: "All",
      value: null
    }
  );
  const [keyword, setKeyword] = useState(url.searchParams.get("keyword") || "");

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    params.set("id", userId);

    get(`/api/v1/connections?${params.toString()}`).then(response => {
      if (response.error) {
        toast.error(<ToastBody heading="Error!" body={response.error} />);
      } else {
        setPagination(response.pagination);
        setConnections(response.connections);
      }
    });
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
    get(`/api/v1/connections?${params.toString()}`).then(response => {
      setConnections(response.connections);
      setPagination(response.pagination);
      window.history.replaceState({}, document.title, `${url.pathname}?${params.toString()}`);
    });
  };

  const debouncedSetParamsAndSearch = debounce((field, option) => setParamsAndSearch(field, option), 500);

  const setParamsAndSearch = (field, option) => {
    const params = new URLSearchParams(document.location.search);
    params.set("id", userId);

    if (field === "connectionType") {
      if (option.name == "All") {
        params.delete("connection_type");
      } else {
        params.set("connection_type", option.value);
      }
      params.set("keyword", keyword);
    }

    if (field === "keyword") {
      if (connectionType.name != "All") {
        params.set("connection_type", connectionType.value);
      }

      params.set("keyword", option);
    }

    search(params);
  };

  const changeOptions = (e, field, option) => {
    e.preventDefault();

    if (field === "connectionType") {
      setConnectionType(option);
    }
    if (field === "keyword") {
      setKeyword(option);
    }
    debouncedSetParamsAndSearch(field, option);
  };

  return (
    <section className="d-flex flex-column mx-4">
      <H4 className="text-center mb-3" text="Connections" />
      <div className="mb-5 row justify-content-center ">
        <div className="col-6 col-lg-2 d-flex">
          <P2 className={cx("text-primary-01 mr-1", mobile && "ml-5")} bold text={talent?.supporters_count || "0"} />
          <P2 className="text-primary-04" text="Stakers" />
        </div>
        <div className="col-6 col-lg-2 d-flex">
          <P2 className="text-primary-01 mr-1" bold text={talent?.supporting_count || "0"} />
          <P2 className="text-primary-04" text="Staking" />
        </div>
        <div className="col-6 col-lg-2 d-flex">
          <P2 className={cx("text-primary-01 mr-1", mobile && "ml-5")} bold text={talent?.subscribers_count || "0"} />
          <P2 className="text-primary-04" text="Subscribers" />
        </div>
        <div className="col-6 col-lg-2 d-flex">
          <P2 className="text-primary-01 mr-1" bold text={talent?.subscribing_count || "0"} />
          <P2 className="text-primary-04" text="Subscribing" />
        </div>
      </div>
      {!!connections.length && (
        <>
          <SearchForm
            options={options}
            changeOptions={changeOptions}
            connectionType={connectionType}
            keyword={keyword}
            mobile={mobile}
          />
          <ConnectionTable
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
        <div className="d-flex flex-column justify-content-center mt-6">
          <ThemedButton onClick={() => loadMoreConnections()} type="white-default" className="mx-auto">
            Show More
          </ThemedButton>
        </div>
      )}
    </section>
  );
};

export default Connections;
