import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";
import { loggedInUserStore } from "src/contexts/state";

import { useWindowDimensionsHook } from "src/utils/window";
import { get } from "src/utils/requests";

import { camelCaseObject } from "src/utils/transformObjects";

import Button from "src/components/design_system/button";
import { P2 } from "src/components/design_system/typography";
import TalentTableCardMode from "./TalentTableCardMode";
import TalentOptions from "./TalentOptions";

import { Spinner } from "src/components/icons";

import cx from "classnames";

const TalentPage = ({ env }) => {
  const { mobile } = useWindowDimensionsHook();
  const url = new URL(document.location);

  const [talents, setTalents] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: null
  });
  const [loading, setLoading] = useState(false);

  const { currentUser, fetchCurrentUser } = loggedInUserStore();

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
      <TalentOptions searchUrl="/api/v1/talent" setTalents={setTalents} setPagination={setPagination} />
      {talents.length === 0 && !loading && (
        <div className="d-flex justify-content-center mt-6">
          <P2 className="text-black" bold text="We couldn't find any talent based on your search." />
        </div>
      )}
      <TalentTableCardMode talents={talents} env={env} />
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
  return () => <TalentPage {...props} env={railsContext.contractsEnv} />;
};
