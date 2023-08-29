import React from "react";
import { Container, Link } from "./styled";
import { Typography } from "@talentprotocol/design-system";

export const NavLinks = ({ goToPage, page, className }) => (
  <Container className={className}>
    <Link onClick={() => goToPage("profile")}>
      <Typography specs={{ type: "medium", variant: "label1" }} color={page === "Profile" ? "primary01" : "primary03"}>
        Profile
      </Typography>
    </Link>
    <Link onClick={() => goToPage("about")}>
      <Typography specs={{ type: "medium", variant: "label1" }} color={page === "About" ? "primary01" : "primary03"}>
        About
      </Typography>
    </Link>
    <Link onClick={() => goToPage("experience")}>
      <Typography
        specs={{ type: "medium", variant: "label1" }}
        color={page === "Experience" ? "primary01" : "primary03"}
      >
        Experience
      </Typography>
    </Link>
    <Link onClick={() => goToPage("account")}>
      <Typography specs={{ type: "medium", variant: "label1" }} color={page === "Account" ? "primary01" : "primary03"}>
        Account
      </Typography>
    </Link>
    <Link onClick={() => goToPage("notifications")}>
      <Typography
        specs={{ type: "medium", variant: "label1" }}
        color={page === "Notifications" ? "primary01" : "primary03"}
      >
        Notifications
      </Typography>
    </Link>
  </Container>
);
