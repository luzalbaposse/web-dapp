import React, { useState } from "react";
import { get } from "src/utils/requests";
import TalentKeywordSearch from "./TalentKeywordSearch";
import { useWindowDimensionsHook } from "src/utils/window";
import { camelCaseObject } from "src/utils/transformObjects";
import { P1 } from "src/components/design_system/typography";
import { ExploreTabs } from "src/components-v2/explore-tabs";
import cx from "classnames";

const TalentOptions = ({ searchUrl, headerDescription, setTalents, setPagination }) => {
  const { mobile } = useWindowDimensionsHook();
  const url = new URL(document.location);
  const [keyword, setKeyword] = useState(url.searchParams.get("keyword") || "");

  const filter = (e, filterType, option) => {
    e.preventDefault();

    const params = new URLSearchParams(document.location.search);
    params.set(filterType, option);
    params.set("page", 1);
    params.set("keyword", keyword);

    get(`${searchUrl}?${params.toString()}`).then(response => {
      setPagination(response.pagination);

      let talents = response.talents.map(talent => ({
        ...camelCaseObject(talent)
      }));
      setTalents(talents);

      window.history.replaceState({}, document.title, `${url.pathname}?${params.toString()}`);
    });
  };

  return (
    <div
      className="my-6 d-flex flex-wrap justify-content-between align-items-center"
      style={{ height: mobile ? "" : 34 }}
    >
      <ExploreTabs />
      {headerDescription && <P1 bold className="text-black" text={headerDescription} />}
      <div className={cx("d-flex ml-auto", mobile && "mt-3")}>
        <TalentKeywordSearch keyword={keyword} setKeyword={setKeyword} filter={filter} />
      </div>
    </div>
  );
};

export default TalentOptions;
