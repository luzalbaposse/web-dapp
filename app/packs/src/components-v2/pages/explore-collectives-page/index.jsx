import { Button, Spinner, TalentThemeProvider, TeamCard, Typography } from "@talentprotocol/design-system";
import React, { useEffect, useState } from "react";
import { camelCaseObject } from "src/utils/transformObjects";
import { CardsContainer, Container, EmptyStateContainer, LoadMoreButtonContainer } from "./styled";
import { loggedInUserStore } from "src/contexts/state";
import { organizations } from "../../../api/organizations";
import CollectiveOptions from "./collective-options";
import ThemeContainer from "src/contexts/ThemeContext";

const NUMBER_OF_TAGS = 2;

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
          const mainTag = collective.type === "team" ? "Company" : "Community";
          let tags = [
            {
              key: mainTag,
              label: mainTag,
              size: "small",
              backgroundColor: "primary",
              textColor: "bg01"
            },
            [...collective.tags].slice(0, NUMBER_OF_TAGS).map(tag => ({
              key: tag,
              label: tag,
              size: "small",
              borderColor: "surfaceHover02",
              textColor: "primary02"
            }))
          ].flat();
          if ([...collective.tags].slice(NUMBER_OF_TAGS).length > 0) {
            tags.push({
              key: `+${[...collective.tags].slice(NUMBER_OF_TAGS).length}`,
              label: `+${[...collective.tags].slice(NUMBER_OF_TAGS).length}`,
              size: "small",
              borderColor: "surfaceHover02",
              textColor: "primary02"
            });
          }

          return (
            <TeamCard
              bannerImage={collective.bannerUrl}
              description={collective.description}
              key={collective.id}
              membersImages={members.filter(member => member.profilePictureUrl).map(member => member.profilePictureUrl)}
              name={collective.name}
              profileImage={collective.logoUrl}
              tags={tags}
              to={`/collectives/${collective.slug}`}
              totalMembers={collective.membersCount}
            />
          );
        })}
      </CardsContainer>
      <LoadMoreButtonContainer>
        {!loading && (
          <>
            {showLoadMore ? (
              <Button hierarchy="secondary" size="small" text="Load more" onClick={() => loadMoreCollectives()} />
            ) : (
              <Typography color="primary03" specs={{ variant: "p3" }}>
                You've reached the end of the list
              </Typography>
            )}
          </>
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
