import React, { useEffect, useState } from "react";
import { Avatar, Button, Icon, Spinner, Typography, useModal, Tag } from "@talentprotocol/design-system";
import { careerCircle } from "src/api/career-circle";
import { CareerCircleEmptyState } from "src/components-v2/network/empty-state";
import { RevokeSponsorshipModal } from "src/components-v2/network/revoke-sponsorship-modal";
import { useWindowDimensionsHook } from "src/utils/window";
import { chainIdToName } from "src/onchain/utils";

import {
  Container,
  NewSponsorsContainer,
  SponsorsContainer,
  SponsorCard,
  SponsoredCard,
  AvatarContainer,
  CardBanner,
  CardsContainer,
  ButtonContainer,
  NewSponsorsRow,
  ActionsContainer,
  NewSponsorsList,
  LoadMoreContainer,
  SponsorCardInfoContainer,
  MessageContainer,
  TagsContainer
} from "./styled";

export const Sponsorships = ({ currentUserId, railsContext }) => {
  const modalState = useModal();
  const [isLoading, setIsLoading] = useState(true);
  const { mobile } = useWindowDimensionsHook();

  const [claimedSponsorships, setClaimedSponsorships] = useState({
    sponsorships: [],
    pagination: {}
  });
  const [pendingSponsorships, setPendingSponsorships] = useState({
    sponsorships: [],
    pagination: {}
  });

  const [revokingSponsorship, setRevokingSponsorship] = useState(null);

  const perPage = 25;

  useEffect(() => {
    if (!currentUserId) {
      return;
    }

    careerCircle
      .getSponsorships(currentUserId, "pending", perPage)
      .then(({ data }) => {
        setPendingSponsorships(data);
      })
      .catch(() => {});

    careerCircle
      .getSponsorships(currentUserId, "claimed", perPage)
      .then(({ data }) => {
        setClaimedSponsorships(data);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      })
      .catch(() => {});
  }, [currentUserId]);

  const showLoadMoreClaimedSponsors = () => !!claimedSponsorships.pagination.cursor;

  const loadMoreClaimedSponsors = () => {
    careerCircle
      .getSponsorships(currentUserId, "claimed", activeSubscribersPerPage, claimedSponsorships.pagination.cursor)
      .then(({ data }) => {
        const newData = {
          sponsorships: [...claimedSponsorships.sponsorships, ...data.sponsorships],
          pagination: data.pagination
        };
        setClaimedSponsorships(newData);
      })
      .catch(() => {});
  };

  const showLoadMorePendingSubscribers = () => !!pendingSponsorships.pagination.cursor;

  const loadMorePendingSponsorships = () => {
    careerCircle
      .getPendingSubscribers(currentUserId, "pending", pendingSubscribersPerPage, pendingSponsorships.pagination.cursor)
      .then(({ data }) => {
        const newData = {
          sponsorships: [...pendingSponsorships.sponsorships, ...data.sponsorships],
          pagination: data.pagination
        };
        setPendingSponsorships(newData);
      })
      .catch(() => {});
  };

  const revokeSponsor = sponsorship => {
    setRevokingSponsorship(sponsorship);
    modalState.openModal();
  };

  const removePendingSponsorship = sponsorship => {
    const sponsorships = pendingSponsorships.sponsorships;
    const sponsorIndex = sponsorships.findIndex(existingSponsor => existingSponsor.id === sponsorship.id);

    const newSponsorships = [...sponsorships.slice(0, sponsorIndex), ...sponsorships.slice(sponsorIndex + 1)];
    setPendingSponsorships({
      sponsorships: newSponsorships,
      pagination: pendingSponsorships.pagination
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      {revokingSponsorship && (
        <RevokeSponsorshipModal
          modalState={modalState}
          sponsorship={revokingSponsorship}
          railsContext={railsContext}
          removePendingSponsorship={removePendingSponsorship}
        />
      )}
      {pendingSponsorships.sponsorships.length == 0 && claimedSponsorships.sponsorships.length == 0 && (
        <CareerCircleEmptyState
          iconName="sponsor"
          title="You don't have any sponsorships"
          text="Take a look around the app and search for talents needing help!"
          buttonText="See all Talent"
          buttonUrl="/talent"
        />
      )}
      {pendingSponsorships.sponsorships.length > 0 && (
        <Container>
          <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
            Pending Sponsorships
          </Typography>
          <NewSponsorsContainer>
            <NewSponsorsList>
              {pendingSponsorships.sponsorships.map(sponsorship => (
                <React.Fragment key={`${sponsorship.sponsor_address}-${sponsorship.sponsored_address}`}>
                  <NewSponsorsRow>
                    <SponsoredCard>
                      <a href={`/u/${sponsorship.sponsored.username}`}>
                        <Avatar
                          size="md"
                          url={sponsorship.sponsored.profile_picture_url}
                          name={sponsorship.sponsored.name}
                          ticker={sponsorship.sponsored.ticker || ""}
                          occupation={
                            mobile && sponsorship.sponsored.occupation?.length > 20
                              ? `${sponsorship.sponsored.occupation.substring(0, 20)}...`
                              : sponsorship.sponsored.occupation
                          }
                          isVerified={sponsorship.sponsored.verified}
                        />
                      </a>
                      <MessageContainer>
                        <Typography specs={{ variant: "p2", type: "regular" }} color={"primary03"}>
                          You can cancel your sponsorship anytime before {sponsorship.sponsored.name} claims it. If you
                          do, all funds will be returned to your wallet.
                        </Typography>
                      </MessageContainer>
                      <TagsContainer>
                        <Tag
                          textColor="primary02"
                          label={chainIdToName(sponsorship.chain_id, railsContext.contractsEnv)}
                          leftIcon={chainIdToName(sponsorship.chain_id, railsContext.contractsEnv).toLowerCase()}
                          borderColor="surfaceHover02"
                          size="medium"
                        />
                        <Tag
                          backgroundColor="warningTint01"
                          textColor="warningText"
                          label="Pending Approval"
                          size="medium"
                        />
                      </TagsContainer>
                    </SponsoredCard>
                    <ActionsContainer>
                      <Button
                        hierarchy="danger"
                        size="small"
                        text="Cancel"
                        onClick={() => revokeSponsor(sponsorship)}
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
                    onClick={() => loadMorePendingSponsorships()}
                  />
                </LoadMoreContainer>
              )}
            </NewSponsorsList>
          </NewSponsorsContainer>
        </Container>
      )}
      {claimedSponsorships.sponsorships.length > 0 && (
        <SponsorsContainer>
          <CardsContainer>
            {claimedSponsorships.sponsorships.map(sponsorship => (
              <SponsorCard key={`${sponsorship.sponsor_address}-${sponsorship.sponsored_address}`}>
                <CardBanner url={sponsorship.sponsored.banner_url} />
                <AvatarContainer>
                  <Avatar size="lg" url={sponsorship.sponsored.profile_picture_url} />
                </AvatarContainer>
                <Typography specs={{ variant: "p1", type: "bold" }} color={"primary01"}>
                  {sponsorship.sponsored.name} {sponsorship.sponsored.verified && <Icon name="verified-2" />}
                </Typography>
                <SponsorCardInfoContainer>
                  {!!sponsorship.sponsored.ticker && (
                    <Typography specs={{ variant: "p2", type: "bold" }} color={"primary03"}>
                      ${sponsorship.sponsored.ticker}
                    </Typography>
                  )}
                  <Typography specs={{ variant: "p2", type: "regular" }} color={"primary03"}>
                    {sponsorship.sponsored.occupation?.length > 20
                      ? `${sponsorship.sponsored.occupation.substring(0, 20)}...`
                      : sponsorship.sponsored.occupation}
                  </Typography>
                </SponsorCardInfoContainer>
                <ButtonContainer>
                  <Button
                    hierarchy="primary"
                    size="small"
                    text="Visit profile"
                    onClick={() => (window.location.href = `/u/${sponsorship.sponsored.username}`)}
                  />
                </ButtonContainer>
              </SponsorCard>
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
