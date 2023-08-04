import React from "react";
import dayjs from "dayjs";
import { Tag } from "@talentprotocol/design-system";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const GoalTag = ({ state, date }) => {
  switch (state) {
    case "date":
      return (
        <Tag
          label={dayjs(date).format("MMM D, YYYY")}
          backgroundColor="bg01"
          textColor="primary02"
          size="small"
          leftIcon="calendar"
          borderColor="surfaceHover02"
        />
      );
    case "planned":
      return <Tag label="Planned" backgroundColor="warningTint01" textColor="warningText" size="small" />;
    case "accomplished":
      return <Tag label="Accomplished" backgroundColor="positiveTint02" textColor="positiveText" size="small" />;
    case "paused":
      return (
        <Tag label="Paused" backgroundColor="bg01" textColor="primary02" borderColor="surfaceHover02" size="small" />
      );
    case "abandoned":
      return <Tag label="Abandoned" backgroundColor="dangerTint03" textColor="danger" size="small" />;
    case "doing":
    default:
      return <Tag label="Doing" backgroundColor="primaryTint02" textColor="primaryText" size="small" />;
  }
};
