import React from "react";
import "./style.css";

export const InputFieldsLight = ({
  label,
  state,
  icon,
  description,
  button,
  topRightCaption,
  size,
  bottomCaption,
  style,
  text = "Label",
  buttonDarkStyle,
  textStyle,
  text1 = "Please enter the amount",
}) => {
  return (
    <div
      style={{
        ...{
          alignItems:
            (button && icon) ||
            (icon && label && !button && !description) ||
            (bottomCaption && button && label && !description && !icon) ||
            (bottomCaption && description && label && !icon && state === "active") ||
            (bottomCaption && description && label && !icon && state === "focus-tag") ||
            (bottomCaption && description && label && !icon && state === "disable") ||
            (bottomCaption && description && label && !icon && state === "error") ||
            (description && icon && label && !button && state === "active") ||
            (description && icon && label && !button && state === "focus-tag") ||
            (description && icon && label && !button && state === "disable") ||
            (description && icon && label && !button && state === "error") ||
            (bottomCaption && button && !icon && !label && size === "base") ||
            (bottomCaption && icon && !button && !label && size === "base") ||
            (button && description && !bottomCaption && !icon && state === "active") ||
            (button && description && !bottomCaption && !icon && state === "focus-tag") ||
            (button && description && !bottomCaption && !icon && state === "disable") ||
            (button && description && !bottomCaption && !icon && state === "error") ||
            (bottomCaption && description && label && topRightCaption && !icon && state === "focus") ||
            (bottomCaption && description && label && topRightCaption && !icon && state === "hover") ||
            (bottomCaption && description && label && topRightCaption && !icon && state === "default") ||
            (button && !bottomCaption && !description && !icon && size === "base") ||
            (description && !bottomCaption && !button && !label && state === "active") ||
            (description && !bottomCaption && !button && !label && state === "focus-tag") ||
            (description && !bottomCaption && !button && !label && state === "disable") ||
            (icon && !button && !description && !label && size === "big") ||
            (label && !button && !description && !icon && state === "error") ||
            (bottomCaption && description && icon && label && topRightCaption && !button && state === "focus") ||
            (bottomCaption && description && icon && label && topRightCaption && !button && state === "hover") ||
            (bottomCaption && description && icon && label && topRightCaption && !button && state === "default") ||
            (bottomCaption && label && !button && !description && !icon && state === "disable") ||
            (description && icon && !bottomCaption && !button && !label && state === "error") ||
            (description && label && !bottomCaption && !button && !icon && state === "active") ||
            (description && label && !bottomCaption && !button && !icon && state === "focus-tag") ||
            (description && label && !bottomCaption && !button && !icon && state === "disable") ||
            (description && topRightCaption && !bottomCaption && !icon && !label && state === "focus") ||
            (description && topRightCaption && !bottomCaption && !icon && !label && state === "hover") ||
            (description && topRightCaption && !bottomCaption && !icon && !label && state === "default") ||
            (label && topRightCaption && !button && !description && !icon && state === "hover") ||
            (label && topRightCaption && !button && !description && !icon && state === "default") ||
            (label && topRightCaption && !button && !description && !icon && state === "focus-tag") ||
            (!button && !icon && !label && size === "base" && state === "error") ||
            (bottomCaption && button && !icon && !label && size === "big" && state === "active") ||
            (bottomCaption && button && !icon && !label && size === "big" && state === "focus-tag") ||
            (bottomCaption && button && !icon && !label && size === "big" && state === "disable") ||
            (bottomCaption && button && !icon && !label && size === "big" && state === "error") ||
            (bottomCaption && description && !button && !label && size === "big" && state === "active") ||
            (bottomCaption && description && !button && !label && size === "big" && state === "focus-tag") ||
            (bottomCaption && description && !button && !label && size === "big" && state === "disable") ||
            (bottomCaption && description && !button && !label && size === "big" && state === "error") ||
            (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "focus") ||
            (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "hover") ||
            (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "default") ||
            (button && label && !bottomCaption && !icon && size === "big" && state === "focus") ||
            (button && label && !bottomCaption && !icon && size === "big" && state === "hover") ||
            (button && label && !bottomCaption && !icon && size === "big" && state === "default") ||
            (description && label && !bottomCaption && !button && size === "big" && state === "focus") ||
            (description && label && !bottomCaption && !button && size === "big" && state === "hover") ||
            (description && label && !bottomCaption && !button && size === "big" && state === "default") ||
            (description && !bottomCaption && !button && !label && !topRightCaption && state === "focus") ||
            (icon && !bottomCaption && !button && !description && !label && size === "base") ||
            (bottomCaption && label && topRightCaption && !button && !description && !icon && state === "active") ||
            (bottomCaption && label && topRightCaption && !button && !description && !icon && state === "focus") ||
            (description && icon && topRightCaption && !bottomCaption && !button && !label && state === "focus") ||
            (description && icon && topRightCaption && !bottomCaption && !button && !label && state === "hover") ||
            (description && icon && topRightCaption && !bottomCaption && !button && !label && state === "default") ||
            (description && label && topRightCaption && !bottomCaption && !button && !icon && state === "error") ||
            (bottomCaption && !button && !icon && !label && size === "base" && state === "active") ||
            (bottomCaption && !button && !icon && !label && size === "base" && state === "focus-tag") ||
            (bottomCaption && !button && !icon && !label && size === "base" && state === "disable") ||
            (bottomCaption && !button && !icon && !topRightCaption && size === "base" && state === "focus") ||
            (button && !bottomCaption && !description && !icon && size === "big" && state === "active") ||
            (button && !bottomCaption && !description && !icon && size === "big" && state === "focus-tag") ||
            (button && !bottomCaption && !description && !icon && size === "big" && state === "disable") ||
            (button && !bottomCaption && !description && !icon && size === "big" && state === "error") ||
            (bottomCaption && button && topRightCaption && !icon && !label && size === "big" && state === "focus") ||
            (bottomCaption && button && topRightCaption && !icon && !label && size === "big" && state === "hover") ||
            (bottomCaption && button && topRightCaption && !icon && !label && size === "big" && state === "default") ||
            (bottomCaption &&
              description &&
              icon &&
              !button &&
              !topRightCaption &&
              size === "big" &&
              state === "focus") ||
            (bottomCaption &&
              description &&
              icon &&
              !button &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (bottomCaption &&
              description &&
              icon &&
              !button &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (bottomCaption &&
              description &&
              label &&
              !button &&
              !topRightCaption &&
              size === "base" &&
              state === "hover") ||
            (bottomCaption &&
              description &&
              label &&
              !button &&
              !topRightCaption &&
              size === "base" &&
              state === "default") ||
            (bottomCaption &&
              description &&
              topRightCaption &&
              !button &&
              !label &&
              size === "big" &&
              state === "focus") ||
            (bottomCaption &&
              description &&
              topRightCaption &&
              !button &&
              !label &&
              size === "big" &&
              state === "hover") ||
            (bottomCaption &&
              description &&
              topRightCaption &&
              !button &&
              !label &&
              size === "big" &&
              state === "default") ||
            (button && description && label && !icon && !topRightCaption && size === "base" && state === "focus") ||
            (button && description && label && !icon && !topRightCaption && size === "base" && state === "hover") ||
            (button && description && label && !icon && !topRightCaption && size === "base" && state === "default") ||
            (description && icon && label && !button && !topRightCaption && size === "base" && state === "focus") ||
            (description &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !icon &&
              size === "base" &&
              state === "focus") ||
            (description &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !icon &&
              size === "base" &&
              state === "hover") ||
            (description &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !icon &&
              size === "base" &&
              state === "default") ||
            (label && topRightCaption && !bottomCaption && !button && !description && !icon && state === "disable") ||
            (!button && !description && !icon && !topRightCaption && size === "big" && state === "focus-tag") ||
            (bottomCaption && topRightCaption && !button && !icon && !label && size === "base" && state === "focus") ||
            (bottomCaption && topRightCaption && !button && !icon && !label && size === "base" && state === "hover") ||
            (bottomCaption &&
              topRightCaption &&
              !button &&
              !icon &&
              !label &&
              size === "base" &&
              state === "default") ||
            (description &&
              icon &&
              !bottomCaption &&
              !button &&
              !topRightCaption &&
              size === "base" &&
              state === "hover") ||
            (description &&
              icon &&
              !bottomCaption &&
              !button &&
              !topRightCaption &&
              size === "base" &&
              state === "default") ||
            (description &&
              icon &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !button &&
              size === "base" &&
              state === "focus") ||
            (description &&
              icon &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !button &&
              size === "base" &&
              state === "hover") ||
            (description &&
              icon &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !button &&
              size === "base" &&
              state === "default") ||
            (bottomCaption && !button && !description && !icon && !label && size === "big" && state === "disable") ||
            (bottomCaption && !button && !description && !icon && !label && size === "big" && state === "error") ||
            (bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "hover") ||
            (bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "default") ||
            (bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "active") ||
            (bottomCaption &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "focus") ||
            (bottomCaption &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (bottomCaption &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (button && !bottomCaption && !icon && !label && !topRightCaption && size === "big" && state === "focus") ||
            (button && !bottomCaption && !icon && !label && !topRightCaption && size === "big" && state === "hover") ||
            (button &&
              !bottomCaption &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (description &&
              !bottomCaption &&
              !button &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "error") ||
            (description &&
              !bottomCaption &&
              !button &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (description &&
              !bottomCaption &&
              !button &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (description && !button && !icon && !label && !topRightCaption && size === "base" && state === "hover") ||
            (description && !button && !icon && !label && !topRightCaption && size === "base" && state === "default") ||
            (label && !bottomCaption && !button && !description && !icon && size === "big" && state === "active") ||
            (label && !bottomCaption && !button && !icon && !topRightCaption && size === "base" && state === "focus") ||
            (label && !bottomCaption && !button && !icon && !topRightCaption && size === "base" && state === "hover") ||
            (label &&
              !bottomCaption &&
              !button &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "default") ||
            (label && !button && !description && !icon && !topRightCaption && size === "base" && state === "active") ||
            (label &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "focus-tag") ||
            (topRightCaption &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              size === "base" &&
              state === "focus") ||
            (topRightCaption && !bottomCaption && !button && !icon && !label && size === "big" && state === "error") ||
            (topRightCaption && !button && !description && !icon && !label && size === "big" && state === "active") ||
            (topRightCaption && !button && !description && !icon && !label && size === "big" && state === "focus") ||
            (topRightCaption && !button && !description && !icon && !label && size === "big" && state === "hover") ||
            (topRightCaption && !button && !description && !icon && !label && size === "big" && state === "default") ||
            (topRightCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "focus-tag") ||
            (!bottomCaption && !button && !description && !icon && !label && size === "base" && state === "active") ||
            (!bottomCaption && !button && !description && !icon && !label && size === "base" && state === "hover") ||
            (!bottomCaption && !button && !description && !icon && !label && size === "base" && state === "default") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              size === "base" &&
              state === "focus-tag") ||
            (!bottomCaption && !button && !description && !icon && !label && size === "base" && state === "disable") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "focus") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "disable") ||
            (bottomCaption &&
              label &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "focus") ||
            (bottomCaption &&
              label &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (bottomCaption &&
              label &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (button &&
              description &&
              !bottomCaption &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "base" &&
              state === "focus") ||
            (button &&
              description &&
              !bottomCaption &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "base" &&
              state === "hover") ||
            (button &&
              description &&
              !bottomCaption &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "base" &&
              state === "default") ||
            (button &&
              topRightCaption &&
              !bottomCaption &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "focus") ||
            (button &&
              topRightCaption &&
              !bottomCaption &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "hover") ||
            (button &&
              topRightCaption &&
              !bottomCaption &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "default") ||
            (description &&
              label &&
              !bottomCaption &&
              !button &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "error") ||
            (label &&
              topRightCaption &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              size === "base" &&
              state === "active") ||
            (label &&
              topRightCaption &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              size === "big" &&
              state === "focus") ||
            (label &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "disable") ||
            (topRightCaption &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "disable") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "base" &&
              state === "focus") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "active") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "error")
              ? "flex-start"
              : undefined,
          borderRadius:
            (!label &&
              !icon &&
              !description &&
              !button &&
              !topRightCaption &&
              !bottomCaption &&
              state === "hover" &&
              size === "base") ||
            (!label &&
              !icon &&
              !description &&
              !button &&
              !topRightCaption &&
              !bottomCaption &&
              state === "focus" &&
              size === "base")
              ? "8px"
              : undefined,
          display:
            (button && icon) ||
            (icon && label && !button && !description) ||
            (bottomCaption && button && label && !description && !icon) ||
            (bottomCaption && description && label && !icon && state === "active") ||
            (bottomCaption && description && label && !icon && state === "focus-tag") ||
            (bottomCaption && description && label && !icon && state === "disable") ||
            (bottomCaption && description && label && !icon && state === "error") ||
            (description && icon && label && !button && state === "active") ||
            (description && icon && label && !button && state === "focus-tag") ||
            (description && icon && label && !button && state === "disable") ||
            (description && icon && label && !button && state === "error") ||
            (bottomCaption && button && !icon && !label && size === "base") ||
            (bottomCaption && icon && !button && !label && size === "base") ||
            (button && description && !bottomCaption && !icon && state === "active") ||
            (button && description && !bottomCaption && !icon && state === "focus-tag") ||
            (button && description && !bottomCaption && !icon && state === "disable") ||
            (button && description && !bottomCaption && !icon && state === "error") ||
            (bottomCaption && description && label && topRightCaption && !icon && state === "focus") ||
            (bottomCaption && description && label && topRightCaption && !icon && state === "hover") ||
            (bottomCaption && description && label && topRightCaption && !icon && state === "default") ||
            (button && !bottomCaption && !description && !icon && size === "base") ||
            (description && !bottomCaption && !button && !label && state === "active") ||
            (description && !bottomCaption && !button && !label && state === "focus-tag") ||
            (description && !bottomCaption && !button && !label && state === "disable") ||
            (icon && !button && !description && !label && size === "big") ||
            (label && !button && !description && !icon && state === "error") ||
            (bottomCaption && description && icon && label && topRightCaption && !button && state === "focus") ||
            (bottomCaption && description && icon && label && topRightCaption && !button && state === "hover") ||
            (bottomCaption && description && icon && label && topRightCaption && !button && state === "default") ||
            (bottomCaption && label && !button && !description && !icon && state === "disable") ||
            (description && icon && !bottomCaption && !button && !label && state === "error") ||
            (description && label && !bottomCaption && !button && !icon && state === "active") ||
            (description && label && !bottomCaption && !button && !icon && state === "focus-tag") ||
            (description && label && !bottomCaption && !button && !icon && state === "disable") ||
            (description && topRightCaption && !bottomCaption && !icon && !label && state === "focus") ||
            (description && topRightCaption && !bottomCaption && !icon && !label && state === "hover") ||
            (description && topRightCaption && !bottomCaption && !icon && !label && state === "default") ||
            (label && topRightCaption && !button && !description && !icon && state === "hover") ||
            (label && topRightCaption && !button && !description && !icon && state === "default") ||
            (label && topRightCaption && !button && !description && !icon && state === "focus-tag") ||
            (!button && !icon && !label && size === "base" && state === "error") ||
            (bottomCaption && button && !icon && !label && size === "big" && state === "active") ||
            (bottomCaption && button && !icon && !label && size === "big" && state === "focus-tag") ||
            (bottomCaption && button && !icon && !label && size === "big" && state === "disable") ||
            (bottomCaption && button && !icon && !label && size === "big" && state === "error") ||
            (bottomCaption && description && !button && !label && size === "big" && state === "active") ||
            (bottomCaption && description && !button && !label && size === "big" && state === "focus-tag") ||
            (bottomCaption && description && !button && !label && size === "big" && state === "disable") ||
            (bottomCaption && description && !button && !label && size === "big" && state === "error") ||
            (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "focus") ||
            (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "hover") ||
            (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "default") ||
            (button && label && !bottomCaption && !icon && size === "big" && state === "focus") ||
            (button && label && !bottomCaption && !icon && size === "big" && state === "hover") ||
            (button && label && !bottomCaption && !icon && size === "big" && state === "default") ||
            (description && label && !bottomCaption && !button && size === "big" && state === "focus") ||
            (description && label && !bottomCaption && !button && size === "big" && state === "hover") ||
            (description && label && !bottomCaption && !button && size === "big" && state === "default") ||
            (description && !bottomCaption && !button && !label && !topRightCaption && state === "focus") ||
            (icon && !bottomCaption && !button && !description && !label && size === "base") ||
            (bottomCaption && label && topRightCaption && !button && !description && !icon && state === "active") ||
            (bottomCaption && label && topRightCaption && !button && !description && !icon && state === "focus") ||
            (description && icon && topRightCaption && !bottomCaption && !button && !label && state === "focus") ||
            (description && icon && topRightCaption && !bottomCaption && !button && !label && state === "hover") ||
            (description && icon && topRightCaption && !bottomCaption && !button && !label && state === "default") ||
            (description && label && topRightCaption && !bottomCaption && !button && !icon && state === "error") ||
            (bottomCaption && !button && !icon && !label && size === "base" && state === "active") ||
            (bottomCaption && !button && !icon && !label && size === "base" && state === "focus-tag") ||
            (bottomCaption && !button && !icon && !label && size === "base" && state === "disable") ||
            (bottomCaption && !button && !icon && !topRightCaption && size === "base" && state === "focus") ||
            (button && !bottomCaption && !description && !icon && size === "big" && state === "active") ||
            (button && !bottomCaption && !description && !icon && size === "big" && state === "focus-tag") ||
            (button && !bottomCaption && !description && !icon && size === "big" && state === "disable") ||
            (button && !bottomCaption && !description && !icon && size === "big" && state === "error") ||
            (bottomCaption && button && topRightCaption && !icon && !label && size === "big" && state === "focus") ||
            (bottomCaption && button && topRightCaption && !icon && !label && size === "big" && state === "hover") ||
            (bottomCaption && button && topRightCaption && !icon && !label && size === "big" && state === "default") ||
            (bottomCaption &&
              description &&
              icon &&
              !button &&
              !topRightCaption &&
              size === "big" &&
              state === "focus") ||
            (bottomCaption &&
              description &&
              icon &&
              !button &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (bottomCaption &&
              description &&
              icon &&
              !button &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (bottomCaption &&
              description &&
              label &&
              !button &&
              !topRightCaption &&
              size === "base" &&
              state === "hover") ||
            (bottomCaption &&
              description &&
              label &&
              !button &&
              !topRightCaption &&
              size === "base" &&
              state === "default") ||
            (bottomCaption &&
              description &&
              topRightCaption &&
              !button &&
              !label &&
              size === "big" &&
              state === "focus") ||
            (bottomCaption &&
              description &&
              topRightCaption &&
              !button &&
              !label &&
              size === "big" &&
              state === "hover") ||
            (bottomCaption &&
              description &&
              topRightCaption &&
              !button &&
              !label &&
              size === "big" &&
              state === "default") ||
            (button && description && label && !icon && !topRightCaption && size === "base" && state === "focus") ||
            (button && description && label && !icon && !topRightCaption && size === "base" && state === "hover") ||
            (button && description && label && !icon && !topRightCaption && size === "base" && state === "default") ||
            (description && icon && label && !button && !topRightCaption && size === "base" && state === "focus") ||
            (description &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !icon &&
              size === "base" &&
              state === "focus") ||
            (description &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !icon &&
              size === "base" &&
              state === "hover") ||
            (description &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !icon &&
              size === "base" &&
              state === "default") ||
            (label && topRightCaption && !bottomCaption && !button && !description && !icon && state === "disable") ||
            (!button && !description && !icon && !topRightCaption && size === "big" && state === "focus-tag") ||
            (bottomCaption && topRightCaption && !button && !icon && !label && size === "base" && state === "focus") ||
            (bottomCaption && topRightCaption && !button && !icon && !label && size === "base" && state === "hover") ||
            (bottomCaption &&
              topRightCaption &&
              !button &&
              !icon &&
              !label &&
              size === "base" &&
              state === "default") ||
            (description &&
              icon &&
              !bottomCaption &&
              !button &&
              !topRightCaption &&
              size === "base" &&
              state === "hover") ||
            (description &&
              icon &&
              !bottomCaption &&
              !button &&
              !topRightCaption &&
              size === "base" &&
              state === "default") ||
            (description &&
              icon &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !button &&
              size === "base" &&
              state === "focus") ||
            (description &&
              icon &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !button &&
              size === "base" &&
              state === "hover") ||
            (description &&
              icon &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !button &&
              size === "base" &&
              state === "default") ||
            (bottomCaption && !button && !description && !icon && !label && size === "big" && state === "disable") ||
            (bottomCaption && !button && !description && !icon && !label && size === "big" && state === "error") ||
            (bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "hover") ||
            (bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "default") ||
            (bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "active") ||
            (bottomCaption &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "focus") ||
            (bottomCaption &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (bottomCaption &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (button && !bottomCaption && !icon && !label && !topRightCaption && size === "big" && state === "focus") ||
            (button && !bottomCaption && !icon && !label && !topRightCaption && size === "big" && state === "hover") ||
            (button &&
              !bottomCaption &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (description &&
              !bottomCaption &&
              !button &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "error") ||
            (description &&
              !bottomCaption &&
              !button &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (description &&
              !bottomCaption &&
              !button &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (description && !button && !icon && !label && !topRightCaption && size === "base" && state === "hover") ||
            (description && !button && !icon && !label && !topRightCaption && size === "base" && state === "default") ||
            (label && !bottomCaption && !button && !description && !icon && size === "big" && state === "active") ||
            (label && !bottomCaption && !button && !icon && !topRightCaption && size === "base" && state === "focus") ||
            (label && !bottomCaption && !button && !icon && !topRightCaption && size === "base" && state === "hover") ||
            (label &&
              !bottomCaption &&
              !button &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "default") ||
            (label && !button && !description && !icon && !topRightCaption && size === "base" && state === "active") ||
            (label &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "focus-tag") ||
            (topRightCaption &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              size === "base" &&
              state === "focus") ||
            (topRightCaption && !bottomCaption && !button && !icon && !label && size === "big" && state === "error") ||
            (topRightCaption && !button && !description && !icon && !label && size === "big" && state === "active") ||
            (topRightCaption && !button && !description && !icon && !label && size === "big" && state === "focus") ||
            (topRightCaption && !button && !description && !icon && !label && size === "big" && state === "hover") ||
            (topRightCaption && !button && !description && !icon && !label && size === "big" && state === "default") ||
            (topRightCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "focus-tag") ||
            (!bottomCaption && !button && !description && !icon && !label && size === "base" && state === "active") ||
            (!bottomCaption && !button && !description && !icon && !label && size === "base" && state === "hover") ||
            (!bottomCaption && !button && !description && !icon && !label && size === "base" && state === "default") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              size === "base" &&
              state === "focus-tag") ||
            (!bottomCaption && !button && !description && !icon && !label && size === "base" && state === "disable") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "focus") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "disable") ||
            (bottomCaption &&
              label &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "focus") ||
            (bottomCaption &&
              label &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (bottomCaption &&
              label &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (button &&
              description &&
              !bottomCaption &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "base" &&
              state === "focus") ||
            (button &&
              description &&
              !bottomCaption &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "base" &&
              state === "hover") ||
            (button &&
              description &&
              !bottomCaption &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "base" &&
              state === "default") ||
            (button &&
              topRightCaption &&
              !bottomCaption &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "focus") ||
            (button &&
              topRightCaption &&
              !bottomCaption &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "hover") ||
            (button &&
              topRightCaption &&
              !bottomCaption &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "default") ||
            (description &&
              label &&
              !bottomCaption &&
              !button &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "error") ||
            (label &&
              topRightCaption &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              size === "base" &&
              state === "active") ||
            (label &&
              topRightCaption &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              size === "big" &&
              state === "focus") ||
            (label &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "disable") ||
            (topRightCaption &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "disable") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "base" &&
              state === "focus") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "active") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "error")
              ? "flex"
              : undefined,
          flexDirection:
            (button && icon) ||
            (icon && label && !button && !description) ||
            (bottomCaption && button && label && !description && !icon) ||
            (bottomCaption && description && label && !icon && state === "active") ||
            (bottomCaption && description && label && !icon && state === "focus-tag") ||
            (bottomCaption && description && label && !icon && state === "disable") ||
            (bottomCaption && description && label && !icon && state === "error") ||
            (description && icon && label && !button && state === "active") ||
            (description && icon && label && !button && state === "focus-tag") ||
            (description && icon && label && !button && state === "disable") ||
            (description && icon && label && !button && state === "error") ||
            (bottomCaption && button && !icon && !label && size === "base") ||
            (bottomCaption && icon && !button && !label && size === "base") ||
            (button && description && !bottomCaption && !icon && state === "active") ||
            (button && description && !bottomCaption && !icon && state === "focus-tag") ||
            (button && description && !bottomCaption && !icon && state === "disable") ||
            (button && description && !bottomCaption && !icon && state === "error") ||
            (bottomCaption && description && label && topRightCaption && !icon && state === "focus") ||
            (bottomCaption && description && label && topRightCaption && !icon && state === "hover") ||
            (bottomCaption && description && label && topRightCaption && !icon && state === "default") ||
            (button && !bottomCaption && !description && !icon && size === "base") ||
            (description && !bottomCaption && !button && !label && state === "active") ||
            (description && !bottomCaption && !button && !label && state === "focus-tag") ||
            (description && !bottomCaption && !button && !label && state === "disable") ||
            (icon && !button && !description && !label && size === "big") ||
            (label && !button && !description && !icon && state === "error") ||
            (bottomCaption && description && icon && label && topRightCaption && !button && state === "focus") ||
            (bottomCaption && description && icon && label && topRightCaption && !button && state === "hover") ||
            (bottomCaption && description && icon && label && topRightCaption && !button && state === "default") ||
            (bottomCaption && label && !button && !description && !icon && state === "disable") ||
            (description && icon && !bottomCaption && !button && !label && state === "error") ||
            (description && label && !bottomCaption && !button && !icon && state === "active") ||
            (description && label && !bottomCaption && !button && !icon && state === "focus-tag") ||
            (description && label && !bottomCaption && !button && !icon && state === "disable") ||
            (description && topRightCaption && !bottomCaption && !icon && !label && state === "focus") ||
            (description && topRightCaption && !bottomCaption && !icon && !label && state === "hover") ||
            (description && topRightCaption && !bottomCaption && !icon && !label && state === "default") ||
            (label && topRightCaption && !button && !description && !icon && state === "hover") ||
            (label && topRightCaption && !button && !description && !icon && state === "default") ||
            (label && topRightCaption && !button && !description && !icon && state === "focus-tag") ||
            (!button && !icon && !label && size === "base" && state === "error") ||
            (bottomCaption && button && !icon && !label && size === "big" && state === "active") ||
            (bottomCaption && button && !icon && !label && size === "big" && state === "focus-tag") ||
            (bottomCaption && button && !icon && !label && size === "big" && state === "disable") ||
            (bottomCaption && button && !icon && !label && size === "big" && state === "error") ||
            (bottomCaption && description && !button && !label && size === "big" && state === "active") ||
            (bottomCaption && description && !button && !label && size === "big" && state === "focus-tag") ||
            (bottomCaption && description && !button && !label && size === "big" && state === "disable") ||
            (bottomCaption && description && !button && !label && size === "big" && state === "error") ||
            (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "focus") ||
            (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "hover") ||
            (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "default") ||
            (button && label && !bottomCaption && !icon && size === "big" && state === "focus") ||
            (button && label && !bottomCaption && !icon && size === "big" && state === "hover") ||
            (button && label && !bottomCaption && !icon && size === "big" && state === "default") ||
            (description && label && !bottomCaption && !button && size === "big" && state === "focus") ||
            (description && label && !bottomCaption && !button && size === "big" && state === "hover") ||
            (description && label && !bottomCaption && !button && size === "big" && state === "default") ||
            (description && !bottomCaption && !button && !label && !topRightCaption && state === "focus") ||
            (icon && !bottomCaption && !button && !description && !label && size === "base") ||
            (bottomCaption && label && topRightCaption && !button && !description && !icon && state === "active") ||
            (bottomCaption && label && topRightCaption && !button && !description && !icon && state === "focus") ||
            (description && icon && topRightCaption && !bottomCaption && !button && !label && state === "focus") ||
            (description && icon && topRightCaption && !bottomCaption && !button && !label && state === "hover") ||
            (description && icon && topRightCaption && !bottomCaption && !button && !label && state === "default") ||
            (description && label && topRightCaption && !bottomCaption && !button && !icon && state === "error") ||
            (bottomCaption && !button && !icon && !label && size === "base" && state === "active") ||
            (bottomCaption && !button && !icon && !label && size === "base" && state === "focus-tag") ||
            (bottomCaption && !button && !icon && !label && size === "base" && state === "disable") ||
            (bottomCaption && !button && !icon && !topRightCaption && size === "base" && state === "focus") ||
            (button && !bottomCaption && !description && !icon && size === "big" && state === "active") ||
            (button && !bottomCaption && !description && !icon && size === "big" && state === "focus-tag") ||
            (button && !bottomCaption && !description && !icon && size === "big" && state === "disable") ||
            (button && !bottomCaption && !description && !icon && size === "big" && state === "error") ||
            (bottomCaption && button && topRightCaption && !icon && !label && size === "big" && state === "focus") ||
            (bottomCaption && button && topRightCaption && !icon && !label && size === "big" && state === "hover") ||
            (bottomCaption && button && topRightCaption && !icon && !label && size === "big" && state === "default") ||
            (bottomCaption &&
              description &&
              icon &&
              !button &&
              !topRightCaption &&
              size === "big" &&
              state === "focus") ||
            (bottomCaption &&
              description &&
              icon &&
              !button &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (bottomCaption &&
              description &&
              icon &&
              !button &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (bottomCaption &&
              description &&
              label &&
              !button &&
              !topRightCaption &&
              size === "base" &&
              state === "hover") ||
            (bottomCaption &&
              description &&
              label &&
              !button &&
              !topRightCaption &&
              size === "base" &&
              state === "default") ||
            (bottomCaption &&
              description &&
              topRightCaption &&
              !button &&
              !label &&
              size === "big" &&
              state === "focus") ||
            (bottomCaption &&
              description &&
              topRightCaption &&
              !button &&
              !label &&
              size === "big" &&
              state === "hover") ||
            (bottomCaption &&
              description &&
              topRightCaption &&
              !button &&
              !label &&
              size === "big" &&
              state === "default") ||
            (button && description && label && !icon && !topRightCaption && size === "base" && state === "focus") ||
            (button && description && label && !icon && !topRightCaption && size === "base" && state === "hover") ||
            (button && description && label && !icon && !topRightCaption && size === "base" && state === "default") ||
            (description && icon && label && !button && !topRightCaption && size === "base" && state === "focus") ||
            (description &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !icon &&
              size === "base" &&
              state === "focus") ||
            (description &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !icon &&
              size === "base" &&
              state === "hover") ||
            (description &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !icon &&
              size === "base" &&
              state === "default") ||
            (label && topRightCaption && !bottomCaption && !button && !description && !icon && state === "disable") ||
            (!button && !description && !icon && !topRightCaption && size === "big" && state === "focus-tag") ||
            (bottomCaption && topRightCaption && !button && !icon && !label && size === "base" && state === "focus") ||
            (bottomCaption && topRightCaption && !button && !icon && !label && size === "base" && state === "hover") ||
            (bottomCaption &&
              topRightCaption &&
              !button &&
              !icon &&
              !label &&
              size === "base" &&
              state === "default") ||
            (description &&
              icon &&
              !bottomCaption &&
              !button &&
              !topRightCaption &&
              size === "base" &&
              state === "hover") ||
            (description &&
              icon &&
              !bottomCaption &&
              !button &&
              !topRightCaption &&
              size === "base" &&
              state === "default") ||
            (description &&
              icon &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !button &&
              size === "base" &&
              state === "focus") ||
            (description &&
              icon &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !button &&
              size === "base" &&
              state === "hover") ||
            (description &&
              icon &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !button &&
              size === "base" &&
              state === "default") ||
            (bottomCaption && !button && !description && !icon && !label && size === "big" && state === "disable") ||
            (bottomCaption && !button && !description && !icon && !label && size === "big" && state === "error") ||
            (bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "hover") ||
            (bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "default") ||
            (bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "active") ||
            (bottomCaption &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "focus") ||
            (bottomCaption &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (bottomCaption &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (button && !bottomCaption && !icon && !label && !topRightCaption && size === "big" && state === "focus") ||
            (button && !bottomCaption && !icon && !label && !topRightCaption && size === "big" && state === "hover") ||
            (button &&
              !bottomCaption &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (description &&
              !bottomCaption &&
              !button &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "error") ||
            (description &&
              !bottomCaption &&
              !button &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (description &&
              !bottomCaption &&
              !button &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (description && !button && !icon && !label && !topRightCaption && size === "base" && state === "hover") ||
            (description && !button && !icon && !label && !topRightCaption && size === "base" && state === "default") ||
            (label && !bottomCaption && !button && !description && !icon && size === "big" && state === "active") ||
            (label && !bottomCaption && !button && !icon && !topRightCaption && size === "base" && state === "focus") ||
            (label && !bottomCaption && !button && !icon && !topRightCaption && size === "base" && state === "hover") ||
            (label &&
              !bottomCaption &&
              !button &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "default") ||
            (label && !button && !description && !icon && !topRightCaption && size === "base" && state === "active") ||
            (label &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "focus-tag") ||
            (topRightCaption &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              size === "base" &&
              state === "focus") ||
            (topRightCaption && !bottomCaption && !button && !icon && !label && size === "big" && state === "error") ||
            (topRightCaption && !button && !description && !icon && !label && size === "big" && state === "active") ||
            (topRightCaption && !button && !description && !icon && !label && size === "big" && state === "focus") ||
            (topRightCaption && !button && !description && !icon && !label && size === "big" && state === "hover") ||
            (topRightCaption && !button && !description && !icon && !label && size === "big" && state === "default") ||
            (topRightCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "focus-tag") ||
            (!bottomCaption && !button && !description && !icon && !label && size === "base" && state === "active") ||
            (!bottomCaption && !button && !description && !icon && !label && size === "base" && state === "hover") ||
            (!bottomCaption && !button && !description && !icon && !label && size === "base" && state === "default") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              size === "base" &&
              state === "focus-tag") ||
            (!bottomCaption && !button && !description && !icon && !label && size === "base" && state === "disable") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "focus") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "disable") ||
            (bottomCaption &&
              label &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "focus") ||
            (bottomCaption &&
              label &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (bottomCaption &&
              label &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (button &&
              description &&
              !bottomCaption &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "base" &&
              state === "focus") ||
            (button &&
              description &&
              !bottomCaption &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "base" &&
              state === "hover") ||
            (button &&
              description &&
              !bottomCaption &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "base" &&
              state === "default") ||
            (button &&
              topRightCaption &&
              !bottomCaption &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "focus") ||
            (button &&
              topRightCaption &&
              !bottomCaption &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "hover") ||
            (button &&
              topRightCaption &&
              !bottomCaption &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "default") ||
            (description &&
              label &&
              !bottomCaption &&
              !button &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "error") ||
            (label &&
              topRightCaption &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              size === "base" &&
              state === "active") ||
            (label &&
              topRightCaption &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              size === "big" &&
              state === "focus") ||
            (label &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "disable") ||
            (topRightCaption &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "disable") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "base" &&
              state === "focus") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "active") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "error")
              ? "column"
              : undefined,
          gap:
            (button && icon) ||
            (icon && label && !button && !description) ||
            (bottomCaption && button && label && !description && !icon) ||
            (bottomCaption && description && label && !icon && state === "active") ||
            (bottomCaption && description && label && !icon && state === "focus-tag") ||
            (bottomCaption && description && label && !icon && state === "disable") ||
            (bottomCaption && description && label && !icon && state === "error") ||
            (description && icon && label && !button && state === "active") ||
            (description && icon && label && !button && state === "focus-tag") ||
            (description && icon && label && !button && state === "disable") ||
            (description && icon && label && !button && state === "error") ||
            (bottomCaption && button && !icon && !label && size === "base") ||
            (bottomCaption && icon && !button && !label && size === "base") ||
            (button && description && !bottomCaption && !icon && state === "active") ||
            (button && description && !bottomCaption && !icon && state === "focus-tag") ||
            (button && description && !bottomCaption && !icon && state === "disable") ||
            (button && description && !bottomCaption && !icon && state === "error") ||
            (bottomCaption && description && label && topRightCaption && !icon && state === "focus") ||
            (bottomCaption && description && label && topRightCaption && !icon && state === "hover") ||
            (bottomCaption && description && label && topRightCaption && !icon && state === "default") ||
            (button && !bottomCaption && !description && !icon && size === "base") ||
            (description && !bottomCaption && !button && !label && state === "active") ||
            (description && !bottomCaption && !button && !label && state === "focus-tag") ||
            (description && !bottomCaption && !button && !label && state === "disable") ||
            (icon && !button && !description && !label && size === "big") ||
            (label && !button && !description && !icon && state === "error") ||
            (bottomCaption && description && icon && label && topRightCaption && !button && state === "focus") ||
            (bottomCaption && description && icon && label && topRightCaption && !button && state === "hover") ||
            (bottomCaption && description && icon && label && topRightCaption && !button && state === "default") ||
            (bottomCaption && label && !button && !description && !icon && state === "disable") ||
            (description && icon && !bottomCaption && !button && !label && state === "error") ||
            (description && label && !bottomCaption && !button && !icon && state === "active") ||
            (description && label && !bottomCaption && !button && !icon && state === "focus-tag") ||
            (description && label && !bottomCaption && !button && !icon && state === "disable") ||
            (description && topRightCaption && !bottomCaption && !icon && !label && state === "focus") ||
            (description && topRightCaption && !bottomCaption && !icon && !label && state === "hover") ||
            (description && topRightCaption && !bottomCaption && !icon && !label && state === "default") ||
            (label && topRightCaption && !button && !description && !icon && state === "focus-tag") ||
            (!button && !icon && !label && size === "base" && state === "error") ||
            (bottomCaption && button && !icon && !label && size === "big" && state === "active") ||
            (bottomCaption && button && !icon && !label && size === "big" && state === "focus-tag") ||
            (bottomCaption && button && !icon && !label && size === "big" && state === "disable") ||
            (bottomCaption && button && !icon && !label && size === "big" && state === "error") ||
            (bottomCaption && description && !button && !label && size === "big" && state === "active") ||
            (bottomCaption && description && !button && !label && size === "big" && state === "focus-tag") ||
            (bottomCaption && description && !button && !label && size === "big" && state === "disable") ||
            (bottomCaption && description && !button && !label && size === "big" && state === "error") ||
            (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "focus") ||
            (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "hover") ||
            (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "default") ||
            (button && label && !bottomCaption && !icon && size === "big" && state === "focus") ||
            (button && label && !bottomCaption && !icon && size === "big" && state === "hover") ||
            (button && label && !bottomCaption && !icon && size === "big" && state === "default") ||
            (description && label && !bottomCaption && !button && size === "big" && state === "focus") ||
            (description && label && !bottomCaption && !button && size === "big" && state === "hover") ||
            (description && label && !bottomCaption && !button && size === "big" && state === "default") ||
            (icon && !bottomCaption && !button && !description && !label && size === "base") ||
            (bottomCaption && label && topRightCaption && !button && !description && !icon && state === "active") ||
            (bottomCaption && label && topRightCaption && !button && !description && !icon && state === "focus") ||
            (bottomCaption && label && topRightCaption && !button && !description && !icon && state === "hover") ||
            (bottomCaption && label && topRightCaption && !button && !description && !icon && state === "default") ||
            (description && icon && topRightCaption && !bottomCaption && !button && !label && state === "focus") ||
            (description && icon && topRightCaption && !bottomCaption && !button && !label && state === "hover") ||
            (description && icon && topRightCaption && !bottomCaption && !button && !label && state === "default") ||
            (description && label && topRightCaption && !bottomCaption && !button && !icon && state === "error") ||
            (bottomCaption && !button && !icon && !label && size === "base" && state === "active") ||
            (bottomCaption && !button && !icon && !label && size === "base" && state === "focus-tag") ||
            (bottomCaption && !button && !icon && !label && size === "base" && state === "disable") ||
            (button && !bottomCaption && !description && !icon && size === "big" && state === "active") ||
            (button && !bottomCaption && !description && !icon && size === "big" && state === "focus-tag") ||
            (button && !bottomCaption && !description && !icon && size === "big" && state === "disable") ||
            (button && !bottomCaption && !description && !icon && size === "big" && state === "error") ||
            (bottomCaption && button && topRightCaption && !icon && !label && size === "big" && state === "focus") ||
            (bottomCaption && button && topRightCaption && !icon && !label && size === "big" && state === "hover") ||
            (bottomCaption && button && topRightCaption && !icon && !label && size === "big" && state === "default") ||
            (bottomCaption &&
              description &&
              icon &&
              !button &&
              !topRightCaption &&
              size === "big" &&
              state === "focus") ||
            (bottomCaption &&
              description &&
              icon &&
              !button &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (bottomCaption &&
              description &&
              icon &&
              !button &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (bottomCaption &&
              description &&
              label &&
              !button &&
              !topRightCaption &&
              size === "base" &&
              state === "focus") ||
            (bottomCaption &&
              description &&
              label &&
              !button &&
              !topRightCaption &&
              size === "base" &&
              state === "hover") ||
            (bottomCaption &&
              description &&
              label &&
              !button &&
              !topRightCaption &&
              size === "base" &&
              state === "default") ||
            (bottomCaption &&
              description &&
              topRightCaption &&
              !button &&
              !label &&
              size === "big" &&
              state === "focus") ||
            (bottomCaption &&
              description &&
              topRightCaption &&
              !button &&
              !label &&
              size === "big" &&
              state === "hover") ||
            (bottomCaption &&
              description &&
              topRightCaption &&
              !button &&
              !label &&
              size === "big" &&
              state === "default") ||
            (button && description && label && !icon && !topRightCaption && size === "base" && state === "focus") ||
            (button && description && label && !icon && !topRightCaption && size === "base" && state === "hover") ||
            (button && description && label && !icon && !topRightCaption && size === "base" && state === "default") ||
            (description && icon && label && !bottomCaption && !button && size === "base" && state === "focus") ||
            (description && icon && label && !bottomCaption && !button && size === "base" && state === "hover") ||
            (description && icon && label && !bottomCaption && !button && size === "base" && state === "default") ||
            (description &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !icon &&
              size === "base" &&
              state === "focus") ||
            (description &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !icon &&
              size === "base" &&
              state === "hover") ||
            (description &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !icon &&
              size === "base" &&
              state === "default") ||
            (label && topRightCaption && !bottomCaption && !button && !description && !icon && state === "disable") ||
            (!button && !description && !icon && !topRightCaption && size === "big" && state === "focus-tag") ||
            (bottomCaption && topRightCaption && !button && !icon && !label && size === "base" && state === "focus") ||
            (bottomCaption && topRightCaption && !button && !icon && !label && size === "base" && state === "hover") ||
            (bottomCaption &&
              topRightCaption &&
              !button &&
              !icon &&
              !label &&
              size === "base" &&
              state === "default") ||
            (bottomCaption && !button && !description && !icon && !label && size === "big" && state === "disable") ||
            (bottomCaption && !button && !description && !icon && !label && size === "big" && state === "error") ||
            (bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "focus") ||
            (bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "hover") ||
            (bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "default") ||
            (bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "active") ||
            (bottomCaption &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "focus") ||
            (bottomCaption &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (bottomCaption &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (button && !bottomCaption && !icon && !label && !topRightCaption && size === "big" && state === "focus") ||
            (button && !bottomCaption && !icon && !label && !topRightCaption && size === "big" && state === "hover") ||
            (button &&
              !bottomCaption &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (description &&
              !bottomCaption &&
              !button &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "error") ||
            (description &&
              !bottomCaption &&
              !button &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "focus") ||
            (description &&
              !bottomCaption &&
              !button &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (description &&
              !bottomCaption &&
              !button &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (label && !bottomCaption && !button && !description && !icon && size === "big" && state === "active") ||
            (label && !bottomCaption && !button && !icon && !topRightCaption && size === "base" && state === "focus") ||
            (label && !bottomCaption && !button && !icon && !topRightCaption && size === "base" && state === "hover") ||
            (label &&
              !bottomCaption &&
              !button &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "default") ||
            (label && !button && !description && !icon && !topRightCaption && size === "base" && state === "active") ||
            (label &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "focus-tag") ||
            (topRightCaption &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              size === "base" &&
              state === "focus") ||
            (topRightCaption &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              size === "base" &&
              state === "hover") ||
            (topRightCaption &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              size === "base" &&
              state === "default") ||
            (topRightCaption && !bottomCaption && !button && !icon && !label && size === "big" && state === "error") ||
            (topRightCaption && !button && !description && !icon && !label && size === "big" && state === "active") ||
            (topRightCaption && !button && !description && !icon && !label && size === "big" && state === "focus") ||
            (topRightCaption && !button && !description && !icon && !label && size === "big" && state === "hover") ||
            (topRightCaption && !button && !description && !icon && !label && size === "big" && state === "default") ||
            (topRightCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "focus-tag") ||
            (!bottomCaption && !button && !description && !icon && !label && size === "base" && state === "active") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              size === "base" &&
              state === "focus-tag") ||
            (!bottomCaption && !button && !description && !icon && !label && size === "base" && state === "disable") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "focus") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "disable") ||
            (bottomCaption &&
              label &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "focus") ||
            (bottomCaption &&
              label &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (bottomCaption &&
              label &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (button &&
              description &&
              !bottomCaption &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "base" &&
              state === "focus") ||
            (button &&
              description &&
              !bottomCaption &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "base" &&
              state === "hover") ||
            (button &&
              description &&
              !bottomCaption &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "base" &&
              state === "default") ||
            (button &&
              topRightCaption &&
              !bottomCaption &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "focus") ||
            (button &&
              topRightCaption &&
              !bottomCaption &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "hover") ||
            (button &&
              topRightCaption &&
              !bottomCaption &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "default") ||
            (description &&
              label &&
              !bottomCaption &&
              !button &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "error") ||
            (label &&
              topRightCaption &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              size === "base" &&
              state === "active") ||
            (label &&
              topRightCaption &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              size === "big" &&
              state === "focus") ||
            (label &&
              topRightCaption &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              size === "big" &&
              state === "hover") ||
            (label &&
              topRightCaption &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              size === "big" &&
              state === "default") ||
            (label &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "disable") ||
            (topRightCaption &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "disable") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "active") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "error")
              ? "10px"
              : (description &&
                  !label &&
                  !button &&
                  !topRightCaption &&
                  !bottomCaption &&
                  state === "focus" &&
                  size === "base") ||
                (!label &&
                  !icon &&
                  !button &&
                  !topRightCaption &&
                  !bottomCaption &&
                  state === "hover" &&
                  size === "base") ||
                (!label &&
                  !icon &&
                  !button &&
                  !topRightCaption &&
                  !bottomCaption &&
                  state === "default" &&
                  size === "base") ||
                (icon &&
                  description &&
                  !label &&
                  !button &&
                  !topRightCaption &&
                  !bottomCaption &&
                  state === "hover" &&
                  size === "base") ||
                (icon &&
                  description &&
                  !label &&
                  !button &&
                  !topRightCaption &&
                  !bottomCaption &&
                  state === "default" &&
                  size === "base") ||
                (bottomCaption &&
                  description &&
                  !label &&
                  !icon &&
                  !button &&
                  !topRightCaption &&
                  state === "hover" &&
                  size === "base") ||
                (bottomCaption &&
                  description &&
                  !label &&
                  !icon &&
                  !button &&
                  !topRightCaption &&
                  state === "default" &&
                  size === "base") ||
                (bottomCaption &&
                  description &&
                  !label &&
                  !icon &&
                  !button &&
                  !topRightCaption &&
                  state === "focus" &&
                  size === "base") ||
                (!label &&
                  !icon &&
                  !button &&
                  !topRightCaption &&
                  !bottomCaption &&
                  !description &&
                  state === "focus" &&
                  size === "base")
              ? "8px"
              : undefined,
          width:
            (button && icon) ||
            (icon && label && !button && !description) ||
            (bottomCaption && button && label && !description && !icon) ||
            (bottomCaption && description && label && !icon && state === "active") ||
            (bottomCaption && description && label && !icon && state === "focus-tag") ||
            (bottomCaption && description && label && !icon && state === "disable") ||
            (bottomCaption && description && label && !icon && state === "error") ||
            (description && icon && label && !button && state === "active") ||
            (description && icon && label && !button && state === "focus-tag") ||
            (description && icon && label && !button && state === "disable") ||
            (description && icon && label && !button && state === "error") ||
            (bottomCaption && button && !icon && !label && size === "base") ||
            (bottomCaption && icon && !button && !label && size === "base") ||
            (button && description && !bottomCaption && !icon && state === "active") ||
            (button && description && !bottomCaption && !icon && state === "focus-tag") ||
            (button && description && !bottomCaption && !icon && state === "disable") ||
            (button && description && !bottomCaption && !icon && state === "error") ||
            (bottomCaption && description && label && topRightCaption && !icon && state === "focus") ||
            (bottomCaption && description && label && topRightCaption && !icon && state === "hover") ||
            (bottomCaption && description && label && topRightCaption && !icon && state === "default") ||
            (button && !bottomCaption && !description && !icon && size === "base") ||
            (description && !bottomCaption && !button && !label && state === "active") ||
            (description && !bottomCaption && !button && !label && state === "focus-tag") ||
            (description && !bottomCaption && !button && !label && state === "disable") ||
            (icon && !button && !description && !label && size === "big") ||
            (label && !button && !description && !icon && state === "error") ||
            (bottomCaption && description && icon && label && topRightCaption && !button && state === "focus") ||
            (bottomCaption && description && icon && label && topRightCaption && !button && state === "hover") ||
            (bottomCaption && description && icon && label && topRightCaption && !button && state === "default") ||
            (bottomCaption && label && !button && !description && !icon && state === "disable") ||
            (description && icon && !bottomCaption && !button && !label && state === "error") ||
            (description && label && !bottomCaption && !button && !icon && state === "active") ||
            (description && label && !bottomCaption && !button && !icon && state === "focus-tag") ||
            (description && label && !bottomCaption && !button && !icon && state === "disable") ||
            (description && topRightCaption && !bottomCaption && !icon && !label && state === "focus") ||
            (description && topRightCaption && !bottomCaption && !icon && !label && state === "hover") ||
            (description && topRightCaption && !bottomCaption && !icon && !label && state === "default") ||
            (label && topRightCaption && !button && !description && !icon && state === "hover") ||
            (label && topRightCaption && !button && !description && !icon && state === "default") ||
            (label && topRightCaption && !button && !description && !icon && state === "focus-tag") ||
            (!button && !icon && !label && size === "base" && state === "error") ||
            (bottomCaption && button && !icon && !label && size === "big" && state === "active") ||
            (bottomCaption && button && !icon && !label && size === "big" && state === "focus-tag") ||
            (bottomCaption && button && !icon && !label && size === "big" && state === "disable") ||
            (bottomCaption && button && !icon && !label && size === "big" && state === "error") ||
            (bottomCaption && description && !button && !label && size === "big" && state === "active") ||
            (bottomCaption && description && !button && !label && size === "big" && state === "focus-tag") ||
            (bottomCaption && description && !button && !label && size === "big" && state === "disable") ||
            (bottomCaption && description && !button && !label && size === "big" && state === "error") ||
            (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "focus") ||
            (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "hover") ||
            (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "default") ||
            (button && label && !bottomCaption && !icon && size === "big" && state === "focus") ||
            (button && label && !bottomCaption && !icon && size === "big" && state === "hover") ||
            (button && label && !bottomCaption && !icon && size === "big" && state === "default") ||
            (description && label && !bottomCaption && !button && size === "big" && state === "focus") ||
            (description && label && !bottomCaption && !button && size === "big" && state === "hover") ||
            (description && label && !bottomCaption && !button && size === "big" && state === "default") ||
            (description && !bottomCaption && !button && !label && !topRightCaption && state === "focus") ||
            (icon && !bottomCaption && !button && !description && !label && size === "base") ||
            (bottomCaption && label && topRightCaption && !button && !description && !icon && state === "active") ||
            (bottomCaption && label && topRightCaption && !button && !description && !icon && state === "focus") ||
            (description && icon && topRightCaption && !bottomCaption && !button && !label && state === "focus") ||
            (description && icon && topRightCaption && !bottomCaption && !button && !label && state === "hover") ||
            (description && icon && topRightCaption && !bottomCaption && !button && !label && state === "default") ||
            (description && label && topRightCaption && !bottomCaption && !button && !icon && state === "error") ||
            (bottomCaption && !button && !icon && !label && size === "base" && state === "active") ||
            (bottomCaption && !button && !icon && !label && size === "base" && state === "focus-tag") ||
            (bottomCaption && !button && !icon && !label && size === "base" && state === "disable") ||
            (bottomCaption && !button && !icon && !topRightCaption && size === "base" && state === "focus") ||
            (button && !bottomCaption && !description && !icon && size === "big" && state === "active") ||
            (button && !bottomCaption && !description && !icon && size === "big" && state === "focus-tag") ||
            (button && !bottomCaption && !description && !icon && size === "big" && state === "disable") ||
            (button && !bottomCaption && !description && !icon && size === "big" && state === "error") ||
            (bottomCaption && button && topRightCaption && !icon && !label && size === "big" && state === "focus") ||
            (bottomCaption && button && topRightCaption && !icon && !label && size === "big" && state === "hover") ||
            (bottomCaption && button && topRightCaption && !icon && !label && size === "big" && state === "default") ||
            (bottomCaption &&
              description &&
              icon &&
              !button &&
              !topRightCaption &&
              size === "big" &&
              state === "focus") ||
            (bottomCaption &&
              description &&
              icon &&
              !button &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (bottomCaption &&
              description &&
              icon &&
              !button &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (bottomCaption &&
              description &&
              label &&
              !button &&
              !topRightCaption &&
              size === "base" &&
              state === "hover") ||
            (bottomCaption &&
              description &&
              label &&
              !button &&
              !topRightCaption &&
              size === "base" &&
              state === "default") ||
            (bottomCaption &&
              description &&
              topRightCaption &&
              !button &&
              !label &&
              size === "big" &&
              state === "focus") ||
            (bottomCaption &&
              description &&
              topRightCaption &&
              !button &&
              !label &&
              size === "big" &&
              state === "hover") ||
            (bottomCaption &&
              description &&
              topRightCaption &&
              !button &&
              !label &&
              size === "big" &&
              state === "default") ||
            (button && description && label && !icon && !topRightCaption && size === "base" && state === "focus") ||
            (button && description && label && !icon && !topRightCaption && size === "base" && state === "hover") ||
            (button && description && label && !icon && !topRightCaption && size === "base" && state === "default") ||
            (description && icon && label && !button && !topRightCaption && size === "base" && state === "focus") ||
            (description &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !icon &&
              size === "base" &&
              state === "focus") ||
            (description &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !icon &&
              size === "base" &&
              state === "hover") ||
            (description &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !icon &&
              size === "base" &&
              state === "default") ||
            (label && topRightCaption && !bottomCaption && !button && !description && !icon && state === "disable") ||
            (!button && !description && !icon && !topRightCaption && size === "big" && state === "focus-tag") ||
            (bottomCaption && topRightCaption && !button && !icon && !label && size === "base" && state === "focus") ||
            (bottomCaption && topRightCaption && !button && !icon && !label && size === "base" && state === "hover") ||
            (bottomCaption &&
              topRightCaption &&
              !button &&
              !icon &&
              !label &&
              size === "base" &&
              state === "default") ||
            (description &&
              icon &&
              !bottomCaption &&
              !button &&
              !topRightCaption &&
              size === "base" &&
              state === "hover") ||
            (description &&
              icon &&
              !bottomCaption &&
              !button &&
              !topRightCaption &&
              size === "base" &&
              state === "default") ||
            (description &&
              icon &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !button &&
              size === "base" &&
              state === "focus") ||
            (description &&
              icon &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !button &&
              size === "base" &&
              state === "hover") ||
            (description &&
              icon &&
              label &&
              topRightCaption &&
              !bottomCaption &&
              !button &&
              size === "base" &&
              state === "default") ||
            (bottomCaption && !button && !description && !icon && !label && size === "big" && state === "disable") ||
            (bottomCaption && !button && !description && !icon && !label && size === "big" && state === "error") ||
            (bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "hover") ||
            (bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "default") ||
            (bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "active") ||
            (bottomCaption &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "focus") ||
            (bottomCaption &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (bottomCaption &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (button && !bottomCaption && !icon && !label && !topRightCaption && size === "big" && state === "focus") ||
            (button && !bottomCaption && !icon && !label && !topRightCaption && size === "big" && state === "hover") ||
            (button &&
              !bottomCaption &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (description &&
              !bottomCaption &&
              !button &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "error") ||
            (description &&
              !bottomCaption &&
              !button &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (description &&
              !bottomCaption &&
              !button &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (description && !button && !icon && !label && !topRightCaption && size === "base" && state === "hover") ||
            (description && !button && !icon && !label && !topRightCaption && size === "base" && state === "default") ||
            (label && !bottomCaption && !button && !description && !icon && size === "big" && state === "active") ||
            (label && !bottomCaption && !button && !icon && !topRightCaption && size === "base" && state === "focus") ||
            (label && !bottomCaption && !button && !icon && !topRightCaption && size === "base" && state === "hover") ||
            (label &&
              !bottomCaption &&
              !button &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "default") ||
            (label && !button && !description && !icon && !topRightCaption && size === "base" && state === "active") ||
            (label &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "focus-tag") ||
            (topRightCaption &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              size === "base" &&
              state === "focus") ||
            (topRightCaption && !bottomCaption && !button && !icon && !label && size === "big" && state === "error") ||
            (topRightCaption && !button && !description && !icon && !label && size === "big" && state === "active") ||
            (topRightCaption && !button && !description && !icon && !label && size === "big" && state === "focus") ||
            (topRightCaption && !button && !description && !icon && !label && size === "big" && state === "hover") ||
            (topRightCaption && !button && !description && !icon && !label && size === "big" && state === "default") ||
            (topRightCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "focus-tag") ||
            (!bottomCaption && !button && !description && !icon && !label && size === "base" && state === "active") ||
            (!bottomCaption && !button && !description && !icon && !label && size === "base" && state === "hover") ||
            (!bottomCaption && !button && !description && !icon && !label && size === "base" && state === "default") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              size === "base" &&
              state === "focus-tag") ||
            (!bottomCaption && !button && !description && !icon && !label && size === "base" && state === "disable") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "focus") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "disable") ||
            (bottomCaption &&
              label &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "focus") ||
            (bottomCaption &&
              label &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "hover") ||
            (bottomCaption &&
              label &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "big" &&
              state === "default") ||
            (button &&
              description &&
              !bottomCaption &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "base" &&
              state === "focus") ||
            (button &&
              description &&
              !bottomCaption &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "base" &&
              state === "hover") ||
            (button &&
              description &&
              !bottomCaption &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "base" &&
              state === "default") ||
            (button &&
              topRightCaption &&
              !bottomCaption &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "focus") ||
            (button &&
              topRightCaption &&
              !bottomCaption &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "hover") ||
            (button &&
              topRightCaption &&
              !bottomCaption &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "default") ||
            (description &&
              label &&
              !bottomCaption &&
              !button &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "error") ||
            (label &&
              topRightCaption &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              size === "base" &&
              state === "active") ||
            (label &&
              topRightCaption &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              size === "big" &&
              state === "focus") ||
            (label &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !topRightCaption &&
              size === "base" &&
              state === "disable") ||
            (topRightCaption &&
              !bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              size === "big" &&
              state === "disable") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "base" &&
              state === "focus") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "active") ||
            (!bottomCaption &&
              !button &&
              !description &&
              !icon &&
              !label &&
              !topRightCaption &&
              size === "big" &&
              state === "error")
              ? "370px"
              : undefined,
        },
        ...style,
      }}
    >
      <React.Fragment>
        {(state === "disable" ||
          (topRightCaption && state === "error") ||
          (topRightCaption && state === "focus-tag") ||
          (topRightCaption && state === "active") ||
          (icon && size === "big" && state === "focus") ||
          (icon && size === "big" && state === "hover") ||
          (icon && size === "big" && state === "default") ||
          (topRightCaption && size === "base" && state === "focus") ||
          (topRightCaption && size === "base" && state === "hover") ||
          (topRightCaption && size === "base" && state === "default") ||
          (!topRightCaption && size === "big" && state === "error") ||
          (!topRightCaption && size === "big" && state === "focus-tag") ||
          (!topRightCaption && size === "big" && state === "active") ||
          (description && !icon && size === "big" && state === "focus") ||
          (description && !icon && size === "big" && state === "hover") ||
          (description && !icon && size === "big" && state === "default") ||
          (icon && !topRightCaption && size === "base" && state === "error") ||
          (icon && !topRightCaption && size === "base" && state === "focus-tag") ||
          (icon && !topRightCaption && size === "base" && state === "active") ||
          (button && icon && !topRightCaption && size === "base" && state === "focus") ||
          (button && icon && !topRightCaption && size === "base" && state === "hover") ||
          (button && icon && !topRightCaption && size === "base" && state === "default") ||
          (button && !description && !icon && !topRightCaption && state === "focus") ||
          (button && !description && !icon && !topRightCaption && state === "hover") ||
          (button && !description && !icon && !topRightCaption && state === "default") ||
          (description && !icon && !topRightCaption && size === "base" && state === "focus-tag") ||
          (description && !icon && !topRightCaption && size === "base" && state === "active") ||
          (!icon && !label && !topRightCaption && size === "base" && state === "error") ||
          (button && label && !icon && !topRightCaption && size === "base" && state === "error") ||
          (button && topRightCaption && !description && !icon && size === "big" && state === "focus") ||
          (button && topRightCaption && !description && !icon && size === "big" && state === "hover") ||
          (button && topRightCaption && !description && !icon && size === "big" && state === "default") ||
          (button && !description && !icon && !topRightCaption && size === "base" && state === "focus-tag") ||
          (button && !description && !icon && !topRightCaption && size === "base" && state === "active") ||
          (bottomCaption &&
            description &&
            !icon &&
            !label &&
            !topRightCaption &&
            size === "base" &&
            state === "focus") ||
          (bottomCaption &&
            description &&
            !icon &&
            !label &&
            !topRightCaption &&
            size === "base" &&
            state === "hover") ||
          (bottomCaption &&
            description &&
            !icon &&
            !label &&
            !topRightCaption &&
            size === "base" &&
            state === "default") ||
          (bottomCaption && icon && !button && !label && !topRightCaption && size === "base" && state === "focus") ||
          (bottomCaption && icon && !button && !label && !topRightCaption && size === "base" && state === "hover") ||
          (bottomCaption && icon && !button && !label && !topRightCaption && size === "base" && state === "default") ||
          (bottomCaption && label && !button && !icon && !topRightCaption && size === "base" && state === "error") ||
          (bottomCaption && !button && !description && !icon && !label && !topRightCaption && state === "focus") ||
          (bottomCaption && !button && !description && !icon && !label && !topRightCaption && state === "hover") ||
          (bottomCaption && !button && !description && !icon && !label && !topRightCaption && state === "default") ||
          (icon && label && !button && !description && !topRightCaption && size === "base" && state === "focus") ||
          (icon && label && !button && !description && !topRightCaption && size === "base" && state === "hover") ||
          (icon && label && !button && !description && !topRightCaption && size === "base" && state === "default") ||
          (label && !bottomCaption && !button && !icon && !topRightCaption && size === "base" && state === "focus") ||
          (label && !bottomCaption && !button && !icon && !topRightCaption && size === "base" && state === "hover") ||
          (label && !bottomCaption && !button && !icon && !topRightCaption && size === "base" && state === "default") ||
          (topRightCaption && !button && !description && !icon && !label && size === "big" && state === "focus") ||
          (topRightCaption && !button && !description && !icon && !label && size === "big" && state === "hover") ||
          (topRightCaption && !button && !description && !icon && !label && size === "big" && state === "default") ||
          (button &&
            description &&
            label &&
            !bottomCaption &&
            !icon &&
            !topRightCaption &&
            size === "base" &&
            state === "focus") ||
          (button &&
            description &&
            label &&
            !bottomCaption &&
            !icon &&
            !topRightCaption &&
            size === "base" &&
            state === "hover") ||
          (button &&
            description &&
            label &&
            !bottomCaption &&
            !icon &&
            !topRightCaption &&
            size === "base" &&
            state === "default") ||
          (description &&
            icon &&
            label &&
            !bottomCaption &&
            !button &&
            !topRightCaption &&
            size === "base" &&
            state === "focus") ||
          (description &&
            icon &&
            label &&
            !bottomCaption &&
            !button &&
            !topRightCaption &&
            size === "base" &&
            state === "hover") ||
          (description &&
            icon &&
            label &&
            !bottomCaption &&
            !button &&
            !topRightCaption &&
            size === "base" &&
            state === "default") ||
          (!bottomCaption &&
            !button &&
            !description &&
            !icon &&
            !topRightCaption &&
            size === "big" &&
            state === "focus") ||
          (!bottomCaption &&
            !button &&
            !description &&
            !icon &&
            !topRightCaption &&
            size === "big" &&
            state === "hover") ||
          (!bottomCaption &&
            !button &&
            !description &&
            !icon &&
            !topRightCaption &&
            size === "big" &&
            state === "default") ||
          (!button &&
            !description &&
            !icon &&
            !label &&
            !topRightCaption &&
            size === "base" &&
            state === "focus-tag") ||
          (!button && !description && !icon && !label && !topRightCaption && size === "base" && state === "active") ||
          (label &&
            topRightCaption &&
            !bottomCaption &&
            !button &&
            !description &&
            !icon &&
            size === "big" &&
            state === "focus") ||
          (label &&
            topRightCaption &&
            !bottomCaption &&
            !button &&
            !description &&
            !icon &&
            size === "big" &&
            state === "hover") ||
          (label &&
            topRightCaption &&
            !bottomCaption &&
            !button &&
            !description &&
            !icon &&
            size === "big" &&
            state === "default") ||
          (icon &&
            !bottomCaption &&
            !button &&
            !description &&
            !label &&
            !topRightCaption &&
            size === "base" &&
            state === "focus") ||
          (icon &&
            !bottomCaption &&
            !button &&
            !description &&
            !label &&
            !topRightCaption &&
            size === "base" &&
            state === "hover") ||
          (icon &&
            !bottomCaption &&
            !button &&
            !description &&
            !label &&
            !topRightCaption &&
            size === "base" &&
            state === "default") ||
          (label &&
            !bottomCaption &&
            !button &&
            !description &&
            !icon &&
            !topRightCaption &&
            size === "base" &&
            state === "error") ||
          (label &&
            !bottomCaption &&
            !button &&
            !description &&
            !icon &&
            !topRightCaption &&
            size === "base" &&
            state === "focus-tag") ||
          (label &&
            !bottomCaption &&
            !button &&
            !description &&
            !icon &&
            !topRightCaption &&
            size === "base" &&
            state === "active")) && (
          <React.Fragment>
            <div
              style={{
                alignItems:
                  (label &&
                    description &&
                    topRightCaption &&
                    !icon &&
                    !bottomCaption &&
                    state === "default" &&
                    size === "base") ||
                  (label &&
                    description &&
                    topRightCaption &&
                    !icon &&
                    !bottomCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (label &&
                    description &&
                    topRightCaption &&
                    !icon &&
                    !bottomCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !bottomCaption &&
                    !button &&
                    state === "default") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !bottomCaption &&
                    !button &&
                    state === "hover") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !bottomCaption &&
                    !button &&
                    state === "focus") ||
                  (label &&
                    icon &&
                    description &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    state === "default" &&
                    size === "base") ||
                  (label &&
                    icon &&
                    description &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    state === "hover" &&
                    size === "base") ||
                  (label &&
                    icon &&
                    description &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    state === "focus" &&
                    size === "base") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !bottomCaption &&
                    !button &&
                    state === "active" &&
                    size === "base")
                    ? "center"
                    : (description &&
                        bottomCaption &&
                        !label &&
                        !icon &&
                        !button &&
                        !topRightCaption &&
                        state === "hover" &&
                        size === "base") ||
                      (description &&
                        bottomCaption &&
                        !label &&
                        !icon &&
                        !button &&
                        !topRightCaption &&
                        state === "default" &&
                        size === "base") ||
                      (description &&
                        bottomCaption &&
                        !label &&
                        !icon &&
                        !button &&
                        !topRightCaption &&
                        state === "focus" &&
                        size === "base")
                    ? "flex-start"
                    : undefined,
                alignSelf:
                  (label &&
                    description &&
                    topRightCaption &&
                    !icon &&
                    !bottomCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (label &&
                    description &&
                    topRightCaption &&
                    !icon &&
                    !bottomCaption &&
                    state === "default" &&
                    size === "base") ||
                  (label &&
                    description &&
                    topRightCaption &&
                    !icon &&
                    !bottomCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !bottomCaption &&
                    state === "hover") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !bottomCaption &&
                    state === "default") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !bottomCaption &&
                    state === "focus") ||
                  (label &&
                    icon &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !bottomCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (label &&
                    icon &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !bottomCaption &&
                    state === "default" &&
                    size === "base") ||
                  (label &&
                    icon &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !bottomCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !bottomCaption &&
                    state === "active" &&
                    size === "base") ||
                  (description &&
                    bottomCaption &&
                    !label &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (description &&
                    bottomCaption &&
                    !label &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    bottomCaption &&
                    !label &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base")
                    ? "stretch"
                    : undefined,
                backgroundColor:
                  !label &&
                  state === "focus" &&
                  !icon &&
                  description &&
                  !button &&
                  !topRightCaption &&
                  size === "base" &&
                  bottomCaption
                    ? "#fafafb03"
                    : undefined,
                border:
                  (description &&
                    bottomCaption &&
                    !label &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (description &&
                    bottomCaption &&
                    !label &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    bottomCaption &&
                    !label &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base")
                    ? "1px solid"
                    : undefined,
                borderColor:
                  (description &&
                    bottomCaption &&
                    !label &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (description &&
                    bottomCaption &&
                    !label &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base")
                    ? "#7857ed"
                    : !label &&
                      state === "default" &&
                      !icon &&
                      description &&
                      !button &&
                      !topRightCaption &&
                      size === "base" &&
                      bottomCaption
                    ? "#dadde1"
                    : undefined,
                borderRadius:
                  (description &&
                    bottomCaption &&
                    !label &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (description &&
                    bottomCaption &&
                    !label &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    bottomCaption &&
                    !label &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base")
                    ? "8px"
                    : undefined,
                boxShadow:
                  !label &&
                  state === "focus" &&
                  !icon &&
                  description &&
                  !button &&
                  !topRightCaption &&
                  size === "base" &&
                  bottomCaption
                    ? "0px 0px 0px 3px #eeeaff"
                    : undefined,
                color:
                  (button && icon) ||
                  (icon && label && !button && !description) ||
                  (bottomCaption && button && label && !description && !icon) ||
                  (bottomCaption && description && label && !icon && state === "active") ||
                  (bottomCaption && description && label && !icon && state === "focus-tag") ||
                  (bottomCaption && description && label && !icon && state === "disable") ||
                  (bottomCaption && description && label && !icon && state === "error") ||
                  (description && icon && label && !button && state === "active") ||
                  (description && icon && label && !button && state === "focus-tag") ||
                  (description && icon && label && !button && state === "disable") ||
                  (description && icon && label && !button && state === "error") ||
                  (bottomCaption && button && !icon && !label && size === "base") ||
                  (bottomCaption && icon && !button && !label && size === "base") ||
                  (button && description && !bottomCaption && !icon && state === "active") ||
                  (button && description && !bottomCaption && !icon && state === "focus-tag") ||
                  (button && description && !bottomCaption && !icon && state === "disable") ||
                  (button && description && !bottomCaption && !icon && state === "error") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "focus") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "hover") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "default") ||
                  (button && !bottomCaption && !description && !icon && size === "base") ||
                  (description && !bottomCaption && !button && !label && state === "active") ||
                  (description && !bottomCaption && !button && !label && state === "focus-tag") ||
                  (description && !bottomCaption && !button && !label && state === "disable") ||
                  (icon && !button && !description && !label && size === "big") ||
                  (label && !button && !description && !icon && state === "error") ||
                  (bottomCaption && description && icon && label && topRightCaption && !button && state === "focus") ||
                  (bottomCaption && description && icon && label && topRightCaption && !button && state === "hover") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    label &&
                    topRightCaption &&
                    !button &&
                    state === "default") ||
                  (bottomCaption && label && !button && !description && !icon && state === "disable") ||
                  (description && icon && !bottomCaption && !button && !label && state === "error") ||
                  (description && label && !bottomCaption && !button && !icon && state === "active") ||
                  (description && label && !bottomCaption && !button && !icon && state === "focus-tag") ||
                  (description && label && !bottomCaption && !button && !icon && state === "disable") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "focus") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "hover") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "default") ||
                  (label && topRightCaption && !button && !description && !icon && state === "focus-tag") ||
                  (!button && !icon && !label && size === "base" && state === "error") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "active") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "focus-tag") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "disable") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "error") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "active") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "focus-tag") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "disable") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "error") ||
                  (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "focus") ||
                  (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "hover") ||
                  (bottomCaption &&
                    description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "focus") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "hover") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "default") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "focus") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "hover") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "default") ||
                  (icon && !bottomCaption && !button && !description && !label && size === "base") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    state === "active") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "focus") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "hover") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "default") ||
                  (description &&
                    label &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    state === "error") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "active") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "focus-tag") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "disable") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "active") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "focus-tag") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "disable") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "error") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (label &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    state === "disable") ||
                  (!button && !description && !icon && !topRightCaption && size === "big" && state === "focus-tag") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "default") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "disable") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "error") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "active") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "error") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "big" &&
                    state === "active") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "error") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "active") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus-tag") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "default") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "active") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus-tag") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "disable") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "disable") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "active") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus-tag") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "hover") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "default") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "disable") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "active") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "error")
                    ? "#1c2126"
                    : label &&
                      state === "disable" &&
                      !icon &&
                      !description &&
                      !button &&
                      !topRightCaption &&
                      size === "base" &&
                      !bottomCaption
                    ? "#aebbc5"
                    : undefined,
                display:
                  (label &&
                    description &&
                    topRightCaption &&
                    !icon &&
                    !bottomCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (label &&
                    description &&
                    topRightCaption &&
                    !icon &&
                    !bottomCaption &&
                    state === "default" &&
                    size === "base") ||
                  (label &&
                    description &&
                    topRightCaption &&
                    !icon &&
                    !bottomCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !bottomCaption &&
                    state === "hover") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !bottomCaption &&
                    state === "default") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !bottomCaption &&
                    state === "focus") ||
                  (label &&
                    icon &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !bottomCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (label &&
                    icon &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !bottomCaption &&
                    state === "default" &&
                    size === "base") ||
                  (label &&
                    icon &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !bottomCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !bottomCaption &&
                    state === "active" &&
                    size === "base") ||
                  (description &&
                    bottomCaption &&
                    !label &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (description &&
                    bottomCaption &&
                    !label &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    bottomCaption &&
                    !label &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base")
                    ? "flex"
                    : undefined,
                fontFamily:
                  (button && icon) ||
                  (icon && label && !button && !description) ||
                  (bottomCaption && button && label && !description && !icon) ||
                  (bottomCaption && description && label && !icon && state === "active") ||
                  (bottomCaption && description && label && !icon && state === "focus-tag") ||
                  (bottomCaption && description && label && !icon && state === "disable") ||
                  (bottomCaption && description && label && !icon && state === "error") ||
                  (description && icon && label && !button && state === "active") ||
                  (description && icon && label && !button && state === "focus-tag") ||
                  (description && icon && label && !button && state === "disable") ||
                  (description && icon && label && !button && state === "error") ||
                  (bottomCaption && button && !icon && !label && size === "base") ||
                  (bottomCaption && icon && !button && !label && size === "base") ||
                  (button && description && !bottomCaption && !icon && state === "active") ||
                  (button && description && !bottomCaption && !icon && state === "focus-tag") ||
                  (button && description && !bottomCaption && !icon && state === "disable") ||
                  (button && description && !bottomCaption && !icon && state === "error") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "focus") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "hover") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "default") ||
                  (button && !bottomCaption && !description && !icon && size === "base") ||
                  (description && !bottomCaption && !button && !label && state === "active") ||
                  (description && !bottomCaption && !button && !label && state === "focus-tag") ||
                  (description && !bottomCaption && !button && !label && state === "disable") ||
                  (icon && !button && !description && !label && size === "big") ||
                  (label && !button && !description && !icon && state === "error") ||
                  (bottomCaption && description && icon && label && topRightCaption && !button && state === "focus") ||
                  (bottomCaption && description && icon && label && topRightCaption && !button && state === "hover") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    label &&
                    topRightCaption &&
                    !button &&
                    state === "default") ||
                  (bottomCaption && label && !button && !description && !icon && state === "disable") ||
                  (description && icon && !bottomCaption && !button && !label && state === "error") ||
                  (description && label && !bottomCaption && !button && !icon && state === "active") ||
                  (description && label && !bottomCaption && !button && !icon && state === "focus-tag") ||
                  (description && label && !bottomCaption && !button && !icon && state === "disable") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "focus") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "hover") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "default") ||
                  (label && topRightCaption && !button && !description && !icon && state === "focus-tag") ||
                  (!button && !icon && !label && size === "base" && state === "error") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "active") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "focus-tag") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "disable") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "error") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "active") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "focus-tag") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "disable") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "error") ||
                  (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "focus") ||
                  (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "hover") ||
                  (bottomCaption &&
                    description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "focus") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "hover") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "default") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "focus") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "hover") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "default") ||
                  (icon && !bottomCaption && !button && !description && !label && size === "base") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    state === "active") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "focus") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "hover") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "default") ||
                  (description &&
                    label &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    state === "error") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "active") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "focus-tag") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "disable") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "active") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "focus-tag") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "disable") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "error") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (label &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    state === "disable") ||
                  (!button && !description && !icon && !topRightCaption && size === "big" && state === "focus-tag") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "default") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "disable") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "error") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "active") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "error") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "big" &&
                    state === "active") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "error") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "active") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus-tag") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "default") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "active") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus-tag") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "disable") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "disable") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "active") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus-tag") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "disable") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "hover") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "default") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "disable") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "active") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "error")
                    ? "'Acid Grotesk TP-Bold', Helvetica"
                    : undefined,
                fontSize:
                  (button && icon) ||
                  (icon && label && !button && !description) ||
                  (bottomCaption && button && label && !description && !icon) ||
                  (bottomCaption && description && label && !icon && state === "active") ||
                  (bottomCaption && description && label && !icon && state === "focus-tag") ||
                  (bottomCaption && description && label && !icon && state === "disable") ||
                  (bottomCaption && description && label && !icon && state === "error") ||
                  (description && icon && label && !button && state === "active") ||
                  (description && icon && label && !button && state === "focus-tag") ||
                  (description && icon && label && !button && state === "disable") ||
                  (description && icon && label && !button && state === "error") ||
                  (bottomCaption && button && !icon && !label && size === "base") ||
                  (bottomCaption && icon && !button && !label && size === "base") ||
                  (button && description && !bottomCaption && !icon && state === "active") ||
                  (button && description && !bottomCaption && !icon && state === "focus-tag") ||
                  (button && description && !bottomCaption && !icon && state === "disable") ||
                  (button && description && !bottomCaption && !icon && state === "error") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "focus") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "hover") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "default") ||
                  (button && !bottomCaption && !description && !icon && size === "base") ||
                  (description && !bottomCaption && !button && !label && state === "active") ||
                  (description && !bottomCaption && !button && !label && state === "focus-tag") ||
                  (description && !bottomCaption && !button && !label && state === "disable") ||
                  (icon && !button && !description && !label && size === "big") ||
                  (label && !button && !description && !icon && state === "error") ||
                  (bottomCaption && description && icon && label && topRightCaption && !button && state === "focus") ||
                  (bottomCaption && description && icon && label && topRightCaption && !button && state === "hover") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    label &&
                    topRightCaption &&
                    !button &&
                    state === "default") ||
                  (bottomCaption && label && !button && !description && !icon && state === "disable") ||
                  (description && icon && !bottomCaption && !button && !label && state === "error") ||
                  (description && label && !bottomCaption && !button && !icon && state === "active") ||
                  (description && label && !bottomCaption && !button && !icon && state === "focus-tag") ||
                  (description && label && !bottomCaption && !button && !icon && state === "disable") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "focus") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "hover") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "default") ||
                  (label && topRightCaption && !button && !description && !icon && state === "focus-tag") ||
                  (!button && !icon && !label && size === "base" && state === "error") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "active") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "focus-tag") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "disable") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "error") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "active") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "focus-tag") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "disable") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "error") ||
                  (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "focus") ||
                  (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "hover") ||
                  (bottomCaption &&
                    description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "focus") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "hover") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "default") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "focus") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "hover") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "default") ||
                  (icon && !bottomCaption && !button && !description && !label && size === "base") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    state === "active") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "focus") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "hover") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "default") ||
                  (description &&
                    label &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    state === "error") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "active") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "focus-tag") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "disable") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "active") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "focus-tag") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "disable") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "error") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (label &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    state === "disable") ||
                  (!button && !description && !icon && !topRightCaption && size === "big" && state === "focus-tag") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "default") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "disable") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "error") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "active") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "error") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "big" &&
                    state === "active") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "error") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "active") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus-tag") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "default") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "active") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus-tag") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "disable") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "disable") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "active") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus-tag") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "disable") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "hover") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "default") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "disable") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "active") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "error")
                    ? "14px"
                    : undefined,
                fontWeight:
                  (button && icon) ||
                  (icon && label && !button && !description) ||
                  (bottomCaption && button && label && !description && !icon) ||
                  (bottomCaption && description && label && !icon && state === "active") ||
                  (bottomCaption && description && label && !icon && state === "focus-tag") ||
                  (bottomCaption && description && label && !icon && state === "disable") ||
                  (bottomCaption && description && label && !icon && state === "error") ||
                  (description && icon && label && !button && state === "active") ||
                  (description && icon && label && !button && state === "focus-tag") ||
                  (description && icon && label && !button && state === "disable") ||
                  (description && icon && label && !button && state === "error") ||
                  (bottomCaption && button && !icon && !label && size === "base") ||
                  (bottomCaption && icon && !button && !label && size === "base") ||
                  (button && description && !bottomCaption && !icon && state === "active") ||
                  (button && description && !bottomCaption && !icon && state === "focus-tag") ||
                  (button && description && !bottomCaption && !icon && state === "disable") ||
                  (button && description && !bottomCaption && !icon && state === "error") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "focus") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "hover") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "default") ||
                  (button && !bottomCaption && !description && !icon && size === "base") ||
                  (description && !bottomCaption && !button && !label && state === "active") ||
                  (description && !bottomCaption && !button && !label && state === "focus-tag") ||
                  (description && !bottomCaption && !button && !label && state === "disable") ||
                  (icon && !button && !description && !label && size === "big") ||
                  (label && !button && !description && !icon && state === "error") ||
                  (bottomCaption && description && icon && label && topRightCaption && !button && state === "focus") ||
                  (bottomCaption && description && icon && label && topRightCaption && !button && state === "hover") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    label &&
                    topRightCaption &&
                    !button &&
                    state === "default") ||
                  (bottomCaption && label && !button && !description && !icon && state === "disable") ||
                  (description && icon && !bottomCaption && !button && !label && state === "error") ||
                  (description && label && !bottomCaption && !button && !icon && state === "active") ||
                  (description && label && !bottomCaption && !button && !icon && state === "focus-tag") ||
                  (description && label && !bottomCaption && !button && !icon && state === "disable") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "focus") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "hover") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "default") ||
                  (label && topRightCaption && !button && !description && !icon && state === "focus-tag") ||
                  (!button && !icon && !label && size === "base" && state === "error") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "active") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "focus-tag") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "disable") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "error") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "active") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "focus-tag") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "disable") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "error") ||
                  (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "focus") ||
                  (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "hover") ||
                  (bottomCaption &&
                    description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "focus") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "hover") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "default") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "focus") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "hover") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "default") ||
                  (icon && !bottomCaption && !button && !description && !label && size === "base") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    state === "active") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "focus") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "hover") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "default") ||
                  (description &&
                    label &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    state === "error") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "active") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "focus-tag") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "disable") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "active") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "focus-tag") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "disable") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "error") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (label &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    state === "disable") ||
                  (!button && !description && !icon && !topRightCaption && size === "big" && state === "focus-tag") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "default") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "disable") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "error") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "active") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "error") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "big" &&
                    state === "active") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "error") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "active") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus-tag") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "default") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "active") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus-tag") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "disable") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "disable") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "active") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus-tag") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "disable") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "hover") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "default") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "disable") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "active") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "error")
                    ? "700"
                    : undefined,
                gap:
                  (label &&
                    description &&
                    topRightCaption &&
                    !icon &&
                    !bottomCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (label &&
                    description &&
                    topRightCaption &&
                    !icon &&
                    !bottomCaption &&
                    state === "default" &&
                    size === "base") ||
                  (label &&
                    description &&
                    topRightCaption &&
                    !icon &&
                    !bottomCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !bottomCaption &&
                    state === "hover") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !bottomCaption &&
                    state === "default") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !bottomCaption &&
                    state === "focus") ||
                  (label &&
                    icon &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !bottomCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (label &&
                    icon &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !bottomCaption &&
                    state === "default" &&
                    size === "base") ||
                  (label &&
                    icon &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !bottomCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !bottomCaption &&
                    state === "active" &&
                    size === "base") ||
                  (description &&
                    bottomCaption &&
                    !label &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (description &&
                    bottomCaption &&
                    !label &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    bottomCaption &&
                    !label &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base")
                    ? "10px"
                    : undefined,
                justifyContent:
                  (label &&
                    description &&
                    topRightCaption &&
                    !icon &&
                    !bottomCaption &&
                    state === "default" &&
                    size === "base") ||
                  (label &&
                    description &&
                    topRightCaption &&
                    !icon &&
                    !bottomCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (label &&
                    description &&
                    topRightCaption &&
                    !icon &&
                    !bottomCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !bottomCaption &&
                    !button &&
                    state === "default") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !bottomCaption &&
                    !button &&
                    state === "hover") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !bottomCaption &&
                    !button &&
                    state === "focus") ||
                  (label &&
                    icon &&
                    description &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    state === "default" &&
                    size === "base") ||
                  (label &&
                    icon &&
                    description &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    state === "hover" &&
                    size === "base") ||
                  (label &&
                    icon &&
                    description &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    state === "focus" &&
                    size === "base") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !bottomCaption &&
                    !button &&
                    state === "active" &&
                    size === "base")
                    ? "center"
                    : undefined,
                letterSpacing:
                  (button && icon) ||
                  (icon && label && !button && !description) ||
                  (bottomCaption && button && label && !description && !icon) ||
                  (bottomCaption && description && label && !icon && state === "active") ||
                  (bottomCaption && description && label && !icon && state === "focus-tag") ||
                  (bottomCaption && description && label && !icon && state === "disable") ||
                  (bottomCaption && description && label && !icon && state === "error") ||
                  (description && icon && label && !button && state === "active") ||
                  (description && icon && label && !button && state === "focus-tag") ||
                  (description && icon && label && !button && state === "disable") ||
                  (description && icon && label && !button && state === "error") ||
                  (bottomCaption && button && !icon && !label && size === "base") ||
                  (bottomCaption && icon && !button && !label && size === "base") ||
                  (button && description && !bottomCaption && !icon && state === "active") ||
                  (button && description && !bottomCaption && !icon && state === "focus-tag") ||
                  (button && description && !bottomCaption && !icon && state === "disable") ||
                  (button && description && !bottomCaption && !icon && state === "error") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "focus") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "hover") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "default") ||
                  (button && !bottomCaption && !description && !icon && size === "base") ||
                  (description && !bottomCaption && !button && !label && state === "active") ||
                  (description && !bottomCaption && !button && !label && state === "focus-tag") ||
                  (description && !bottomCaption && !button && !label && state === "disable") ||
                  (icon && !button && !description && !label && size === "big") ||
                  (label && !button && !description && !icon && state === "error") ||
                  (bottomCaption && description && icon && label && topRightCaption && !button && state === "focus") ||
                  (bottomCaption && description && icon && label && topRightCaption && !button && state === "hover") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    label &&
                    topRightCaption &&
                    !button &&
                    state === "default") ||
                  (bottomCaption && label && !button && !description && !icon && state === "disable") ||
                  (description && icon && !bottomCaption && !button && !label && state === "error") ||
                  (description && label && !bottomCaption && !button && !icon && state === "active") ||
                  (description && label && !bottomCaption && !button && !icon && state === "focus-tag") ||
                  (description && label && !bottomCaption && !button && !icon && state === "disable") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "focus") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "hover") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "default") ||
                  (label && topRightCaption && !button && !description && !icon && state === "focus-tag") ||
                  (!button && !icon && !label && size === "base" && state === "error") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "active") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "focus-tag") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "disable") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "error") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "active") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "focus-tag") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "disable") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "error") ||
                  (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "focus") ||
                  (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "hover") ||
                  (bottomCaption &&
                    description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "focus") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "hover") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "default") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "focus") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "hover") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "default") ||
                  (icon && !bottomCaption && !button && !description && !label && size === "base") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    state === "active") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "focus") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "hover") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "default") ||
                  (description &&
                    label &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    state === "error") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "active") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "focus-tag") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "disable") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "active") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "focus-tag") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "disable") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "error") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (label &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    state === "disable") ||
                  (!button && !description && !icon && !topRightCaption && size === "big" && state === "focus-tag") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "default") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "disable") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "error") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "active") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "error") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "big" &&
                    state === "active") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "error") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "active") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus-tag") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "default") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "active") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus-tag") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "disable") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "disable") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "active") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus-tag") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "disable") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "hover") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "default") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "disable") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "active") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "error")
                    ? "0.28px"
                    : undefined,
                lineHeight:
                  (button && icon) ||
                  (icon && label && !button && !description) ||
                  (bottomCaption && button && label && !description && !icon) ||
                  (bottomCaption && description && label && !icon && state === "active") ||
                  (bottomCaption && description && label && !icon && state === "focus-tag") ||
                  (bottomCaption && description && label && !icon && state === "disable") ||
                  (bottomCaption && description && label && !icon && state === "error") ||
                  (description && icon && label && !button && state === "active") ||
                  (description && icon && label && !button && state === "focus-tag") ||
                  (description && icon && label && !button && state === "disable") ||
                  (description && icon && label && !button && state === "error") ||
                  (bottomCaption && button && !icon && !label && size === "base") ||
                  (bottomCaption && icon && !button && !label && size === "base") ||
                  (button && description && !bottomCaption && !icon && state === "active") ||
                  (button && description && !bottomCaption && !icon && state === "focus-tag") ||
                  (button && description && !bottomCaption && !icon && state === "disable") ||
                  (button && description && !bottomCaption && !icon && state === "error") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "focus") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "hover") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "default") ||
                  (button && !bottomCaption && !description && !icon && size === "base") ||
                  (description && !bottomCaption && !button && !label && state === "active") ||
                  (description && !bottomCaption && !button && !label && state === "focus-tag") ||
                  (description && !bottomCaption && !button && !label && state === "disable") ||
                  (icon && !button && !description && !label && size === "big") ||
                  (label && !button && !description && !icon && state === "error") ||
                  (bottomCaption && description && icon && label && topRightCaption && !button && state === "focus") ||
                  (bottomCaption && description && icon && label && topRightCaption && !button && state === "hover") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    label &&
                    topRightCaption &&
                    !button &&
                    state === "default") ||
                  (bottomCaption && label && !button && !description && !icon && state === "disable") ||
                  (description && icon && !bottomCaption && !button && !label && state === "error") ||
                  (description && label && !bottomCaption && !button && !icon && state === "active") ||
                  (description && label && !bottomCaption && !button && !icon && state === "focus-tag") ||
                  (description && label && !bottomCaption && !button && !icon && state === "disable") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "focus") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "hover") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "default") ||
                  (label && topRightCaption && !button && !description && !icon && state === "focus-tag") ||
                  (!button && !icon && !label && size === "base" && state === "error") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "active") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "focus-tag") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "disable") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "error") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "active") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "focus-tag") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "disable") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "error") ||
                  (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "focus") ||
                  (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "hover") ||
                  (bottomCaption &&
                    description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "focus") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "hover") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "default") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "focus") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "hover") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "default") ||
                  (icon && !bottomCaption && !button && !description && !label && size === "base") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    state === "active") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "focus") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "hover") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "default") ||
                  (description &&
                    label &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    state === "error") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "active") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "focus-tag") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "disable") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "active") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "focus-tag") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "disable") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "error") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (label &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    state === "disable") ||
                  (!button && !description && !icon && !topRightCaption && size === "big" && state === "focus-tag") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "default") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "disable") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "error") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "active") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "error") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "big" &&
                    state === "active") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "error") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "active") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus-tag") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "default") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "active") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus-tag") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "disable") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "disable") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "active") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus-tag") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "disable") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "hover") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "default") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "disable") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "active") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "error")
                    ? "23.1px"
                    : undefined,
                marginTop:
                  (button && icon) ||
                  (icon && label && !button && !description) ||
                  (bottomCaption && button && label && !description && !icon) ||
                  (bottomCaption && description && label && !icon && state === "active") ||
                  (bottomCaption && description && label && !icon && state === "focus-tag") ||
                  (bottomCaption && description && label && !icon && state === "disable") ||
                  (bottomCaption && description && label && !icon && state === "error") ||
                  (description && icon && label && !button && state === "active") ||
                  (description && icon && label && !button && state === "focus-tag") ||
                  (description && icon && label && !button && state === "disable") ||
                  (description && icon && label && !button && state === "error") ||
                  (bottomCaption && button && !icon && !label && size === "base") ||
                  (bottomCaption && icon && !button && !label && size === "base") ||
                  (button && description && !bottomCaption && !icon && state === "active") ||
                  (button && description && !bottomCaption && !icon && state === "focus-tag") ||
                  (button && description && !bottomCaption && !icon && state === "disable") ||
                  (button && description && !bottomCaption && !icon && state === "error") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "focus") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "hover") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "default") ||
                  (button && !bottomCaption && !description && !icon && size === "base") ||
                  (description && !bottomCaption && !button && !label && state === "active") ||
                  (description && !bottomCaption && !button && !label && state === "focus-tag") ||
                  (description && !bottomCaption && !button && !label && state === "disable") ||
                  (icon && !button && !description && !label && size === "big") ||
                  (label && !button && !description && !icon && state === "error") ||
                  (bottomCaption && description && icon && label && topRightCaption && !button && state === "focus") ||
                  (bottomCaption && description && icon && label && topRightCaption && !button && state === "hover") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    label &&
                    topRightCaption &&
                    !button &&
                    state === "default") ||
                  (bottomCaption && label && !button && !description && !icon && state === "disable") ||
                  (description && icon && !bottomCaption && !button && !label && state === "error") ||
                  (description && label && !bottomCaption && !button && !icon && state === "active") ||
                  (description && label && !bottomCaption && !button && !icon && state === "focus-tag") ||
                  (description && label && !bottomCaption && !button && !icon && state === "disable") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "focus") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "hover") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "default") ||
                  (label && topRightCaption && !button && !description && !icon && state === "focus-tag") ||
                  (!button && !icon && !label && size === "base" && state === "error") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "active") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "focus-tag") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "disable") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "error") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "active") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "focus-tag") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "disable") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "error") ||
                  (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "focus") ||
                  (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "hover") ||
                  (bottomCaption &&
                    description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "focus") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "hover") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "default") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "focus") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "hover") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "default") ||
                  (icon && !bottomCaption && !button && !description && !label && size === "base") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    state === "active") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "focus") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "hover") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "default") ||
                  (description &&
                    label &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    state === "error") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "active") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "focus-tag") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "disable") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "active") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "focus-tag") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "disable") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "error") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (label &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    state === "disable") ||
                  (!button && !description && !icon && !topRightCaption && size === "big" && state === "focus-tag") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "default") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "disable") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "error") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "active") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "error") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "big" &&
                    state === "active") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "error") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "active") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus-tag") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "default") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "active") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus-tag") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "disable") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "disable") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "active") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus-tag") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "disable") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "hover") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "default") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "disable") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "active") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "error")
                    ? "-1.00px"
                    : undefined,
                overflow:
                  !label &&
                  state === "focus" &&
                  !icon &&
                  description &&
                  !button &&
                  !topRightCaption &&
                  size === "base" &&
                  bottomCaption
                    ? "hidden"
                    : undefined,
                padding:
                  (description &&
                    bottomCaption &&
                    !label &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (description &&
                    bottomCaption &&
                    !label &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    bottomCaption &&
                    !label &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base")
                    ? "10px"
                    : undefined,
                whiteSpace:
                  (button && icon) ||
                  (icon && label && !button && !description) ||
                  (bottomCaption && button && label && !description && !icon) ||
                  (bottomCaption && description && label && !icon && state === "active") ||
                  (bottomCaption && description && label && !icon && state === "focus-tag") ||
                  (bottomCaption && description && label && !icon && state === "disable") ||
                  (bottomCaption && description && label && !icon && state === "error") ||
                  (description && icon && label && !button && state === "active") ||
                  (description && icon && label && !button && state === "focus-tag") ||
                  (description && icon && label && !button && state === "disable") ||
                  (description && icon && label && !button && state === "error") ||
                  (bottomCaption && button && !icon && !label && size === "base") ||
                  (bottomCaption && icon && !button && !label && size === "base") ||
                  (button && description && !bottomCaption && !icon && state === "active") ||
                  (button && description && !bottomCaption && !icon && state === "focus-tag") ||
                  (button && description && !bottomCaption && !icon && state === "disable") ||
                  (button && description && !bottomCaption && !icon && state === "error") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "focus") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "hover") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "default") ||
                  (button && !bottomCaption && !description && !icon && size === "base") ||
                  (description && !bottomCaption && !button && !label && state === "active") ||
                  (description && !bottomCaption && !button && !label && state === "focus-tag") ||
                  (description && !bottomCaption && !button && !label && state === "disable") ||
                  (icon && !button && !description && !label && size === "big") ||
                  (label && !button && !description && !icon && state === "error") ||
                  (bottomCaption && description && icon && label && topRightCaption && !button && state === "focus") ||
                  (bottomCaption && description && icon && label && topRightCaption && !button && state === "hover") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    label &&
                    topRightCaption &&
                    !button &&
                    state === "default") ||
                  (bottomCaption && label && !button && !description && !icon && state === "disable") ||
                  (description && icon && !bottomCaption && !button && !label && state === "error") ||
                  (description && label && !bottomCaption && !button && !icon && state === "active") ||
                  (description && label && !bottomCaption && !button && !icon && state === "focus-tag") ||
                  (description && label && !bottomCaption && !button && !icon && state === "disable") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "focus") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "hover") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "default") ||
                  (label && topRightCaption && !button && !description && !icon && state === "focus-tag") ||
                  (!button && !icon && !label && size === "base" && state === "error") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "active") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "focus-tag") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "disable") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "error") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "active") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "focus-tag") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "disable") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "error") ||
                  (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "focus") ||
                  (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "hover") ||
                  (bottomCaption &&
                    description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "focus") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "hover") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "default") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "focus") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "hover") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "default") ||
                  (icon && !bottomCaption && !button && !description && !label && size === "base") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    state === "active") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "focus") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "hover") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "default") ||
                  (description &&
                    label &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    state === "error") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "active") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "focus-tag") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "disable") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "active") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "focus-tag") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "disable") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "error") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (label &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    state === "disable") ||
                  (!button && !description && !icon && !topRightCaption && size === "big" && state === "focus-tag") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "default") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "disable") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "error") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "active") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "error") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "big" &&
                    state === "active") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "error") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "active") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus-tag") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "default") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "active") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus-tag") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "disable") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "disable") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "active") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus-tag") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "disable") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "hover") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "default") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "disable") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "active") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "error")
                    ? "nowrap"
                    : undefined,
                width:
                  (button && icon) ||
                  (icon && label && !button && !description) ||
                  (bottomCaption && button && label && !description && !icon) ||
                  (bottomCaption && description && label && !icon && state === "active") ||
                  (bottomCaption && description && label && !icon && state === "focus-tag") ||
                  (bottomCaption && description && label && !icon && state === "disable") ||
                  (bottomCaption && description && label && !icon && state === "error") ||
                  (description && icon && label && !button && state === "active") ||
                  (description && icon && label && !button && state === "focus-tag") ||
                  (description && icon && label && !button && state === "disable") ||
                  (description && icon && label && !button && state === "error") ||
                  (bottomCaption && button && !icon && !label && size === "base") ||
                  (bottomCaption && icon && !button && !label && size === "base") ||
                  (button && description && !bottomCaption && !icon && state === "active") ||
                  (button && description && !bottomCaption && !icon && state === "focus-tag") ||
                  (button && description && !bottomCaption && !icon && state === "disable") ||
                  (button && description && !bottomCaption && !icon && state === "error") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "focus") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "hover") ||
                  (bottomCaption && description && label && topRightCaption && !icon && state === "default") ||
                  (button && !bottomCaption && !description && !icon && size === "base") ||
                  (description && !bottomCaption && !button && !label && state === "active") ||
                  (description && !bottomCaption && !button && !label && state === "focus-tag") ||
                  (description && !bottomCaption && !button && !label && state === "disable") ||
                  (icon && !button && !description && !label && size === "big") ||
                  (label && !button && !description && !icon && state === "error") ||
                  (bottomCaption && description && icon && label && topRightCaption && !button && state === "focus") ||
                  (bottomCaption && description && icon && label && topRightCaption && !button && state === "hover") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    label &&
                    topRightCaption &&
                    !button &&
                    state === "default") ||
                  (bottomCaption && label && !button && !description && !icon && state === "disable") ||
                  (description && icon && !bottomCaption && !button && !label && state === "error") ||
                  (description && label && !bottomCaption && !button && !icon && state === "active") ||
                  (description && label && !bottomCaption && !button && !icon && state === "focus-tag") ||
                  (description && label && !bottomCaption && !button && !icon && state === "disable") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "focus") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "hover") ||
                  (description && topRightCaption && !bottomCaption && !icon && !label && state === "default") ||
                  (label && topRightCaption && !button && !description && !icon && state === "focus-tag") ||
                  (!button && !icon && !label && size === "base" && state === "error") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "active") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "focus-tag") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "disable") ||
                  (bottomCaption && button && !icon && !label && size === "big" && state === "error") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "active") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "focus-tag") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "disable") ||
                  (bottomCaption && description && !button && !label && size === "big" && state === "error") ||
                  (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "focus") ||
                  (bottomCaption && description && !icon && !topRightCaption && size === "big" && state === "hover") ||
                  (bottomCaption &&
                    description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "focus") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "hover") ||
                  (button && label && !bottomCaption && !icon && size === "big" && state === "default") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "focus") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "hover") ||
                  (description && label && !bottomCaption && !button && size === "big" && state === "default") ||
                  (icon && !bottomCaption && !button && !description && !label && size === "base") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    state === "active") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "focus") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "hover") ||
                  (description &&
                    icon &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    state === "default") ||
                  (description &&
                    label &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    state === "error") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "active") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "focus-tag") ||
                  (bottomCaption && !button && !icon && !label && size === "base" && state === "disable") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "active") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "focus-tag") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "disable") ||
                  (button && !bottomCaption && !description && !icon && size === "big" && state === "error") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    button &&
                    topRightCaption &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    description &&
                    icon &&
                    !button &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (label &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    state === "disable") ||
                  (!button && !description && !icon && !topRightCaption && size === "big" && state === "focus-tag") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "default") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "disable") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "error") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "active") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (button &&
                    !bottomCaption &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "error") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (description &&
                    !bottomCaption &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "big" &&
                    state === "active") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "error") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "active") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus-tag") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    label &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "default") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "active") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus-tag") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "disable") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "disable") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (button &&
                    topRightCaption &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "active") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus-tag") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "disable") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "hover") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "default") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "disable") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "active") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "error")
                    ? "fit-content"
                    : undefined,
              }}
            >
              <React.Fragment>
                {(state === "disable" ||
                  (topRightCaption && state === "error") ||
                  (topRightCaption && state === "focus-tag") ||
                  (size === "big" && state === "active") ||
                  (icon && size === "base" && state === "active") ||
                  (icon && size === "big" && state === "focus") ||
                  (icon && size === "big" && state === "hover") ||
                  (icon && size === "big" && state === "default") ||
                  (!topRightCaption && size === "big" && state === "error") ||
                  (!topRightCaption && size === "big" && state === "focus-tag") ||
                  (description && !icon && size === "base" && state === "active") ||
                  (description && !icon && size === "big" && state === "focus") ||
                  (description && !icon && size === "big" && state === "hover") ||
                  (description && !icon && size === "big" && state === "default") ||
                  (icon && !topRightCaption && size === "base" && state === "error") ||
                  (icon && !topRightCaption && size === "base" && state === "focus-tag") ||
                  (button && icon && label && size === "base" && state === "focus") ||
                  (button && icon && label && size === "base" && state === "hover") ||
                  (button && icon && label && size === "base" && state === "default") ||
                  (button && topRightCaption && !description && !icon && state === "focus") ||
                  (button && topRightCaption && !description && !icon && state === "hover") ||
                  (button && topRightCaption && !description && !icon && state === "default") ||
                  (icon && topRightCaption && !label && size === "base" && state === "focus") ||
                  (icon && topRightCaption && !label && size === "base" && state === "hover") ||
                  (icon && topRightCaption && !label && size === "base" && state === "default") ||
                  (button && !description && !icon && size === "base" && state === "active") ||
                  (description && !icon && !topRightCaption && size === "base" && state === "focus-tag") ||
                  (button && label && !description && !icon && !topRightCaption && state === "focus") ||
                  (button && label && !description && !icon && !topRightCaption && state === "hover") ||
                  (button && label && !description && !icon && !topRightCaption && state === "default") ||
                  (!icon && !label && !topRightCaption && size === "base" && state === "error") ||
                  (button && icon && !label && !topRightCaption && size === "base" && state === "focus") ||
                  (button && icon && !label && !topRightCaption && size === "base" && state === "hover") ||
                  (button && icon && !label && !topRightCaption && size === "base" && state === "default") ||
                  (button && label && !icon && !topRightCaption && size === "base" && state === "error") ||
                  (description && topRightCaption && !icon && !label && size === "base" && state === "focus") ||
                  (description && topRightCaption && !icon && !label && size === "base" && state === "hover") ||
                  (description && topRightCaption && !icon && !label && size === "base" && state === "default") ||
                  (bottomCaption &&
                    description &&
                    label &&
                    topRightCaption &&
                    !icon &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    description &&
                    label &&
                    topRightCaption &&
                    !icon &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    description &&
                    label &&
                    topRightCaption &&
                    !icon &&
                    size === "base" &&
                    state === "default") ||
                  (bottomCaption &&
                    icon &&
                    label &&
                    topRightCaption &&
                    !button &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    icon &&
                    label &&
                    topRightCaption &&
                    !button &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    icon &&
                    label &&
                    topRightCaption &&
                    !button &&
                    size === "base" &&
                    state === "default") ||
                  (button && !description && !icon && !topRightCaption && size === "base" && state === "focus-tag") ||
                  (bottomCaption &&
                    button &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    button &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    button &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (bottomCaption &&
                    icon &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    icon &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    icon &&
                    !button &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (bottomCaption &&
                    label &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "error") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "focus") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "hover") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "default") ||
                  (bottomCaption &&
                    topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    size === "base" &&
                    state === "active") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    state === "focus") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    state === "hover") ||
                  (bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    state === "default") ||
                  (icon &&
                    label &&
                    !button &&
                    !description &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (icon &&
                    label &&
                    !button &&
                    !description &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (icon &&
                    label &&
                    !button &&
                    !description &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "focus") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "hover") ||
                  (topRightCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "big" &&
                    state === "default") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (button &&
                    description &&
                    label &&
                    !bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (description &&
                    icon &&
                    label &&
                    !bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (icon &&
                    label &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    size === "base" &&
                    state === "focus") ||
                  (icon &&
                    label &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    size === "base" &&
                    state === "hover") ||
                  (icon &&
                    label &&
                    topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    size === "base" &&
                    state === "default") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "focus") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "hover") ||
                  (!bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "big" &&
                    state === "default") ||
                  (!button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "active") ||
                  (!button &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus-tag") ||
                  (button &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (button &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (button &&
                    !bottomCaption &&
                    !description &&
                    !icon &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (icon &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus") ||
                  (icon &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "hover") ||
                  (icon &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !label &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "default") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "error") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "active") ||
                  (label &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !topRightCaption &&
                    size === "base" &&
                    state === "focus-tag") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "focus") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "hover") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "default") ||
                  (topRightCaption &&
                    !bottomCaption &&
                    !button &&
                    !description &&
                    !icon &&
                    !label &&
                    size === "base" &&
                    state === "active")) && <React.Fragment>{text}</React.Fragment>}

                {((label &&
                  description &&
                  topRightCaption &&
                  !icon &&
                  !bottomCaption &&
                  state === "default" &&
                  size === "base") ||
                  (label &&
                    description &&
                    topRightCaption &&
                    !icon &&
                    !bottomCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (label &&
                    description &&
                    topRightCaption &&
                    !icon &&
                    !bottomCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !bottomCaption &&
                    state === "default") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !bottomCaption &&
                    state === "hover") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !bottomCaption &&
                    state === "focus") ||
                  (label &&
                    icon &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !bottomCaption &&
                    state === "default" &&
                    size === "base") ||
                  (label &&
                    icon &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !bottomCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (label &&
                    icon &&
                    description &&
                    topRightCaption &&
                    !button &&
                    !bottomCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !bottomCaption &&
                    state === "active" &&
                    size === "base")) && (
                  <React.Fragment>
                    <div
                      style={{
                        color:
                          (description || !icon) &&
                          (description || !button) &&
                          (!icon || !button) &&
                          (!description || size === "base") &&
                          (!description || state === "default" || state === "hover" || state === "focus") &&
                          (state === "default" || state === "hover" || state === "focus" || state === "active") &&
                          (state === "default" || state === "hover" || state === "focus" || size === "base")
                            ? "#1c2126"
                            : undefined,
                        fontFamily:
                          (description || !icon) &&
                          (description || !button) &&
                          (!icon || !button) &&
                          (!description || size === "base") &&
                          (!description || state === "default" || state === "hover" || state === "focus") &&
                          (state === "default" || state === "hover" || state === "focus" || state === "active") &&
                          (state === "default" || state === "hover" || state === "focus" || size === "base")
                            ? "'Acid Grotesk TP-Bold', Helvetica"
                            : undefined,
                        fontSize:
                          (description || !icon) &&
                          (description || !button) &&
                          (!icon || !button) &&
                          (!description || size === "base") &&
                          (!description || state === "default" || state === "hover" || state === "focus") &&
                          (state === "default" || state === "hover" || state === "focus" || state === "active") &&
                          (state === "default" || state === "hover" || state === "focus" || size === "base")
                            ? "14px"
                            : undefined,
                        fontWeight:
                          (description || !icon) &&
                          (description || !button) &&
                          (!icon || !button) &&
                          (!description || size === "base") &&
                          (!description || state === "default" || state === "hover" || state === "focus") &&
                          (state === "default" || state === "hover" || state === "focus" || state === "active") &&
                          (state === "default" || state === "hover" || state === "focus" || size === "base")
                            ? "700"
                            : undefined,
                        letterSpacing:
                          (description || !icon) &&
                          (description || !button) &&
                          (!icon || !button) &&
                          (!description || size === "base") &&
                          (!description || state === "default" || state === "hover" || state === "focus") &&
                          (state === "default" || state === "hover" || state === "focus" || state === "active") &&
                          (state === "default" || state === "hover" || state === "focus" || size === "base")
                            ? "0.28px"
                            : undefined,
                        lineHeight:
                          (description || !icon) &&
                          (description || !button) &&
                          (!icon || !button) &&
                          (!description || size === "base") &&
                          (!description || state === "default" || state === "hover" || state === "focus") &&
                          (state === "default" || state === "hover" || state === "focus" || state === "active") &&
                          (state === "default" || state === "hover" || state === "focus" || size === "base")
                            ? "23.1px"
                            : undefined,
                        marginTop:
                          (description || !icon) &&
                          (description || !button) &&
                          (!icon || !button) &&
                          (!description || size === "base") &&
                          (!description || state === "default" || state === "hover" || state === "focus") &&
                          (state === "default" || state === "hover" || state === "focus" || state === "active") &&
                          (state === "default" || state === "hover" || state === "focus" || size === "base")
                            ? "-1.00px"
                            : undefined,
                        whiteSpace:
                          (description || !icon) &&
                          (description || !button) &&
                          (!icon || !button) &&
                          (!description || size === "base") &&
                          (!description || state === "default" || state === "hover" || state === "focus") &&
                          (state === "default" || state === "hover" || state === "focus" || state === "active") &&
                          (state === "default" || state === "hover" || state === "focus" || size === "base")
                            ? "nowrap"
                            : undefined,
                        width:
                          (description || !icon) &&
                          (description || !button) &&
                          (!icon || !button) &&
                          (!description || size === "base") &&
                          (!description || state === "default" || state === "hover" || state === "focus") &&
                          (state === "default" || state === "hover" || state === "focus" || state === "active") &&
                          (state === "default" || state === "hover" || state === "focus" || size === "base")
                            ? "fit-content"
                            : undefined,
                      }}
                    >
                      <React.Fragment>
                        {(description || !icon) &&
                          (description || !button) &&
                          (!icon || !button) &&
                          (!description || size === "base") &&
                          (!description || state === "default" || state === "hover" || state === "focus") &&
                          (state === "active" || state === "default" || state === "hover" || state === "focus") &&
                          (state === "default" || state === "hover" || state === "focus" || size === "base") && (
                            <React.Fragment>{text}</React.Fragment>
                          )}
                      </React.Fragment>
                    </div>
                    <div
                      style={{
                        color:
                          (description || !icon) &&
                          (description || !button) &&
                          (!icon || !button) &&
                          (!description || size === "base") &&
                          (!description || state === "default" || state === "hover" || state === "focus") &&
                          (state === "default" || state === "hover" || state === "focus" || state === "active") &&
                          (state === "default" || state === "hover" || state === "focus" || size === "base")
                            ? "#697f8f"
                            : undefined,
                        flex:
                          (description || !icon) &&
                          (description || !button) &&
                          (!icon || !button) &&
                          (!description || size === "base") &&
                          (!description || state === "default" || state === "hover" || state === "focus") &&
                          (state === "default" || state === "hover" || state === "focus" || state === "active") &&
                          (state === "default" || state === "hover" || state === "focus" || size === "base")
                            ? "1"
                            : undefined,
                        fontFamily:
                          (description || !icon) &&
                          (description || !button) &&
                          (!icon || !button) &&
                          (!description || size === "base") &&
                          (!description || state === "default" || state === "hover" || state === "focus") &&
                          (state === "default" || state === "hover" || state === "focus" || state === "active") &&
                          (state === "default" || state === "hover" || state === "focus" || size === "base")
                            ? "'Acid Grotesk TP-Bold', Helvetica"
                            : undefined,
                        fontSize:
                          (description || !icon) &&
                          (description || !button) &&
                          (!icon || !button) &&
                          (!description || size === "base") &&
                          (!description || state === "default" || state === "hover" || state === "focus") &&
                          (state === "default" || state === "hover" || state === "focus" || state === "active") &&
                          (state === "default" || state === "hover" || state === "focus" || size === "base")
                            ? "12px"
                            : undefined,
                        fontWeight:
                          (description || !icon) &&
                          (description || !button) &&
                          (!icon || !button) &&
                          (!description || size === "base") &&
                          (!description || state === "default" || state === "hover" || state === "focus") &&
                          (state === "default" || state === "hover" || state === "focus" || state === "active") &&
                          (state === "default" || state === "hover" || state === "focus" || size === "base")
                            ? "700"
                            : undefined,
                        letterSpacing:
                          (description || !icon) &&
                          (description || !button) &&
                          (!icon || !button) &&
                          (!description || size === "base") &&
                          (!description || state === "default" || state === "hover" || state === "focus") &&
                          (state === "default" || state === "hover" || state === "focus" || state === "active") &&
                          (state === "default" || state === "hover" || state === "focus" || size === "base")
                            ? "0.24px"
                            : undefined,
                        lineHeight:
                          (description || !icon) &&
                          (description || !button) &&
                          (!icon || !button) &&
                          (!description || size === "base") &&
                          (!description || state === "default" || state === "hover" || state === "focus") &&
                          (state === "default" || state === "hover" || state === "focus" || state === "active") &&
                          (state === "default" || state === "hover" || state === "focus" || size === "base")
                            ? "19.8px"
                            : undefined,
                        textAlign:
                          (description || !icon) &&
                          (description || !button) &&
                          (!icon || !button) &&
                          (!description || size === "base") &&
                          (!description || state === "default" || state === "hover" || state === "focus") &&
                          (state === "default" || state === "hover" || state === "focus" || state === "active") &&
                          (state === "default" || state === "hover" || state === "focus" || size === "base")
                            ? "right"
                            : undefined,
                        whiteSpace:
                          (description || !icon) &&
                          (description || !button) &&
                          (!icon || !button) &&
                          (!description || size === "base") &&
                          (!description || state === "default" || state === "hover" || state === "focus") &&
                          (state === "default" || state === "hover" || state === "focus" || state === "active") &&
                          (state === "default" || state === "hover" || state === "focus" || size === "base")
                            ? "nowrap"
                            : undefined,
                      }}
                    >
                      <React.Fragment>
                        {(description || !icon) &&
                          (description || !button) &&
                          (!icon || !button) &&
                          (!description || size === "base") &&
                          (!description || state === "default" || state === "hover" || state === "focus") &&
                          (state === "active" || state === "default" || state === "hover" || state === "focus") &&
                          (state === "default" || state === "hover" || state === "focus" || size === "base") && (
                            <React.Fragment>Top right caption</React.Fragment>
                          )}
                      </React.Fragment>
                    </div>
                  </React.Fragment>
                )}

                {((description &&
                  bottomCaption &&
                  !label &&
                  !icon &&
                  !button &&
                  !topRightCaption &&
                  state === "hover" &&
                  size === "base") ||
                  (description &&
                    bottomCaption &&
                    !label &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    bottomCaption &&
                    !label &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base")) && (
                  <React.Fragment>
                    <div
                      className={"input-fields-light-text"}
                      style={{
                        alignItems: state === "focus" ? "flex-start" : undefined,
                        color: state === "hover" || state === "default" ? "#697f8f" : undefined,
                        display: state === "focus" ? "flex" : undefined,
                        fontFamily:
                          state === "hover"
                            ? "'Acid Grotesk TP-Normal', Helvetica"
                            : state === "default"
                            ? "'Plus Jakarta Sans', Helvetica"
                            : undefined,
                        fontSize: state === "hover" || state === "default" ? "14px" : undefined,
                        fontWeight: state === "hover" || state === "default" ? "400" : undefined,
                        gap: state === "focus" ? "1px" : undefined,
                        letterSpacing: state === "hover" || state === "default" ? "0.28px" : undefined,
                        lineHeight: state === "hover" || state === "default" ? "20px" : undefined,
                        marginTop: state === "hover" || state === "default" ? "-1.00px" : undefined,
                        whiteSpace: state === "hover" || state === "default" ? "nowrap" : undefined,
                      }}
                    >
                      <React.Fragment>
                        {(state === "hover" || state === "default") && <React.Fragment>Text</React.Fragment>}

                        {state === "focus" && (
                          <React.Fragment>
                            <div className={"input-fields-light-text-wrapper"}>Text</div>
                            <div className={"input-fields-light-rectangle"} />
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    </div>
                  </React.Fragment>
                )}
              </React.Fragment>
            </div>
            <div
              style={{
                ...{
                  alignItems:
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      state === "focus" &&
                      size === "big") ||
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      !topRightCaption &&
                      state === "active" &&
                      size === "base") ||
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      !topRightCaption &&
                      state === "disable" &&
                      size === "base")
                      ? "flex-start"
                      : (label &&
                          !icon &&
                          !description &&
                          !button &&
                          !topRightCaption &&
                          !bottomCaption &&
                          state === "focus" &&
                          size === "base") ||
                        (label &&
                          !icon &&
                          !description &&
                          !button &&
                          !topRightCaption &&
                          !bottomCaption &&
                          state === "focus-tag" &&
                          size === "base")
                      ? "center"
                      : undefined,
                  alignSelf:
                    (button && icon) ||
                    (icon && label && !button && !description) ||
                    (bottomCaption && button && label && !description && !icon) ||
                    (bottomCaption && description && label && !icon && state === "active") ||
                    (bottomCaption && description && label && !icon && state === "focus-tag") ||
                    (bottomCaption && description && label && !icon && state === "disable") ||
                    (bottomCaption && description && label && !icon && state === "error") ||
                    (description && icon && label && !button && state === "active") ||
                    (description && icon && label && !button && state === "focus-tag") ||
                    (description && icon && label && !button && state === "disable") ||
                    (description && icon && label && !button && state === "error") ||
                    (bottomCaption && button && !icon && !label && size === "base") ||
                    (bottomCaption && icon && !button && !label && size === "base") ||
                    (button && description && !bottomCaption && !icon && state === "active") ||
                    (button && description && !bottomCaption && !icon && state === "focus-tag") ||
                    (button && description && !bottomCaption && !icon && state === "disable") ||
                    (button && description && !bottomCaption && !icon && state === "error") ||
                    (bottomCaption && description && label && topRightCaption && !icon && state === "focus") ||
                    (bottomCaption && description && label && topRightCaption && !icon && state === "hover") ||
                    (bottomCaption && description && label && topRightCaption && !icon && state === "default") ||
                    (button && !bottomCaption && !description && !icon && size === "base") ||
                    (description && !bottomCaption && !button && !label && state === "active") ||
                    (description && !bottomCaption && !button && !label && state === "focus-tag") ||
                    (description && !bottomCaption && !button && !label && state === "disable") ||
                    (icon && !button && !description && !label && size === "big") ||
                    (label && !bottomCaption && !button && !icon && state === "active") ||
                    (label && !button && !description && !icon && state === "error") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      label &&
                      topRightCaption &&
                      !button &&
                      state === "focus") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      label &&
                      topRightCaption &&
                      !button &&
                      state === "hover") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      label &&
                      topRightCaption &&
                      !button &&
                      state === "default") ||
                    (bottomCaption && label && !button && !description && !icon && state === "disable") ||
                    (description && icon && !bottomCaption && !button && !label && state === "error") ||
                    (description && label && !bottomCaption && !button && !icon && state === "focus-tag") ||
                    (description && label && !bottomCaption && !button && !icon && state === "disable") ||
                    (description && topRightCaption && !bottomCaption && !icon && !label && state === "focus") ||
                    (description && topRightCaption && !bottomCaption && !icon && !label && state === "hover") ||
                    (description && topRightCaption && !bottomCaption && !icon && !label && state === "default") ||
                    (label && topRightCaption && !button && !description && !icon && state === "focus-tag") ||
                    (!button && !icon && !label && size === "base" && state === "error") ||
                    (bottomCaption && button && !icon && !label && size === "big" && state === "active") ||
                    (bottomCaption && button && !icon && !label && size === "big" && state === "focus-tag") ||
                    (bottomCaption && button && !icon && !label && size === "big" && state === "disable") ||
                    (bottomCaption && button && !icon && !label && size === "big" && state === "error") ||
                    (bottomCaption && description && !button && !label && size === "big" && state === "active") ||
                    (bottomCaption && description && !button && !label && size === "big" && state === "focus-tag") ||
                    (bottomCaption && description && !button && !label && size === "big" && state === "disable") ||
                    (bottomCaption && description && !button && !label && size === "big" && state === "error") ||
                    (bottomCaption &&
                      description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (button && label && !bottomCaption && !icon && size === "big" && state === "focus") ||
                    (button && label && !bottomCaption && !icon && size === "big" && state === "hover") ||
                    (button && label && !bottomCaption && !icon && size === "big" && state === "default") ||
                    (description && label && !bottomCaption && !button && size === "big" && state === "focus") ||
                    (description && label && !bottomCaption && !button && size === "big" && state === "hover") ||
                    (description && label && !bottomCaption && !button && size === "big" && state === "default") ||
                    (icon && !bottomCaption && !button && !description && !label && size === "base") ||
                    (bottomCaption &&
                      label &&
                      topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      state === "active") ||
                    (description &&
                      icon &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      state === "focus") ||
                    (description &&
                      icon &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      state === "hover") ||
                    (description &&
                      icon &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      state === "default") ||
                    (description &&
                      label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      state === "error") ||
                    (bottomCaption && !button && !icon && !label && size === "base" && state === "active") ||
                    (bottomCaption && !button && !icon && !label && size === "base" && state === "focus") ||
                    (bottomCaption && !button && !icon && !label && size === "base" && state === "hover") ||
                    (bottomCaption && !button && !icon && !label && size === "base" && state === "default") ||
                    (bottomCaption && !button && !icon && !label && size === "base" && state === "focus-tag") ||
                    (bottomCaption && !button && !icon && !label && size === "base" && state === "disable") ||
                    (button && !bottomCaption && !description && !icon && size === "big" && state === "active") ||
                    (button && !bottomCaption && !description && !icon && size === "big" && state === "focus-tag") ||
                    (button && !bottomCaption && !description && !icon && size === "big" && state === "disable") ||
                    (button && !bottomCaption && !description && !icon && size === "big" && state === "error") ||
                    (bottomCaption &&
                      button &&
                      topRightCaption &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      button &&
                      topRightCaption &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      button &&
                      topRightCaption &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "default") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      !button &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      !button &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      !button &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (bottomCaption &&
                      description &&
                      topRightCaption &&
                      !button &&
                      !label &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      description &&
                      topRightCaption &&
                      !button &&
                      !label &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      description &&
                      topRightCaption &&
                      !button &&
                      !label &&
                      size === "big" &&
                      state === "default") ||
                    (button &&
                      description &&
                      label &&
                      !bottomCaption &&
                      !icon &&
                      size === "base" &&
                      state === "focus") ||
                    (button &&
                      description &&
                      label &&
                      !bottomCaption &&
                      !icon &&
                      size === "base" &&
                      state === "hover") ||
                    (button &&
                      description &&
                      label &&
                      !bottomCaption &&
                      !icon &&
                      size === "base" &&
                      state === "default") ||
                    (description &&
                      label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      size === "base" &&
                      state === "focus") ||
                    (description &&
                      label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      size === "base" &&
                      state === "hover") ||
                    (description &&
                      label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      size === "base" &&
                      state === "default") ||
                    (label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      state === "disable") ||
                    (!button && !description && !icon && !topRightCaption && size === "big" && state === "focus-tag") ||
                    (label &&
                      topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "base" &&
                      state === "focus") ||
                    (label &&
                      topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "base" &&
                      state === "hover") ||
                    (label &&
                      topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "base" &&
                      state === "default") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "disable") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "error") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "active") ||
                    (bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (button &&
                      !bottomCaption &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (button &&
                      !bottomCaption &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (button &&
                      !bottomCaption &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (description &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "error") ||
                    (description &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (description &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (description &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (label &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "focus") ||
                    (label &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "hover") ||
                    (label &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "default") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "error") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "active") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "focus") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "hover") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "default") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "focus-tag") ||
                    (description &&
                      icon &&
                      label &&
                      !bottomCaption &&
                      !button &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "focus") ||
                    (description &&
                      icon &&
                      label &&
                      !bottomCaption &&
                      !button &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "hover") ||
                    (description &&
                      icon &&
                      label &&
                      !bottomCaption &&
                      !button &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "default") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "active") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "focus-tag") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "disable") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "disable") ||
                    (button &&
                      topRightCaption &&
                      !bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "focus") ||
                    (button &&
                      topRightCaption &&
                      !bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "hover") ||
                    (button &&
                      topRightCaption &&
                      !bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "default") ||
                    (label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "big" &&
                      state === "focus") ||
                    (label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "big" &&
                      state === "hover") ||
                    (label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "big" &&
                      state === "default") ||
                    (label &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "focus-tag") ||
                    (label &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "disable") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "focus") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "hover") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "default") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "disable") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "active") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "error")
                      ? "stretch"
                      : undefined,
                  backgroundColor:
                    (label && !icon && !button && !bottomCaption && state === "focus" && size === "base") ||
                    (label &&
                      icon &&
                      description &&
                      !button &&
                      !bottomCaption &&
                      state === "focus" &&
                      size === "base") ||
                    (label &&
                      description &&
                      button &&
                      !icon &&
                      !bottomCaption &&
                      state === "focus" &&
                      size === "base") ||
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      state === "focus" &&
                      size === "big") ||
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      !topRightCaption &&
                      state === "focus-tag" &&
                      size === "base")
                      ? "#fafafb03"
                      : undefined,
                  border:
                    (button && icon) ||
                    (icon && label && !button && !description) ||
                    (bottomCaption && button && label && !description && !icon) ||
                    (bottomCaption && description && label && !icon && state === "active") ||
                    (bottomCaption && description && label && !icon && state === "focus-tag") ||
                    (bottomCaption && description && label && !icon && state === "disable") ||
                    (bottomCaption && description && label && !icon && state === "error") ||
                    (description && icon && label && !button && state === "active") ||
                    (description && icon && label && !button && state === "focus-tag") ||
                    (description && icon && label && !button && state === "disable") ||
                    (description && icon && label && !button && state === "error") ||
                    (bottomCaption && button && !icon && !label && size === "base") ||
                    (bottomCaption && icon && !button && !label && size === "base") ||
                    (button && description && !bottomCaption && !icon && state === "active") ||
                    (button && description && !bottomCaption && !icon && state === "focus-tag") ||
                    (button && description && !bottomCaption && !icon && state === "disable") ||
                    (button && description && !bottomCaption && !icon && state === "error") ||
                    (bottomCaption && description && label && topRightCaption && !icon && state === "focus") ||
                    (bottomCaption && description && label && topRightCaption && !icon && state === "hover") ||
                    (bottomCaption && description && label && topRightCaption && !icon && state === "default") ||
                    (button && !bottomCaption && !description && !icon && size === "base") ||
                    (description && !bottomCaption && !button && !label && state === "active") ||
                    (description && !bottomCaption && !button && !label && state === "focus-tag") ||
                    (description && !bottomCaption && !button && !label && state === "disable") ||
                    (icon && !button && !description && !label && size === "big") ||
                    (label && !bottomCaption && !button && !icon && state === "active") ||
                    (label && !button && !description && !icon && state === "error") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      label &&
                      topRightCaption &&
                      !button &&
                      state === "focus") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      label &&
                      topRightCaption &&
                      !button &&
                      state === "hover") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      label &&
                      topRightCaption &&
                      !button &&
                      state === "default") ||
                    (bottomCaption && label && !button && !description && !icon && state === "disable") ||
                    (description && icon && !bottomCaption && !button && !label && state === "error") ||
                    (description && label && !bottomCaption && !button && !icon && state === "focus-tag") ||
                    (description && label && !bottomCaption && !button && !icon && state === "disable") ||
                    (description && topRightCaption && !bottomCaption && !icon && !label && state === "focus") ||
                    (description && topRightCaption && !bottomCaption && !icon && !label && state === "hover") ||
                    (description && topRightCaption && !bottomCaption && !icon && !label && state === "default") ||
                    (label && topRightCaption && !button && !description && !icon && state === "focus-tag") ||
                    (!button && !icon && !label && size === "base" && state === "error") ||
                    (bottomCaption && button && !icon && !label && size === "big" && state === "active") ||
                    (bottomCaption && button && !icon && !label && size === "big" && state === "focus-tag") ||
                    (bottomCaption && button && !icon && !label && size === "big" && state === "disable") ||
                    (bottomCaption && button && !icon && !label && size === "big" && state === "error") ||
                    (bottomCaption && description && !button && !label && size === "big" && state === "active") ||
                    (bottomCaption && description && !button && !label && size === "big" && state === "focus-tag") ||
                    (bottomCaption && description && !button && !label && size === "big" && state === "disable") ||
                    (bottomCaption && description && !button && !label && size === "big" && state === "error") ||
                    (bottomCaption &&
                      description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (button && label && !bottomCaption && !icon && size === "big" && state === "focus") ||
                    (button && label && !bottomCaption && !icon && size === "big" && state === "hover") ||
                    (button && label && !bottomCaption && !icon && size === "big" && state === "default") ||
                    (description && label && !bottomCaption && !button && size === "big" && state === "focus") ||
                    (description && label && !bottomCaption && !button && size === "big" && state === "hover") ||
                    (description && label && !bottomCaption && !button && size === "big" && state === "default") ||
                    (icon && !bottomCaption && !button && !description && !label && size === "base") ||
                    (bottomCaption &&
                      label &&
                      topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      state === "active") ||
                    (description &&
                      icon &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      state === "focus") ||
                    (description &&
                      icon &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      state === "hover") ||
                    (description &&
                      icon &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      state === "default") ||
                    (description &&
                      label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      state === "error") ||
                    (bottomCaption && !button && !icon && !label && size === "base" && state === "active") ||
                    (bottomCaption && !button && !icon && !label && size === "base" && state === "focus-tag") ||
                    (bottomCaption && !button && !icon && !label && size === "base" && state === "disable") ||
                    (button && !bottomCaption && !description && !icon && size === "big" && state === "active") ||
                    (button && !bottomCaption && !description && !icon && size === "big" && state === "focus-tag") ||
                    (button && !bottomCaption && !description && !icon && size === "big" && state === "disable") ||
                    (button && !bottomCaption && !description && !icon && size === "big" && state === "error") ||
                    (bottomCaption &&
                      button &&
                      topRightCaption &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      button &&
                      topRightCaption &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      button &&
                      topRightCaption &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "default") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      !button &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      !button &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      !button &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (bottomCaption &&
                      description &&
                      topRightCaption &&
                      !button &&
                      !label &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      description &&
                      topRightCaption &&
                      !button &&
                      !label &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      description &&
                      topRightCaption &&
                      !button &&
                      !label &&
                      size === "big" &&
                      state === "default") ||
                    (button &&
                      description &&
                      label &&
                      !bottomCaption &&
                      !icon &&
                      size === "base" &&
                      state === "focus") ||
                    (button &&
                      description &&
                      label &&
                      !bottomCaption &&
                      !icon &&
                      size === "base" &&
                      state === "hover") ||
                    (button &&
                      description &&
                      label &&
                      !bottomCaption &&
                      !icon &&
                      size === "base" &&
                      state === "default") ||
                    (description &&
                      label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      size === "base" &&
                      state === "focus") ||
                    (description &&
                      label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      size === "base" &&
                      state === "hover") ||
                    (description &&
                      label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      size === "base" &&
                      state === "default") ||
                    (label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      state === "disable") ||
                    (!button && !description && !icon && !topRightCaption && size === "big" && state === "focus-tag") ||
                    (bottomCaption &&
                      topRightCaption &&
                      !button &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "focus") ||
                    (bottomCaption &&
                      topRightCaption &&
                      !button &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "hover") ||
                    (bottomCaption &&
                      topRightCaption &&
                      !button &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "default") ||
                    (label &&
                      topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "base" &&
                      state === "focus") ||
                    (label &&
                      topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "base" &&
                      state === "hover") ||
                    (label &&
                      topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "base" &&
                      state === "default") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "disable") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "error") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "active") ||
                    (bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (button &&
                      !bottomCaption &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (button &&
                      !bottomCaption &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (button &&
                      !bottomCaption &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (description &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "error") ||
                    (description &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (description &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (description &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (label &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "focus") ||
                    (label &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "hover") ||
                    (label &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "default") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "error") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "active") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "focus") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "hover") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "default") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "focus-tag") ||
                    (description &&
                      icon &&
                      label &&
                      !bottomCaption &&
                      !button &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "focus") ||
                    (description &&
                      icon &&
                      label &&
                      !bottomCaption &&
                      !button &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "hover") ||
                    (description &&
                      icon &&
                      label &&
                      !bottomCaption &&
                      !button &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "default") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "active") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "focus-tag") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "disable") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "disable") ||
                    (button &&
                      topRightCaption &&
                      !bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "focus") ||
                    (button &&
                      topRightCaption &&
                      !bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "hover") ||
                    (button &&
                      topRightCaption &&
                      !bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "default") ||
                    (label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "big" &&
                      state === "focus") ||
                    (label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "big" &&
                      state === "hover") ||
                    (label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "big" &&
                      state === "default") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "focus") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "hover") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "default") ||
                    (label &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "focus-tag") ||
                    (label &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "disable") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "focus") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "hover") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "default") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "disable") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "active") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "error")
                      ? "1px solid"
                      : undefined,
                  borderColor:
                    (button && icon) ||
                    (icon && label && !button && !description) ||
                    (bottomCaption && button && label && !description && !icon) ||
                    (bottomCaption && description && label && !icon && state === "active") ||
                    (bottomCaption && description && label && !icon && state === "focus-tag") ||
                    (bottomCaption && description && label && !icon && state === "disable") ||
                    (bottomCaption && description && label && !icon && state === "error") ||
                    (description && icon && label && !button && state === "active") ||
                    (description && icon && label && !button && state === "focus-tag") ||
                    (description && icon && label && !button && state === "disable") ||
                    (description && icon && label && !button && state === "error") ||
                    (bottomCaption && button && !icon && !label && size === "base") ||
                    (bottomCaption && icon && !button && !label && size === "base") ||
                    (button && description && !bottomCaption && !icon && state === "active") ||
                    (button && description && !bottomCaption && !icon && state === "focus-tag") ||
                    (button && description && !bottomCaption && !icon && state === "disable") ||
                    (button && description && !bottomCaption && !icon && state === "error") ||
                    (bottomCaption && description && label && topRightCaption && !icon && state === "focus") ||
                    (bottomCaption && description && label && topRightCaption && !icon && state === "hover") ||
                    (bottomCaption && description && label && topRightCaption && !icon && state === "default") ||
                    (button && !bottomCaption && !description && !icon && size === "base") ||
                    (description && !bottomCaption && !button && !label && state === "active") ||
                    (description && !bottomCaption && !button && !label && state === "focus-tag") ||
                    (description && !bottomCaption && !button && !label && state === "disable") ||
                    (icon && !button && !description && !label && size === "big") ||
                    (label && !bottomCaption && !button && !icon && state === "active") ||
                    (label && !button && !description && !icon && state === "error") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      label &&
                      topRightCaption &&
                      !button &&
                      state === "focus") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      label &&
                      topRightCaption &&
                      !button &&
                      state === "hover") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      label &&
                      topRightCaption &&
                      !button &&
                      state === "default") ||
                    (bottomCaption && label && !button && !description && !icon && state === "disable") ||
                    (description && icon && !bottomCaption && !button && !label && state === "error") ||
                    (description && label && !bottomCaption && !button && !icon && state === "focus-tag") ||
                    (description && label && !bottomCaption && !button && !icon && state === "disable") ||
                    (description && topRightCaption && !bottomCaption && !icon && !label && state === "focus") ||
                    (description && topRightCaption && !bottomCaption && !icon && !label && state === "hover") ||
                    (description && topRightCaption && !bottomCaption && !icon && !label && state === "default") ||
                    (label && topRightCaption && !button && !description && !icon && state === "focus-tag") ||
                    (!button && !icon && !label && size === "base" && state === "error") ||
                    (bottomCaption && button && !icon && !label && size === "big" && state === "active") ||
                    (bottomCaption && button && !icon && !label && size === "big" && state === "focus-tag") ||
                    (bottomCaption && button && !icon && !label && size === "big" && state === "disable") ||
                    (bottomCaption && button && !icon && !label && size === "big" && state === "error") ||
                    (bottomCaption && description && !button && !label && size === "big" && state === "active") ||
                    (bottomCaption && description && !button && !label && size === "big" && state === "focus-tag") ||
                    (bottomCaption && description && !button && !label && size === "big" && state === "disable") ||
                    (bottomCaption && description && !button && !label && size === "big" && state === "error") ||
                    (bottomCaption &&
                      description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (button && label && !bottomCaption && !icon && size === "big" && state === "focus") ||
                    (button && label && !bottomCaption && !icon && size === "big" && state === "hover") ||
                    (button && label && !bottomCaption && !icon && size === "big" && state === "default") ||
                    (description && label && !bottomCaption && !button && size === "big" && state === "focus") ||
                    (description && label && !bottomCaption && !button && size === "big" && state === "hover") ||
                    (description && label && !bottomCaption && !button && size === "big" && state === "default") ||
                    (icon && !bottomCaption && !button && !description && !label && size === "base") ||
                    (bottomCaption &&
                      label &&
                      topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      state === "active") ||
                    (description &&
                      icon &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      state === "focus") ||
                    (description &&
                      icon &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      state === "hover") ||
                    (description &&
                      icon &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      state === "default") ||
                    (description &&
                      label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      state === "error") ||
                    (bottomCaption && !button && !icon && !label && size === "base" && state === "active") ||
                    (bottomCaption && !button && !icon && !label && size === "base" && state === "focus-tag") ||
                    (bottomCaption && !button && !icon && !label && size === "base" && state === "disable") ||
                    (button && !bottomCaption && !description && !icon && size === "big" && state === "active") ||
                    (button && !bottomCaption && !description && !icon && size === "big" && state === "focus-tag") ||
                    (button && !bottomCaption && !description && !icon && size === "big" && state === "disable") ||
                    (button && !bottomCaption && !description && !icon && size === "big" && state === "error") ||
                    (bottomCaption &&
                      button &&
                      topRightCaption &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      button &&
                      topRightCaption &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      button &&
                      topRightCaption &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "default") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      !button &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      !button &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      !button &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (bottomCaption &&
                      description &&
                      topRightCaption &&
                      !button &&
                      !label &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      description &&
                      topRightCaption &&
                      !button &&
                      !label &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      description &&
                      topRightCaption &&
                      !button &&
                      !label &&
                      size === "big" &&
                      state === "default") ||
                    (button &&
                      description &&
                      label &&
                      !bottomCaption &&
                      !icon &&
                      size === "base" &&
                      state === "default") ||
                    (description &&
                      label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      size === "base" &&
                      state === "default") ||
                    (label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      state === "disable") ||
                    (!button && !description && !icon && !topRightCaption && size === "big" && state === "focus-tag") ||
                    (bottomCaption &&
                      topRightCaption &&
                      !button &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "focus") ||
                    (bottomCaption &&
                      topRightCaption &&
                      !button &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "hover") ||
                    (bottomCaption &&
                      topRightCaption &&
                      !button &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "default") ||
                    (label &&
                      topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "base" &&
                      state === "default") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "disable") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "error") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "active") ||
                    (bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (button &&
                      !bottomCaption &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (button &&
                      !bottomCaption &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (button &&
                      !bottomCaption &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (description &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "error") ||
                    (description &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (description &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (description &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (label &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "default") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "error") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "active") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "focus") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "hover") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "default") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "focus-tag") ||
                    (bottomCaption &&
                      label &&
                      topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "base" &&
                      state === "focus") ||
                    (bottomCaption &&
                      label &&
                      topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "base" &&
                      state === "hover") ||
                    (description &&
                      icon &&
                      label &&
                      !bottomCaption &&
                      !button &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "default") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "active") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "focus-tag") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "disable") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "disable") ||
                    (button &&
                      topRightCaption &&
                      !bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "focus") ||
                    (button &&
                      topRightCaption &&
                      !bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "hover") ||
                    (button &&
                      topRightCaption &&
                      !bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "default") ||
                    (label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "big" &&
                      state === "default") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "focus") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "hover") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "default") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "focus") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "hover") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "default") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "disable") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "active") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "error")
                      ? "#dadde1"
                      : (label && !icon && !button && !bottomCaption && state === "hover" && size === "base") ||
                        (label && !icon && !button && !bottomCaption && state === "focus" && size === "base") ||
                        (label &&
                          icon &&
                          description &&
                          !button &&
                          !bottomCaption &&
                          state === "hover" &&
                          size === "base") ||
                        (label &&
                          icon &&
                          description &&
                          !button &&
                          !bottomCaption &&
                          state === "focus" &&
                          size === "base") ||
                        (label &&
                          description &&
                          button &&
                          !icon &&
                          !bottomCaption &&
                          state === "hover" &&
                          size === "base") ||
                        (label &&
                          description &&
                          button &&
                          !icon &&
                          !bottomCaption &&
                          state === "focus" &&
                          size === "base") ||
                        (label &&
                          !icon &&
                          !description &&
                          !button &&
                          !bottomCaption &&
                          state === "hover" &&
                          size === "big") ||
                        (label &&
                          !icon &&
                          !description &&
                          !button &&
                          !bottomCaption &&
                          state === "focus" &&
                          size === "big") ||
                        (label &&
                          !icon &&
                          !description &&
                          !button &&
                          !bottomCaption &&
                          !topRightCaption &&
                          state === "focus-tag" &&
                          size === "base")
                      ? "#7857ed"
                      : label &&
                        state === "disable" &&
                        !icon &&
                        !description &&
                        !button &&
                        !topRightCaption &&
                        size === "base" &&
                        !bottomCaption
                      ? "#ebedf0"
                      : undefined,
                  borderRadius:
                    (button && icon) ||
                    (icon && label && !button && !description) ||
                    (bottomCaption && button && label && !description && !icon) ||
                    (bottomCaption && description && label && !icon && state === "active") ||
                    (bottomCaption && description && label && !icon && state === "focus-tag") ||
                    (bottomCaption && description && label && !icon && state === "disable") ||
                    (bottomCaption && description && label && !icon && state === "error") ||
                    (description && icon && label && !button && state === "active") ||
                    (description && icon && label && !button && state === "focus-tag") ||
                    (description && icon && label && !button && state === "disable") ||
                    (description && icon && label && !button && state === "error") ||
                    (bottomCaption && button && !icon && !label && size === "base") ||
                    (bottomCaption && icon && !button && !label && size === "base") ||
                    (button && description && !bottomCaption && !icon && state === "active") ||
                    (button && description && !bottomCaption && !icon && state === "focus-tag") ||
                    (button && description && !bottomCaption && !icon && state === "disable") ||
                    (button && description && !bottomCaption && !icon && state === "error") ||
                    (bottomCaption && description && label && topRightCaption && !icon && state === "focus") ||
                    (bottomCaption && description && label && topRightCaption && !icon && state === "hover") ||
                    (bottomCaption && description && label && topRightCaption && !icon && state === "default") ||
                    (button && !bottomCaption && !description && !icon && size === "base") ||
                    (description && !bottomCaption && !button && !label && state === "active") ||
                    (description && !bottomCaption && !button && !label && state === "focus-tag") ||
                    (description && !bottomCaption && !button && !label && state === "disable") ||
                    (icon && !button && !description && !label && size === "big") ||
                    (label && !bottomCaption && !button && !icon && state === "active") ||
                    (label && !button && !description && !icon && state === "error") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      label &&
                      topRightCaption &&
                      !button &&
                      state === "focus") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      label &&
                      topRightCaption &&
                      !button &&
                      state === "hover") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      label &&
                      topRightCaption &&
                      !button &&
                      state === "default") ||
                    (bottomCaption && label && !button && !description && !icon && state === "disable") ||
                    (description && icon && !bottomCaption && !button && !label && state === "error") ||
                    (description && label && !bottomCaption && !button && !icon && state === "focus-tag") ||
                    (description && label && !bottomCaption && !button && !icon && state === "disable") ||
                    (description && topRightCaption && !bottomCaption && !icon && !label && state === "focus") ||
                    (description && topRightCaption && !bottomCaption && !icon && !label && state === "hover") ||
                    (description && topRightCaption && !bottomCaption && !icon && !label && state === "default") ||
                    (label && topRightCaption && !button && !description && !icon && state === "focus-tag") ||
                    (!button && !icon && !label && size === "base" && state === "error") ||
                    (bottomCaption && button && !icon && !label && size === "big" && state === "active") ||
                    (bottomCaption && button && !icon && !label && size === "big" && state === "focus-tag") ||
                    (bottomCaption && button && !icon && !label && size === "big" && state === "disable") ||
                    (bottomCaption && button && !icon && !label && size === "big" && state === "error") ||
                    (bottomCaption && description && !button && !label && size === "big" && state === "active") ||
                    (bottomCaption && description && !button && !label && size === "big" && state === "focus-tag") ||
                    (bottomCaption && description && !button && !label && size === "big" && state === "disable") ||
                    (bottomCaption && description && !button && !label && size === "big" && state === "error") ||
                    (bottomCaption &&
                      description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (button && label && !bottomCaption && !icon && size === "big" && state === "focus") ||
                    (button && label && !bottomCaption && !icon && size === "big" && state === "hover") ||
                    (button && label && !bottomCaption && !icon && size === "big" && state === "default") ||
                    (description && label && !bottomCaption && !button && size === "big" && state === "focus") ||
                    (description && label && !bottomCaption && !button && size === "big" && state === "hover") ||
                    (description && label && !bottomCaption && !button && size === "big" && state === "default") ||
                    (icon && !bottomCaption && !button && !description && !label && size === "base") ||
                    (bottomCaption &&
                      label &&
                      topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      state === "active") ||
                    (description &&
                      icon &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      state === "focus") ||
                    (description &&
                      icon &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      state === "hover") ||
                    (description &&
                      icon &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      state === "default") ||
                    (description &&
                      label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      state === "error") ||
                    (bottomCaption && !button && !icon && !label && size === "base" && state === "active") ||
                    (bottomCaption && !button && !icon && !label && size === "base" && state === "focus-tag") ||
                    (bottomCaption && !button && !icon && !label && size === "base" && state === "disable") ||
                    (button && !bottomCaption && !description && !icon && size === "big" && state === "active") ||
                    (button && !bottomCaption && !description && !icon && size === "big" && state === "focus-tag") ||
                    (button && !bottomCaption && !description && !icon && size === "big" && state === "disable") ||
                    (button && !bottomCaption && !description && !icon && size === "big" && state === "error") ||
                    (bottomCaption &&
                      button &&
                      topRightCaption &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      button &&
                      topRightCaption &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      button &&
                      topRightCaption &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "default") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      !button &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      !button &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      !button &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (bottomCaption &&
                      description &&
                      topRightCaption &&
                      !button &&
                      !label &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      description &&
                      topRightCaption &&
                      !button &&
                      !label &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      description &&
                      topRightCaption &&
                      !button &&
                      !label &&
                      size === "big" &&
                      state === "default") ||
                    (button &&
                      description &&
                      label &&
                      !bottomCaption &&
                      !icon &&
                      size === "base" &&
                      state === "focus") ||
                    (button &&
                      description &&
                      label &&
                      !bottomCaption &&
                      !icon &&
                      size === "base" &&
                      state === "hover") ||
                    (button &&
                      description &&
                      label &&
                      !bottomCaption &&
                      !icon &&
                      size === "base" &&
                      state === "default") ||
                    (description &&
                      label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      size === "base" &&
                      state === "focus") ||
                    (description &&
                      label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      size === "base" &&
                      state === "hover") ||
                    (description &&
                      label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      size === "base" &&
                      state === "default") ||
                    (label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      state === "disable") ||
                    (!button && !description && !icon && !topRightCaption && size === "big" && state === "focus-tag") ||
                    (bottomCaption &&
                      topRightCaption &&
                      !button &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "focus") ||
                    (bottomCaption &&
                      topRightCaption &&
                      !button &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "hover") ||
                    (bottomCaption &&
                      topRightCaption &&
                      !button &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "default") ||
                    (label &&
                      topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "base" &&
                      state === "focus") ||
                    (label &&
                      topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "base" &&
                      state === "hover") ||
                    (label &&
                      topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "base" &&
                      state === "default") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "disable") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "error") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "active") ||
                    (bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (button &&
                      !bottomCaption &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (button &&
                      !bottomCaption &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (button &&
                      !bottomCaption &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (description &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "error") ||
                    (description &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (description &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (description &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (label &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "focus") ||
                    (label &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "hover") ||
                    (label &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "default") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "error") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "active") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "focus") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "hover") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "default") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "focus-tag") ||
                    (description &&
                      icon &&
                      label &&
                      !bottomCaption &&
                      !button &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "focus") ||
                    (description &&
                      icon &&
                      label &&
                      !bottomCaption &&
                      !button &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "hover") ||
                    (description &&
                      icon &&
                      label &&
                      !bottomCaption &&
                      !button &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "default") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "active") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "focus-tag") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "disable") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "disable") ||
                    (button &&
                      topRightCaption &&
                      !bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "focus") ||
                    (button &&
                      topRightCaption &&
                      !bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "hover") ||
                    (button &&
                      topRightCaption &&
                      !bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "default") ||
                    (label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "big" &&
                      state === "focus") ||
                    (label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "big" &&
                      state === "hover") ||
                    (label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "big" &&
                      state === "default") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "focus") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "hover") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "default") ||
                    (label &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "focus-tag") ||
                    (label &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "disable") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "focus") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "hover") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "default") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "disable") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "active") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "error")
                      ? "8px"
                      : undefined,
                  boxShadow:
                    (label && !icon && !button && !bottomCaption && state === "focus" && size === "base") ||
                    (label &&
                      icon &&
                      description &&
                      !button &&
                      !bottomCaption &&
                      state === "focus" &&
                      size === "base") ||
                    (label &&
                      description &&
                      button &&
                      !icon &&
                      !bottomCaption &&
                      state === "focus" &&
                      size === "base") ||
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      state === "focus" &&
                      size === "big") ||
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      !topRightCaption &&
                      state === "focus-tag" &&
                      size === "base")
                      ? "0px 0px 0px 3px #eeeaff"
                      : undefined,
                  color:
                    (description &&
                      bottomCaption &&
                      !label &&
                      !icon &&
                      !button &&
                      !topRightCaption &&
                      state === "hover" &&
                      size === "base") ||
                    (description &&
                      bottomCaption &&
                      !label &&
                      !icon &&
                      !button &&
                      !topRightCaption &&
                      state === "default" &&
                      size === "base") ||
                    (description &&
                      bottomCaption &&
                      !label &&
                      !icon &&
                      !button &&
                      !topRightCaption &&
                      state === "focus" &&
                      size === "base")
                      ? "#697f8f"
                      : undefined,
                  display:
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      state === "focus" &&
                      size === "big") ||
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      !topRightCaption &&
                      state === "focus" &&
                      size === "base") ||
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      !topRightCaption &&
                      state === "focus-tag" &&
                      size === "base") ||
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      !topRightCaption &&
                      state === "active" &&
                      size === "base") ||
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      !topRightCaption &&
                      state === "disable" &&
                      size === "base")
                      ? "flex"
                      : undefined,
                  fontFamily:
                    (description &&
                      bottomCaption &&
                      !label &&
                      !icon &&
                      !button &&
                      !topRightCaption &&
                      state === "hover" &&
                      size === "base") ||
                    (description &&
                      bottomCaption &&
                      !label &&
                      !icon &&
                      !button &&
                      !topRightCaption &&
                      state === "default" &&
                      size === "base") ||
                    (description &&
                      bottomCaption &&
                      !label &&
                      !icon &&
                      !button &&
                      !topRightCaption &&
                      state === "focus" &&
                      size === "base")
                      ? "'Acid Grotesk TP-Normal', Helvetica"
                      : undefined,
                  fontSize:
                    (description &&
                      bottomCaption &&
                      !label &&
                      !icon &&
                      !button &&
                      !topRightCaption &&
                      state === "hover" &&
                      size === "base") ||
                    (description &&
                      bottomCaption &&
                      !label &&
                      !icon &&
                      !button &&
                      !topRightCaption &&
                      state === "default" &&
                      size === "base") ||
                    (description &&
                      bottomCaption &&
                      !label &&
                      !icon &&
                      !button &&
                      !topRightCaption &&
                      state === "focus" &&
                      size === "base")
                      ? "14px"
                      : undefined,
                  fontWeight:
                    (description &&
                      bottomCaption &&
                      !label &&
                      !icon &&
                      !button &&
                      !topRightCaption &&
                      state === "hover" &&
                      size === "base") ||
                    (description &&
                      bottomCaption &&
                      !label &&
                      !icon &&
                      !button &&
                      !topRightCaption &&
                      state === "default" &&
                      size === "base") ||
                    (description &&
                      bottomCaption &&
                      !label &&
                      !icon &&
                      !button &&
                      !topRightCaption &&
                      state === "focus" &&
                      size === "base")
                      ? "400"
                      : undefined,
                  gap:
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      state === "focus" &&
                      size === "big") ||
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      !topRightCaption &&
                      state === "focus" &&
                      size === "base") ||
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      !topRightCaption &&
                      state === "focus-tag" &&
                      size === "base") ||
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      !topRightCaption &&
                      state === "active" &&
                      size === "base") ||
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      !topRightCaption &&
                      state === "disable" &&
                      size === "base")
                      ? "10px"
                      : undefined,
                  height:
                    (button && icon) ||
                    (icon && label && !button && !description) ||
                    (bottomCaption && button && label && !description && !icon) ||
                    (bottomCaption && description && label && !icon && state === "active") ||
                    (bottomCaption && description && label && !icon && state === "focus-tag") ||
                    (bottomCaption && description && label && !icon && state === "disable") ||
                    (bottomCaption && description && label && !icon && state === "error") ||
                    (description && icon && label && !button && state === "active") ||
                    (description && icon && label && !button && state === "focus-tag") ||
                    (description && icon && label && !button && state === "disable") ||
                    (description && icon && label && !button && state === "error") ||
                    (bottomCaption && button && !icon && !label && size === "base") ||
                    (bottomCaption && icon && !button && !label && size === "base") ||
                    (button && description && !bottomCaption && !icon && state === "active") ||
                    (button && description && !bottomCaption && !icon && state === "focus-tag") ||
                    (button && description && !bottomCaption && !icon && state === "disable") ||
                    (button && description && !bottomCaption && !icon && state === "error") ||
                    (bottomCaption && description && label && topRightCaption && !icon && state === "focus") ||
                    (bottomCaption && description && label && topRightCaption && !icon && state === "hover") ||
                    (bottomCaption && description && label && topRightCaption && !icon && state === "default") ||
                    (button && !bottomCaption && !description && !icon && size === "base") ||
                    (description && !bottomCaption && !button && !label && state === "active") ||
                    (description && !bottomCaption && !button && !label && state === "focus-tag") ||
                    (description && !bottomCaption && !button && !label && state === "disable") ||
                    (icon && !button && !description && !label && size === "big") ||
                    (label && !button && !description && !icon && state === "error") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      label &&
                      topRightCaption &&
                      !button &&
                      state === "focus") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      label &&
                      topRightCaption &&
                      !button &&
                      state === "hover") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      label &&
                      topRightCaption &&
                      !button &&
                      state === "default") ||
                    (bottomCaption && label && !button && !description && !icon && state === "disable") ||
                    (description && icon && !bottomCaption && !button && !label && state === "error") ||
                    (description && label && !bottomCaption && !button && !icon && state === "active") ||
                    (description && label && !bottomCaption && !button && !icon && state === "focus-tag") ||
                    (description && label && !bottomCaption && !button && !icon && state === "disable") ||
                    (description && topRightCaption && !bottomCaption && !icon && !label && state === "focus") ||
                    (description && topRightCaption && !bottomCaption && !icon && !label && state === "hover") ||
                    (description && topRightCaption && !bottomCaption && !icon && !label && state === "default") ||
                    (label && topRightCaption && !button && !description && !icon && state === "focus-tag") ||
                    (!button && !icon && !label && size === "base" && state === "error") ||
                    (bottomCaption && button && !icon && !label && size === "big" && state === "active") ||
                    (bottomCaption && button && !icon && !label && size === "big" && state === "focus-tag") ||
                    (bottomCaption && button && !icon && !label && size === "big" && state === "disable") ||
                    (bottomCaption && button && !icon && !label && size === "big" && state === "error") ||
                    (bottomCaption && description && !button && !label && size === "big" && state === "active") ||
                    (bottomCaption && description && !button && !label && size === "big" && state === "focus-tag") ||
                    (bottomCaption && description && !button && !label && size === "big" && state === "disable") ||
                    (bottomCaption && description && !button && !label && size === "big" && state === "error") ||
                    (bottomCaption &&
                      description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (button && label && !bottomCaption && !icon && size === "big" && state === "focus") ||
                    (button && label && !bottomCaption && !icon && size === "big" && state === "hover") ||
                    (button && label && !bottomCaption && !icon && size === "big" && state === "default") ||
                    (description && label && !bottomCaption && !button && size === "big" && state === "focus") ||
                    (description && label && !bottomCaption && !button && size === "big" && state === "hover") ||
                    (description && label && !bottomCaption && !button && size === "big" && state === "default") ||
                    (description && label && !bottomCaption && !icon && size === "base" && state === "focus") ||
                    (icon && !bottomCaption && !button && !description && !label && size === "base") ||
                    (bottomCaption &&
                      label &&
                      topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      state === "active") ||
                    (description &&
                      icon &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      state === "focus") ||
                    (description &&
                      icon &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      state === "hover") ||
                    (description &&
                      icon &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      state === "default") ||
                    (description &&
                      label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      state === "error") ||
                    (bottomCaption && !button && !icon && !label && size === "base" && state === "active") ||
                    (bottomCaption && !button && !icon && !label && size === "base" && state === "focus-tag") ||
                    (bottomCaption && !button && !icon && !label && size === "base" && state === "disable") ||
                    (button && !bottomCaption && !description && !icon && size === "big" && state === "active") ||
                    (button && !bottomCaption && !description && !icon && size === "big" && state === "focus-tag") ||
                    (button && !bottomCaption && !description && !icon && size === "big" && state === "disable") ||
                    (button && !bottomCaption && !description && !icon && size === "big" && state === "error") ||
                    (bottomCaption &&
                      button &&
                      topRightCaption &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      button &&
                      topRightCaption &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      button &&
                      topRightCaption &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "default") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      !button &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      !button &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      !button &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (bottomCaption &&
                      description &&
                      topRightCaption &&
                      !button &&
                      !label &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      description &&
                      topRightCaption &&
                      !button &&
                      !label &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      description &&
                      topRightCaption &&
                      !button &&
                      !label &&
                      size === "big" &&
                      state === "default") ||
                    (button &&
                      description &&
                      label &&
                      !bottomCaption &&
                      !icon &&
                      size === "base" &&
                      state === "hover") ||
                    (button &&
                      description &&
                      label &&
                      !bottomCaption &&
                      !icon &&
                      size === "base" &&
                      state === "default") ||
                    (description &&
                      icon &&
                      label &&
                      !bottomCaption &&
                      !button &&
                      size === "base" &&
                      state === "focus") ||
                    (description &&
                      label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      size === "base" &&
                      state === "hover") ||
                    (description &&
                      label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      size === "base" &&
                      state === "default") ||
                    (label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      state === "disable") ||
                    (!button && !description && !icon && !topRightCaption && size === "big" && state === "focus-tag") ||
                    (bottomCaption &&
                      topRightCaption &&
                      !button &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "focus") ||
                    (bottomCaption &&
                      topRightCaption &&
                      !button &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "hover") ||
                    (bottomCaption &&
                      topRightCaption &&
                      !button &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "default") ||
                    (label &&
                      topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "base" &&
                      state === "focus") ||
                    (label &&
                      topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "base" &&
                      state === "hover") ||
                    (label &&
                      topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "base" &&
                      state === "default") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "disable") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "error") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "active") ||
                    (bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (button &&
                      !bottomCaption &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (button &&
                      !bottomCaption &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (button &&
                      !bottomCaption &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (description &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "error") ||
                    (description &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (description &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (description &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (label &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "big" &&
                      state === "active") ||
                    (label &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "hover") ||
                    (label &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "default") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "error") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "active") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "focus") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "hover") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "default") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "focus-tag") ||
                    (description &&
                      icon &&
                      label &&
                      !bottomCaption &&
                      !button &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "hover") ||
                    (description &&
                      icon &&
                      label &&
                      !bottomCaption &&
                      !button &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "default") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "active") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "focus-tag") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "disable") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "disable") ||
                    (button &&
                      topRightCaption &&
                      !bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "focus") ||
                    (button &&
                      topRightCaption &&
                      !bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "hover") ||
                    (button &&
                      topRightCaption &&
                      !bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "default") ||
                    (label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "base" &&
                      state === "active") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "focus") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "hover") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "default") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "focus") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "hover") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "default") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "disable") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "active") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "error")
                      ? "40px"
                      : (label &&
                          !icon &&
                          !description &&
                          !button &&
                          !bottomCaption &&
                          state === "default" &&
                          size === "big") ||
                        (label &&
                          !icon &&
                          !description &&
                          !button &&
                          !bottomCaption &&
                          state === "hover" &&
                          size === "big") ||
                        (label &&
                          !icon &&
                          !description &&
                          !button &&
                          !bottomCaption &&
                          state === "focus" &&
                          size === "big")
                      ? "80px"
                      : undefined,
                  letterSpacing:
                    (description &&
                      bottomCaption &&
                      !label &&
                      !icon &&
                      !button &&
                      !topRightCaption &&
                      state === "hover" &&
                      size === "base") ||
                    (description &&
                      bottomCaption &&
                      !label &&
                      !icon &&
                      !button &&
                      !topRightCaption &&
                      state === "default" &&
                      size === "base") ||
                    (description &&
                      bottomCaption &&
                      !label &&
                      !icon &&
                      !button &&
                      !topRightCaption &&
                      state === "focus" &&
                      size === "base")
                      ? "0.28px"
                      : undefined,
                  lineHeight:
                    (description &&
                      bottomCaption &&
                      !label &&
                      !icon &&
                      !button &&
                      !topRightCaption &&
                      state === "hover" &&
                      size === "base") ||
                    (description &&
                      bottomCaption &&
                      !label &&
                      !icon &&
                      !button &&
                      !topRightCaption &&
                      state === "default" &&
                      size === "base") ||
                    (description &&
                      bottomCaption &&
                      !label &&
                      !icon &&
                      !button &&
                      !topRightCaption &&
                      state === "focus" &&
                      size === "base")
                      ? "23.1px"
                      : undefined,
                  minWidth:
                    (button && icon) ||
                    (icon && label && !button && !description) ||
                    (bottomCaption && button && label && !description && !icon) ||
                    (bottomCaption && description && label && !icon && state === "active") ||
                    (bottomCaption && description && label && !icon && state === "focus-tag") ||
                    (bottomCaption && description && label && !icon && state === "disable") ||
                    (bottomCaption && description && label && !icon && state === "error") ||
                    (description && icon && label && !button && state === "active") ||
                    (description && icon && label && !button && state === "focus-tag") ||
                    (description && icon && label && !button && state === "disable") ||
                    (description && icon && label && !button && state === "error") ||
                    (bottomCaption && button && !icon && !label && size === "base") ||
                    (bottomCaption && icon && !button && !label && size === "base") ||
                    (button && description && !bottomCaption && !icon && state === "active") ||
                    (button && description && !bottomCaption && !icon && state === "focus-tag") ||
                    (button && description && !bottomCaption && !icon && state === "disable") ||
                    (button && description && !bottomCaption && !icon && state === "error") ||
                    (bottomCaption && description && label && topRightCaption && !icon && state === "focus") ||
                    (bottomCaption && description && label && topRightCaption && !icon && state === "hover") ||
                    (bottomCaption && description && label && topRightCaption && !icon && state === "default") ||
                    (button && !bottomCaption && !description && !icon && size === "base") ||
                    (description && !bottomCaption && !button && !label && state === "active") ||
                    (description && !bottomCaption && !button && !label && state === "focus-tag") ||
                    (description && !bottomCaption && !button && !label && state === "disable") ||
                    (icon && !button && !description && !label && size === "big") ||
                    (label && !button && !description && !icon && state === "error") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      label &&
                      topRightCaption &&
                      !button &&
                      state === "focus") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      label &&
                      topRightCaption &&
                      !button &&
                      state === "hover") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      label &&
                      topRightCaption &&
                      !button &&
                      state === "default") ||
                    (bottomCaption && label && !button && !description && !icon && state === "disable") ||
                    (description && icon && !bottomCaption && !button && !label && state === "error") ||
                    (description && label && !bottomCaption && !button && !icon && state === "active") ||
                    (description && label && !bottomCaption && !button && !icon && state === "focus-tag") ||
                    (description && label && !bottomCaption && !button && !icon && state === "disable") ||
                    (description && topRightCaption && !bottomCaption && !icon && !label && state === "focus") ||
                    (description && topRightCaption && !bottomCaption && !icon && !label && state === "hover") ||
                    (description && topRightCaption && !bottomCaption && !icon && !label && state === "default") ||
                    (label && topRightCaption && !button && !description && !icon && state === "focus-tag") ||
                    (!button && !icon && !label && size === "base" && state === "error") ||
                    (bottomCaption && button && !icon && !label && size === "big" && state === "active") ||
                    (bottomCaption && button && !icon && !label && size === "big" && state === "focus-tag") ||
                    (bottomCaption && button && !icon && !label && size === "big" && state === "disable") ||
                    (bottomCaption && button && !icon && !label && size === "big" && state === "error") ||
                    (bottomCaption && description && !button && !label && size === "big" && state === "active") ||
                    (bottomCaption && description && !button && !label && size === "big" && state === "focus-tag") ||
                    (bottomCaption && description && !button && !label && size === "big" && state === "disable") ||
                    (bottomCaption && description && !button && !label && size === "big" && state === "error") ||
                    (bottomCaption &&
                      description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (button && label && !bottomCaption && !icon && size === "big" && state === "focus") ||
                    (button && label && !bottomCaption && !icon && size === "big" && state === "hover") ||
                    (button && label && !bottomCaption && !icon && size === "big" && state === "default") ||
                    (description && label && !bottomCaption && !button && size === "big" && state === "focus") ||
                    (description && label && !bottomCaption && !button && size === "big" && state === "hover") ||
                    (description && label && !bottomCaption && !button && size === "big" && state === "default") ||
                    (description && label && !bottomCaption && !icon && size === "base" && state === "focus") ||
                    (icon && !bottomCaption && !button && !description && !label && size === "base") ||
                    (bottomCaption &&
                      label &&
                      topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      state === "active") ||
                    (description &&
                      icon &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      state === "focus") ||
                    (description &&
                      icon &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      state === "hover") ||
                    (description &&
                      icon &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      state === "default") ||
                    (description &&
                      label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      state === "error") ||
                    (bottomCaption && !button && !icon && !label && size === "base" && state === "active") ||
                    (bottomCaption && !button && !icon && !label && size === "base" && state === "focus-tag") ||
                    (bottomCaption && !button && !icon && !label && size === "base" && state === "disable") ||
                    (button && !bottomCaption && !description && !icon && size === "big" && state === "active") ||
                    (button && !bottomCaption && !description && !icon && size === "big" && state === "focus-tag") ||
                    (button && !bottomCaption && !description && !icon && size === "big" && state === "disable") ||
                    (button && !bottomCaption && !description && !icon && size === "big" && state === "error") ||
                    (bottomCaption &&
                      button &&
                      topRightCaption &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      button &&
                      topRightCaption &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      button &&
                      topRightCaption &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "default") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      !button &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      !button &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      description &&
                      icon &&
                      !button &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (bottomCaption &&
                      description &&
                      topRightCaption &&
                      !button &&
                      !label &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      description &&
                      topRightCaption &&
                      !button &&
                      !label &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      description &&
                      topRightCaption &&
                      !button &&
                      !label &&
                      size === "big" &&
                      state === "default") ||
                    (button &&
                      description &&
                      label &&
                      !bottomCaption &&
                      !icon &&
                      size === "base" &&
                      state === "hover") ||
                    (button &&
                      description &&
                      label &&
                      !bottomCaption &&
                      !icon &&
                      size === "base" &&
                      state === "default") ||
                    (description &&
                      icon &&
                      label &&
                      !bottomCaption &&
                      !button &&
                      size === "base" &&
                      state === "focus") ||
                    (description &&
                      label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      size === "base" &&
                      state === "hover") ||
                    (description &&
                      label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      size === "base" &&
                      state === "default") ||
                    (label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      state === "disable") ||
                    (!button && !description && !icon && !topRightCaption && size === "big" && state === "focus-tag") ||
                    (bottomCaption &&
                      topRightCaption &&
                      !button &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "focus") ||
                    (bottomCaption &&
                      topRightCaption &&
                      !button &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "hover") ||
                    (bottomCaption &&
                      topRightCaption &&
                      !button &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "default") ||
                    (label &&
                      topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "base" &&
                      state === "focus") ||
                    (label &&
                      topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "base" &&
                      state === "hover") ||
                    (label &&
                      topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "base" &&
                      state === "default") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "disable") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "error") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "active") ||
                    (bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (button &&
                      !bottomCaption &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (button &&
                      !bottomCaption &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (button &&
                      !bottomCaption &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (description &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "error") ||
                    (description &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (description &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (description &&
                      !bottomCaption &&
                      !button &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (label &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "big" &&
                      state === "active") ||
                    (label &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "hover") ||
                    (label &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "default") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "error") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "active") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "focus") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "hover") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "default") ||
                    (topRightCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "focus-tag") ||
                    (description &&
                      icon &&
                      label &&
                      !bottomCaption &&
                      !button &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "hover") ||
                    (description &&
                      icon &&
                      label &&
                      !bottomCaption &&
                      !button &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "default") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "active") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "focus-tag") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "disable") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "hover") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "default") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "disable") ||
                    (button &&
                      topRightCaption &&
                      !bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "focus") ||
                    (button &&
                      topRightCaption &&
                      !bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "hover") ||
                    (button &&
                      topRightCaption &&
                      !bottomCaption &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "default") ||
                    (label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "base" &&
                      state === "active") ||
                    (label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "big" &&
                      state === "hover") ||
                    (label &&
                      topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      size === "big" &&
                      state === "default") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "focus") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "hover") ||
                    (bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "base" &&
                      state === "default") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "focus") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "hover") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "base" &&
                      state === "default") ||
                    (topRightCaption &&
                      !bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      size === "big" &&
                      state === "disable") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "active") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "focus") ||
                    (!bottomCaption &&
                      !button &&
                      !description &&
                      !icon &&
                      !label &&
                      !topRightCaption &&
                      size === "big" &&
                      state === "error")
                      ? "370px"
                      : undefined,
                  overflow:
                    (label && description && !icon && !bottomCaption && state === "default" && size === "base") ||
                    (label && description && !icon && !bottomCaption && state === "hover" && size === "base") ||
                    (label && !icon && !button && !bottomCaption && state === "focus" && size === "base") ||
                    (label &&
                      icon &&
                      description &&
                      !button &&
                      !bottomCaption &&
                      state === "focus" &&
                      size === "base") ||
                    (label &&
                      icon &&
                      description &&
                      !button &&
                      !bottomCaption &&
                      state === "default" &&
                      size === "base") ||
                    (label &&
                      icon &&
                      description &&
                      !button &&
                      !bottomCaption &&
                      state === "hover" &&
                      size === "base") ||
                    (label &&
                      description &&
                      button &&
                      !icon &&
                      !bottomCaption &&
                      state === "focus" &&
                      size === "base") ||
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      state === "focus" &&
                      size === "big") ||
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      state === "active" &&
                      size === "base") ||
                    (label &&
                      topRightCaption &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      state === "default" &&
                      size === "base") ||
                    (label &&
                      topRightCaption &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      state === "hover" &&
                      size === "base") ||
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      !topRightCaption &&
                      state === "focus-tag" &&
                      size === "base") ||
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      !topRightCaption &&
                      state === "disable" &&
                      size === "base")
                      ? "hidden"
                      : undefined,
                  padding:
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      state === "focus" &&
                      size === "big") ||
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      !topRightCaption &&
                      state === "focus" &&
                      size === "base") ||
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      !topRightCaption &&
                      state === "active" &&
                      size === "base") ||
                    (label &&
                      !icon &&
                      !description &&
                      !button &&
                      !bottomCaption &&
                      !topRightCaption &&
                      state === "disable" &&
                      size === "base")
                      ? "10px"
                      : label &&
                        state === "focus-tag" &&
                        !icon &&
                        !description &&
                        !button &&
                        !topRightCaption &&
                        size === "base" &&
                        !bottomCaption
                      ? "8px 10px 8px 8px"
                      : undefined,
                  position:
                    (label &&
                      icon &&
                      description &&
                      !button &&
                      !bottomCaption &&
                      state === "default" &&
                      size === "base") ||
                    (label &&
                      icon &&
                      description &&
                      !button &&
                      !bottomCaption &&
                      state === "hover" &&
                      size === "base") ||
                    (label &&
                      icon &&
                      description &&
                      !button &&
                      !bottomCaption &&
                      state === "focus" &&
                      size === "base") ||
                    (label &&
                      description &&
                      button &&
                      !icon &&
                      !bottomCaption &&
                      state === "default" &&
                      size === "base") ||
                    (label &&
                      description &&
                      button &&
                      !icon &&
                      !bottomCaption &&
                      state === "hover" &&
                      size === "base") ||
                    (label && description && button && !icon && !bottomCaption && state === "focus" && size === "base")
                      ? "relative"
                      : undefined,
                  whiteSpace:
                    (description &&
                      bottomCaption &&
                      !label &&
                      !icon &&
                      !button &&
                      !topRightCaption &&
                      state === "hover" &&
                      size === "base") ||
                    (description &&
                      bottomCaption &&
                      !label &&
                      !icon &&
                      !button &&
                      !topRightCaption &&
                      state === "default" &&
                      size === "base") ||
                    (description &&
                      bottomCaption &&
                      !label &&
                      !icon &&
                      !button &&
                      !topRightCaption &&
                      state === "focus" &&
                      size === "base")
                      ? "nowrap"
                      : undefined,
                },
                ...buttonDarkStyle,
              }}
            >
              <React.Fragment>
                {((label && !icon && !button && !bottomCaption && state === "focus" && size === "base") ||
                  (label &&
                    description &&
                    !icon &&
                    !button &&
                    !bottomCaption &&
                    state === "default" &&
                    size === "base") ||
                  (label &&
                    description &&
                    !icon &&
                    !button &&
                    !bottomCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (label &&
                    !icon &&
                    !description &&
                    !button &&
                    !bottomCaption &&
                    state === "focus" &&
                    size === "big") ||
                  (label &&
                    !icon &&
                    !description &&
                    !button &&
                    !bottomCaption &&
                    state === "active" &&
                    size === "base") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !bottomCaption &&
                    state === "default" &&
                    size === "base") ||
                  (label &&
                    topRightCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !bottomCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (label &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    !bottomCaption &&
                    state === "disable" &&
                    size === "base")) && (
                  <React.Fragment>
                    <div
                      style={{
                        alignItems:
                          (state === "focus" && size === "base") ||
                          (description && state === "default" && size === "base") ||
                          (description && state === "hover" && size === "base") ||
                          (!description && state === "focus" && size === "big") ||
                          (!description && state === "active" && size === "base") ||
                          (!description && !topRightCaption && state === "disable" && size === "base")
                            ? "flex-start"
                            : undefined,
                        display:
                          (state === "focus" && size === "base") ||
                          (description && state === "default" && size === "base") ||
                          (description && state === "hover" && size === "base") ||
                          (!description && state === "focus" && size === "big") ||
                          (!description && state === "active" && size === "base") ||
                          (!description && !topRightCaption && state === "disable" && size === "base")
                            ? "flex"
                            : undefined,
                        gap:
                          (state === "focus" && size === "base") ||
                          (description && state === "default" && size === "base") ||
                          (description && state === "hover" && size === "base") ||
                          (!description && state === "focus" && size === "big") ||
                          (!description && state === "active" && size === "base") ||
                          (!description && !topRightCaption && state === "disable" && size === "base")
                            ? "1px"
                            : undefined,
                        height:
                          topRightCaption &&
                          !description &&
                          size === "base" &&
                          (state === "default" || state === "hover")
                            ? "20px"
                            : undefined,
                        left:
                          size === "base" &&
                          (description || topRightCaption) &&
                          (!description || state === "default" || state === "hover" || state === "focus") &&
                          (state === "default" || state === "hover" || state === "focus" || state === "active")
                            ? "10px"
                            : undefined,
                        position:
                          size === "base" &&
                          (description || topRightCaption) &&
                          (!description || state === "default" || state === "hover" || state === "focus") &&
                          (state === "default" || state === "hover" || state === "focus" || state === "active")
                            ? "relative"
                            : undefined,
                        top:
                          size === "base" &&
                          (description || topRightCaption) &&
                          (!description || state === "default" || state === "hover" || state === "focus") &&
                          (state === "default" || state === "hover" || state === "focus" || state === "active")
                            ? "10px"
                            : undefined,
                        width:
                          !description &&
                          (!topRightCaption || state === "focus") &&
                          (!topRightCaption || size === "big") &&
                          (state === "focus" || size === "base") &&
                          (size === "big" || size === "base") &&
                          (state === "focus" || state === "active" || state === "disable")
                            ? "fit-content"
                            : size === "base" &&
                              (description || topRightCaption) &&
                              (!description || state === "default" || state === "hover" || state === "focus") &&
                              (state === "default" || state === "hover" || state === "focus" || state === "active")
                            ? "30px"
                            : undefined,
                      }}
                    >
                      <React.Fragment>
                        {state === "focus" &&
                          (!description || !topRightCaption) &&
                          (!description || size === "base") &&
                          (!topRightCaption || size === "big") &&
                          (size === "big" || size === "base") && (
                            <React.Fragment>
                              <div
                                style={{
                                  color:
                                    (!description || !topRightCaption) &&
                                    (!description || size === "base") &&
                                    (!topRightCaption || size === "big") &&
                                    (size === "big" || size === "base")
                                      ? "#1c2126"
                                      : undefined,
                                  fontFamily:
                                    (!description || !topRightCaption) &&
                                    (!description || size === "base") &&
                                    (!topRightCaption || size === "big") &&
                                    (size === "big" || size === "base")
                                      ? "'Acid Grotesk TP-Normal', Helvetica"
                                      : undefined,
                                  fontSize:
                                    (!description || !topRightCaption) &&
                                    (!description || size === "base") &&
                                    (!topRightCaption || size === "big") &&
                                    (size === "big" || size === "base")
                                      ? "14px"
                                      : undefined,
                                  fontWeight:
                                    (!description || !topRightCaption) &&
                                    (!description || size === "base") &&
                                    (!topRightCaption || size === "big") &&
                                    (size === "big" || size === "base")
                                      ? "400"
                                      : undefined,
                                  letterSpacing:
                                    (!description || !topRightCaption) &&
                                    (!description || size === "base") &&
                                    (!topRightCaption || size === "big") &&
                                    (size === "big" || size === "base")
                                      ? "0.28px"
                                      : undefined,
                                  lineHeight:
                                    (!description || !topRightCaption) &&
                                    (!description || size === "base") &&
                                    (!topRightCaption || size === "big") &&
                                    (size === "big" || size === "base")
                                      ? "20px"
                                      : undefined,
                                  marginTop:
                                    (!description || !topRightCaption) &&
                                    (!description || size === "base") &&
                                    (!topRightCaption || size === "big") &&
                                    (size === "big" || size === "base")
                                      ? "-1.00px"
                                      : undefined,
                                  whiteSpace:
                                    (!description || !topRightCaption) &&
                                    (!description || size === "base") &&
                                    (!topRightCaption || size === "big") &&
                                    (size === "big" || size === "base")
                                      ? "nowrap"
                                      : undefined,
                                  width:
                                    (!description || !topRightCaption) &&
                                    (!description || size === "base") &&
                                    (!topRightCaption || size === "big") &&
                                    (size === "big" || size === "base")
                                      ? "fit-content"
                                      : undefined,
                                }}
                              >
                                <React.Fragment>
                                  {(!description || !topRightCaption) &&
                                    (!description || size === "base") &&
                                    (!topRightCaption || size === "big") &&
                                    (size === "big" || size === "base") && <React.Fragment>Text</React.Fragment>}
                                </React.Fragment>
                              </div>
                              <div
                                style={{
                                  backgroundColor:
                                    (!description || !topRightCaption) &&
                                    (!description || size === "base") &&
                                    (!topRightCaption || size === "big") &&
                                    (size === "big" || size === "base")
                                      ? "#1c2126"
                                      : undefined,
                                  height:
                                    (description || size === "big") &&
                                    (!description || !topRightCaption) &&
                                    (!description || size === "base")
                                      ? "21px"
                                      : !description && !topRightCaption && size === "base"
                                      ? "19px"
                                      : undefined,
                                  marginRight:
                                    description && !topRightCaption && size === "base" ? "-2.00px" : undefined,
                                  minWidth:
                                    (!description || !topRightCaption) &&
                                    (!description || size === "base") &&
                                    (!topRightCaption || size === "big") &&
                                    (size === "big" || size === "base")
                                      ? "1px"
                                      : undefined,
                                }}
                              />
                            </React.Fragment>
                          )}

                        {size === "base" &&
                          (description || topRightCaption || state === "disable" || state === "active") &&
                          (description || !topRightCaption || state === "active" || state === "focus") &&
                          (topRightCaption || !description || state === "hover" || state === "default") &&
                          (!description || state === "hover" || state === "default" || state === "focus") && (
                            <React.Fragment>
                              <div
                                style={{
                                  ...{
                                    alignItems:
                                      topRightCaption &&
                                      (!description || state === "focus") &&
                                      (state === "focus" || state === "active")
                                        ? "flex-start"
                                        : undefined,
                                    color:
                                      state === "active" && !description && !topRightCaption
                                        ? "#1c2126"
                                        : state === "disable" && !description && !topRightCaption
                                        ? "#aebbc5"
                                        : description && (state === "default" || state === "hover")
                                        ? "#697f8f"
                                        : undefined,
                                    display:
                                      topRightCaption &&
                                      (!description || state === "focus") &&
                                      (state === "focus" || state === "active")
                                        ? "flex"
                                        : undefined,
                                    fontFamily:
                                      (description || !topRightCaption) &&
                                      (description || state === "active") &&
                                      (!topRightCaption || state === "hover") &&
                                      (!description || state === "default" || state === "hover")
                                        ? "'Acid Grotesk TP-Normal', Helvetica"
                                        : (description || !topRightCaption) &&
                                          (topRightCaption || !description) &&
                                          (description || state === "disable") &&
                                          (!topRightCaption || state === "default")
                                        ? "'Plus Jakarta Sans', Helvetica"
                                        : undefined,
                                    fontSize:
                                      (description && state === "default") ||
                                      (description && state === "hover") ||
                                      (!description && !topRightCaption && state === "active") ||
                                      (!description && !topRightCaption && state === "disable")
                                        ? "14px"
                                        : undefined,
                                    fontWeight:
                                      (description && state === "default") ||
                                      (description && state === "hover") ||
                                      (!description && !topRightCaption && state === "active") ||
                                      (!description && !topRightCaption && state === "disable")
                                        ? "400"
                                        : undefined,
                                    gap:
                                      topRightCaption &&
                                      (!description || state === "focus") &&
                                      (state === "focus" || state === "active")
                                        ? "1px"
                                        : undefined,
                                    letterSpacing:
                                      (description && state === "default") ||
                                      (description && state === "hover") ||
                                      (!description && !topRightCaption && state === "active") ||
                                      (!description && !topRightCaption && state === "disable")
                                        ? "0.28px"
                                        : undefined,
                                    lineHeight:
                                      (description && state === "default") ||
                                      (description && state === "hover") ||
                                      (!description && !topRightCaption && state === "active") ||
                                      (!description && !topRightCaption && state === "disable")
                                        ? "20px"
                                        : undefined,
                                    marginRight:
                                      description &&
                                      (!topRightCaption || state === "hover") &&
                                      (state === "default" || state === "hover")
                                        ? "-141.00px"
                                        : state === "default" && description && topRightCaption
                                        ? "-137.00px"
                                        : undefined,
                                    marginTop:
                                      (description && state === "default") ||
                                      (description && state === "hover") ||
                                      (!description && !topRightCaption && state === "active") ||
                                      (!description && !topRightCaption && state === "disable")
                                        ? "-1.00px"
                                        : undefined,
                                    whiteSpace:
                                      (description && state === "default") ||
                                      (description && state === "hover") ||
                                      (!description && !topRightCaption && state === "active") ||
                                      (!description && !topRightCaption && state === "disable")
                                        ? "nowrap"
                                        : undefined,
                                    width:
                                      (description && state === "default") ||
                                      (description && state === "hover") ||
                                      (!description && !topRightCaption && state === "active") ||
                                      (!description && !topRightCaption && state === "disable")
                                        ? "fit-content"
                                        : topRightCaption &&
                                          (!description || state === "focus") &&
                                          (state === "focus" || state === "active")
                                        ? "30px"
                                        : undefined,
                                  },
                                  ...textStyle,
                                }}
                              >
                                <React.Fragment>
                                  {((description && state === "hover") ||
                                    (description && state === "default") ||
                                    (!description && !topRightCaption && state === "active") ||
                                    (!description && !topRightCaption && state === "disable")) && (
                                    <React.Fragment>Text</React.Fragment>
                                  )}

                                  {state === "focus" && topRightCaption && (
                                    <React.Fragment>
                                      <div className={"input-fields-light-text-wrapper"}>Text</div>
                                      <div className={"input-fields-light-rectangle-224"} />
                                    </React.Fragment>
                                  )}

                                  {state === "active" && !description && topRightCaption && (
                                    <React.Fragment>
                                      <div className={"input-fields-light-text-wrapper"}>Text</div>
                                    </React.Fragment>
                                  )}
                                </React.Fragment>
                              </div>
                            </React.Fragment>
                          )}
                      </React.Fragment>
                    </div>
                  </React.Fragment>
                )}

                {((description &&
                  bottomCaption &&
                  !label &&
                  !icon &&
                  !button &&
                  !topRightCaption &&
                  state === "hover" &&
                  size === "base") ||
                  (description &&
                    bottomCaption &&
                    !label &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    bottomCaption &&
                    !label &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base")) && <React.Fragment>Short caption</React.Fragment>}

                {((label && icon && description && !button && !bottomCaption && state === "focus" && size === "base") ||
                  (label && icon && description && !button && !bottomCaption && state === "hover" && size === "base") ||
                  (label &&
                    icon &&
                    description &&
                    !button &&
                    !bottomCaption &&
                    state === "default" &&
                    size === "base") ||
                  (label && description && button && !icon && !bottomCaption && state === "focus" && size === "base") ||
                  (label && description && button && !icon && !bottomCaption && state === "hover" && size === "base") ||
                  (label &&
                    description &&
                    button &&
                    !icon &&
                    !bottomCaption &&
                    state === "default" &&
                    size === "base") ||
                  (label &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    !bottomCaption &&
                    state === "focus-tag" &&
                    size === "base")) && (
                  <React.Fragment>
                    <div
                      style={{
                        alignItems:
                          state === "focus-tag" && !icon && !description && !button && !topRightCaption
                            ? "center"
                            : description &&
                              (icon || button) &&
                              (!icon || !button) &&
                              (state === "default" || state === "hover" || state === "focus")
                            ? "flex-start"
                            : undefined,
                        border:
                          state === "focus-tag" && !icon && !description && !button && !topRightCaption
                            ? "1px solid"
                            : undefined,
                        borderColor:
                          state === "focus-tag" && !icon && !description && !button && !topRightCaption
                            ? "#dadde1"
                            : undefined,
                        borderRadius:
                          state === "focus-tag" && !icon && !description && !button && !topRightCaption
                            ? "4px"
                            : undefined,
                        display:
                          (description || !icon) &&
                          (description || !button) &&
                          (description || !topRightCaption) &&
                          (description || state === "focus-tag") &&
                          (!icon || !button) &&
                          (icon || button || !description) &&
                          (!description || state === "default" || state === "hover" || state === "focus")
                            ? "flex"
                            : undefined,
                        gap:
                          state === "focus-tag" && !icon && !description && !button && !topRightCaption
                            ? "4px"
                            : description &&
                              (icon || button) &&
                              (!icon || !button) &&
                              (state === "default" || state === "hover" || state === "focus")
                            ? "1px"
                            : undefined,
                        justifyContent:
                          state === "focus-tag" && !icon && !description && !button && !topRightCaption
                            ? "center"
                            : undefined,
                        left:
                          description &&
                          (icon || button) &&
                          (!icon || !button) &&
                          (state === "default" || state === "hover" || state === "focus")
                            ? "10px"
                            : undefined,
                        padding:
                          state === "focus-tag" && !icon && !description && !button && !topRightCaption
                            ? "2px 8px"
                            : undefined,
                        position:
                          description &&
                          (icon || button) &&
                          (!icon || !button) &&
                          (state === "default" || state === "hover" || state === "focus")
                            ? "absolute"
                            : undefined,
                        top:
                          description &&
                          (icon || button) &&
                          (!icon || !button) &&
                          (state === "default" || state === "hover" || state === "focus")
                            ? "10px"
                            : undefined,
                        width:
                          state === "focus-tag" && !icon && !description && !button && !topRightCaption
                            ? "fit-content"
                            : description &&
                              (icon || button) &&
                              (!icon || !button) &&
                              (state === "default" || state === "hover" || state === "focus")
                            ? "30px"
                            : undefined,
                      }}
                    >
                      <React.Fragment>
                        {!icon &&
                          !topRightCaption &&
                          (description || !button) &&
                          (button || !description) &&
                          (description || state === "focus-tag") &&
                          (!button || state === "focus") && (
                            <React.Fragment>
                              <div
                                style={{
                                  color:
                                    (description || !button) &&
                                    (button || !description) &&
                                    (description || state === "focus-tag") &&
                                    (!button || state === "focus")
                                      ? "#1c2126"
                                      : undefined,
                                  fontFamily:
                                    (description || !button) &&
                                    (button || !description) &&
                                    (description || state === "focus-tag") &&
                                    (!button || state === "focus")
                                      ? "'Acid Grotesk TP-Normal', Helvetica"
                                      : undefined,
                                  fontSize:
                                    (description || !button) &&
                                    (button || !description) &&
                                    (description || state === "focus-tag") &&
                                    (!button || state === "focus")
                                      ? "14px"
                                      : undefined,
                                  fontWeight:
                                    (description || !button) &&
                                    (button || !description) &&
                                    (description || state === "focus-tag") &&
                                    (!button || state === "focus")
                                      ? "400"
                                      : undefined,
                                  letterSpacing:
                                    (description || !button) &&
                                    (button || !description) &&
                                    (description || state === "focus-tag") &&
                                    (!button || state === "focus")
                                      ? "0.28px"
                                      : undefined,
                                  lineHeight:
                                    (description || !button) &&
                                    (button || !description) &&
                                    (description || state === "focus-tag") &&
                                    (!button || state === "focus")
                                      ? "20px"
                                      : undefined,
                                  marginTop:
                                    (description || !button) &&
                                    (button || !description) &&
                                    (description || state === "focus-tag") &&
                                    (!button || state === "focus")
                                      ? "-1.00px"
                                      : undefined,
                                  whiteSpace:
                                    (description || !button) &&
                                    (button || !description) &&
                                    (description || state === "focus-tag") &&
                                    (!button || state === "focus")
                                      ? "nowrap"
                                      : undefined,
                                  width:
                                    (description || !button) &&
                                    (button || !description) &&
                                    (description || state === "focus-tag") &&
                                    (!button || state === "focus")
                                      ? "fit-content"
                                      : undefined,
                                }}
                              >
                                <React.Fragment>
                                  {(description || !button) &&
                                    (button || !description) &&
                                    (description || state === "focus-tag") &&
                                    (!button || state === "focus") && <React.Fragment>Tag description</React.Fragment>}
                                </React.Fragment>
                              </div>
                              <div
                                style={{
                                  backgroundColor: state === "focus" && description && button ? "#1c2126" : undefined,
                                  borderRadius: state === "focus-tag" && !description && !button ? "8px" : undefined,
                                  height:
                                    state === "focus-tag" && !description && !button
                                      ? "16px"
                                      : state === "focus" && description && button
                                      ? "20px"
                                      : undefined,
                                  marginRight: state === "focus" && description && button ? "-2.00px" : undefined,
                                  minWidth:
                                    state === "focus-tag" && !description && !button
                                      ? "16px"
                                      : state === "focus" && description && button
                                      ? "1px"
                                      : undefined,
                                  position: state === "focus-tag" && !description && !button ? "relative" : undefined,
                                }}
                              >
                                <React.Fragment>
                                  {state === "focus-tag" && !description && !button && (
                                    <React.Fragment>
                                      <img
                                        className={"input-fields-light-add"}
                                        src={
                                          "https://anima-uploads.s3.amazonaws.com/projects/63d17b550d6f95510a75a056/releases/63d25e1407823b44e634487b/img/add-6@2x.png"
                                        }
                                      />
                                    </React.Fragment>
                                  )}
                                </React.Fragment>
                              </div>
                            </React.Fragment>
                          )}

                        {description &&
                          (icon || button) &&
                          (!icon || !button) &&
                          (icon || topRightCaption || state === "hover" || state === "default") &&
                          (state === "focus" || state === "hover" || state === "default") && (
                            <React.Fragment>
                              <div
                                style={{
                                  alignItems:
                                    state === "focus" && !icon && button && topRightCaption ? "flex-start" : undefined,
                                  color:
                                    (icon || button) &&
                                    (!icon || !button) &&
                                    (icon || state === "default" || state === "hover")
                                      ? "#697f8f"
                                      : undefined,
                                  display: state === "focus" && !icon && button && topRightCaption ? "flex" : undefined,
                                  fontFamily:
                                    (icon || button) &&
                                    (!icon || !button) &&
                                    (icon || state === "default" || state === "hover")
                                      ? "'Acid Grotesk TP-Normal', Helvetica"
                                      : undefined,
                                  fontSize:
                                    (icon || button) &&
                                    (!icon || !button) &&
                                    (icon || state === "default" || state === "hover")
                                      ? "14px"
                                      : undefined,
                                  fontWeight:
                                    (icon || button) &&
                                    (!icon || !button) &&
                                    (icon || state === "default" || state === "hover")
                                      ? "400"
                                      : undefined,
                                  gap: state === "focus" && !icon && button && topRightCaption ? "1px" : undefined,
                                  letterSpacing:
                                    (icon || button) &&
                                    (!icon || !button) &&
                                    (icon || state === "default" || state === "hover")
                                      ? "0.28px"
                                      : undefined,
                                  lineHeight:
                                    (icon || button) &&
                                    (!icon || !button) &&
                                    (icon || state === "default" || state === "hover")
                                      ? "20px"
                                      : undefined,
                                  marginRight:
                                    (icon || button) &&
                                    (!icon || !button) &&
                                    (icon || state === "default" || state === "hover")
                                      ? "-141.00px"
                                      : undefined,
                                  marginTop:
                                    (icon || button) &&
                                    (!icon || !button) &&
                                    (icon || state === "default" || state === "hover")
                                      ? "-1.00px"
                                      : undefined,
                                  whiteSpace:
                                    (icon || button) &&
                                    (!icon || !button) &&
                                    (icon || state === "default" || state === "hover")
                                      ? "nowrap"
                                      : undefined,
                                  width:
                                    (icon || button) &&
                                    (!icon || !button) &&
                                    (icon || state === "default" || state === "hover")
                                      ? "fit-content"
                                      : state === "focus" && !icon && button && topRightCaption
                                      ? "30px"
                                      : undefined,
                                }}
                              >
                                <React.Fragment>
                                  {(icon || button) &&
                                    (!icon || !button) &&
                                    (icon || state === "hover" || state === "default") && (
                                      <React.Fragment>{text1}</React.Fragment>
                                    )}

                                  {state === "focus" && !icon && button && topRightCaption && (
                                    <React.Fragment>
                                      <div className={"input-fields-light-text-wrapper"}>Text</div>
                                      <div className={"input-fields-light-div"} />
                                    </React.Fragment>
                                  )}
                                </React.Fragment>
                              </div>
                            </React.Fragment>
                          )}
                      </React.Fragment>
                    </div>
                    <div
                      style={{
                        alignItems:
                          state === "focus-tag" && !icon && !description && !button && !topRightCaption
                            ? "flex-start"
                            : description &&
                              button &&
                              !icon &&
                              (state === "default" || state === "hover" || state === "focus")
                            ? "center"
                            : undefined,
                        display:
                          !icon &&
                          (description || !button) &&
                          (description || !topRightCaption) &&
                          (button || !description) &&
                          (description || state === "focus-tag") &&
                          (!button || state === "default" || state === "hover" || state === "focus")
                            ? "flex"
                            : undefined,
                        gap:
                          state === "focus-tag" && !icon && !description && !button && !topRightCaption
                            ? "1px"
                            : description &&
                              button &&
                              !icon &&
                              (state === "default" || state === "hover" || state === "focus")
                            ? "16px"
                            : undefined,
                        height:
                          icon &&
                          description &&
                          !button &&
                          (state === "default" || state === "hover" || state === "focus")
                            ? "16px"
                            : undefined,
                        justifyContent:
                          description &&
                          button &&
                          !icon &&
                          (state === "default" || state === "hover" || state === "focus")
                            ? "center"
                            : undefined,
                        left:
                          description &&
                          button &&
                          !icon &&
                          (state === "default" || state === "hover" || state === "focus")
                            ? "274px"
                            : icon &&
                              description &&
                              !button &&
                              (state === "default" || state === "hover" || state === "focus")
                            ? "338px"
                            : undefined,
                        position:
                          description &&
                          (icon || button) &&
                          (!icon || !button) &&
                          (state === "default" || state === "hover" || state === "focus")
                            ? "absolute"
                            : undefined,
                        top:
                          description &&
                          button &&
                          !icon &&
                          (state === "default" || state === "hover" || state === "focus")
                            ? "10px"
                            : icon &&
                              description &&
                              !button &&
                              (state === "default" || state === "hover" || state === "focus")
                            ? "12px"
                            : undefined,
                        width:
                          !icon &&
                          (description || !button) &&
                          (description || !topRightCaption) &&
                          (button || !description) &&
                          (description || state === "focus-tag") &&
                          (!button || state === "default" || state === "hover" || state === "focus")
                            ? "fit-content"
                            : icon &&
                              description &&
                              !button &&
                              (state === "default" || state === "hover" || state === "focus")
                            ? "16px"
                            : undefined,
                      }}
                    >
                      <React.Fragment>
                        {state === "focus-tag" && !icon && !description && !button && !topRightCaption && (
                          <React.Fragment>
                            <div className={"input-fields-light-text-wrapper"}>Text</div>
                            <div className={"input-fields-light-rectangle-2"} />
                          </React.Fragment>
                        )}

                        {description &&
                          button &&
                          !icon &&
                          (state === "focus" || state === "hover" || state === "default") && (
                            <React.Fragment>
                              <div className={"input-fields-light-text-wrapper"}>TAL</div>
                              <div className={"input-fields-light-rectangle-225"} />
                              <div className={"input-fields-light-max"}>Max</div>
                            </React.Fragment>
                          )}

                        {icon &&
                          description &&
                          !button &&
                          (state === "default" || state === "hover" || state === "focus") && (
                            <React.Fragment>
                              <div className={"input-fields-light-group"}>
                                <img
                                  className={"input-fields-light-polygon"}
                                  src={
                                    "https://anima-uploads.s3.amazonaws.com/projects/63d17b550d6f95510a75a056/releases/63d25e1407823b44e634487b/img/polygon-1@2x.png"
                                  }
                                />
                                <img
                                  className={"input-fields-light-polygon-2"}
                                  src={
                                    "https://anima-uploads.s3.amazonaws.com/projects/63d17b550d6f95510a75a056/releases/63d25e1407823b44e634487b/img/polygon-2@2x.png"
                                  }
                                />
                              </div>
                            </React.Fragment>
                          )}
                      </React.Fragment>
                    </div>
                  </React.Fragment>
                )}
              </React.Fragment>
            </div>
          </React.Fragment>
        )}

        {((label && bottomCaption && !icon && !description && !button && state === "focus" && size === "big") ||
          (label && bottomCaption && !icon && !description && !button && state === "hover" && size === "big") ||
          (label && bottomCaption && !icon && !description && !button && state === "default" && size === "big") ||
          (label && bottomCaption && !icon && !button && !topRightCaption && state === "focus" && size === "base") ||
          (label && bottomCaption && !icon && !button && !topRightCaption && state === "hover" && size === "base") ||
          (label && bottomCaption && !icon && !button && !topRightCaption && state === "default" && size === "base") ||
          (label &&
            icon &&
            description &&
            bottomCaption &&
            !button &&
            !topRightCaption &&
            state === "focus" &&
            size === "base") ||
          (label &&
            icon &&
            description &&
            bottomCaption &&
            !button &&
            !topRightCaption &&
            state === "hover" &&
            size === "base") ||
          (label &&
            icon &&
            description &&
            bottomCaption &&
            !button &&
            !topRightCaption &&
            state === "default" &&
            size === "base") ||
          (label &&
            description &&
            button &&
            bottomCaption &&
            !icon &&
            !topRightCaption &&
            state === "focus" &&
            size === "base") ||
          (label &&
            description &&
            button &&
            bottomCaption &&
            !icon &&
            !topRightCaption &&
            state === "hover" &&
            size === "base") ||
          (label &&
            description &&
            button &&
            bottomCaption &&
            !icon &&
            !topRightCaption &&
            state === "default" &&
            size === "base") ||
          (label &&
            description &&
            !icon &&
            !button &&
            !topRightCaption &&
            !bottomCaption &&
            state === "error" &&
            size === "base") ||
          (label &&
            bottomCaption &&
            !icon &&
            !description &&
            !button &&
            !topRightCaption &&
            state === "focus-tag" &&
            size === "base") ||
          (label &&
            bottomCaption &&
            !icon &&
            !description &&
            !button &&
            !topRightCaption &&
            state === "active" &&
            size === "base")) && (
          <React.Fragment>
            <div
              style={{
                alignItems:
                  (topRightCaption &&
                    bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    state === "default" &&
                    size === "big") ||
                  (topRightCaption &&
                    bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    state === "hover" &&
                    size === "big") ||
                  (topRightCaption &&
                    bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    state === "focus" &&
                    size === "big")
                    ? "center"
                    : undefined,
                alignSelf:
                  (topRightCaption &&
                    bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    state === "default" &&
                    size === "big") ||
                  (topRightCaption &&
                    bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    state === "hover" &&
                    size === "big") ||
                  (topRightCaption &&
                    bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    state === "focus" &&
                    size === "big")
                    ? "stretch"
                    : undefined,
                color:
                  (description &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description && bottomCaption && !icon && !topRightCaption && state === "hover" && size === "base") ||
                  (description && bottomCaption && !icon && !topRightCaption && state === "focus" && size === "base") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "default") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "hover") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "focus") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    !bottomCaption &&
                    state === "error" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "#1c2126"
                    : undefined,
                display:
                  (topRightCaption &&
                    bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    state === "default" &&
                    size === "big") ||
                  (topRightCaption &&
                    bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    state === "hover" &&
                    size === "big") ||
                  (topRightCaption &&
                    bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    state === "focus" &&
                    size === "big")
                    ? "flex"
                    : undefined,
                fontFamily:
                  (description &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description && bottomCaption && !icon && !topRightCaption && state === "hover" && size === "base") ||
                  (description && bottomCaption && !icon && !topRightCaption && state === "focus" && size === "base") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "default") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "hover") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "focus") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    !bottomCaption &&
                    state === "error" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "'Acid Grotesk TP-Bold', Helvetica"
                    : undefined,
                fontSize:
                  (description &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description && bottomCaption && !icon && !topRightCaption && state === "hover" && size === "base") ||
                  (description && bottomCaption && !icon && !topRightCaption && state === "focus" && size === "base") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "default") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "hover") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "focus") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    !bottomCaption &&
                    state === "error" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "14px"
                    : undefined,
                fontWeight:
                  (description &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description && bottomCaption && !icon && !topRightCaption && state === "hover" && size === "base") ||
                  (description && bottomCaption && !icon && !topRightCaption && state === "focus" && size === "base") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "default") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "hover") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "focus") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    !bottomCaption &&
                    state === "error" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "700"
                    : undefined,
                gap:
                  (topRightCaption &&
                    bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    state === "default" &&
                    size === "big") ||
                  (topRightCaption &&
                    bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    state === "hover" &&
                    size === "big") ||
                  (topRightCaption &&
                    bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    state === "focus" &&
                    size === "big")
                    ? "10px"
                    : undefined,
                justifyContent:
                  (topRightCaption &&
                    bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    state === "default" &&
                    size === "big") ||
                  (topRightCaption &&
                    bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    state === "hover" &&
                    size === "big") ||
                  (topRightCaption &&
                    bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    state === "focus" &&
                    size === "big")
                    ? "center"
                    : undefined,
                letterSpacing:
                  (description &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description && bottomCaption && !icon && !topRightCaption && state === "hover" && size === "base") ||
                  (description && bottomCaption && !icon && !topRightCaption && state === "focus" && size === "base") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "default") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "hover") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "focus") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    !bottomCaption &&
                    state === "error" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "0.28px"
                    : undefined,
                lineHeight:
                  (description &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description && bottomCaption && !icon && !topRightCaption && state === "hover" && size === "base") ||
                  (description && bottomCaption && !icon && !topRightCaption && state === "focus" && size === "base") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "default") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "hover") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "focus") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    !bottomCaption &&
                    state === "error" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "23.1px"
                    : undefined,
                marginTop:
                  (description &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description && bottomCaption && !icon && !topRightCaption && state === "hover" && size === "base") ||
                  (description && bottomCaption && !icon && !topRightCaption && state === "focus" && size === "base") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "default") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "hover") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "focus") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    !bottomCaption &&
                    state === "error" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "-1.00px"
                    : undefined,
                whiteSpace:
                  (description &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description && bottomCaption && !icon && !topRightCaption && state === "hover" && size === "base") ||
                  (description && bottomCaption && !icon && !topRightCaption && state === "focus" && size === "base") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "default") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "hover") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "focus") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    !bottomCaption &&
                    state === "error" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "nowrap"
                    : undefined,
                width:
                  (description &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description && bottomCaption && !icon && !topRightCaption && state === "hover" && size === "base") ||
                  (description && bottomCaption && !icon && !topRightCaption && state === "focus" && size === "base") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "default") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "hover") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "focus") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    !bottomCaption &&
                    state === "error" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "fit-content"
                    : undefined,
              }}
            >
              <React.Fragment>
                {((description &&
                  bottomCaption &&
                  !icon &&
                  !topRightCaption &&
                  state === "default" &&
                  size === "base") ||
                  (description && bottomCaption && !icon && !topRightCaption && state === "hover" && size === "base") ||
                  (description && bottomCaption && !icon && !topRightCaption && state === "focus" && size === "base") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "default") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "hover") ||
                  (bottomCaption && !icon && !description && !button && !topRightCaption && state === "focus") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    !bottomCaption &&
                    state === "error" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")) && <React.Fragment>{text}</React.Fragment>}

                {((topRightCaption &&
                  bottomCaption &&
                  !icon &&
                  !description &&
                  !button &&
                  state === "default" &&
                  size === "big") ||
                  (topRightCaption &&
                    bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    state === "hover" &&
                    size === "big") ||
                  (topRightCaption &&
                    bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    state === "focus" &&
                    size === "big")) && (
                  <React.Fragment>
                    <div className={"input-fields-light-text-wrapper-2"}>{text}</div>
                    <div className={"input-fields-light-top-right-caption"}>Top right caption</div>
                  </React.Fragment>
                )}
              </React.Fragment>
            </div>
            <div
              style={{
                alignItems:
                  (bottomCaption && !icon && !description && !button && state === "focus" && size === "big") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "flex-start"
                    : state === "focus-tag" &&
                      !icon &&
                      !description &&
                      !button &&
                      !topRightCaption &&
                      size === "base" &&
                      bottomCaption
                    ? "center"
                    : undefined,
                alignSelf:
                  (bottomCaption && !icon && !description && !button && state === "default" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "hover" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "focus" && size === "big") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "default" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "hover" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "focus" && size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    !icon &&
                    !button &&
                    !bottomCaption &&
                    !topRightCaption &&
                    state === "error" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "stretch"
                    : undefined,
                backgroundColor:
                  (bottomCaption && !icon && !description && !button && state === "focus" && size === "big") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "focus" && size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base")
                    ? "#fafafb03"
                    : undefined,
                border:
                  (bottomCaption && !icon && !description && !button && state === "default" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "hover" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "focus" && size === "big") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "default" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "hover" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "focus" && size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    !icon &&
                    !button &&
                    !bottomCaption &&
                    !topRightCaption &&
                    state === "error" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "1px solid"
                    : undefined,
                borderColor:
                  (bottomCaption && !icon && !description && !button && state === "default" && size === "big") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "default" && size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "#dadde1"
                    : (bottomCaption && !icon && !description && !button && state === "hover" && size === "big") ||
                      (bottomCaption && !icon && !description && !button && state === "focus" && size === "big") ||
                      (bottomCaption && !icon && !button && !topRightCaption && state === "hover" && size === "base") ||
                      (bottomCaption && !icon && !button && !topRightCaption && state === "focus" && size === "base") ||
                      (icon &&
                        description &&
                        bottomCaption &&
                        !button &&
                        !topRightCaption &&
                        state === "hover" &&
                        size === "base") ||
                      (icon &&
                        description &&
                        bottomCaption &&
                        !button &&
                        !topRightCaption &&
                        state === "focus" &&
                        size === "base") ||
                      (description &&
                        button &&
                        bottomCaption &&
                        !icon &&
                        !topRightCaption &&
                        state === "hover" &&
                        size === "base") ||
                      (description &&
                        button &&
                        bottomCaption &&
                        !icon &&
                        !topRightCaption &&
                        state === "focus" &&
                        size === "base") ||
                      (bottomCaption &&
                        !icon &&
                        !description &&
                        !button &&
                        !topRightCaption &&
                        state === "focus-tag" &&
                        size === "base")
                    ? "#7857ed"
                    : state === "error" &&
                      !icon &&
                      description &&
                      !button &&
                      !topRightCaption &&
                      size === "base" &&
                      !bottomCaption
                    ? "#ff2222"
                    : undefined,
                borderRadius:
                  (bottomCaption && !icon && !description && !button && state === "default" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "hover" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "focus" && size === "big") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "default" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "hover" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "focus" && size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "8px"
                    : state === "error" &&
                      !icon &&
                      description &&
                      !button &&
                      !topRightCaption &&
                      size === "base" &&
                      !bottomCaption
                    ? "4px"
                    : undefined,
                boxShadow:
                  (bottomCaption && !icon && !description && !button && state === "focus" && size === "big") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "focus" && size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base")
                    ? "0px 0px 0px 3px #eeeaff"
                    : undefined,
                display:
                  (bottomCaption && !icon && !description && !button && state === "focus" && size === "big") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "flex"
                    : undefined,
                gap:
                  (bottomCaption && !icon && !description && !button && state === "focus" && size === "big") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "10px"
                    : undefined,
                height:
                  bottomCaption &&
                  !icon &&
                  !description &&
                  !button &&
                  size === "big" &&
                  (state === "default" || state === "hover" || state === "focus")
                    ? "80px"
                    : (bottomCaption && !icon && !button && !topRightCaption && state === "focus" && size === "base") ||
                      (bottomCaption && !icon && !button && !topRightCaption && state === "hover" && size === "base") ||
                      (bottomCaption &&
                        !icon &&
                        !button &&
                        !topRightCaption &&
                        state === "default" &&
                        size === "base") ||
                      (icon &&
                        description &&
                        bottomCaption &&
                        !button &&
                        !topRightCaption &&
                        state === "focus" &&
                        size === "base") ||
                      (icon &&
                        description &&
                        bottomCaption &&
                        !button &&
                        !topRightCaption &&
                        state === "hover" &&
                        size === "base") ||
                      (icon &&
                        description &&
                        bottomCaption &&
                        !button &&
                        !topRightCaption &&
                        state === "default" &&
                        size === "base") ||
                      (description &&
                        button &&
                        bottomCaption &&
                        !icon &&
                        !topRightCaption &&
                        state === "focus" &&
                        size === "base") ||
                      (description &&
                        button &&
                        bottomCaption &&
                        !icon &&
                        !topRightCaption &&
                        state === "hover" &&
                        size === "base") ||
                      (description &&
                        button &&
                        bottomCaption &&
                        !icon &&
                        !topRightCaption &&
                        state === "default" &&
                        size === "base") ||
                      (description &&
                        !icon &&
                        !button &&
                        !topRightCaption &&
                        !bottomCaption &&
                        state === "error" &&
                        size === "base")
                    ? "40px"
                    : undefined,
                minWidth:
                  (description && bottomCaption && !icon && !topRightCaption && state === "focus" && size === "base") ||
                  (bottomCaption && !icon && !description && !button && state === "default" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "hover" && size === "big") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "default" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "hover" && size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (description &&
                    !icon &&
                    !button &&
                    !bottomCaption &&
                    !topRightCaption &&
                    state === "error" &&
                    size === "base")
                    ? "370px"
                    : undefined,
                overflow:
                  (description &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description && bottomCaption && !icon && !topRightCaption && state === "hover" && size === "base") ||
                  (bottomCaption && !icon && !description && !button && state === "focus" && size === "big") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "focus" && size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    !icon &&
                    !button &&
                    !bottomCaption &&
                    !topRightCaption &&
                    state === "error" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "hidden"
                    : undefined,
                padding:
                  (bottomCaption && !icon && !description && !button && state === "focus" && size === "big") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "10px"
                    : state === "focus-tag" &&
                      !icon &&
                      !description &&
                      !button &&
                      !topRightCaption &&
                      size === "base" &&
                      bottomCaption
                    ? "8px 10px"
                    : undefined,
                position:
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base")
                    ? "relative"
                    : undefined,
              }}
            >
              <React.Fragment>
                {((bottomCaption && !icon && !description && !button && state === "focus" && size === "big") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "focus" && size === "base") ||
                  (description &&
                    bottomCaption &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    bottomCaption &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (description &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    !bottomCaption &&
                    state === "error" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")) && (
                  <React.Fragment>
                    <div
                      style={{
                        alignItems:
                          (bottomCaption && !description && state === "focus" && size === "big") ||
                          (bottomCaption && !topRightCaption && state === "focus" && size === "base") ||
                          (description &&
                            bottomCaption &&
                            !topRightCaption &&
                            state === "default" &&
                            size === "base") ||
                          (description && bottomCaption && !topRightCaption && state === "hover" && size === "base") ||
                          (description && !bottomCaption && !topRightCaption && state === "error" && size === "base") ||
                          (bottomCaption && !description && !topRightCaption && state === "active" && size === "base")
                            ? "flex-start"
                            : state === "focus-tag" &&
                              !description &&
                              !topRightCaption &&
                              size === "base" &&
                              bottomCaption
                            ? "center"
                            : undefined,
                        display:
                          (bottomCaption && !description && state === "focus" && size === "big") ||
                          (bottomCaption && !topRightCaption && state === "focus" && size === "base") ||
                          (description &&
                            bottomCaption &&
                            !topRightCaption &&
                            state === "default" &&
                            size === "base") ||
                          (description && bottomCaption && !topRightCaption && state === "hover" && size === "base") ||
                          (description && !bottomCaption && !topRightCaption && state === "error" && size === "base") ||
                          (bottomCaption &&
                            !description &&
                            !topRightCaption &&
                            state === "focus-tag" &&
                            size === "base") ||
                          (bottomCaption && !description && !topRightCaption && state === "active" && size === "base")
                            ? "flex"
                            : undefined,
                        gap:
                          (bottomCaption && !description && state === "focus" && size === "big") ||
                          (bottomCaption && !topRightCaption && state === "focus" && size === "base") ||
                          (description &&
                            bottomCaption &&
                            !topRightCaption &&
                            state === "default" &&
                            size === "base") ||
                          (description && bottomCaption && !topRightCaption && state === "hover" && size === "base") ||
                          (description && !bottomCaption && !topRightCaption && state === "error" && size === "base") ||
                          (bottomCaption && !description && !topRightCaption && state === "active" && size === "base")
                            ? "1px"
                            : state === "focus-tag" &&
                              !description &&
                              !topRightCaption &&
                              size === "base" &&
                              bottomCaption
                            ? "4px"
                            : undefined,
                        justifyContent:
                          state === "focus-tag" && !description && !topRightCaption && size === "base" && bottomCaption
                            ? "center"
                            : undefined,
                        left:
                          description &&
                          !topRightCaption &&
                          size === "base" &&
                          (bottomCaption || state === "error") &&
                          (!bottomCaption || state === "default" || state === "hover" || state === "focus")
                            ? "10px"
                            : undefined,
                        marginBottom:
                          state === "focus" && !description && !topRightCaption && size === "base" && bottomCaption
                            ? "-1.00px"
                            : undefined,
                        position:
                          description &&
                          !topRightCaption &&
                          size === "base" &&
                          (bottomCaption || state === "error") &&
                          (!bottomCaption || state === "default" || state === "hover" || state === "focus")
                            ? "relative"
                            : undefined,
                        top:
                          description &&
                          !topRightCaption &&
                          size === "base" &&
                          (bottomCaption || state === "error") &&
                          (!bottomCaption || state === "default" || state === "hover" || state === "focus")
                            ? "10px"
                            : undefined,
                        width:
                          bottomCaption &&
                          !description &&
                          (!topRightCaption || state === "focus") &&
                          (!topRightCaption || size === "big") &&
                          (state === "focus" || size === "base") &&
                          (size === "big" || size === "base") &&
                          (state === "focus" || state === "focus-tag" || state === "active")
                            ? "fit-content"
                            : description &&
                              !topRightCaption &&
                              size === "base" &&
                              (bottomCaption || state === "error") &&
                              (!bottomCaption || state === "default" || state === "hover" || state === "focus")
                            ? "30px"
                            : undefined,
                      }}
                    >
                      <React.Fragment>
                        {bottomCaption &&
                          !description &&
                          (!topRightCaption || state === "focus") &&
                          (!topRightCaption || size === "big") &&
                          (state === "focus-tag" || state === "focus") &&
                          (state === "focus" || size === "base") &&
                          (size === "base" || size === "big") && (
                            <React.Fragment>
                              <div
                                style={{
                                  alignItems:
                                    state === "focus-tag" && !topRightCaption && size === "base"
                                      ? "flex-start"
                                      : undefined,
                                  color:
                                    state === "focus" &&
                                    (!topRightCaption || size === "big") &&
                                    (size === "big" || size === "base")
                                      ? "#1c2126"
                                      : undefined,
                                  display:
                                    state === "focus-tag" && !topRightCaption && size === "base" ? "flex" : undefined,
                                  fontFamily:
                                    state === "focus" &&
                                    (!topRightCaption || size === "big") &&
                                    (size === "big" || size === "base")
                                      ? "'Acid Grotesk TP-Normal', Helvetica"
                                      : undefined,
                                  fontSize:
                                    state === "focus" &&
                                    (!topRightCaption || size === "big") &&
                                    (size === "big" || size === "base")
                                      ? "14px"
                                      : undefined,
                                  fontWeight:
                                    state === "focus" &&
                                    (!topRightCaption || size === "big") &&
                                    (size === "big" || size === "base")
                                      ? "400"
                                      : undefined,
                                  gap: state === "focus-tag" && !topRightCaption && size === "base" ? "4px" : undefined,
                                  letterSpacing:
                                    state === "focus" &&
                                    (!topRightCaption || size === "big") &&
                                    (size === "big" || size === "base")
                                      ? "0.28px"
                                      : undefined,
                                  lineHeight:
                                    state === "focus" &&
                                    (!topRightCaption || size === "big") &&
                                    (size === "big" || size === "base")
                                      ? "20px"
                                      : undefined,
                                  marginTop:
                                    state === "focus" &&
                                    (!topRightCaption || size === "big") &&
                                    (size === "big" || size === "base")
                                      ? "-1.00px"
                                      : undefined,
                                  whiteSpace:
                                    state === "focus" &&
                                    (!topRightCaption || size === "big") &&
                                    (size === "big" || size === "base")
                                      ? "nowrap"
                                      : undefined,
                                  width:
                                    (!topRightCaption || state === "focus") &&
                                    (!topRightCaption || size === "big") &&
                                    (state === "focus" || size === "base") &&
                                    (size === "big" || size === "base")
                                      ? "fit-content"
                                      : undefined,
                                }}
                              >
                                <React.Fragment>
                                  {state === "focus" &&
                                    (!topRightCaption || size === "big") &&
                                    (size === "base" || size === "big") && <React.Fragment>Text</React.Fragment>}

                                  {state === "focus-tag" && !topRightCaption && size === "base" && (
                                    <React.Fragment>
                                      <article className={"input-fields-light-tags-input-light"}>
                                        <div className={"input-fields-light-text-wrapper"}>Tag description</div>
                                        <div className={"input-fields-light-group-1"}>
                                          <img
                                            className={"input-fields-light-add"}
                                            src={
                                              "https://anima-uploads.s3.amazonaws.com/projects/63d17b550d6f95510a75a056/releases/63d25e1407823b44e634487b/img/add-6@2x.png"
                                            }
                                          />
                                        </div>
                                      </article>
                                      <article className={"input-fields-light-tags-input-light"}>
                                        <div className={"input-fields-light-text-wrapper"}>Tag description</div>
                                        <div className={"input-fields-light-group-1"}>
                                          <img
                                            className={"input-fields-light-add"}
                                            src={
                                              "https://anima-uploads.s3.amazonaws.com/projects/63d17b550d6f95510a75a056/releases/63d25e1407823b44e634487b/img/add-6@2x.png"
                                            }
                                          />
                                        </div>
                                      </article>
                                    </React.Fragment>
                                  )}
                                </React.Fragment>
                              </div>
                              <div
                                style={{
                                  alignItems:
                                    state === "focus-tag" && !topRightCaption && size === "base"
                                      ? "flex-start"
                                      : undefined,
                                  backgroundColor:
                                    state === "focus" &&
                                    (!topRightCaption || size === "big") &&
                                    (size === "big" || size === "base")
                                      ? "#1c2126"
                                      : undefined,
                                  display:
                                    state === "focus-tag" && !topRightCaption && size === "base" ? "flex" : undefined,
                                  gap: state === "focus-tag" && !topRightCaption && size === "base" ? "1px" : undefined,
                                  height:
                                    state === "focus" &&
                                    (!topRightCaption || size === "big") &&
                                    (size === "big" || size === "base")
                                      ? "21px"
                                      : undefined,
                                  minWidth:
                                    state === "focus" &&
                                    (!topRightCaption || size === "big") &&
                                    (size === "big" || size === "base")
                                      ? "1px"
                                      : undefined,
                                  width:
                                    state === "focus-tag" && !topRightCaption && size === "base"
                                      ? "fit-content"
                                      : undefined,
                                }}
                              >
                                <React.Fragment>
                                  {state === "focus-tag" && !topRightCaption && size === "base" && (
                                    <React.Fragment>
                                      <div className={"input-fields-light-text-wrapper"}>Text</div>
                                      <div className={"input-fields-light-rectangle-2"} />
                                    </React.Fragment>
                                  )}
                                </React.Fragment>
                              </div>
                            </React.Fragment>
                          )}

                        {((description &&
                          bottomCaption &&
                          !topRightCaption &&
                          state === "default" &&
                          size === "base") ||
                          (description && bottomCaption && !topRightCaption && state === "hover" && size === "base") ||
                          (description && bottomCaption && !topRightCaption && state === "focus" && size === "base") ||
                          (description && !topRightCaption && !bottomCaption && state === "error" && size === "base") ||
                          (bottomCaption &&
                            !description &&
                            !topRightCaption &&
                            state === "active" &&
                            size === "base")) && (
                          <React.Fragment>
                            <div
                              style={{
                                color:
                                  state === "active" && !description && bottomCaption
                                    ? "#1c2126"
                                    : description &&
                                      (bottomCaption || state === "error") &&
                                      (!bottomCaption || state === "default" || state === "hover" || state === "focus")
                                    ? "#697f8f"
                                    : undefined,
                                fontFamily:
                                  (description || bottomCaption) &&
                                  (description || state === "active") &&
                                  (bottomCaption || state === "error") &&
                                  (!description ||
                                    !bottomCaption ||
                                    state === "default" ||
                                    state === "hover" ||
                                    state === "focus")
                                    ? "'Acid Grotesk TP-Normal', Helvetica"
                                    : undefined,
                                fontSize:
                                  (description || bottomCaption) &&
                                  (description || state === "active") &&
                                  (bottomCaption || state === "error") &&
                                  (!description ||
                                    !bottomCaption ||
                                    state === "default" ||
                                    state === "hover" ||
                                    state === "focus")
                                    ? "14px"
                                    : undefined,
                                fontWeight:
                                  (description || bottomCaption) &&
                                  (description || state === "active") &&
                                  (bottomCaption || state === "error") &&
                                  (!description ||
                                    !bottomCaption ||
                                    state === "default" ||
                                    state === "hover" ||
                                    state === "focus")
                                    ? "400"
                                    : undefined,
                                letterSpacing:
                                  (description || bottomCaption) &&
                                  (description || state === "active") &&
                                  (bottomCaption || state === "error") &&
                                  (!description ||
                                    !bottomCaption ||
                                    state === "default" ||
                                    state === "hover" ||
                                    state === "focus")
                                    ? "0.28px"
                                    : undefined,
                                lineHeight:
                                  (description || bottomCaption) &&
                                  (description || state === "active") &&
                                  (bottomCaption || state === "error") &&
                                  (!description ||
                                    !bottomCaption ||
                                    state === "default" ||
                                    state === "hover" ||
                                    state === "focus")
                                    ? "20px"
                                    : undefined,
                                marginRight:
                                  description &&
                                  (bottomCaption || state === "error") &&
                                  (!bottomCaption || state === "default" || state === "hover" || state === "focus")
                                    ? "-141.00px"
                                    : undefined,
                                marginTop:
                                  (description || bottomCaption) &&
                                  (description || state === "active") &&
                                  (bottomCaption || state === "error") &&
                                  (!description ||
                                    !bottomCaption ||
                                    state === "default" ||
                                    state === "hover" ||
                                    state === "focus")
                                    ? "-1.00px"
                                    : undefined,
                                whiteSpace:
                                  (description || bottomCaption) &&
                                  (description || state === "active") &&
                                  (bottomCaption || state === "error") &&
                                  (!description ||
                                    !bottomCaption ||
                                    state === "default" ||
                                    state === "hover" ||
                                    state === "focus")
                                    ? "nowrap"
                                    : undefined,
                                width:
                                  (description || bottomCaption) &&
                                  (description || state === "active") &&
                                  (bottomCaption || state === "error") &&
                                  (!description ||
                                    !bottomCaption ||
                                    state === "default" ||
                                    state === "hover" ||
                                    state === "focus")
                                    ? "fit-content"
                                    : undefined,
                              }}
                            >
                              <React.Fragment>
                                {(description || bottomCaption) &&
                                  (description || state === "active") &&
                                  (bottomCaption || state === "error") &&
                                  (!description ||
                                    !bottomCaption ||
                                    state === "default" ||
                                    state === "hover" ||
                                    state === "focus") && <React.Fragment>Text</React.Fragment>}
                              </React.Fragment>
                            </div>
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    </div>
                  </React.Fragment>
                )}

                {((icon &&
                  description &&
                  bottomCaption &&
                  !button &&
                  !topRightCaption &&
                  state === "focus" &&
                  size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base")) && (
                  <React.Fragment>
                    <div
                      style={{
                        alignItems: (icon && !button) || (button && !icon) ? "flex-start" : undefined,
                        display: (icon && !button) || (button && !icon) ? "flex" : undefined,
                        gap: (icon && !button) || (button && !icon) ? "1px" : undefined,
                        left: (icon && !button) || (button && !icon) ? "10px" : undefined,
                        position: (icon && !button) || (button && !icon) ? "absolute" : undefined,
                        top: (icon && !button) || (button && !icon) ? "10px" : undefined,
                        width: (icon && !button) || (button && !icon) ? "30px" : undefined,
                      }}
                    >
                      <React.Fragment>
                        {state === "focus" && !icon && button && (
                          <React.Fragment>
                            <div className={"input-fields-light-text-wrapper"}>Text</div>
                            <div className={"input-fields-light-div"} />
                          </React.Fragment>
                        )}

                        {(icon || button) && (!icon || !button) && (icon || state === "hover" || state === "default") && (
                          <React.Fragment>
                            <div
                              style={{
                                color:
                                  (icon || button) &&
                                  (!icon || !button) &&
                                  (icon || state === "hover" || state === "default")
                                    ? "#697f8f"
                                    : undefined,
                                fontFamily:
                                  (icon || button) &&
                                  (!icon || !button) &&
                                  (icon || state === "hover" || state === "default")
                                    ? "'Acid Grotesk TP-Normal', Helvetica"
                                    : undefined,
                                fontSize:
                                  (icon || button) &&
                                  (!icon || !button) &&
                                  (icon || state === "hover" || state === "default")
                                    ? "14px"
                                    : undefined,
                                fontWeight:
                                  (icon || button) &&
                                  (!icon || !button) &&
                                  (icon || state === "hover" || state === "default")
                                    ? "400"
                                    : undefined,
                                letterSpacing:
                                  (icon || button) &&
                                  (!icon || !button) &&
                                  (icon || state === "hover" || state === "default")
                                    ? "0.28px"
                                    : undefined,
                                lineHeight:
                                  (icon || button) &&
                                  (!icon || !button) &&
                                  (icon || state === "hover" || state === "default")
                                    ? "20px"
                                    : undefined,
                                marginRight:
                                  (icon || button) &&
                                  (!icon || !button) &&
                                  (icon || state === "hover" || state === "default")
                                    ? "-141.00px"
                                    : undefined,
                                marginTop:
                                  (icon || button) &&
                                  (!icon || !button) &&
                                  (icon || state === "hover" || state === "default")
                                    ? "-1.00px"
                                    : undefined,
                                whiteSpace:
                                  (icon || button) &&
                                  (!icon || !button) &&
                                  (icon || state === "hover" || state === "default")
                                    ? "nowrap"
                                    : undefined,
                                width:
                                  (icon || button) &&
                                  (!icon || !button) &&
                                  (icon || state === "hover" || state === "default")
                                    ? "fit-content"
                                    : undefined,
                              }}
                            >
                              <React.Fragment>
                                {(icon || button) &&
                                  (!icon || !button) &&
                                  (icon || state === "hover" || state === "default") && (
                                    <React.Fragment>{text1}</React.Fragment>
                                  )}
                              </React.Fragment>
                            </div>
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    </div>
                    <div
                      style={{
                        alignItems: !icon && button ? "center" : undefined,
                        display: !icon && button ? "flex" : undefined,
                        gap: !icon && button ? "16px" : undefined,
                        height: icon && !button ? "16px" : undefined,
                        justifyContent: !icon && button ? "center" : undefined,
                        left: !icon && button ? "274px" : icon && !button ? "338px" : undefined,
                        position: (icon && !button) || (button && !icon) ? "absolute" : undefined,
                        top: !icon && button ? "10px" : icon && !button ? "12px" : undefined,
                        width: !icon && button ? "fit-content" : icon && !button ? "16px" : undefined,
                      }}
                    >
                      <React.Fragment>
                        {!icon && button && (
                          <React.Fragment>
                            <div className={"input-fields-light-text-wrapper"}>TAL</div>
                            <div className={"input-fields-light-rectangle-225"} />
                            <div className={"input-fields-light-max"}>Max</div>
                          </React.Fragment>
                        )}

                        {icon && !button && (
                          <React.Fragment>
                            <div className={"input-fields-light-group"}>
                              <img
                                className={"input-fields-light-polygon"}
                                src={
                                  "https://anima-uploads.s3.amazonaws.com/projects/63d17b550d6f95510a75a056/releases/63d25e1407823b44e634487b/img/polygon-1@2x.png"
                                }
                              />
                              <img
                                className={"input-fields-light-polygon-2"}
                                src={
                                  "https://anima-uploads.s3.amazonaws.com/projects/63d17b550d6f95510a75a056/releases/63d25e1407823b44e634487b/img/polygon-2@2x.png"
                                }
                              />
                            </div>
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    </div>
                  </React.Fragment>
                )}
              </React.Fragment>
            </div>
            <div
              style={{
                alignSelf:
                  (bottomCaption && !icon && !description && !button && state === "default" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "hover" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "focus" && size === "big") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "default" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "hover" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "focus" && size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    !icon &&
                    !button &&
                    !bottomCaption &&
                    !topRightCaption &&
                    state === "error" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "stretch"
                    : undefined,
                color:
                  (bottomCaption && !icon && !description && !button && state === "default" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "hover" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "focus" && size === "big") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "default" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "hover" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "focus" && size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "#697f8f"
                    : state === "error" &&
                      !icon &&
                      description &&
                      !button &&
                      !topRightCaption &&
                      size === "base" &&
                      !bottomCaption
                    ? "#ff2222"
                    : undefined,
                fontFamily:
                  (bottomCaption && !icon && !description && !button && state === "default" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "hover" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "focus" && size === "big") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "default" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "hover" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "focus" && size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    !icon &&
                    !button &&
                    !bottomCaption &&
                    !topRightCaption &&
                    state === "error" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "'Acid Grotesk TP-Normal', Helvetica"
                    : undefined,
                fontSize:
                  (bottomCaption && !icon && !description && !button && state === "default" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "hover" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "focus" && size === "big") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "default" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "hover" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "focus" && size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    !icon &&
                    !button &&
                    !bottomCaption &&
                    !topRightCaption &&
                    state === "error" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "14px"
                    : undefined,
                fontWeight:
                  (bottomCaption && !icon && !description && !button && state === "default" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "hover" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "focus" && size === "big") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "default" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "hover" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "focus" && size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    !icon &&
                    !button &&
                    !bottomCaption &&
                    !topRightCaption &&
                    state === "error" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "400"
                    : undefined,
                letterSpacing:
                  (bottomCaption && !icon && !description && !button && state === "default" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "hover" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "focus" && size === "big") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "default" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "hover" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "focus" && size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    !icon &&
                    !button &&
                    !bottomCaption &&
                    !topRightCaption &&
                    state === "error" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "0.28px"
                    : undefined,
                lineHeight:
                  (bottomCaption && !icon && !description && !button && state === "default" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "hover" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "focus" && size === "big") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "default" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "hover" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "focus" && size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    !icon &&
                    !button &&
                    !bottomCaption &&
                    !topRightCaption &&
                    state === "error" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "23.1px"
                    : undefined,
                whiteSpace:
                  (bottomCaption && !icon && !description && !button && state === "default" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "hover" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "focus" && size === "big") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "default" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "hover" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "focus" && size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    !icon &&
                    !button &&
                    !bottomCaption &&
                    !topRightCaption &&
                    state === "error" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")
                    ? "nowrap"
                    : undefined,
              }}
            >
              <React.Fragment>
                {((bottomCaption && !icon && !description && !button && state === "focus" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "hover" && size === "big") ||
                  (bottomCaption && !icon && !description && !button && state === "default" && size === "big") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "focus" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "hover" && size === "base") ||
                  (bottomCaption && !icon && !button && !topRightCaption && state === "default" && size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (icon &&
                    description &&
                    bottomCaption &&
                    !button &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "focus" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "hover" &&
                    size === "base") ||
                  (description &&
                    button &&
                    bottomCaption &&
                    !icon &&
                    !topRightCaption &&
                    state === "default" &&
                    size === "base") ||
                  (description &&
                    !icon &&
                    !button &&
                    !topRightCaption &&
                    !bottomCaption &&
                    state === "error" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "focus-tag" &&
                    size === "base") ||
                  (bottomCaption &&
                    !icon &&
                    !description &&
                    !button &&
                    !topRightCaption &&
                    state === "active" &&
                    size === "base")) && <React.Fragment>Short caption</React.Fragment>}
              </React.Fragment>
            </div>
          </React.Fragment>
        )}

        {((description &&
          !label &&
          !button &&
          !topRightCaption &&
          !bottomCaption &&
          state === "focus" &&
          size === "base") ||
          (!label &&
            !icon &&
            !button &&
            !topRightCaption &&
            !bottomCaption &&
            state === "default" &&
            size === "base") ||
          (!label && !icon && !button && !topRightCaption && !bottomCaption && state === "hover" && size === "base") ||
          (icon &&
            description &&
            !label &&
            !button &&
            !topRightCaption &&
            !bottomCaption &&
            state === "default" &&
            size === "base") ||
          (icon &&
            description &&
            !label &&
            !button &&
            !topRightCaption &&
            !bottomCaption &&
            state === "hover" &&
            size === "base") ||
          (description &&
            button &&
            !label &&
            !icon &&
            !topRightCaption &&
            !bottomCaption &&
            state === "default" &&
            size === "base") ||
          (description &&
            button &&
            !label &&
            !icon &&
            !topRightCaption &&
            !bottomCaption &&
            state === "hover" &&
            size === "base") ||
          (description &&
            button &&
            !label &&
            !icon &&
            !topRightCaption &&
            !bottomCaption &&
            state === "focus" &&
            size === "base") ||
          (!label &&
            !icon &&
            !description &&
            !button &&
            !topRightCaption &&
            !bottomCaption &&
            state === "focus" &&
            size === "base")) && (
          <React.Fragment>
            <div
              style={{
                alignItems:
                  !button && (description || !icon) && (description || state === "focus") ? "flex-start" : undefined,
                alignSelf:
                  (description || !icon) &&
                  (description || !button) &&
                  (!icon || !button) &&
                  (button || state === "hover" || state === "default" || state === "focus")
                    ? "stretch"
                    : undefined,
                backgroundColor:
                  state === "focus" && (description || !icon) && (description || !button) && (!icon || !button)
                    ? "#fafafb03"
                    : undefined,
                border:
                  (description || !icon) &&
                  (description || !button) &&
                  (!icon || !button) &&
                  (button || state === "hover" || state === "default" || state === "focus")
                    ? "1px solid"
                    : undefined,
                borderColor:
                  state === "default" && (description || !icon) && (description || !button) && (!icon || !button)
                    ? "#dadde1"
                    : (description || !icon) &&
                      (description || !button) &&
                      (!icon || !button) &&
                      (state === "hover" || state === "focus")
                    ? "#7857ed"
                    : undefined,
                borderRadius:
                  (description || !icon) &&
                  (description || !button) &&
                  (!icon || !button) &&
                  (button || state === "hover" || state === "default" || state === "focus")
                    ? "8px"
                    : undefined,
                boxShadow:
                  state === "focus" && (description || !icon) && (description || !button) && (!icon || !button)
                    ? "0px 0px 0px 3px #eeeaff"
                    : undefined,
                display: !button && (description || !icon) && (description || state === "focus") ? "flex" : undefined,
                gap: !button && (description || !icon) && (description || state === "focus") ? "10px" : undefined,
                height:
                  !icon &&
                  (description || !button) &&
                  (button || !description) &&
                  (description || state === "default" || state === "hover")
                    ? "40px"
                    : undefined,
                minWidth:
                  !icon &&
                  (description || !button) &&
                  (button || !description) &&
                  (description || state === "default" || state === "hover")
                    ? "370px"
                    : undefined,
                overflow:
                  (description || !icon) &&
                  (description || !button) &&
                  (button || state === "focus") &&
                  (!icon || !button)
                    ? "hidden"
                    : undefined,
                padding:
                  !icon &&
                  !button &&
                  (description || state === "focus") &&
                  (state === "hover" || state === "default" || state === "focus")
                    ? "10px"
                    : icon && description && !button
                    ? "10px 16px"
                    : undefined,
                position: !icon && description && button ? "relative" : undefined,
              }}
            >
              <React.Fragment>
                {!button && (description || !icon) && (description || state === "focus") && (
                  <React.Fragment>
                    <div
                      style={{
                        alignItems:
                          icon && description ? "center" : state === "focus" && !icon ? "flex-start" : undefined,
                        color:
                          description && !icon && (state === "hover" || state === "default") ? "#697f8f" : undefined,
                        display:
                          (description || !icon) &&
                          (icon || state === "focus") &&
                          (state === "default" || state === "hover" || state === "focus")
                            ? "flex"
                            : undefined,
                        fontFamily:
                          state === "hover" && !icon && description
                            ? "'Acid Grotesk TP-Normal', Helvetica"
                            : state === "default" && !icon && description
                            ? "'Plus Jakarta Sans', Helvetica"
                            : undefined,
                        fontSize:
                          description && !icon && (state === "hover" || state === "default") ? "14px" : undefined,
                        fontWeight:
                          description && !icon && (state === "hover" || state === "default") ? "400" : undefined,
                        gap: icon && description ? "8px" : state === "focus" && !icon ? "1px" : undefined,
                        letterSpacing:
                          description && !icon && (state === "hover" || state === "default") ? "0.28px" : undefined,
                        lineHeight:
                          description && !icon && (state === "hover" || state === "default") ? "20px" : undefined,
                        marginTop:
                          description && !icon && (state === "hover" || state === "default") ? "-1.00px" : undefined,
                        whiteSpace:
                          description && !icon && (state === "hover" || state === "default") ? "nowrap" : undefined,
                        width: description || (!icon && state === "focus") ? "fit-content" : undefined,
                      }}
                    >
                      <React.Fragment>
                        {description && !icon && (state === "hover" || state === "default") && (
                          <React.Fragment>Text</React.Fragment>
                        )}

                        {icon && description && (
                          <React.Fragment>
                            <img
                              className={"input-fields-light-img"}
                              src={
                                "https://anima-uploads.s3.amazonaws.com/projects/63d17b550d6f95510a75a056/releases/63d25e1407823b44e634487b/img/search-2@2x.png"
                              }
                            />
                            <div className={"input-fields-light-text-1-105"}>Text</div>
                          </React.Fragment>
                        )}

                        {state === "focus" && !icon && (
                          <React.Fragment>
                            <div className={"input-fields-light-text-wrapper"}>Text</div>
                            <div className={"input-fields-light-rectangle"} />
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    </div>
                  </React.Fragment>
                )}

                {!icon && description && button && (
                  <React.Fragment>
                    <div className={"input-fields-light-frame"}>
                      <React.Fragment>
                        {state === "focus" && (
                          <React.Fragment>
                            <div className={"input-fields-light-text-wrapper"}>Text</div>
                            <div className={"input-fields-light-div"} />
                          </React.Fragment>
                        )}

                        {(state === "hover" || state === "default") && (
                          <React.Fragment>
                            <div className={"input-fields-light-please-enter-the-amount"}>{text1}</div>
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    </div>
                    <div className={"input-fields-light-frame-1"}>
                      <div className={"input-fields-light-text-wrapper"}>TAL</div>
                      <div className={"input-fields-light-rectangle-225"} />
                      <div className={"input-fields-light-max"}>Max</div>
                    </div>
                  </React.Fragment>
                )}
              </React.Fragment>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    </div>
  );
};
