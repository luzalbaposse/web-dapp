import { debounce } from "lodash";
import { Dropdown } from "react-bootstrap";
import { P1, P2 } from "src/components/design_system/typography";
import cx from "classnames";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import { camelCaseObject } from "src/utils/transformObjects";
import { get } from "src/utils/requests";
import { ArrowLeft, Search } from "src/components/icons";
import { useWindowDimensionsHook } from "../../utils/window";
import Button from "src/components/design_system/button";
import Divider from "src/components/design_system/other/Divider";
import TalentProfilePicture from "../talent/TalentProfilePicture";
import TextInput from "src/components/design_system/fields/textinput";

const SearchDropdown = ({ className }) => {
  const { width } = useWindowDimensionsHook();

  const [keyword, setKeyword] = useState("");
  const [pagination, setPagination] = useState({});
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [talents, setTalents] = useState([]);

  useEffect(() => {
    if (keyword.length === 0) fetchTalents("page=1&per_page=10&status=Verified");
  }, [keyword]);

  const fetchTalents = params => {
    get(`/api/v1/talent?${params}`).then(response => {
      setPagination(response.pagination);
      setTalents(responseTalents(response));
    });
  };

  const fetchMoreTalents = () => {
    const nextPage = pagination.currentPage + 1;

    get(`/api/v1/talent?keyword=${keyword}&page=${nextPage}`).then(response => {
      setPagination(response.pagination);
      setTalents(talents => [...talents, ...responseTalents(response)]);
    });
  };

  const responseTalents = response => {
    return response.talents.map(talent => ({ ...camelCaseObject(talent) }));
  };

  const showLoadMoreTalents = pagination.currentPage < pagination.lastPage;

  const onChange = value => {
    setKeyword(value);
    value.length > 2 ? fetchTalents(`keyword=${value}`) : setTalents([]);
  };

  const debouncedOnChange = debounce(value => onChange(value), 200);

  if (width < 992) {
    return (
      <>
        <Button onClick={() => setShowSearchDropdown(true)} type="white-ghost" className="ml-2" size="none">
          <Search color="currentColor" size={20} />
        </Button>
        <Modal
          backdrop={false}
          className="p-0"
          dialogClassName="m-0 mh-100 mw-100"
          fullscreen="true"
          onHide={() => setShowSearchDropdown(false)}
          show={showSearchDropdown}
        >
          <Modal.Header className="align-items-center justify-content-start p-4">
            <Button
              className="d-flex align-items-center mr-4"
              onClick={() => setShowSearchDropdown(false)}
              size="icon"
              type="white-ghost"
            >
              <ArrowLeft color="currentColor" size={16} />
            </Button>
            <TextInput
              className="w-100"
              onChange={e => debouncedOnChange(e.target.value)}
              placeholder="Search"
              value={keyword}
            />
          </Modal.Header>
          <Modal.Body className="d-flex flex-column p-0 menu-divider search-dropdown-modal-body">
            <div className="m-4 search-dropdown-results-mobile">
              {talents.length > 0 && talents.map(talent => <TalentDropdownItem talent={talent} />)}
              {showLoadMoreTalents && <LoadMore onClick={fetchMoreTalents} />}
              {keyword.length > 2 && talents.length === 0 && <NoResults keyword={keyword} />}
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  return (
    <Dropdown className="align-items-center d-flex">
      <Dropdown.Toggle as="div" className={cx(className, "no-caret normal-size-button px-2")}>
        <Search color="currentColor" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="search-dropdown-menu">
        <TextInput
          className="my-3 px-2 w-100"
          onChange={e => debouncedOnChange(e.target.value)}
          placeholder="Search"
          value={keyword}
        />
        {talents.length > 0 && (
          <div className="mb-3 px-2 search-dropdown-results">
            {talents.map(talent => (
              <TalentDropdownItem talent={talent} />
            ))}
          </div>
        )}
        {showLoadMoreTalents && <LoadMore onClick={fetchMoreTalents} />}
        {keyword.length > 2 && talents.length === 0 && <NoResults keyword={keyword} />}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SearchDropdown;

const LoadMore = ({ onClick }) => {
  return (
    <>
      <Divider className="mb-3" />
      <a className="text-center" onClick={onClick} href="#">
        <P2 bold className="pb-3 text-black" text="Load More" />
      </a>
    </>
  );
};

const NoResults = ({ keyword }) => {
  return (
    <div className="align-items-center d-flex flex-column px-3 py-5">
      <Search className="mb-3" color="currentColor" />
      <P1 className="mb-2 text-center text-primary">No results for {keyword}.</P1>
      <P2 className="mb-0 text-center text-primary-03">
        We couldn't find anything matching your search. Try again with a different term.
      </P2>
    </div>
  );
};

const TalentDropdownItem = ({ talent }) => {
  return (
    <Dropdown.Item className="align-items-center d-flex" href={`/u/${talent.user.username}`} key={talent.id}>
      <TalentProfilePicture className="mr-2" height={24} src={talent.profilePictureUrl} />
      {talent.user.name}
    </Dropdown.Item>
  );
};
