import { Button, Icon, Spinner, Typography } from "@talentprotocol/design-system";
import React, { useCallback, useEffect, useState } from "react";
import { users } from "../../../../api";
import { Container, TitleRow } from "./styled";

export const FinishStep = ({ user, goToFirstStep }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const createAccountCallback = useCallback(() => {
    users
      .finishOnboarding(user)
      .then(() => {
        setIsLoading(false);
        setHasError(false);
        window.location.reload();
      })
      .catch(() => {
        setIsLoading(false);
        setHasError(true);
      });
  }, [user]);
  useEffect(() => {
    createAccountCallback();
  }, [createAccountCallback]);
  return isLoading ? (
    <Container>
      <Spinner size={64} />
    </Container>
  ) : (
    (hasError && (
      <Container>
        <Icon name="question" color="primary04" size={64} />
        <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
          Something went wrong
        </Typography>
        <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
          Please check your data and try again.
        </Typography>
        <Button hierarchy="primary" size="medium" text="Review data" onClick={goToFirstStep} />
      </Container>
    )) || (
      <Container>
        <TitleRow>
          <Typography specs={{ variant: "h3", type: "bold" }} color="primary01">
            Done!
          </Typography>
        </TitleRow>
      </Container>
    )
  );
};
