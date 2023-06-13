import { Input, Pills, Typography } from "@talentprotocol/design-system";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { validateEmail, validatePassword } from "../../utils/field-validators";
import { EmailRow, PasswordRow, SignUpForm } from "./styled";
import { validations } from "src/api/validations";
import debounce from "lodash/debounce";

export const EmailPasswordStep = ({ setIsNextDisable, setUser, user }) => {
  const [isShowPasswordActive, setIsShowPasswordActive] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
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
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
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
  useEffect(() => {
    fillPills(user.password);
  }, [user]);

  const debouncedEmailLookup = debounce(() => {
    const email = emailRef.current?.value?.toLowerCase();
    if (!email) {
      return;
    }

    validations
      .validateEmail(email)
      .then(({ data }) => {
        if (data.error) {
          setEmailError(data.error);
          setIsNextDisable(true);
          validateStep();
        } else {
          setEmailError("");
          setUser({
            ...user,
            email
          });
        }
      })
      .catch(() => {
        setEmailError("Something happened");
        setIsNextDisable(true);
      });
  }, 200);

  const validateEmailStep = useCallback(() => {
    if (validateEmail(emailRef?.current?.value)) {
      debouncedEmailLookup();
      return true;
    } else {
      setEmailError("Email is invalid.");
      return false;
    }
  }, [emailRef, setEmailError, setUser, user]);

  const validateStep = useCallback(
    doPasswordsMatch => {
      if (
        (typeof doPasswordsMatch !== "boolean" ? passwordsMatch : doPasswordsMatch) &&
        confirmPasswordRef.current.value &&
        passwordRef.current.value &&
        !emailError &&
        validatePassword(passwordRef.current.value, setIsPasswordCorrect)
      ) {
        setUser({
          ...user,
          password: passwordRef.current.value
        });
        setIsNextDisable(false);
      } else {
        setIsNextDisable(true);
      }
    },
    [emailError, setIsPasswordCorrect, emailRef, passwordRef, user, setUser, passwordsMatch, confirmPasswordRef, validateEmailStep]
  );
  return (
    <>
      <Typography specs={{ variant: "h3", type: "bold" }} color="primary01">
        Set your email and password
      </Typography>
      <SignUpForm onSubmit={e => e.preventDefault()}>
        <EmailRow>
          <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
            Email
          </Typography>
          <Input
            placeholder="johndoe@mail.com"
            inputRef={emailRef}
            defaultValue={user.email}
            onChange={validateEmailStep}
            onBlur={validateEmailStep}
            hasError={!!emailError}
            shortDescription={emailError}
          />
        </EmailRow>
        <PasswordRow>
          <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
            Password
          </Typography>
          <Input
            placeholder="*********"
            type={isShowPasswordActive ? "text" : "password"}
            inputRef={passwordRef}
            defaultValue={user.password}
            onFocus={() => {
              setIsPasswordCorrect(true);
            }}
            hasError={!isPasswordCorrect}
            onChange={e => {
              fillPills(e.target.value);
              validateStep();
            }}
            onBlur={e => {
              fillPills(e.target.value);
              validateStep();
            }}
            onEnterCallback={validateStep}
            rightIcon={isShowPasswordActive ? "eye-disabled" : "eye"}
            iconColor="primary04"
            rightIconCallback={() => setIsShowPasswordActive(!isShowPasswordActive)}
          />
        </PasswordRow>
        <Pills pillList={pills} />
        <PasswordRow>
          <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
            Confirm Password
          </Typography>
          <Input
            placeholder="*********"
            type={isShowPasswordActive ? "text" : "password"}
            inputRef={confirmPasswordRef}
            onFocus={() => {
              setIsPasswordCorrect(true);
            }}
            hasError={!passwordsMatch}
            onChange={e => {
              if (e.target.value !== passwordRef.current.value) {
                setPasswordsMatch(false);
                validateStep(false);
              } else {
                validateStep(true);
                setPasswordsMatch(true);
              }
            }}
            onBlur={validateStep}
            onEnterCallback={validateStep}
            rightIcon={isShowPasswordActive ? "eye-disabled" : "eye"}
            iconColor="primary04"
            rightIconCallback={() => setIsShowPasswordActive(!isShowPasswordActive)}
          />
        </PasswordRow>
      </SignUpForm>
    </>
  );
};
