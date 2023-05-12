import React, { useEffect, useState } from "react";
import { Avatar, Button, Spinner, Typography, useModal, Tag, TalentCard } from "@talentprotocol/design-system";
import { careerCircle } from "src/api/career-circle";
import { CareerCircleEmptyState } from "src/components-v2/network/empty-state";
import { ClaimSponsorModal } from "src/components-v2/network/claim-sponsor-modal";
import { parseStableAmount } from "src/onchain/utils";
import { useWindowDimensionsHook } from "src/utils/window";
import { chainIdToName } from "src/onchain/utils";

import {
  Container,
  NewSponsorsContainer,
  SponsorsContainer,
  SponsoredCard,
  CardsContainer,
  NewSponsorsRow,
  ActionsContainer,
  NewSponsorsList,
  LoadMoreContainer,
  MessageContainer
} from "./styled";

export const Sponsors = ({ currentUserId, railsContext }) => {
  const modalState = useModal();
  const [isLoading, setIsLoading] = useState(true);
  const { mobile } = useWindowDimensionsHook();

  const [claimedSponsors, setClaimedSponsors] = useState({
    sponsors: [],
    pagination: {}
  });
  const [pendingSponsors, setPendingSponsors] = useState({
    sponsors: [],
    pagination: {}
  });

  const [claimingSponsorship, setClaimingSponsorship] = useState(null);

  const perPage = 25;

  useEffect(() => {
    if (!currentUserId) {
      return;
    }

    careerCircle
      .getSponsors(currentUserId, "pending", perPage)
      .then(({ data }) => {
        setPendingSponsors(data);
      })
      .catch(() => {});

    careerCircle
      .getSponsors(currentUserId, "claimed", perPage)
      .then(({ data }) => {
        setClaimedSponsors(data);
        // Prevent empty state to show for an instant
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      })
      .catch(() => {});
  }, [currentUserId]);

  const showLoadMoreClaimedSponsors = () => !!claimedSponsors.pagination.cursor;

  const loadMoreClaimedSponsors = () => {
    careerCircle
      // TODO: revisit here
      // eslint-disable-next-line no-undef
      .getSponsors(currentUserId, "claimed", activeSubscribersPerPage, claimedSponsors.pagination.cursor)
      .then(({ data }) => {
        const newData = {
          sponsors: [...claimedSponsors.sponsors, ...data.sponsors],
          pagination: data.pagination
        };
        setClaimedSponsors(newData);
      })
      .catch(() => {});
  };

  const showLoadMorePendingSubscribers = () => !!pendingSponsors.pagination.cursor;

  const loadMorePendingSponsors = () => {
    careerCircle
      // TODO: revisit here
      // eslint-disable-next-line no-undef
      .getPendingSubscribers(currentUserId, "pending", pendingSubscribersPerPage, pendingSponsors.pagination.cursor)
      .then(({ data }) => {
        const newData = {
          sponsors: [...pendingSponsors.sponsors, ...data.sponsors],
          pagination: data.pagination
        };
        setPendingSponsors(newData);
      })
      .catch(() => {});
  };

  const claimSponsor = sponsorship => {
    setClaimingSponsorship(sponsorship);
    modalState.openModal();
  };

  const claimedSponsor = sponsor => {
    const sponsors = pendingSponsors.sponsors;
    const sponsorIndex = sponsors.findIndex(existingSponsor => existingSponsor.id === sponsor.id);

    const newSponsors = [...sponsors.slice(0, sponsorIndex), ...sponsors.slice(sponsorIndex + 1)];
    setPendingSponsors({
      sponsors: newSponsors,
      pagination: pendingSponsors.pagination
    });
    addClaimedSponsor(sponsor);
  };

  const addClaimedSponsor = sponsor => {
    const newData = {
      sponsors: [...claimedSponsors.sponsors, sponsor],
      pagination: claimedSponsors.pagination
    };
    setClaimedSponsors(newData);
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      {claimingSponsorship && (
        <ClaimSponsorModal
          modalState={modalState}
          sponsorship={claimingSponsorship}
          railsContext={railsContext}
          claimedSponsor={claimedSponsor}
        />
      )}
      {pendingSponsors.sponsors.length == 0 && claimedSponsors.sponsors.length == 0 && (
        <CareerCircleEmptyState
          iconName="sponsor"
          title="You don't have any sponsors"
          text="Start engaging with the community! Share your goals and type frequent career updates!"
          buttonText="See all Talent"
          buttonUrl="/talent"
        />
      )}
      {pendingSponsors.sponsors.length > 0 && (
        <Container>
          <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
            New requests
          </Typography>
          <NewSponsorsContainer>
            <NewSponsorsList>
              {pendingSponsors.sponsors.map(sponsorship => (
                <React.Fragment key={`${sponsorship.sponsor_address}-${sponsorship.sponsored_address}`}>
                  <NewSponsorsRow>
                    <SponsoredCard>
                      <a href={`/u/${sponsorship.sponsor.username}`}>
                        <Avatar
                          size="md"
                          url={sponsorship.sponsor.profile_picture_url}
                          name={sponsorship.sponsor.name}
                          ticker={sponsorship.sponsor.ticker || ""}
                          occupation={
                            mobile && sponsorship.sponsor.occupation?.length > 20
                              ? `${sponsorship.sponsor.occupation.substring(0, 20)}...`
                              : sponsorship.sponsor.occupation
                          }
                          isVerified={sponsorship.sponsor.verified}
                        />
                      </a>
                      <MessageContainer>
                        <Typography specs={{ variant: "p2", type: "regular" }} color={"primary03"}>
                          Is interested in sponsorsing you with{" "}
                          {parseStableAmount(sponsorship.amount, sponsorship.token_decimals)} {sponsorship.symbol}
                        </Typography>
                      </MessageContainer>
                      <Tag
                        textColor="primary02"
                        label={chainIdToName(sponsorship.chain_id, railsContext.contractsEnv)}
                        leftIcon={chainIdToName(sponsorship.chain_id, railsContext.contractsEnv).toLowerCase()}
                        borderColor="surfaceHover02"
                        size="medium"
                      />
                    </SponsoredCard>
                    <ActionsContainer>
                      <Button
                        hierarchy="primary"
                        size="small"
                        leftIcon="check-chat"
                        onClick={() => claimSponsor(sponsorship)}
                      />
                    </ActionsContainer>
                  </NewSponsorsRow>
                </React.Fragment>
              ))}
              {showLoadMorePendingSubscribers() && (
                <LoadMoreContainer>
                  <Button
                    hierarchy="secondary"
                    size="medium"
                    text="Load more"
                    onClick={() => loadMorePendingSponsors()}
                  />
                </LoadMoreContainer>
              )}
            </NewSponsorsList>
          </NewSponsorsContainer>
        </Container>
      )}
      {claimedSponsors.sponsors.length > 0 && (
        <SponsorsContainer>
          <CardsContainer>
            {claimedSponsors.sponsors.map(sponsorship => (
              <TalentCard
                key={sponsorship.id}
                bannerImage={sponsorship.sponsor?.banner_url}
                isVerified={sponsorship.sponsor?.verified}
                name={sponsorship.sponsor?.name || sponsorship.sponsor_address}
                occupation={"Received"}
                profileImage={sponsorship.sponsor?.profile_picture_url}
                ticker={`${parseStableAmount(sponsorship.amount, sponsorship.token_decimals)} ${sponsorship.symbol}`}
                to={sponsorship.sponsor ? `/u/${sponsorship.sponsor.username}` : undefined}
              >
                {sponsorship.sponsor && (
                  <Button
                    hierarchy="primary"
                    size="small"
                    text="Send Message"
                    onClick={event => {
                      event.preventDefault();
                      window.location.href = `/messages?user=${sponsorship.sponsor.id}`;
                    }}
                  />
                )}
              </TalentCard>
            ))}
          </CardsContainer>
          <LoadMoreContainer>
            {showLoadMoreClaimedSponsors() ? (
              <Button hierarchy="secondary" size="medium" text="Load more" onClick={loadMoreClaimedSponsors} />
            ) : (
              <Typography specs={{ variant: "p2" }} color={"primary03"}>
                You have reached the end of the list
              </Typography>
            )}
          </LoadMoreContainer>
        </SponsorsContainer>
      )}
    </>
  );
};
