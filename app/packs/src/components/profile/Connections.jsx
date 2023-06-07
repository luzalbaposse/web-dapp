import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";

import { get } from "src/utils/requests";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import debounce from "lodash/debounce";

import { H4, H5, P2, Caption } from "src/components/design_system/typography";
import ThemedButton from "src/components/design_system/button";
import { useWindowDimensionsHook } from "src/utils/window";
import { useTheme } from "src/contexts/ThemeContext";
import TalentProfilePicture from "src/components/talent/TalentProfilePicture";
import Table from "src/components/design_system/table";
import { lightTextPrimary03, darkTextPrimary03 } from "src/utils/colors.js";
import TextInput from "src/components/design_system/fields/textinput";
import { Search } from "src/components/icons";
import { Tabs, useTabs, Tag } from "@talentprotocol/design-system";

import cx from "classnames";

const ConnectionTable = ({ connections, mode, mobile }) => {
  const formattedConnectionType = connection_type => {
    return {
      sponsor: "Sponsor",
      sponsoring: "Sponsoring",
      staker: "Staker",
      staking: "Staking",
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
          <Caption bold text="Relationship" />
        </Table.Th>
        <Table.Th className="hide-content-in-mobile">
          <Caption bold text="Since" />
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
                {connection.ticker && (
                  <P2
                    text={`$${connection.ticker}`}
                    className="ml-2 text-uppercase hide-content-in-mobile"
                    style={{
                      color: mode == "dark" ? darkTextPrimary03 : lightTextPrimary03
                    }}
                  />
                )}
              </div>
            </Table.Td>
            <Table.Td>
              <div className="d-flex">
                {connection.connection_types.map(connectionType => (
                  <div className="mr-2">
                    <Tag
                      backgroundColor={connectionType.endsWith("ing") ? "primaryTint02" : "primary"}
                      textColor={connectionType.endsWith("ing") ? "primaryText" : "bg01"}
                      label={formattedConnectionType(connectionType)}
                      borderColor="surfaceHover02"
                      size="small"
                    />
                  </div>
                ))}
              </div>
            </Table.Td>
            <Table.Td className="hide-content-in-mobile">
              <P2 text={dayjs(connection.connected_at, "YYYY-MM-DD").format("MMM DD, YYYY")} />
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Body>
    </Table>
  );
};

const SearchForm = ({ supportersCount, supportingCount, changeOptions, keyword, mobile }) => {
  const tabsState = useTabs();
  const allCount = supportersCount + supportingCount;
  const tabs = [`All (${allCount})`, `Supporters (${supportersCount})`, `Supporting (${supportingCount})`];
  const TAB_INDEX_TO_NAME = {
    0: "all",
    1: "supporters",
    2: "supporting"
  };

  const onChange = (e, field, value) => {
    e.preventDefault();

    changeOptions(field, value);
  };

  const changeTab = index => {
    tabsState.selectElement(index);
    changeOptions("connectionType", TAB_INDEX_TO_NAME[index]);
  };

  return (
    <div className="d-flex justify-content-between my-4">
      <Tabs
        tabList={tabs}
        selectedIndex={tabsState.selectedIndex}
        onClick={changeTab}
        disabledList={[false, false, false]}
      />
      <div className="position-relative">
        <TextInput
          value={keyword}
          onChange={e => onChange(e, "keyword", e.target.value)}
          placeholder="Search"
          inputClassName={cx("pl-5", mobile ? "w-75" : "w-100")}
          className="w-100"
        />
        <Search color="currentColor" className="position-absolute chat-search-icon" />
      </div>
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
    connectionTypeOption(url.searchParams.get("connection_type")) || "All"
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
    params.set("id", userId);

    get(`/api/v1/connections?${params.toString()}&cursor=${pagination.cursor}`).then(response => {
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
      if (option == "All") {
        params.delete("connection_type");
      } else {
        params.set("connection_type", option);
      }
      params.set("keyword", keyword);
    }

    if (field === "keyword") {
      if (connectionType != "all") {
        params.set("connection_type", connectionType);
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

  return (
    <section className="d-flex flex-column mx-4">
      <H4 className="text-center mb-3" text="Connections" />
      {talent?.connections_count > 0 && (
        <>
          <SearchForm
            supportersCount={talent?.aggregate_supporters_count}
            supportingCount={talent?.aggregate_supporting_count}
            changeOptions={changeOptions}
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
