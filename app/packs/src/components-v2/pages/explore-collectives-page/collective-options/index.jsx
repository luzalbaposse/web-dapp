import { Input } from "@talentprotocol/design-system";
import React, { useState } from "react";
import { camelCaseObject } from "src/utils/transformObjects";
import { Container, Form } from "./styled";
import { ExploreTabs } from "src/components-v2/explore-tabs";
import { organizations } from "../../../../api/organizations";

const CollectiveOptions = ({ setCollectives, setPagination }) => {
  const url = new URL(document.location);
  const [keyword, setKeyword] = useState(url.searchParams.get("keyword") || "");

  const search = e => {
    e.preventDefault();

    const params = new URLSearchParams(document.location.search);
    params.set("keyword", keyword);
    params.set("page", 1);

    organizations
      .getOrganizations(params.toString())
      .then(({ data }) => {
        if (data.organizations) {
          setPagination(data.pagination);

          setCollectives(
            data.organizations.map(organization => ({
              ...camelCaseObject(organization)
            }))
          );

          window.history.replaceState({}, document.title, `${url.pathname}?${params.toString()}`);
        }
      })
      .catch(() => {});
  };

  return (
    <Container>
      <ExploreTabs />
      <Form onSubmit={e => search(e)}>
        <Input
          className="w-100"
          onChange={e => setKeyword(e.target.value)}
          leftIcon="search"
          placeholder="Search"
          value={keyword}
        />
      </Form>
    </Container>
  );
};

export default CollectiveOptions;
