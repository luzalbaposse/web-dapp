import { Icon, Tag, Typography } from "@talentprotocol/design-system";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import pluralize from "pluralize";
import React, { useEffect, useMemo, useState } from "react";
import {
  QuestStreakData,
  QuestStreakDataBody,
  QuestStreakDataRow,
  QuestStreakEntry,
  QuestStreakLockedTag,
  QuestStreakProgressBar
} from "./styled";
import { talentsService } from "src/api";
import Tooltip from "src/components/design_system/tooltip";

dayjs.extend(isBetween);

export const MonthlyUpdateQuest = ({ quest, username }) => {
  const [completedThisMonth, setCompletedThisMonth] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);

  const now = dayjs();
  const daysLeft = now.daysInMonth() - now.date();
  const daysUntilNextMonth = daysLeft + 1;

  useEffect(() => {
    talentsService
      .getCareerUpdates(username, 1000)
      .then(({ data }) => setStates(data.career_updates))
      .catch(() => {});
  }, [username]);

  const setStates = careerUpdates => {
    if (!careerUpdates.length) return;

    const lastUpdateDay = careerUpdates[0].created_at;
    const completedThisMonth = now.isSame(lastUpdateDay, "month");
    setCompletedThisMonth(completedThisMonth);

    const previousMonth = now.subtract(1, "month");
    if (!dayjs(lastUpdateDay).isBetween(previousMonth, now, "month", "[]")) return;

    let updateCount = completedThisMonth ? 1 : 0;
    let updateMonth = previousMonth;

    careerUpdates.every(careerUpdate => {
      const updateDay = careerUpdate.created_at;

      if (now.isSame(updateDay, "month")) return true;
      if (updateMonth.add(1, "month").isSame(updateDay, "month")) return true;
      if (!updateMonth.isSame(updateDay, "month")) return false;

      updateCount++;
      updateMonth = updateMonth.subtract(1, "month");
      return true;
    });

    if (updateCount >= 12) {
      const remainder = updateCount % 12;
      if (remainder === 0) updateCount = completedThisMonth ? 12 : 0;
      if (remainder !== 0) updateCount = remainder;
    }

    setUpdateCount(updateCount);
  };

  const xpAmount = rule => {
    return quest.experience_points.find(experiencePoint => experiencePoint.rule === rule)?.amount || 0;
  };

  const description = useMemo(() => {
    if (completedThisMonth) return `Congrats! You have sent an update this month.`;
    if (updateCount === 0) return "Send your first career update this month to earn XP";

    return `You still have ${pluralize("day", daysLeft, true)} to share your monthly update.`;
  }, [completedThisMonth, daysLeft, updateCount]);

  const xpAmountDescription = useMemo(() => {
    let amount = 0;

    if (updateCount >= 3) amount = xpAmount("quarterly");
    if (updateCount === 12) amount = xpAmount("yearly");

    return `+ ${amount.toLocaleString()} XP`;
  }, [updateCount]);

  return (
    <QuestStreakEntry href={completedThisMonth ? undefined : "/home"} isCompleted={completedThisMonth}>
      <QuestStreakData>
        <QuestStreakDataRow>
          <Typography color="primary01" specs={{ type: "medium", variant: "p2" }}>
            {quest.title}
          </Typography>
          {!completedThisMonth && (
            <Tag backgroundColor="primaryTint02" label="Available" size="small" textColor="primary-text" />
          )}
          {completedThisMonth && updateCount !== 12 && (
            <QuestStreakLockedTag>
              <Icon color="primary02" name="padlock" size={12} />
              <Typography color="primary02" specs={{ type: "medium", variant: "label3" }}>
                {pluralize("day", daysUntilNextMonth, true)}
              </Typography>
            </QuestStreakLockedTag>
          )}
          {completedThisMonth && updateCount === 12 && (
            <Tag backgroundColor="positive" label="Complete" size="small" textColor="bg01" />
          )}
        </QuestStreakDataRow>
        <QuestStreakDataBody>
          <QuestStreakDataRow>
            <QuestStreakDataRow>
              <Typography color="primary01" specs={{ type: "medium", variant: "p3" }}>
                {pluralize("update", updateCount, true)} sent from 12
              </Typography>
            </QuestStreakDataRow>
            <QuestStreakDataRow>
              <Typography color="primary01" specs={{ type: "medium", variant: "p3" }}>
                {xpAmountDescription}
              </Typography>
              <Tooltip
                body="This quest rewards you for sending monthly updates. If you miss a month, the progress bar will return to zero."
                placement="top"
                popOverAccessibilityId="questReward"
              >
                <div>
                  <Icon color="primary04" name="information" size={16} />
                </div>
              </Tooltip>
            </QuestStreakDataRow>
          </QuestStreakDataRow>
          <QuestStreakProgressBar isCompleted={completedThisMonth} max="12" value={updateCount} />
          <QuestStreakDataRow>
            <Typography color="primary04" specs={{ type: "regular", variant: "p3" }}>
              {description}
            </Typography>
          </QuestStreakDataRow>
        </QuestStreakDataBody>
      </QuestStreakData>
    </QuestStreakEntry>
  );
};
