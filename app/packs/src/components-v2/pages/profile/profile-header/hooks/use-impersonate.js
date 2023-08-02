import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";
import { post } from "src/utils/requests";

export const useImpersonate = () => {
  const impersonateUser = useCallback(async username => {
    const params = {
      username: username
    };

    const response = await post(`/api/v1/impersonations`, params).catch(() => {
      return false;
    });

    if (response && !response.error) {
      toast.success(<ToastBody heading="Success!" body="Impersonation started successfully!" />);
      window.location.reload();
    }
  }, []);
  return {
    impersonateUser
  };
};
