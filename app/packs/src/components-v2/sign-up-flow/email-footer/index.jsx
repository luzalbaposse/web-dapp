import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { Button } from "@talentprotocol/design-system";
import { ActionArea } from "./styled";
import { users } from "../../../api";
import { ToastBody } from "src/components/design_system/toasts";

export const EmailFooter = ({ hasCreateAccountError, createdUser }) => {
  const resendEmailCallback = useCallback(() => {
    users
      .sendConfirmationEmail(createdUser.username)
      .then(() => {
        toast.success(<ToastBody heading="Success" />, { autoClose: 5000 });
      })
      .catch(() => {
        toast.error(<ToastBody heading="Something happened" />, { autoClose: 5000 });
      });
  }, [createdUser]);
  return hasCreateAccountError ? (
    <></>
  ) : (
    <ActionArea>
      <Button size="medium" hierarchy="tertiary" text="Resend email" onClick={resendEmailCallback} />
    </ActionArea>
  );
};
