import React, { useEffect } from "react";
import { Container, InputArea, Suffix } from "./styled";

export const CustomHandleInput = ({ mode, onChange, value, onBlur }) => {
  useEffect(() => {
    const callback = e => {
      onChange(e);
    };
    document.getElementById("custon-handle-input").addEventListener("input", callback, false);
    return () => {
      document.getElementById("custon-handle-input").removeEventListener("input", callback, false);
    };
  }, []);
  return (
    <Container id="custon-handle-input" isLight={mode === "light"}>
      <InputArea contentEditable placeholder="your handle" onChange={onChange} onBlur={onBlur} value={value} />
      <Suffix>.tal.community</Suffix>
    </Container>
  );
};
