import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";
import { Button } from "@talentprotocol/design-system";

import { useWindowDimensionsHook } from "src/utils/window";

import { loggedInUserStore } from "src/contexts/state";

import HighlightsCard from "src/components/design_system/highlights_card";
import DiscoveryBanners from "src/components/design_system/banners/DiscoveryBanners";

import DiscoveryRow from "./discovery_row";
import { discoveryRowsService } from "src/api/discovery-rows";

import cx from "classnames";

const Discovery = ({ railsContext }) => {
  const { mobile } = useWindowDimensionsHook();

  const [discoveryRows, setDiscoveryRows] = useState([]);
  const [pagination, setPagination] = useState({});
  const { currentUser, fetchCurrentUser } = loggedInUserStore();
  const perPage = 10;

  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser();
    }
    loadDiscoveryRows(1);
  }, []);

  const loadDiscoveryRows = page => {
    discoveryRowsService.getDiscoveryRows(page, perPage).then(response => {
      if (response.error) {
        toast.error(<ToastBody heading="Error!" body={response.error} />);
      } else {
        setPagination(response.data.pagination);
        setDiscoveryRows([...discoveryRows, ...response.data.discovery_rows]);
      }
    });
  };

  const showLoadMore = () => {
    return pagination.currentPage < pagination.lastPage;
  };

  return (
    <div className="d-flex flex-column">
      {!mobile && <DiscoveryBanners user={currentUser} railsContext={railsContext} />}
      <div
        className={cx(
          "w-100 d-flex flex-wrap mt-6 mb-6",
          mobile ? "justify-content-center" : "justify-content-between"
        )}
      >
        <HighlightsCard className="mt-2" title="Trending" link="/talent?status=Trending" />
        <HighlightsCard className="mt-2" title="Latest Added" link="/talent?status=Latest+added" />
        <HighlightsCard className="mt-2" title="Launching Soon" link="/talent?status=Launching+soon" />
      </div>
      {discoveryRows.map(discoveryRow => (
        <DiscoveryRow discoveryRow={discoveryRow} env={railsContext.contractsEnv} key={discoveryRow.id} />
      ))}
      {showLoadMore() && (
        <div className="d-flex align-items-center justify-content-center">
          <Button
            hierarchy="secondary"
            size="medium"
            text="Load more"
            onClick={() => loadDiscoveryRows(pagination.currentPage + 1)}
          />
        </div>
      )}
    </div>
  );
};

export default (props, railsContext) => {
  return () => <Discovery {...props} railsContext={railsContext} />;
};
