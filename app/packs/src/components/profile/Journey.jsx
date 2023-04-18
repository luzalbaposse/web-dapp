import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import { H4, P1, P2, P3 } from "src/components/design_system/typography";
import Tag from "src/components/design_system/tag";
import { useWindowDimensionsHook } from "src/utils/window";
import { compareDates } from "src/utils/compareHelpers";
import { Rocket, Toolbox, Bulb, Learn } from "src/components/icons";
import Divider from "src/components/design_system/other/Divider";
import TalentProfilePicture from "src/components/talent/TalentProfilePicture";
import Button from "src/components/design_system/button";
import EditJourneyModal from "./edit/EditJourneyModal";
import JourneyImagesModal from "./edit/journey/JourneyImagesModal";

import cx from "classnames";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const Journey = ({ className, talent, setTalent, canUpdate }) => {
  const { mobile } = useWindowDimensionsHook();
  const [journeyItems, setJourneyItems] = useState([]);
  const [filteredJourneyItems, setFilteredJourneyItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [editMode, setEditMode] = useState(false);
  const [journeyImagesModal, setJourneyImagesModal] = useState(false);
  const [editType, setEditType] = useState("");
  const [journeyItemInEditing, setJourneyItemInEditing] = useState(null);
  const [journeyItemSelected, setJourneyItemSelected] = useState(null);

  const careerGoal = talent?.career_goal;

  const progressMap = {
    planned: "Planned",
    executing: "Executing",
    accomplished: "Accomplished",
    not_accomplished: "Not Accomplished",
    abandoned: "Abandoned"
  };

  useEffect(() => {
    const allItems = mergeAndSortJourney(talent?.milestones, careerGoal?.goals);
    setJourneyItems(allItems);

    setFilteredJourneyItems(applyCategoryFilter(allItems));
  }, [talent?.milestones, careerGoal?.goals, activeFilter]);

  const compareEndData = (milestone1, milestone2) => compareDates(milestone2.start_date, milestone1.start_date);

  const currentDate = dayjs();

  const mergeAndSortJourney = (milestones, goals) => {
    const allElements = [].concat(
      goals?.map(goal => ({
        ...goal,
        category: "Goal",
        start_date: goal.due_date
      })),
      milestones
    );

    const sortedElements = allElements.sort(compareEndData);

    return sortedElements;
  };

  const cssForBorder = (journeyItem, index, arrayLength) => {
    if (dayjs(journeyItem?.start_date).isAfter(currentDate)) {
      if (index === arrayLength - 1) {
        return "";
      } else {
        return "left-dashed-border-black";
      }
    } else {
      if (index === arrayLength - 1) {
        return "";
      } else {
        return "left-solid-border-black";
      }
    }
  };

  const useDashedLine = journeyItem => {
    return dayjs(journeyItem?.start_date).isAfter(currentDate);
  };

  const iconForItem = (item, addSpacing = false) => {
    if (item?.category == "Other") {
      return <Bulb className={`h-100${addSpacing ? " mr-1" : ""}`} size={16} />;
    } else if (item?.category == "Education") {
      return <Learn className={`h-100${addSpacing ? " mr-1" : ""}`} size={16} />;
    } else if (item?.category == "Goal") {
      return (
        <Rocket
          className={`h-100${addSpacing ? " mr-1" : ""}`}
          size={16}
          pathClassName="light-primary"
          color="#7857ED"
        />
      );
    } else {
      return (
        <Toolbox
          className={`h-100${addSpacing ? " mr-1" : ""}`}
          size={16}
          pathClassName="light-primary"
          color="#328AFF"
        />
      );
    }
  };

  const categoryCount = category => {
    return `(${journeyItems.filter(item => item?.category == category).length})`;
  };

  const applyCategoryFilter = items => {
    if (activeFilter == "All") {
      return items;
    }

    return items.filter(item => item?.category == activeFilter);
  };

  const openJourneyImagesModal = journeyItem => {
    setJourneyItemSelected(journeyItem);
    setJourneyImagesModal(true);
  };

  return (
    <>
      <div className={cx(className)}>
        <div className="d-flex flex-column align-items-center w-100 mb-7">
          <H4 className="text-center" text="Journey" />
          <P1
            className="text-center lg-w-50 lg-mx-0 mx-4"
            text="Here is where you can see what I'm doing at the moment,
                what I've done and where I want to be!"
          />
          {journeyItems.length > 0 && (
            <div className="w-100 my-6 px-4 d-flex flex-row overflow-x-scroll justify-content-lg-center">
              <button
                type="button"
                className={`mr-2 btn text-nowrap all-journey-button${activeFilter == "All" ? " active" : ""}`}
                onClick={() => setActiveFilter("All")}
              >
                All ({journeyItems.length})
              </button>
              <button
                type="button"
                className={`mr-2 btn text-nowrap all-journey-button goal-journey-button${
                  activeFilter == "Goal" ? " active" : ""
                }`}
                onClick={() => setActiveFilter("Goal")}
              >
                {iconForItem({ category: "Goal" }, true)} Goal {categoryCount("Goal")}
              </button>
              <button
                type="button"
                className={`mr-2 btn text-nowrap all-journey-button position-journey-button${
                  activeFilter == "Position" ? " active" : ""
                }`}
                onClick={() => setActiveFilter("Position")}
              >
                {iconForItem({ category: "Position" }, true)} Position {categoryCount("Position")}
              </button>
              <button
                type="button"
                className={`mr-2 btn text-nowrap all-journey-button education-journey-button${
                  activeFilter == "Education" ? " active" : ""
                }`}
                onClick={() => setActiveFilter("Education")}
              >
                {iconForItem({ category: "Education" }, true)} Education {categoryCount("Education")}
              </button>
              <button
                type="button"
                className={`btn all-journey-button text-nowrap other-journey-button${
                  activeFilter == "Other" ? " active" : ""
                }`}
                onClick={() => setActiveFilter("Other")}
              >
                {iconForItem({ category: "Other" }, true)} Other {categoryCount("Other")}
              </button>
            </div>
          )}
          {canUpdate && (
            <Button
              className="align-self-end"
              type="primary-default"
              size="big"
              text="Add Experience"
              onClick={() => {
                setEditType("Add");
                setEditMode(true);
              }}
            />
          )}
        </div>
        <div className="d-flex flex-column">
          {filteredJourneyItems.map((journeyItem, index) => (
            <div className="d-flex flex-row" key={`journey-item-${index}`}>
              <div className="d-flex col-12 pr-0">
                {!mobile && (
                  <div className="d-flex flex-column col-2 pr-6 pt-1 text-right">
                    <P3 className="text-primary-04" bold>
                      {dayjs(journeyItem?.start_date, "YYYY-MM-DD").format("MMM YYYY")}
                      {journeyItem?.in_progress && !journeyItem?.end_date && " - Today"}
                      {journeyItem?.end_date
                        ? ` - ${dayjs(journeyItem?.end_date, "YYYY-MM-DD").format("MMM YYYY")}`
                        : ""}
                    </P3>
                  </div>
                )}
                <div
                  className={cx(
                    mobile
                      ? `col-12 pl-6 ${cssForBorder(journeyItem, index, filteredJourneyItems.length)} position-relative`
                      : `col-10 pl-7 pr-0 ${cssForBorder(
                          journeyItem,
                          index,
                          filteredJourneyItems.length
                        )} position-relative`
                  )}
                >
                  {mobile && (
                    <div className="d-flex flex-column mb-4">
                      <P3 className="text-primary-04" bold>
                        {dayjs(journeyItem?.start_date, "YYYY-MM-DD").format("MMM YYYY")}
                        {journeyItem?.end_date
                          ? ` - ${dayjs(journeyItem?.end_date, "YYYY-MM-DD").format("MMM YYYY")}`
                          : ""}
                      </P3>
                    </div>
                  )}
                  <div className="d-flex justify-content-between">
                    <P1 className="text-primary-01 medium mb-3" text={journeyItem?.title} />
                    {canUpdate && (
                      <Button
                        type="primary-outline"
                        text="Edit"
                        style={{ maxHeight: "45px" }}
                        onClick={() => {
                          setJourneyItemInEditing(journeyItem);
                          setEditType("Edit");
                          setEditMode(true);
                        }}
                      />
                    )}
                  </div>
                  {journeyItem?.link && (
                    <a target="_blank" href={journeyItem?.link}>
                      <P2 className="text-primary-01 mb-3" text={journeyItem?.institution} />
                    </a>
                  )}
                  {!journeyItem?.link && journeyItem.institution && (
                    <P2 className="text-primary-01 mb-3" text={journeyItem?.institution} />
                  )}
                  <P2 className="text-primary-03" text={journeyItem?.description} />
                  {journeyItem?.progress && (
                    <Tag className={cx(journeyItem?.progress == "accomplished" ? "positive" : "secondary", "mt-3")}>
                      <P3 className="current-color" medium text={progressMap[journeyItem?.progress]} />
                    </Tag>
                  )}
                  <div className="d-flex flex-wrap">
                    {journeyItem?.images?.length > 3 ? (
                      <>
                        {journeyItem?.images.slice(0, 2).map(image => (
                          <TalentProfilePicture
                            className="position-relative mr-2 mt-2"
                            style={{ borderRadius: "24px" }}
                            src={image.imageUrl}
                            straight
                            height={176}
                            width={225}
                          />
                        ))}
                        {journeyItem?.images.slice(2, 3).map(image => (
                          <button
                            className="d-flex button-link p-0 position-relative mt-2"
                            onClick={() => openJourneyImagesModal(journeyItem)}
                          >
                            <TalentProfilePicture
                              className="position-relative"
                              style={{ borderRadius: "24px" }}
                              src={image.image_url}
                              straight
                              height={176}
                              width={225}
                            />
                            <div className="edit-image" style={{ borderRadius: "24px" }}></div>
                            <H4
                              className="position-absolute permanent-text-white"
                              style={{ top: "45%", left: "45%" }}
                              text={`+${journeyItem?.images.slice(3).length}`}
                            />
                          </button>
                        ))}
                      </>
                    ) : (
                      <>
                        {journeyItem?.images.map(image => (
                          <TalentProfilePicture
                            className="mr-2 mt-2"
                            style={{ borderRadius: "24px" }}
                            src={image.image_url}
                            straight
                            height={176}
                            width={225}
                          />
                        ))}
                      </>
                    )}
                  </div>
                  <div className="rocket-position-absolute">
                    <div className={useDashedLine(journeyItem) ? "journey-dashed-border" : "journey-border"}>
                      {iconForItem(journeyItem)}
                    </div>
                  </div>
                  <Divider className="my-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {editMode && (
        <EditJourneyModal
          show={editMode}
          hide={() => setEditMode(false)}
          talent={talent}
          setTalent={setTalent}
          editType={editType}
          journeyItem={journeyItemInEditing}
          setJourneyItem={setJourneyItemInEditing}
        />
      )}
      {journeyImagesModal && (
        <JourneyImagesModal
          show={journeyImagesModal}
          hide={() => setJourneyImagesModal(false)}
          journeyItem={journeyItemSelected}
        />
      )}
    </>
  );
};

export default Journey;
