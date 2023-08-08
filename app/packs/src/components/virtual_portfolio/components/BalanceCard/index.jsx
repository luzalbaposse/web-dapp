import React from "react";
import { BalanceCardContainer, BalanceTitle, BalanceValue, BalanceValueInDollars, BalanceContainer } from "./styled";

import { Icon } from "@talentprotocol/design-system";
import { P2, H4 } from "src/components/design_system/typography";

/***
 * PROPS
 *  primary: The card should use the primary colors for the background
 *  children: Inner content
 ***/

const BalanceCard = ({ theme, primary, title, value, valueInDollars, highlightValues, children, icon }) => {
  const iconColor = () => {
    if (theme == "dark") {
      return primary ? "surface01" : "primary04";
    } else {
      return primary ? "dangerText" : "primary04";
    }
  };

  return (
    <BalanceCardContainer primary={primary} theme={theme}>
      <BalanceContainer>
        <BalanceTitle>
          <Icon name={icon} size={16} color={iconColor()} />
          <P2>{title}</P2>
        </BalanceTitle>
        <BalanceValue theme={theme} highlightValues={highlightValues}>
          <H4 className="mb-0" bold>
            {value}
          </H4>
        </BalanceValue>
        <BalanceValueInDollars theme={theme} highlightValues={highlightValues}>
          <P2>{valueInDollars}</P2>
        </BalanceValueInDollars>
      </BalanceContainer>
      {children}
    </BalanceCardContainer>
  );
};

export default BalanceCard;
