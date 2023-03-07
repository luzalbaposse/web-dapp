import { Dropdown, Input, Typography } from "@talentprotocol/design-system";
import React, { useCallback, useRef, useState } from "react";
import { TitleRow, Row, RowWithMargin, Form } from "./styled";

export const DefineStep = ({ user, setUser, setIsNextDisable }) => {
  const [gender, setGender] = useState("");
  const nationalityRef = useRef(null);
  const locationRef = useRef(null);
  const validateStep = useCallback(() => {
    if (!!gender && nationalityRef.current.value && locationRef.current.value) {
      setUser({
        ...user,
        gender,
        nationality: nationalityRef.current.value,
        locationRef: locationRef.current.value
      });
      setIsNextDisable(false);
    } else {
      setIsNextDisable(true);
    }
  }, [gender, nationalityRef, locationRef, user, setUser]);
  return (
    <>
      <TitleRow>
        <Typography specs={{ variant: "h3", type: "bold" }} color="primary01">
          What best defines you?
        </Typography>
        <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
          Only Location will be visible in your profile.
        </Typography>
      </TitleRow>
      <Form>
        <Row>
          <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
            Gender
          </Typography>
          <Dropdown
            options={["Male", "Female", "Other"]}
            selectValue={setGender}
            value={gender || user.gender || ""}
            placeholder="Select a gender"
          />
        </Row>
        <RowWithMargin>
          <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
            Nationality
          </Typography>
          <Input
            placeholder="Italian, Japonese, Colombian..."
            onBlur={validateStep}
            inputRef={nationalityRef}
            defaultValue={user.nationality}
          />
        </RowWithMargin>
        <RowWithMargin>
          <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
            Location
          </Typography>
          <Input
            placeholder="Porto, Portugal"
            onBlur={validateStep}
            inputRef={locationRef}
            defaultValue={user.location}
          />
        </RowWithMargin>
      </Form>
    </>
  );
};
