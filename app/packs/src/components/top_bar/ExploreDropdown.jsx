import { Dropdown } from "react-bootstrap";
import { Icon, Typography } from "@talentprotocol/design-system";
import cx from "classnames";
import React from "react";
import { Caret } from "src/components/icons";
import { P2 } from "src/components/design_system/typography";

const ExploreDropdown = ({ active }) => {
  return (
    <Dropdown className="align-items-center d-flex mr-4">
      <Dropdown.Toggle as="div" className={cx("no-caret tab-container white", active && "active")}>
        <P2 className="align-items-center current-color d-flex tab-text" medium>
          Explore
          <Caret className="ml-2" color="currentColor" size={12} />
        </P2>
      </Dropdown.Toggle>
      <Dropdown.Menu className="explore-dropdown-menu">
        <Dropdown.Item className="explore-dropdown-item" href="/talent">
          <Icon color="primary01" name="user" size={16} />
          <Typography color="primary01" specs={{ type: "medium", variant: "label2" }}>
            Talent
          </Typography>
        </Dropdown.Item>
        <Dropdown.Item className="explore-dropdown-item" href="/collectives">
          <Icon color="primary01" name="multiple-users" size={16} />
          <Typography color="primary01" specs={{ type: "medium", variant: "label2" }}>
            Collectives
          </Typography>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ExploreDropdown;
