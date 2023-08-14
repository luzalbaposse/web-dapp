import React, { useState, useContext, useEffect } from "react";
import ThemeContainer, { ThemeContext } from "src/contexts/ThemeContext";
import { toast } from "react-toastify";
import { useWindowDimensionsHook } from "src/utils/window";

import { loggedInUserStore } from "src/contexts/state";

import { emailRegex, usernameRegex } from "src/utils/regexes";
import { H5, P2, P3 } from "src/components/design_system/typography";
import { passwordMatchesRequirements } from "src/utils/passwordRequirements";
import { patch, post } from "src/utils/requests";
import { ToastBody } from "src/components/design_system/toasts";
import Button from "src/components/design_system/button";
import Divider from "src/components/design_system/other/Divider";
import Link from "src/components/design_system/link";
import LoadingButton from "src/components/button/LoadingButton";
import Tag from "src/components/design_system/tag";
import TextInput from "src/components/design_system/fields/textinput";

const Settings = () => {
  const theme = useContext(ThemeContext);
  const mode = theme.mode();
  const { mobile } = useWindowDimensionsHook();

  const { currentUser, fetchCurrentUser } = loggedInUserStore();

  const [settings, setSettings] = useState({
    wallet_id: currentUser?.wallet_id || "",
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    messagingDisabled: currentUser?.messaging_disabled || false,
    currentPassword: "",
    newPassword: "",
    deletePassword: ""
  });

  const [validationErrors, setValidationErrors] = useState({
    username: false,
    currentPassword: false,
    newPassword: false,
    deletePassword: false
  });
  const [saving, setSaving] = useState({
    loading: false,
    profile: false,
    public: false
  });
  const [emailValidated, setEmailValidated] = useState(false);
  const { valid: validPassword, errors, tags } = passwordMatchesRequirements(settings.newPassword);

  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser();
    }
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    setSettings({
      wallet_id: currentUser.wallet_id || "",
      username: currentUser.username || "",
      email: currentUser.email || "",
      messagingDisabled: currentUser.messaging_disabled || false,
      currentPassword: "",
      newPassword: "",
      deletePassword: ""
    });
    setEmailValidated(!!currentUser.email);
  }, [currentUser]);

  const changeAttribute = (attribute, value) => {
    if (attribute === "currentPassword" && validationErrors.currentPassword) {
      setValidationErrors(prev => ({ ...prev, currentPassword: false }));
    } else if (attribute === "email") {
      setValidationErrors(prev => ({ ...prev, email: false }));
      setEmailValidated(false);
      if (emailRegex.test(value)) validateEmail(value);
    } else if (attribute === "username") {
      if (usernameRegex.test(value)) {
        setValidationErrors(prev => ({ ...prev, username: false }));
      } else {
        setValidationErrors(prev => ({
          ...prev,
          username: "Username only allows lower case letters and numbers"
        }));
      }
    } else if (attribute === "deletePassword") {
      setValidationErrors(prev => ({ ...prev, deleting: false }));
    }

    setSettings(prevInfo => ({ ...prevInfo, [attribute]: value }));
  };

  const updateUser = async () => {
    setSaving(prev => ({ ...prev, loading: true }));

    const response = await patch(`/api/v1/users/${currentUser?.id}`, {
      user: {
        ...settings,
        messaging_disabled: settings.messagingDisabled
      }
    }).catch(() => setValidationErrors(prev => ({ ...prev, saving: true })));

    if (response) {
      if (!response.errors && !response.error) {
        setSaving(prev => ({ ...prev, loading: false, profile: true }));
      } else {
        setValidationErrors(prev => ({ ...prev, ...response.errors }));
      }
    }

    setSaving(prev => ({ ...prev, loading: false }));
  };

  const updatePassword = async () => {
    setSaving(prev => ({ ...prev, loading: true }));

    const response = await patch(`/api/v1/users/${currentUser?.id}`, {
      user: {
        current_password: settings.currentPassword,
        new_password: settings.newPassword
      }
    }).catch(() => setValidationErrors(prev => ({ ...prev, saving: true })));

    if (response) {
      if (!response.errors && !response.error) {
        setSettings(prev => ({
          ...prev,
          currentPassword: "",
          newPassword: ""
        }));
        setSaving(prev => ({ ...prev, loading: false, profile: true }));
      } else {
        setValidationErrors(prev => ({ ...prev, ...response.errors }));
      }
    }

    setSaving(prev => ({ ...prev, loading: false }));
  };

  const sendDeleteAccountEmail = async () => {
    const response = await post(`/api/v1/users/${currentUser?.id}/delete_account_tokens`);

    if (response && response.success) {
      toast.success(<ToastBody heading="Success!" body="Email sent!" />);
    }
  };

  const messagingModeChanged = () => settings.messagingDisabled != currentUser?.messaging_disabled;

  const cannotSaveSettings = () =>
    !emailValidated || !!validationErrors.email || settings.username.length == 0 || !!validationErrors.username;

  const cannotChangePassword = () =>
    !!validationErrors.currentPassword ||
    !!validationErrors.newPassword ||
    settings.currentPassword.length < 8 ||
    settings.newPassword.length < 8 ||
    (!!settings.newPassword && !validPassword);

  const validateEmail = value => {
    if (emailRegex.test(value)) {
      setValidationErrors(prev => ({ ...prev, email: false }));
    } else {
      setValidationErrors(prev => ({
        ...prev,
        email: "Email is not valid"
      }));
    }
    setEmailValidated(true);
  };

  const saveProfileDisabled = () => {
    return (saving.loading || cannotSaveSettings()) && !messagingModeChanged();
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <div className="d-flex flex-column edit-profile-content w-100">
        <H5 className="w-100 text-left" mode={mode} text="Account Settings" bold />
        <P2 className="w-100 text-left" mode={mode} text="Update your username and manage your account" />
        <div className="d-flex flex-row w-100 flex-wrap justify-content-between mt-4">
          <TextInput
            title={"Username"}
            mode={mode}
            shortCaption={`Your Talent Protocol URL: /u/${settings.username}`}
            onChange={e => changeAttribute("username", e.target.value)}
            value={settings.username}
            className="w-100"
            required
            error={validationErrors.username}
          />
          {validationErrors.username && <P3 className="text-danger" text={validationErrors.username} />}
        </div>
        <div className="d-flex flex-row w-100 flex-wrap mt-4">
          <TextInput
            title="Email"
            type="email"
            mode={mode}
            onChange={e => changeAttribute("email", e.target.value)}
            value={settings.email}
            className="w-100"
            required
            error={validationErrors.email}
            onBlur={e => validateEmail(e.target.value)}
          />
          {validationErrors?.email && <P3 className="text-danger" text={validationErrors.email} />}
        </div>
        <div className="d-flex flex-column w-100 flex-wrap mt-3">
          <div className={`d-flex flex-row ${mobile ? "justify-content-between" : "mt-4"} w-100 pb-4`}>
            <LoadingButton
              onClick={() => updateUser()}
              type="primary-default"
              mode={mode}
              disabled={saveProfileDisabled()}
              loading={saving.loading}
              success={saving.profile}
            >
              Save Profile
            </LoadingButton>
          </div>
        </div>
        <Divider className="mb-4" />
        <div className="d-flex flex-row w-100 flex-wrap mt-4">
          <TextInput
            title={"Current Password"}
            type="password"
            placeholder={"*********"}
            mode={mode}
            onChange={e => changeAttribute("currentPassword", e.target.value)}
            value={settings.currentPassword}
            className="w-100"
            required
            error={validationErrors.currentPassword}
          />
          {validationErrors?.currentPassword && <P3 className="text-danger" text={validationErrors.currentPassword} />}
        </div>
        <div className="d-flex flex-row w-100 justify-content-between mt-4">
          <TextInput
            title={"New Password"}
            type="password"
            placeholder={"*********"}
            mode={mode}
            onChange={e => changeAttribute("newPassword", e.target.value)}
            value={settings.newPassword}
            className="w-100"
            error={validationErrors.newPassword}
          />
        </div>
        <div className="d-flex flex-wrap">
          {tags.map(tag => (
            <Tag className={`mr-2 mt-2${errors[tag] ? "" : " bg-success"}`} key={tag}>
              <P3 text={tag} bold className={errors[tag] ? "" : "permanent-text-white"} />
            </Tag>
          ))}
        </div>
        <Button
          onClick={() => updatePassword()}
          type="primary-default"
          mode={mode}
          disabled={cannotChangePassword()}
          className="mt-4 mb-4 w-100"
        >
          Change password
        </Button>

        <Divider className="mb-4" />
        <div className="d-flex flex-column w-100 my-3">
          <H5 className="w-100 text-left" mode={mode} text="Close Account" bold />
          <P2
            className="w-100 text-left"
            mode={mode}
            text="To permanently delete your account and account data, you'll need to confirm your decision in an email we send you."
          />
          <button className="button-link w-100 mt-4 mb-2" onClick={sendDeleteAccountEmail}>
            <Link text="Send delete account confirmation email" className="text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default (props, railsContext) => {
  return () => (
    <ThemeContainer>
      <Settings {...props} railsContext={railsContext} />
    </ThemeContainer>
  );
};
