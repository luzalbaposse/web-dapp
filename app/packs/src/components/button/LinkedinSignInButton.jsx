import React from "react";
import LinkedinSignIn from "images/linkedin-sign-in.png";

const LinkedinSignInButton = ({
  clientId,
  redirectUri,
}) => {
  const baseAuthorizationUri = "https://www.linkedin.com/oauth/v2/authorization"
  const scope = "r_liteprofile%20r_emailaddress"

  const onClick = () => {
    window.location.href = `${baseAuthorizationUri}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`
  }

  return (
    <div className="text-center">
      <div className="my-2">or</div>
      <img className="cursor-pointer" height={50} onClick={onClick} src={LinkedinSignIn} />
    </div>
  );
};

export default LinkedinSignInButton;
