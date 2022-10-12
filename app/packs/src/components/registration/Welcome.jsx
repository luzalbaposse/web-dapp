import React, { useEffect, useState, useCallback } from "react";
import { faSpinner, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReCAPTCHA from "react-google-recaptcha";
import { H5, P2 } from "src/components/design_system/typography";
import TextInput from "src/components/design_system/fields/textinput";
import Checkbox from "src/components/design_system/checkbox";
import Link from "src/components/design_system/link";
import debounce from "lodash/debounce";

import { get } from "src/utils/requests";
import { TERMS_HREF, PRIVACY_HREF, USER_GUIDE } from "src/utils/constants";
import { useWindowDimensionsHook } from "src/utils/window";
import { emailRegex, emailRegexWithAliases } from "src/utils/regexes";
import TalentProfilePicture from "src/components/talent/TalentProfilePicture";

import cx from "classnames";

const Welcome = ({
  themePreference,
  changeStep,
  changeEmail,
  email,
  changeCode,
  setCaptcha,
  captchaKey,
  railsContext,
  inviteCode,
  name,
  profilePictureUrl,
  changeUsername,
  username,
}) => {
  const { width } = useWindowDimensionsHook();
  const mobile = width < 992;

  const [localEmail, setEmail] = useState(email);
  const [localCaptcha, setLocalCaptcha] = useState(null);
  const [requestingEmail, setRequestingEmail] = useState(false);
  const [emailValidated, setEmailValidated] = useState(null);
  const [emailExists, setEmailExists] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [localCode, setCode] = useState(inviteCode || "");
  const [localUsername, setUsername] = useState(username);
  const [requestingUsername, setRequestingUsername] = useState(false);
  const [usernameValidated, setUsernameValidated] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const [usernameError, setUsernameError] = useState(false);

  const validEmail = () => {
    if (railsContext.emailRegexWithoutAliases === "true") {
      return emailRegex.test(String(localEmail).toLowerCase());
    }

    return emailRegexWithAliases.test(String(localEmail).toLowerCase());
  };

  const editUsername = (e) => {
    if (e.target.value != "" && !/^[a-z0-9]+$/.test(e.target.value)) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
    setUsername(e.target.value);
  };

  const invalidForm =
    !validEmail() ||
    !emailValidated ||
    emailExists ||
    !acceptedTerms ||
    !localCaptcha ||
    !usernameValidated ||
    usernameError;

  const submitWelcomeForm = (e) => {
    e.preventDefault();
    if (
      localEmail != "" &&
      validEmail() &&
      localCaptcha &&
      localUsername != ""
    ) {
      changeEmail(localEmail);
      if (localCode.length > 0) {
        changeCode(localCode);
      }
      setCaptcha(localCaptcha);
      changeUsername(localUsername);
      changeStep(3);
    }
  };

  useEffect(() => {
    if (localEmail.length === 0) {
      return;
    }

    const splitEmail = localEmail.split("@");

    if (splitEmail.length < 2) {
      return;
    }

    if (!splitEmail[1].includes(".")) {
      return;
    }

    if (!validEmail()) {
      setEmailValidated(false);
      return;
    }

    setRequestingEmail(true);
    const searchParams = new URLSearchParams({ email: localEmail });

    get(`/users?${searchParams}`)
      .then((response) => {
        if (response.error) {
          setRequestingEmail(false);
          setEmailExists(false);
          setEmailValidated(true);
        } else {
          setRequestingEmail(false);
          setEmailValidated(null);
          setEmailExists(true);
        }
      })
      .catch(() => {
        setRequestingEmail(false);
        setEmailExists(false);
        setEmailValidated(true);
      });
  }, [localEmail]);

  const verify = useCallback(
    debounce((name, setname, setvalid, setexists) => {
      setRequestingUsername(true);
      setvalid(false);

      get(`/users?username=${name}`)
        .then((response) => {
          if (response.error) {
            setname(false);
            setexists(false);
            setvalid(true);
          } else {
            setname(false);
            setvalid(false);
            setexists(true);
          }
        })
        .catch(() => {
          setname(false);
          setexists(false);
          setvalid(true);
        });
    }, 200),
    []
  );

  useEffect(() => {
    if (localUsername == "") {
      setUsernameValidated(false);
      return;
    }

    verify(
      localUsername,
      setRequestingUsername,
      setUsernameValidated,
      setUsernameExists
    );
  }, [localUsername]);

  const recaptchaSubmition = (value) => {
    setLocalCaptcha(value);
  };

  const shouldRenderInvitedBy = inviteCode !== "" && !!name;

  return (
    <>
      <div className="mb-6">
        {!shouldRenderInvitedBy && (
          <>
            <H5 text="Welcome to Talent Protocol!" bold />
            <P2
              className="text-primary-03"
              text="Sign up to build your web3 on-chain resume that gives you priority access to scholarships, opportunities, mentors and more."
            />
          </>
        )}
        {shouldRenderInvitedBy && (
          <div className="d-flex flex-row align-items-center">
            <TalentProfilePicture src={profilePictureUrl} height={120} />
            <div className="d-flex flex-column ml-3">
              <H5
                text={`${name} is inviting you to join Talent Protocol!`}
                bold
              />
              <P2
                className="text-primary-03"
                text="Sign up to build your web3 on-chain resume that gives you priority access to scholarships, opportunities, mentors and more."
              />
            </div>
          </div>
        )}
      </div>
      <form onSubmit={submitWelcomeForm} className="d-flex flex-column w-100">
        <div className="form-group position-relative">
          <label htmlFor="inputUsername" className="mt-2">
            <P2 className="text-black" text="Handle" bold />
          </label>
          <TextInput
            mode={themePreference}
            type="text"
            id="inputUsername"
            value={localUsername}
            onChange={editUsername}
            error={usernameError}
          />
          <P2
            className="form-text text-primary-04 mt-1"
            text="This will be your Talent Protocol URL. We only accept lowercase letters and numbers."
          />
          {requestingUsername && (
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className="position-absolute"
              style={{ top: 48, right: 10 }}
            />
          )}
          {usernameValidated && !usernameError && (
            <FontAwesomeIcon
              icon={faCheck}
              className="position-absolute text-success"
              style={{ top: 48, right: 10 }}
            />
          )}
          {(usernameExists || usernameError) && (
            <FontAwesomeIcon
              icon={faTimes}
              className="position-absolute text-danger"
              style={{ top: 48, right: 10 }}
            />
          )}
          {usernameExists && (
            <small id="usernameErrorHelp" className="form-text text-danger">
              We already have that username in the system.
            </small>
          )}
        </div>
        <div className="form-group position-relative">
          <label htmlFor="inputEmail">
            <P2 className="text-black" text="Drop your email address" bold />
          </label>
          <TextInput
            mode={themePreference}
            type="email"
            id="inputEmail"
            ariaDescribedBy="emailHelp"
            value={localEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
          {requestingEmail && (
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className="position-absolute"
              style={{ top: 42, right: 10 }}
            />
          )}
          {emailValidated && (
            <FontAwesomeIcon
              icon={faCheck}
              className="position-absolute text-success"
              style={{ top: 42, right: 10 }}
            />
          )}
          {emailValidated === false && (
            <FontAwesomeIcon
              icon={faTimes}
              className="position-absolute text-danger"
              style={{ top: 42, right: 10 }}
            />
          )}
          {emailValidated === false && (
            <small id="emailErrorHelp" className="form-text text-danger">
              This is not a valid email.
            </small>
          )}
          {emailExists && (
            <FontAwesomeIcon
              icon={faTimes}
              className="position-absolute text-danger"
              style={{ top: 42, right: 10 }}
            />
          )}
          {emailExists && (
            <small id="emailErrorHelp" className="form-text text-danger">
              We already have that email in the system.
            </small>
          )}
          <div className="d-flex flex-row w-100 mt-4">
            <ReCAPTCHA sitekey={captchaKey} onChange={recaptchaSubmition} />
          </div>
          <div className="form-group mt-4">
            <Checkbox
              className="form-check-input"
              htmlFor="termsAndConditions"
              id="termsAndConditions"
              checked={acceptedTerms}
              onChange={() => setAcceptedTerms((prev) => !prev)}
            >
              <div className="d-flex flex-wrap">
                <P2 className="mr-1" text="I have read and agree to the" />
                <Link
                  className="mr-1"
                  text="Terms & Conditions"
                  href={TERMS_HREF}
                  target="_blank"
                />
                <P2 className="mr-1" text="and " />
                <Link
                  text="Privacy Policy"
                  href={PRIVACY_HREF}
                  target="_blank"
                />
                <P2 text="." />
              </div>
            </Checkbox>
          </div>
        </div>
        <button
          type="submit"
          disabled={invalidForm}
          className="btn btn-primary talent-button primary-default-button extra-big-size-button w-100"
        >
          Continue
        </button>
      </form>
      <div
        className={cx("d-flex w-100 mt-6", mobile && "justify-content-center")}
      >
        <P2 className="text-black mr-1" text="Already have an account?" />
        <Link text="Login." href="/" bold />
      </div>
      <div
        className={cx(
          "d-flex w-100 mt-2",
          mobile && "justify-content-center pb-4"
        )}
      >
        <P2 className="text-black mr-1" text="Want more info?" />
        <Link
          bold
          href={USER_GUIDE}
          target="_blank"
          text="Check the user guide."
        />
      </div>
    </>
  );
};

export default Welcome;
