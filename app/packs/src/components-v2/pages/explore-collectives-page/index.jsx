import { Button, Spinner, TalentThemeProvider, TeamCard, Typography } from "@talentprotocol/design-system";
import React, { useEffect, useState } from "react";
import { camelCaseObject } from "src/utils/transformObjects";
import { CardsContainer, Container, EmptyStateContainer, LoadMoreButtonContainer } from "./styled";
import { loggedInUserStore } from "src/contexts/state";
import { organizations } from "../../../api/organizations";
import CollectiveOptions from "./collective-options";
import ThemeContainer from "src/contexts/ThemeContext";

export const CollectivesPage = ({}) => {
  const { currentUser, fetchCurrentUser } = loggedInUserStore();

  const [collectives, setCollectives] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ currentPage: 1, lastPage: null });

  const url = new URL(document.location);

  useEffect(() => {
    if (!currentUser) fetchCurrentUser();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    params.set("page", 1);
    loadCollectives(params);
  }, []);

  const loadCollectives = params => {
    setLoading(true);

    organizations
      .getOrganizations(params.toString())
      .then(({ data }) => {
        if (data.organizations) {
          setCollectives(data.organizations.map(organization => ({ ...camelCaseObject(organization) })));
          setPagination(data.pagination);
          setLoading(false);
        }
      })
      .catch(() => {});
  };

  const loadMoreCollectives = () => {
    setLoading(true);

    const nextPage = pagination.currentPage + 1;
    const params = new URLSearchParams(document.location.search);
    params.set("page", nextPage);

    organizations
      .getOrganizations(params.toString())
      .then(({ data }) => {
        if (data.organizations) {
          setCollectives([
            ...collectives,
            ...data.organizations.map(organization => ({
              ...camelCaseObject(organization)
            }))
          ]);

          setPagination(camelCaseObject(data.pagination));

          window.history.replaceState({}, document.title, `${url.pathname}?${params.toString()}`);

          setLoading(false);
        }
      })
      .catch(() => {});
  };

  const showLoadMore = pagination.currentPage < pagination.lastPage;

  return (
    <Container>
      <CollectiveOptions setCollectives={setCollectives} setPagination={setPagination} />
      {loading && <Spinner />}
      {!loading && collectives.length === 0 && (
        <EmptyStateContainer>
          <Typography color="primary01" specs={{ type: "bold", variant: "p2" }}>
            We couldn't find any communities based on your search.
          </Typography>
        </EmptyStateContainer>
      )}
      <CardsContainer>
        {collectives.map(collective => {
          const members = collective.users;

          return (
            <TeamCard
              bannerImage={collective.bannerUrl}
              description={collective.description}
              key={collective.id}
              membersImages={members.filter(member => member.profilePictureUrl).map(member => member.profilePictureUrl)}
              name={collective.name}
              profileImage={collective.logoUrl}
              tags={collective.tags}
              to={`/collectives/${collective.slug}`}
              totalMembers={members.length}
            />
          );
        })}
      </CardsContainer>
      <LoadMoreButtonContainer>
        {showLoadMore ? (
          <Button hierarchy="secondary" size="small" text="Load more" onClick={() => loadMoreCollectives()} />
        ) : (
          <Typography color="primary03" specs={{ variant: "p3" }}>
            You’ve reached the end of the list
          </Typography>
        )}
      </LoadMoreButtonContainer>
    </Container>
  );
};

export default (props, railsContext) => {
  return () => (
    <TalentThemeProvider>
      <ThemeContainer>
        <CollectivesPage {...props} railsContext={railsContext} />
      </ThemeContainer>
    </TalentThemeProvider>
  );
};
