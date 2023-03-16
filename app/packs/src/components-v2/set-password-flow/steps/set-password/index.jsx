import React, { useEffect, useState } from "react";
import { Typography, Input, Pills } from "@talentprotocol/design-system";
import { useCallback } from "react";
import { validatePassword } from "../../../sign-up-flow/utils/field-validators";
import { Form, PasswordBox, ConfirmPasswordBox } from "./styled";

export const SetPasswordStep = props => {
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [pills, setPills] = useState([
    {
      content: "Number",
      isSelected: false
    },
    {
      content: "Upper case",
      isSelected: false
    },
    {
      content: "Lower case",
      isSelected: false
    },
    {
      content: "8 characters",
      isSelected: false
    }
  ]);
  const fillPills = useCallback(
    password => {
      const parsedPills = [...pills];
      if (/\d/.test(password)) parsedPills[0].isSelected = true;
      else parsedPills[0].isSelected = false;
      if (/[A-Z]/.test(password)) parsedPills[1].isSelected = true;
      else parsedPills[1].isSelected = false;
      if (/[a-z]/.test(password)) parsedPills[2].isSelected = true;
      else parsedPills[2].isSelected = false;
      if (password.length >= 8) parsedPills[3].isSelected = true;
      else parsedPills[3].isSelected = false;
      setPills(parsedPills);
    },
    [pills, setPills]
  );
  const validateSetPassword = useCallback(
    password => {
      validatePassword(password, setIsPasswordValid);
    },
    [setIsPasswordValid]
  );
  const confirmPasswordCallback = useCallback(
    confirmPassword => {
      const password = props.passwordRef.current.value;
      if (password === confirmPassword) {
        setDoPasswordsMatch(true);
      } else {
        setDoPasswordsMatch(false);
      }
    },
    [props.passwordRef, props.confirmPasswordRef, setDoPasswordsMatch]
  );
  useEffect(() => {
    if (doPasswordsMatch && isPasswordValid) {
      props.setIsContinueDisabled(false);
    } else {
      props.setIsContinueDisabled(true);
    }
  }, [doPasswordsMatch, isPasswordValid, props.setIsContinueDisabled]);
  return (
    <>
      <Typography specs={{ variant: "h3", type: "bold" }} color="primary01">
        Set new Password
      </Typography>
      <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
        Your password must satisfy the requests bellow
      </Typography>
      <Form>
        <PasswordBox>
          <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
            Password
          </Typography>
          <Input
            placeholder="********"
            type="password"
            inputRef={props.passwordRef}
            onChange={e => {
              const password = e.target.value;
              fillPills(password);
              validateSetPassword(password);
            }}
          />
        </PasswordBox>
        <Pills pillList={pills} />
        <ConfirmPasswordBox>
          <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
            Confirm Password
          </Typography>
          <Input
            placeholder="********"
            type="password"
            inputRef={props.confirmPasswordRef}
            onChange={e => {
              const password = e.target.value;
              confirmPasswordCallback(password);
            }}
          />
        </ConfirmPasswordBox>
      </Form>
    </>
  );
};
