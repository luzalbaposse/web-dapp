import React from "react";
import { Typography, Input } from "@talentprotocol/design-system";
import { useCallback } from "react";
import { validateEmail } from "../../../sign-up-flow/utils/field-validators";
import { Form, EmailBox } from "./styled";

export const SubmissionFormStep = props => {
  const emailChangeCallback = useCallback(
    e => {
      if (validateEmail(e.target.value, undefined)) {
        props.setIsContinueDisabled(false);
      } else {
        props.setIsContinueDisabled(true);
      }
    },
    [props.setIsContinueDisabled]
  );
  return (
    <>
      <Typography specs={{ variant: "h3", type: "bold" }} color="primary01">
        Forgot Password?
      </Typography>
      <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
        Enter the email address associated with your account and we’ll send you a link to reset your password.
      </Typography>
      <Form>
        <EmailBox>
          <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
            Email
          </Typography>
          <Input placeholder="johndoe@mail.com" inputRef={props.emailRef} onChange={emailChangeCallback} onEnterCallback={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!props.isContinueDisabled) {
              props.onContinueCallback();
            }
          }} />
        </EmailBox>
      </Form>
    </>
  );
};
