import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import P2 from "src/components/design_system/typography/p2";
import { OrderBy } from "src/components/icons";
import cx from "classnames";
import { USDC, Talent } from "src/components/icons";
import CUSD from "images/cusd.png";

const CurrencySelectionDropdown = ({ className, mode, selectedCurrency, setSelectedCurrency, chain }) => {
  const currency = chain == "Celo" ? "cUSD" : "USDC";

  const currencyIcon = () => {
    if (currency == "cUSD") {
      return <img className={"mr-2"} src={CUSD} width={24} height={24} alt="cUSD icon" />;
    } else {
      return <USDC className="mr-2" />;
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        className={cx(
          "claim-rewards-dropdown-btn",
          "no-caret",
          "w-100",
          "d-flex",
          "mb-4",
          "justify-content-between",
          mode,
          className
        )}
        id="claim-methods-dropdown"
      >
        <div className="d-flex flex-row align-items-center">
          {selectedCurrency == currency ? currencyIcon() : <Talent className="mr-2" />}
          <P2 className="text-black" mode={mode} text={selectedCurrency} />
        </div>
        <OrderBy black className="align-self-center" pathClassName={cx("icon-theme", mode)} />
      </Dropdown.Toggle>

      <Dropdown.Menu className={cx("w-100", mode)}>
        <Dropdown.Item
          key="tab-dropdown-restake"
          className="d-flex flex-row align-items-center"
          onClick={e => setSelectedCurrency(e.target.innerText)}
        >
          {currencyIcon()}
          <P2 className="text-black" bold mode={mode} text={currency} />
        </Dropdown.Item>
        <Dropdown.Item
          key="tab-dropdown-withdrawal"
          className="d-flex flex-row align-items-center"
          onClick={e => setSelectedCurrency(e.target.innerText)}
        >
          <Talent className="mr-2" />
          <P2 className="text-black" bold mode={mode} text="TAL" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CurrencySelectionDropdown;
