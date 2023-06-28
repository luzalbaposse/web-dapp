import { Input, Typography } from "@talentprotocol/design-system";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { TitleRow, Row, RowWithMargin, Form } from "./styled";

export const LegalNameStep = ({ setIsNextDisable, setUser, user, isNextDisabled }) => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const [errorDescritpion, setErrorDescription] = useState({ firstName: "", lastName: "" });
  const validateStep = useCallback(() => {
    if (firstNameRef.current.value.length > 46) {
      setErrorDescription({ ...errorDescritpion, firstName: "First name is too long" });
    }
    if (lastNameRef.current.value.length > 46) {
      setErrorDescription({ ...errorDescritpion, lastName: "Last name is too long" });
      return;
    }
    if (firstNameRef.current.value && lastNameRef.current.value && isNextDisabled) {
      setUser({ ...user, firstName: firstNameRef.current.value, lastName: lastNameRef.current.value });
      setIsNextDisable(false);
    } else if ((!firstNameRef.current.value || !lastNameRef.current.value) && !isNextDisabled) {
      setIsNextDisable(true);
    }
  }, [firstNameRef, lastNameRef, setIsNextDisable, isNextDisabled, setErrorDescription, errorDescritpion]);

  useEffect(() => {
    validateStep();
  }, [user, isNextDisabled]);

  return (
    <>
      <TitleRow>
        <Typography specs={{ variant: "h3", type: "bold" }} color="primary01">
          First we need your real name.
        </Typography>
        <Typography specs={{ variant: "p2", type: "regular" }} color="primary01">
          We need your legal name to be able to verify your identity. You can choose to keep your real name private and
          not show it in your profile.
        </Typography>
      </TitleRow>
      <Form onSubmit={e => e.preventDefault()}>
        <Row>
          <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
            First Name
          </Typography>
          <Input
            placeholder="John"
            defaultValue={user.firstName}
            inputRef={firstNameRef}
            onChange={validateStep}
            onBlur={validateStep}
            hasError={!!errorDescritpion.firstName}
            shortDescription={errorDescritpion.firstName}
          />
        </Row>
        <RowWithMargin>
          <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
            Last Name
          </Typography>
          <Input
            placeholder="Doe"
            defaultValue={user.lastName}
            inputRef={lastNameRef}
            onChange={validateStep}
            onBlur={validateStep}
            hasError={!!errorDescritpion.lastName}
            shortDescription={errorDescritpion.lastName}
          />
        </RowWithMargin>
      </Form>
    </>
  );
};
