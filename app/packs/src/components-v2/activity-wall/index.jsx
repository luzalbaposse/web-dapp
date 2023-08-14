import React, { useCallback, useEffect, useState } from "react";
import { Dropdown, Typography } from "@talentprotocol/design-system";
import { Container, FilterContainer, TitleRow } from "./styled";
import { activitiesService } from "../../api/activities";
import { Activities } from "src/components-v2/activities";

const perPage = 8;

const DROPDOWN_OPTIONS = [
  { type: undefined, value: "All" },
  { type: ["Activities::GoalCreate", "Activities::GoalUpdate"], value: "Goals" },
  { type: "Activities::CareerUpdate", value: "Career Updates" },
  { type: "Activities::ProfileComplete", value: "New Members" },
  { type: "Activities::Sponsor", value: "Sponsors" }
];

export const ActivityWall = ({ hideTitle = false, organization = undefined, profile = {} }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [activity, setActivity] = useState({
    activities: [],
    pagination: { cursor: undefined, total: 0 }
  });

  const [filter, setFilter] = useState(DROPDOWN_OPTIONS[0]);

  const loadActvities = useCallback(
    tempFilterType => {
      const filter = tempFilterType ? tempFilterType : undefined;

      activitiesService
        .getActivities(perPage, undefined, organization, filter)
        .then(({ data }) => {
          const recentActivities = [...data.activities];
          setActivity({
            ...data,
            activities: [...recentActivities]
          });
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
        });
    },
    [setActivity, setIsLoading, activity, filter]
  );

  const loadMore = useCallback(
    tempFilterType => {
      const filter = tempFilterType ? tempFilterType : undefined;

      activitiesService
        .getActivities(perPage, activity.pagination.cursor, organization, filter)
        .then(({ data }) => {
          const recentActivities = [...data.activities];
          setActivity({
            ...data,
            activities: [...activity.activities, ...recentActivities]
          });
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
        });
    },
    [setActivity, setIsLoading, activity, filter]
  );

  useEffect(() => {
    loadActvities();
  }, []);

  return (
    <Container id="activity-widget">
      <TitleRow>
        {!hideTitle ? (
          <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
            Activity
          </Typography>
        ) : (
          <div />
        )}
        <FilterContainer>
          <Typography specs={{ variant: "label2", type: "regular" }} color="primary03">
            Filter by:
          </Typography>
          <Dropdown
            options={DROPDOWN_OPTIONS}
            selectedOption={filter}
            selectOption={option => {
              if (option.type !== filter.type) {
                setFilter(option);
                loadActvities(option.type);
              }
            }}
          />
        </FilterContainer>
      </TitleRow>
      <Activities
        isLoading={isLoading}
        data={activity}
        profileUsername={profile?.username}
        loadMore={loadMore}
        filter={filter}
      />
    </Container>
  );
};
