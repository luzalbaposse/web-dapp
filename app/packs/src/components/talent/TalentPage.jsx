import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";
import { loggedInUserStore } from "src/contexts/state";

import { useWindowDimensionsHook } from "src/utils/window";
import { get } from "src/utils/requests";

import { camelCaseObject } from "src/utils/transformObjects";
import ThemeContainer, { ThemeContext } from "src/contexts/ThemeContext";

import Button from "src/components/design_system/button";
import { P2 } from "src/components/design_system/typography";
import TalentTableListMode from "./TalentTableListMode";
import TalentTableCardMode from "./TalentTableCardMode";
import TalentOptions from "./TalentOptions";

import { Spinner } from "src/components/icons";

import {
  compareName,
  compareOccupation,
  compareSupporters,
  compareMarketCap,
  compareMarketCapVariance
} from "src/components/talent/utils/talent";

import cx from "classnames";

const TalentPage = ({ env }) => {
  const theme = useContext(ThemeContext);
  const { mobile } = useWindowDimensionsHook();
  const url = new URL(document.location);

  const [talents, setTalents] = useState([]);
  const [listModeOnly, setListModeOnly] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: null
  });
  const [loading, setLoading] = useState(false);

  const { currentUser, fetchCurrentUser } = loggedInUserStore();
  const isAdminOrModerator = currentUser?.admin || currentUser?.moderator;

  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser();
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    params.set("page", 1);
    loadTalents(params);
  }, []);

  useEffect(() => {
    let sortedTalent = [...talents];

    let comparisonFunction;

    switch (selectedSort) {
      case "Supporters":
        comparisonFunction = compareSupporters;
        break;
      case "Occupation":
        comparisonFunction = compareOccupation;
        break;
      case "Market Cap":
        comparisonFunction = compareMarketCap;
        break;
      case "Alphabetical Order":
        comparisonFunction = compareName;
        break;
      case "Market Cap Variance":
        comparisonFunction = compareMarketCapVariance;
        break;
    }

    if (sortDirection === "asc") {
      sortedTalent.sort(comparisonFunction).reverse();
    } else if (sortDirection === "desc") {
      sortedTalent.sort(comparisonFunction);
    }

    setTalents(sortedTalent);
  }, [selectedSort, sortDirection]);

  const loadTalents = params => {
    setLoading(true);
    get(`/api/v1/talent?${params.toString()}`).then(response => {
      if (response.error) {
        toast.error(<ToastBody heading="Error!" body={response.error} />);
      } else {
        setPagination(response.pagination);
        let responseTalents = response.talents.map(talent => ({
          ...camelCaseObject(talent)
        }));
        setTalents(responseTalents);

        window.history.replaceState({}, document.title, `${url.pathname}?${params.toString()}`);
        setLoading(false);
      }
    });
  };

  const loadMoreTalents = () => {
    setLoading(true);
    const nextPage = pagination.currentPage + 1;

    const params = new URLSearchParams(document.location.search);
    params.set("page", nextPage);

    get(`/api/v1/talent?${params.toString()}`).then(response => {
      let responseTalents = response.talents.map(talent => ({
        ...camelCaseObject(talent)
      }));
      const newTalents = [...talents, ...responseTalents];
      setTalents(newTalents);
      setPagination(camelCaseObject(response.pagination));

      window.history.replaceState({}, document.title, `${url.pathname}?${params.toString()}`);
      setLoading(false);
    });
  };

  const showLoadMoreTalents = pagination.currentPage < pagination.lastPage;

  return (
    <div className={cx("pb-6", mobile && "p-4")}>
      <TalentOptions
        listModeOnly={listModeOnly}
        searchUrl="/api/v1/talent"
        setListModeOnly={setListModeOnly}
        setTalents={setTalents}
        setPagination={setPagination}
        setSelectedSort={setSelectedSort}
        setSortDirection={setSortDirection}
        isAdminOrModerator={isAdminOrModerator}
      />
      {talents.length === 0 && !loading && (
        <div className="d-flex justify-content-center mt-6">
          <P2 className="text-black" bold text="We couldn't find any talent based on your search." />
        </div>
      )}
      {listModeOnly ? (
        <TalentTableListMode
          theme={theme}
          talents={talents}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          showFirstBoughtField={false}
        />
      ) : (
        <TalentTableCardMode talents={talents} env={env} />
      )}
      {loading && (
        <div className="w-100 d-flex flex-row my-2 justify-content-center">
          <Spinner />
        </div>
      )}
      {showLoadMoreTalents && (
        <Button onClick={() => loadMoreTalents()} type="white-subtle" className="d-flex mt-4 mx-auto">
          Load more
        </Button>
      )}
    </div>
  );
};

export default (props, railsContext) => {
  return () => (
    <ThemeContainer {...props}>
      <TalentPage {...props} env={railsContext.contractsEnv} />
    </ThemeContainer>
  );
};
