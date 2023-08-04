import React, { useEffect, useState, useCallback } from "react";
import { Spinner, Typography, Icon, Button, useModal } from "@talentprotocol/design-system";
import { activitiesService } from "src/api";
import { Container, SpinnerContainer, EmptyStateContainer, TypographyContainer } from "./styled";
import { Activities } from "src/components-v2/activities";
import { SendCareerUpdateModalV2 } from "src/components-v2/send-career-update-modal";

export const Updates = ({ urlData, currentUser }) => {
  const perPage = 10;
  const modalState = useModal();
  const [data, setData] = useState({ activities: [], isLoading: true, pagination: { cursor: undefined, total: 0 } });
  const filter = { type: "Activities::CareerUpdate", value: "Updates" };

  const loadMore = useCallback(() => {
    activitiesService
      .getActivitiesOfUser(perPage, urlData.profileUsername, filter.type, data.pagination.cursor)
      .then(({ data: res }) => {
        const recentActivities = [...res.activities];
        setData({
          ...res,
          activities: [...data.activities, ...recentActivities],
          isLoading: false
        });
      })
      .catch(error => {
        console.error(error);
      });
  }, [data]);

  useEffect(() => {
    if (!urlData.profileUsername) return;

    activitiesService
      .getActivitiesOfUser(perPage, urlData.profileUsername, filter.type)
      .then(({ data: res }) => {
        setData({
          ...res,
          isLoading: false
        });
      })
      .catch(err => {
        console.error(err);
        setData({ isLoading: false });
      });
  }, [urlData]);

  return data.isLoading ? (
    <SpinnerContainer>
      <Spinner color="primary" size={48} />
    </SpinnerContainer>
  ) : (
    <Container>
      {data.activities.length > 0 ? (
        <Activities
          isLoading={data.isLoading}
          data={data}
          profileUsername={currentUser?.username}
          loadMore={loadMore}
          filter={filter}
          withSupportButton={false}
        />
      ) : (
        <EmptyStateContainer>
          <Icon name="binoculars" size={64} color="primary04" />
          <TypographyContainer>
            <Typography specs={{ type: "bold", variant: "h5" }} color="primary04">
              Send your first career update
            </Typography>
            <Typography specs={{ type: "regular", variant: "p2" }} color="primary04">
              Keep tracking your progress towards your goals. Each update brings you one step closer to success.
            </Typography>
          </TypographyContainer>
          <Button hierarchy="primary" size="medium" text="Send career update" onClick={() => modalState.openModal()} />
        </EmptyStateContainer>
      )}
      <SendCareerUpdateModalV2 isOpen={modalState.isOpen} closeModal={modalState.closeModal} profile={currentUser} />
    </Container>
  );
};
