import { Typography } from "@talentprotocol/design-system";
import React, { useEffect } from "react";

export const CheckEmailStep = props => {
  useEffect(() => {
    props.resendEmailCallback();
  }, [props.resendEmailCallback]);
  return (
    <>
      <Typography specs={{ variant: "h3", type: "bold" }} color="primary01">
        Please check you inbox and confirm your email:
      </Typography>
      <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
        {props.email}
      </Typography>
    </>
  );
};
