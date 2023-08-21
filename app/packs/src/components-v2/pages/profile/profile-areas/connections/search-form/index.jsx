import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import { Dropdown } from "@talentprotocol/design-system";
import TextInput from "src/components/design_system/fields/textinput";
import { Search } from "src/components/icons";
import { Container, TextInputContainer, DropdownContainer, SearchIconContainer } from "./styled";

import cx from "classnames";

export const SearchForm = ({ options, changeOptions, connectionType, keyword, mobile }) => {
  return (
    <Container>
      <TextInputContainer>
        <TextInput
          value={keyword}
          onChange={e => changeOptions("keyword", e.target.value)}
          placeholder="Search"
          inputClassName={cx("pl-5", mobile ? "w-75" : "w-100")}
          inputStyle={{ height: 42 }}
          className="w-100"
        />
        <SearchIconContainer>
          <Search color="currentColor" />
        </SearchIconContainer>
      </TextInputContainer>
      <DropdownContainer>
        <Dropdown
          options={options}
          selectOption={value => {
            changeOptions("connectionType", value);
          }}
          selectedOption={connectionType}
        />
      </DropdownContainer>
    </Container>
  );
};
