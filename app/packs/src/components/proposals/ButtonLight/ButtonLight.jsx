import React from "react";
import { ButtonLabelLight } from "../ButtonLabelLight";

export const ButtonLight = ({
  size,
  hierarchy,
  layout,
  state,
  onClick,
  stretched,
  buttonLabelLightText = "Button",
  text = "Button",
}) => {
  return (
    <div
    onClick={onClick}
      style={{
        alignItems:
          (stretched && size === "small") ||
          (stretched && size === "medium") ||
          (!stretched && state === "focus") ||
          (!stretched && state === "hover") ||
          (!stretched && state === "default") ||
          (size === "large" && state === "pressed") ||
          (stretched && size === "large" && state === "focus") ||
          (stretched && size === "large" && state === "hover") ||
          (stretched && size === "large" && state === "default") ||
          (!stretched && size === "small" && state === "pressed") ||
          (!stretched && size === "medium" && state === "pressed") ||
          (!stretched && state === "disable" && hierarchy === "secondary") ||
          (!stretched && state === "disable" && hierarchy === "tertiary") ||
          (size === "large" && state === "disable" && hierarchy === "primary") ||
          (size === "large" && state === "disable" && hierarchy === "danger") ||
          (stretched && size === "large" && state === "disable" && hierarchy === "secondary") ||
          (stretched && size === "large" && state === "disable" && hierarchy === "tertiary") ||
          (!stretched && size === "small" && state === "disable" && hierarchy === "primary") ||
          (!stretched && size === "small" && state === "disable" && hierarchy === "danger") ||
          (!stretched && size === "medium" && state === "disable" && hierarchy === "primary") ||
          (!stretched && size === "medium" && state === "disable" && hierarchy === "danger")
            ? "center"
            : undefined,
        backgroundColor:
          (stretched && size === "small") ||
          (stretched && size === "medium") ||
          (stretched && size === "large" && state === "focus") ||
          (stretched && size === "large" && state === "hover") ||
          (!stretched && state === "focus" && hierarchy === "primary") ||
          (!stretched && state === "default" && hierarchy === "primary") ||
          (size === "large" && state === "default" && hierarchy === "primary")
            ? "#7857ed"
            : state === "disable" &&
              (!stretched || size === "large") &&
              (hierarchy === "primary" || hierarchy === "secondary" || hierarchy === "tertiary") &&
              (size === "small" ||
                size === "medium" ||
                size === "large" ||
                hierarchy === "secondary" ||
                hierarchy === "tertiary")
            ? "#f2f3f5"
            : hierarchy === "primary" &&
              state === "pressed" &&
              (!stretched || size === "large") &&
              (size === "small" || size === "medium" || size === "large")
            ? "#6244cc"
            : hierarchy === "primary" && state === "hover" && !stretched
            ? "#9577ff"
            : hierarchy === "secondary" &&
              state === "pressed" &&
              (!stretched || size === "large") &&
              (size === "small" || size === "medium" || size === "large")
            ? "#f5f6f7"
            : hierarchy === "secondary" && state === "focus" && !stretched
            ? "#fafafb03"
            : hierarchy === "tertiary" &&
              state === "pressed" &&
              (!stretched || size === "large") &&
              (size === "small" || size === "medium" || size === "large")
            ? "#dadde1"
            : hierarchy === "tertiary" && state === "hover" && !stretched
            ? "#ebedf0"
            : hierarchy === "danger" &&
              (!stretched || state === "default") &&
              (!stretched || size === "large") &&
              (state === "default" || state === "focus")
            ? "#ff5555"
            : hierarchy === "danger" &&
              state === "disable" &&
              (!stretched || size === "large") &&
              (size === "small" || size === "medium" || size === "large")
            ? "#fda7a8"
            : hierarchy === "danger" &&
              state === "pressed" &&
              (!stretched || size === "large") &&
              (size === "small" || size === "medium" || size === "large")
            ? "#910000"
            : hierarchy === "danger" && state === "hover" && !stretched
            ? "#ff2222"
            : undefined,
        border:
          (stretched && size === "small") ||
          (stretched && size === "medium") ||
          (stretched && size === "large" && state === "focus") ||
          (stretched && size === "large" && state === "hover") ||
          (!stretched && state === "focus" && hierarchy === "primary") ||
          (!stretched && state === "focus" && hierarchy === "tertiary") ||
          (!stretched && state === "focus" && hierarchy === "danger")
            ? "3px solid"
            : (!stretched && hierarchy === "secondary" && state === "default") ||
              (!stretched && hierarchy === "secondary" && state === "focus") ||
              (!stretched && hierarchy === "secondary" && state === "hover") ||
              (hierarchy === "secondary" && state === "pressed" && size === "large") ||
              (stretched && hierarchy === "secondary" && state === "default" && size === "large") ||
              (!stretched && hierarchy === "secondary" && state === "pressed" && size === "small") ||
              (!stretched && hierarchy === "secondary" && state === "pressed" && size === "medium")
            ? "1px solid"
            : undefined,
        borderColor:
          (stretched && size === "small") ||
          (stretched && size === "medium") ||
          (stretched && size === "large" && state === "focus") ||
          (stretched && size === "large" && state === "hover") ||
          (!stretched && state === "focus" && hierarchy === "primary") ||
          (!stretched && state === "focus" && hierarchy === "tertiary")
            ? "#ececff"
            : hierarchy === "secondary" &&
              (!stretched || size === "large") &&
              (!stretched || state === "default" || state === "pressed") &&
              (state === "default" || state === "focus" || state === "pressed") &&
              (state === "default" || state === "focus" || size === "large" || size === "small" || size === "medium")
            ? "#dadde1"
            : hierarchy === "secondary" && state === "hover" && !stretched
            ? "#1c2126"
            : hierarchy === "danger" && state === "focus" && !stretched
            ? "#ffbfbf"
            : undefined,
        borderRadius:
          (stretched && size === "small") ||
          (stretched && size === "medium") ||
          (stretched && size === "large" && state === "focus") ||
          (stretched && size === "large" && state === "hover") ||
          (!stretched && state === "focus" && hierarchy === "primary") ||
          (!stretched && state === "focus" && hierarchy === "secondary") ||
          (!stretched && state === "focus" && hierarchy === "tertiary") ||
          (!stretched && state === "hover" && hierarchy === "primary") ||
          (!stretched && state === "hover" && hierarchy === "secondary") ||
          (!stretched && state === "hover" && hierarchy === "tertiary") ||
          (!stretched && state === "default" && hierarchy === "primary") ||
          (!stretched && state === "default" && hierarchy === "secondary") ||
          (!stretched && state === "default" && hierarchy === "tertiary") ||
          (!stretched && state === "disable" && hierarchy === "secondary") ||
          (!stretched && state === "disable" && hierarchy === "tertiary") ||
          (size === "large" && state === "disable" && hierarchy === "primary") ||
          (size === "large" && state === "pressed" && hierarchy === "primary") ||
          (size === "large" && state === "pressed" && hierarchy === "secondary") ||
          (size === "large" && state === "pressed" && hierarchy === "tertiary") ||
          (stretched && size === "large" && state === "default" && hierarchy === "primary") ||
          (stretched && size === "large" && state === "default" && hierarchy === "secondary") ||
          (stretched && size === "large" && state === "default" && hierarchy === "tertiary") ||
          (stretched && size === "large" && state === "disable" && hierarchy === "secondary") ||
          (stretched && size === "large" && state === "disable" && hierarchy === "tertiary") ||
          (!stretched && size === "small" && state === "disable" && hierarchy === "primary") ||
          (!stretched && size === "small" && state === "pressed" && hierarchy === "primary") ||
          (!stretched && size === "small" && state === "pressed" && hierarchy === "secondary") ||
          (!stretched && size === "small" && state === "pressed" && hierarchy === "tertiary") ||
          (!stretched && size === "medium" && state === "disable" && hierarchy === "primary") ||
          (!stretched && size === "medium" && state === "pressed" && hierarchy === "primary") ||
          (!stretched && size === "medium" && state === "pressed" && hierarchy === "secondary") ||
          (!stretched && size === "medium" && state === "pressed" && hierarchy === "tertiary")
            ? "200px"
            : (!stretched && hierarchy === "danger" && state === "default") ||
              (!stretched && hierarchy === "danger" && state === "focus") ||
              (!stretched && hierarchy === "danger" && state === "hover") ||
              (hierarchy === "danger" && state === "disable" && size === "large") ||
              (hierarchy === "danger" && state === "pressed" && size === "large") ||
              (stretched && hierarchy === "danger" && state === "default" && size === "large") ||
              (!stretched && hierarchy === "danger" && state === "disable" && size === "small") ||
              (!stretched && hierarchy === "danger" && state === "disable" && size === "medium") ||
              (!stretched && hierarchy === "danger" && state === "pressed" && size === "small") ||
              (!stretched && hierarchy === "danger" && state === "pressed" && size === "medium")
            ? "32px"
            : undefined,
        boxShadow: hierarchy === "secondary" && state === "focus" && !stretched ? "0px 0px 0px 3px #ececff" : undefined,
        display:
          (stretched && size === "small") ||
          (stretched && size === "medium") ||
          (!stretched && state === "focus") ||
          (!stretched && state === "hover") ||
          (!stretched && state === "default") ||
          (size === "large" && state === "pressed") ||
          (stretched && size === "large" && state === "focus") ||
          (stretched && size === "large" && state === "hover") ||
          (stretched && size === "large" && state === "default") ||
          (!stretched && size === "small" && state === "pressed") ||
          (!stretched && size === "medium" && state === "pressed") ||
          (!stretched && state === "disable" && hierarchy === "secondary") ||
          (!stretched && state === "disable" && hierarchy === "tertiary") ||
          (size === "large" && state === "disable" && hierarchy === "primary") ||
          (size === "large" && state === "disable" && hierarchy === "danger") ||
          (stretched && size === "large" && state === "disable" && hierarchy === "secondary") ||
          (stretched && size === "large" && state === "disable" && hierarchy === "tertiary") ||
          (!stretched && size === "small" && state === "disable" && hierarchy === "primary") ||
          (!stretched && size === "small" && state === "disable" && hierarchy === "danger") ||
          (!stretched && size === "medium" && state === "disable" && hierarchy === "primary") ||
          (!stretched && size === "medium" && state === "disable" && hierarchy === "danger")
            ? "flex"
            : undefined,
        gap:
          (stretched && size === "small") ||
          (stretched && size === "medium") ||
          (!stretched && state === "focus") ||
          (!stretched && state === "hover") ||
          (!stretched && state === "default") ||
          (size === "large" && state === "pressed") ||
          (stretched && size === "large" && state === "focus") ||
          (stretched && size === "large" && state === "hover") ||
          (stretched && size === "large" && state === "default") ||
          (!stretched && size === "small" && state === "pressed") ||
          (!stretched && size === "medium" && state === "pressed") ||
          (!stretched && state === "disable" && hierarchy === "secondary") ||
          (!stretched && state === "disable" && hierarchy === "tertiary") ||
          (size === "large" && state === "disable" && hierarchy === "primary") ||
          (size === "large" && state === "disable" && hierarchy === "danger") ||
          (stretched && size === "large" && state === "disable" && hierarchy === "secondary") ||
          (stretched && size === "large" && state === "disable" && hierarchy === "tertiary") ||
          (!stretched && size === "small" && state === "disable" && hierarchy === "primary") ||
          (!stretched && size === "small" && state === "disable" && hierarchy === "danger") ||
          (!stretched && size === "medium" && state === "disable" && hierarchy === "primary") ||
          (!stretched && size === "medium" && state === "disable" && hierarchy === "danger")
            ? "10px"
            : undefined,
        justifyContent:
          (stretched && size === "small") ||
          (stretched && size === "medium") ||
          (!stretched && state === "focus") ||
          (!stretched && state === "hover") ||
          (!stretched && state === "default") ||
          (size === "large" && state === "pressed") ||
          (stretched && size === "large" && state === "focus") ||
          (stretched && size === "large" && state === "hover") ||
          (stretched && size === "large" && state === "default") ||
          (!stretched && size === "small" && state === "pressed") ||
          (!stretched && size === "medium" && state === "pressed") ||
          (!stretched && state === "disable" && hierarchy === "secondary") ||
          (!stretched && state === "disable" && hierarchy === "tertiary") ||
          (size === "large" && state === "disable" && hierarchy === "primary") ||
          (size === "large" && state === "disable" && hierarchy === "danger") ||
          (stretched && size === "large" && state === "disable" && hierarchy === "secondary") ||
          (stretched && size === "large" && state === "disable" && hierarchy === "tertiary") ||
          (!stretched && size === "small" && state === "disable" && hierarchy === "primary") ||
          (!stretched && size === "small" && state === "disable" && hierarchy === "danger") ||
          (!stretched && size === "medium" && state === "disable" && hierarchy === "primary") ||
          (!stretched && size === "medium" && state === "disable" && hierarchy === "danger")
            ? "center"
            : undefined,
        left:
          (stretched && size === "small") ||
          (stretched && size === "medium") ||
          (stretched && size === "large" && state === "focus") ||
          (stretched && size === "large" && state === "hover") ||
          (!stretched && state === "focus" && hierarchy === "primary") ||
          (!stretched && state === "focus" && hierarchy === "tertiary") ||
          (!stretched && state === "focus" && hierarchy === "danger")
            ? "-3px"
            : undefined,
        overflow: hierarchy === "secondary" && state === "focus" && !stretched ? "hidden" : undefined,
        padding:
          size === "small" ||
          (stretched && size === "medium") ||
          (stretched && size === "large" && state === "focus") ||
          (stretched && size === "large" && state === "hover")
            ? "4px 16px"
            : size === "medium" && !stretched
            ? "8px 32px"
            : size === "large" &&
              (!stretched || state === "default" || state === "disable" || state === "pressed") &&
              (state === "default" ||
                state === "disable" ||
                state === "focus" ||
                state === "hover" ||
                state === "pressed")
            ? "14px 32px"
            : undefined,
        position:
          (stretched && size === "small") ||
          (stretched && size === "medium") ||
          (stretched && size === "large" && state === "focus") ||
          (stretched && size === "large" && state === "hover") ||
          (!stretched && state === "focus" && hierarchy === "primary") ||
          (!stretched && state === "focus" && hierarchy === "tertiary") ||
          (!stretched && state === "focus" && hierarchy === "danger")
            ? "relative"
            : undefined,
        top:
          (stretched && size === "small") ||
          (stretched && size === "medium") ||
          (stretched && size === "large" && state === "focus") ||
          (stretched && size === "large" && state === "hover") ||
          (!stretched && state === "focus" && hierarchy === "primary") ||
          (!stretched && state === "focus" && hierarchy === "tertiary") ||
          (!stretched && state === "focus" && hierarchy === "danger")
            ? "-3px"
            : undefined,
        width:
          !stretched ||
          size === "small" ||
          size === "medium" ||
          (size === "large" && state === "focus") ||
          (size === "large" && state === "hover")
            ? "fit-content"
            : stretched && size === "large" && (state === "default" || state === "disable" || state === "pressed")
            ? "336px"
            : undefined,
      }}
    >
      <React.Fragment>
        {((stretched && state === "focus") ||
          (stretched && state === "hover") ||
          (!stretched && state === "disable") ||
          (stretched && size === "small" && state === "default") ||
          (stretched && size === "small" && state === "disable") ||
          (stretched && size === "small" && state === "pressed") ||
          (stretched && size === "medium" && state === "default") ||
          (stretched && size === "medium" && state === "disable") ||
          (stretched && size === "medium" && state === "pressed") ||
          (!stretched && hierarchy === "primary" && state === "default") ||
          (!stretched && hierarchy === "primary" && state === "pressed") ||
          (!stretched && hierarchy === "primary" && state === "focus") ||
          (!stretched && hierarchy === "primary" && state === "hover") ||
          (!stretched && hierarchy === "secondary" && state === "default") ||
          (!stretched && hierarchy === "secondary" && state === "hover") ||
          (!stretched && hierarchy === "danger" && state === "default") ||
          (!stretched && hierarchy === "danger" && state === "pressed") ||
          (!stretched && hierarchy === "danger" && state === "focus") ||
          (!stretched && hierarchy === "danger" && state === "hover") ||
          (stretched && size === "large" && hierarchy === "primary" && state === "default") ||
          (stretched && size === "large" && hierarchy === "primary" && state === "disable") ||
          (stretched && size === "large" && hierarchy === "primary" && state === "pressed") ||
          (stretched && size === "large" && hierarchy === "danger" && state === "default") ||
          (stretched && size === "large" && hierarchy === "danger" && state === "disable") ||
          (stretched && size === "large" && hierarchy === "danger" && state === "pressed") ||
          (!stretched && size === "small" && hierarchy === "secondary" && state === "pressed") ||
          (!stretched && size === "small" && hierarchy === "secondary" && state === "focus") ||
          (!stretched && size === "small" && hierarchy === "tertiary" && state === "default") ||
          (!stretched && size === "small" && hierarchy === "tertiary" && state === "pressed") ||
          (!stretched && size === "small" && hierarchy === "tertiary" && state === "focus") ||
          (!stretched && size === "small" && hierarchy === "tertiary" && state === "hover") ||
          (!stretched && size === "medium" && hierarchy === "secondary" && state === "pressed") ||
          (!stretched && size === "medium" && hierarchy === "secondary" && state === "focus") ||
          (!stretched && size === "medium" && hierarchy === "tertiary" && state === "default") ||
          (!stretched && size === "medium" && hierarchy === "tertiary" && state === "pressed") ||
          (!stretched && size === "medium" && hierarchy === "tertiary" && state === "focus") ||
          (!stretched && size === "medium" && hierarchy === "tertiary" && state === "hover")) && (
          <React.Fragment>
            <ButtonLabelLight
              layout={
                (stretched && size === "small") ||
                (stretched && size === "medium") ||
                (stretched && size === "large" && state === "focus") ||
                (stretched && size === "large" && state === "hover") ||
                (!stretched && size === "small" && state === "pressed") ||
                (!stretched && size === "medium" && state === "pressed") ||
                (!stretched && state === "focus" && hierarchy === "primary") ||
                (!stretched && state === "focus" && hierarchy === "danger") ||
                (!stretched && state === "hover" && hierarchy === "primary") ||
                (!stretched && state === "hover" && hierarchy === "secondary") ||
                (!stretched && state === "hover" && hierarchy === "danger") ||
                (!stretched && state === "default" && hierarchy === "primary") ||
                (!stretched && state === "default" && hierarchy === "secondary") ||
                (!stretched && state === "default" && hierarchy === "danger") ||
                (!stretched && state === "disable" && hierarchy === "secondary") ||
                (!stretched && state === "disable" && hierarchy === "tertiary") ||
                (size === "large" && state === "disable" && hierarchy === "primary") ||
                (size === "large" && state === "disable" && hierarchy === "danger") ||
                (size === "large" && state === "pressed" && hierarchy === "primary") ||
                (size === "large" && state === "pressed" && hierarchy === "danger") ||
                (stretched && size === "large" && state === "default" && hierarchy === "primary") ||
                (stretched && size === "large" && state === "default" && hierarchy === "danger") ||
                (!stretched && size === "small" && state === "focus" && hierarchy === "secondary") ||
                (!stretched && size === "small" && state === "focus" && hierarchy === "tertiary") ||
                (!stretched && size === "small" && state === "hover" && hierarchy === "tertiary") ||
                (!stretched && size === "small" && state === "default" && hierarchy === "tertiary") ||
                (!stretched && size === "small" && state === "disable" && hierarchy === "primary") ||
                (!stretched && size === "small" && state === "disable" && hierarchy === "danger") ||
                (!stretched && size === "medium" && state === "focus" && hierarchy === "secondary") ||
                (!stretched && size === "medium" && state === "focus" && hierarchy === "tertiary") ||
                (!stretched && size === "medium" && state === "hover" && hierarchy === "tertiary") ||
                (!stretched && size === "medium" && state === "default" && hierarchy === "tertiary") ||
                (!stretched && size === "medium" && state === "disable" && hierarchy === "primary") ||
                (!stretched && size === "medium" && state === "disable" && hierarchy === "danger")
                  ? "label only"
                  : undefined
              }
              size={
                size === "small" ||
                (stretched && size === "medium") ||
                (stretched && size === "large" && state === "focus") ||
                (stretched && size === "large" && state === "hover")
                  ? "small"
                  : (!stretched && size === "medium") ||
                    (size === "large" && hierarchy === "primary" && state === "default") ||
                    (size === "large" && hierarchy === "primary" && state === "disable") ||
                    (size === "large" && hierarchy === "primary" && state === "pressed") ||
                    (size === "large" && hierarchy === "danger" && state === "default") ||
                    (size === "large" && hierarchy === "danger" && state === "disable") ||
                    (size === "large" && hierarchy === "danger" && state === "pressed") ||
                    (!stretched && size === "large" && hierarchy === "primary" && state === "hover") ||
                    (!stretched && size === "large" && hierarchy === "primary" && state === "focus") ||
                    (!stretched && size === "large" && hierarchy === "secondary" && state === "default") ||
                    (!stretched && size === "large" && hierarchy === "secondary" && state === "disable") ||
                    (!stretched && size === "large" && hierarchy === "secondary" && state === "hover") ||
                    (!stretched && size === "large" && hierarchy === "tertiary" && state === "disable") ||
                    (!stretched && size === "large" && hierarchy === "danger" && state === "hover") ||
                    (!stretched && size === "large" && hierarchy === "danger" && state === "focus")
                  ? "medium"
                  : undefined
              }
              text={
                (stretched && size === "small") ||
                (stretched && size === "medium") ||
                (stretched && size === "large" && state === "focus") ||
                (stretched && size === "large" && state === "hover") ||
                (!stretched && size === "small" && state === "pressed") ||
                (!stretched && size === "medium" && state === "pressed") ||
                (!stretched && state === "focus" && hierarchy === "primary") ||
                (!stretched && state === "focus" && hierarchy === "danger") ||
                (!stretched && state === "hover" && hierarchy === "primary") ||
                (!stretched && state === "hover" && hierarchy === "secondary") ||
                (!stretched && state === "hover" && hierarchy === "danger") ||
                (!stretched && state === "default" && hierarchy === "primary") ||
                (!stretched && state === "default" && hierarchy === "secondary") ||
                (!stretched && state === "default" && hierarchy === "danger") ||
                (!stretched && state === "disable" && hierarchy === "secondary") ||
                (!stretched && state === "disable" && hierarchy === "tertiary") ||
                (size === "large" && state === "disable" && hierarchy === "primary") ||
                (size === "large" && state === "disable" && hierarchy === "danger") ||
                (size === "large" && state === "pressed" && hierarchy === "primary") ||
                (size === "large" && state === "pressed" && hierarchy === "danger") ||
                (stretched && size === "large" && state === "default" && hierarchy === "primary") ||
                (stretched && size === "large" && state === "default" && hierarchy === "danger") ||
                (!stretched && size === "small" && state === "focus" && hierarchy === "secondary") ||
                (!stretched && size === "small" && state === "focus" && hierarchy === "tertiary") ||
                (!stretched && size === "small" && state === "hover" && hierarchy === "tertiary") ||
                (!stretched && size === "small" && state === "default" && hierarchy === "tertiary") ||
                (!stretched && size === "small" && state === "disable" && hierarchy === "primary") ||
                (!stretched && size === "small" && state === "disable" && hierarchy === "danger") ||
                (!stretched && size === "medium" && state === "focus" && hierarchy === "secondary") ||
                (!stretched && size === "medium" && state === "focus" && hierarchy === "tertiary") ||
                (!stretched && size === "medium" && state === "hover" && hierarchy === "tertiary") ||
                (!stretched && size === "medium" && state === "default" && hierarchy === "tertiary") ||
                (!stretched && size === "medium" && state === "disable" && hierarchy === "primary") ||
                (!stretched && size === "medium" && state === "disable" && hierarchy === "danger")
                  ? buttonLabelLightText
                  : undefined
              }
              textStyle={
                (stretched && size === "small") ||
                (stretched && size === "medium") ||
                (stretched && size === "large" && state === "focus") ||
                (stretched && size === "large" && state === "hover") ||
                (!stretched && state === "focus" && hierarchy === "primary") ||
                (!stretched && state === "focus" && hierarchy === "danger") ||
                (!stretched && state === "hover" && hierarchy === "primary") ||
                (!stretched && state === "hover" && hierarchy === "danger") ||
                (!stretched && state === "default" && hierarchy === "primary") ||
                (!stretched && state === "default" && hierarchy === "danger") ||
                (size === "large" && state === "pressed" && hierarchy === "primary") ||
                (size === "large" && state === "pressed" && hierarchy === "danger") ||
                (stretched && size === "large" && state === "default" && hierarchy === "primary") ||
                (stretched && size === "large" && state === "default" && hierarchy === "danger") ||
                (!stretched && size === "small" && state === "pressed" && hierarchy === "primary") ||
                (!stretched && size === "small" && state === "pressed" && hierarchy === "danger") ||
                (!stretched && size === "medium" && state === "pressed" && hierarchy === "primary") ||
                (!stretched && size === "medium" && state === "pressed" && hierarchy === "danger")
                  ? {
                      color: "#fafafb",
                    }
                  : state === "disable" &&
                    (!stretched || size === "large") &&
                    (!stretched || hierarchy === "primary") &&
                    (hierarchy === "primary" || hierarchy === "secondary" || hierarchy === "tertiary") &&
                    (size === "small" ||
                      size === "medium" ||
                      size === "large" ||
                      hierarchy === "secondary" ||
                      hierarchy === "tertiary")
                  ? {
                      color: "#aebbc5",
                    }
                  : hierarchy === "danger" &&
                    state === "disable" &&
                    (!stretched || size === "large") &&
                    (size === "medium" || size === "large")
                  ? {
                      color: "#ffffff99",
                    }
                  : size === "small" && hierarchy === "danger" && state === "disable" && !stretched
                  ? {
                      color: "#ffffff",
                      opacity: "0.6",
                    }
                  : undefined
              }
            />
          </React.Fragment>
        )}

        {((size === "large" && hierarchy === "secondary" && state === "pressed") ||
          (size === "large" && hierarchy === "tertiary" && state === "default") ||
          (size === "large" && hierarchy === "tertiary" && state === "pressed") ||
          (stretched && size === "large" && hierarchy === "secondary" && state === "default") ||
          (stretched && size === "large" && hierarchy === "secondary" && state === "disable") ||
          (stretched && size === "large" && hierarchy === "tertiary" && state === "disable") ||
          (!stretched && size === "large" && hierarchy === "secondary" && state === "focus") ||
          (!stretched && size === "large" && hierarchy === "tertiary" && state === "focus") ||
          (!stretched && size === "large" && hierarchy === "tertiary" && state === "hover")) && (
          <React.Fragment>
            <div
              style={{
                color:
                  state === "pressed" ||
                  (!stretched && state === "focus") ||
                  (hierarchy === "tertiary" && state === "default") ||
                  (stretched && hierarchy === "secondary" && state === "default") ||
                  (!stretched && hierarchy === "tertiary" && state === "hover")
                    ? "#1c2126"
                    : state === "disable" && stretched
                    ? "#aebbc5"
                    : undefined,
                fontFamily:
                  state === "pressed" ||
                  (stretched && state === "disable") ||
                  (!stretched && state === "focus") ||
                  (hierarchy === "tertiary" && state === "default") ||
                  (stretched && hierarchy === "secondary" && state === "default") ||
                  (!stretched && hierarchy === "tertiary" && state === "hover")
                    ? "'Acid Grotesk TP-Medium', Helvetica"
                    : undefined,
                fontSize:
                  state === "pressed" ||
                  (stretched && state === "disable") ||
                  (!stretched && state === "focus") ||
                  (hierarchy === "tertiary" && state === "default") ||
                  (stretched && hierarchy === "secondary" && state === "default") ||
                  (!stretched && hierarchy === "tertiary" && state === "hover")
                    ? "16px"
                    : undefined,
                fontWeight:
                  state === "pressed" ||
                  (stretched && state === "disable") ||
                  (!stretched && state === "focus") ||
                  (hierarchy === "tertiary" && state === "default") ||
                  (stretched && hierarchy === "secondary" && state === "default") ||
                  (!stretched && hierarchy === "tertiary" && state === "hover")
                    ? "500"
                    : undefined,
                letterSpacing:
                  state === "pressed" ||
                  (stretched && state === "disable") ||
                  (!stretched && state === "focus") ||
                  (hierarchy === "tertiary" && state === "default") ||
                  (stretched && hierarchy === "secondary" && state === "default") ||
                  (!stretched && hierarchy === "tertiary" && state === "hover")
                    ? "0"
                    : undefined,
                lineHeight:
                  state === "pressed" ||
                  (stretched && state === "disable") ||
                  (!stretched && state === "focus") ||
                  (hierarchy === "tertiary" && state === "default") ||
                  (stretched && hierarchy === "secondary" && state === "default") ||
                  (!stretched && hierarchy === "tertiary" && state === "hover")
                    ? "24px"
                    : undefined,
                marginTop:
                  state === "pressed" ||
                  (stretched && state === "disable") ||
                  (hierarchy === "tertiary" && state === "default") ||
                  (stretched && hierarchy === "secondary" && state === "default") ||
                  (!stretched && hierarchy === "secondary" && state === "focus") ||
                  (!stretched && hierarchy === "tertiary" && state === "hover")
                    ? "-1.00px"
                    : undefined,
                whiteSpace:
                  state === "pressed" ||
                  (stretched && state === "disable") ||
                  (!stretched && state === "focus") ||
                  (hierarchy === "tertiary" && state === "default") ||
                  (stretched && hierarchy === "secondary" && state === "default") ||
                  (!stretched && hierarchy === "tertiary" && state === "hover")
                    ? "nowrap"
                    : undefined,
                width:
                  state === "pressed" ||
                  (stretched && state === "disable") ||
                  (!stretched && state === "focus") ||
                  (hierarchy === "tertiary" && state === "default") ||
                  (stretched && hierarchy === "secondary" && state === "default") ||
                  (!stretched && hierarchy === "tertiary" && state === "hover")
                    ? "fit-content"
                    : undefined,
              }}
            >
              <React.Fragment>
                {(state === "pressed" ||
                  (stretched && state === "disable") ||
                  (!stretched && state === "focus") ||
                  (hierarchy === "tertiary" && state === "default") ||
                  (stretched && hierarchy === "secondary" && state === "default") ||
                  (!stretched && hierarchy === "tertiary" && state === "hover")) && (
                  <React.Fragment>{text}</React.Fragment>
                )}
              </React.Fragment>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    </div>
  );
};
