import React from "react";
import { ethers } from "ethers";

import Table from "src/components/design_system/table";
import TalentProfilePicture from "src/components/talent/TalentProfilePicture";
import { DetailsCell, DetailsCellRight, RewardIcon } from "./styled";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import { parseAndCommify } from "src/onchain/utils";

import { Add } from "src/components/icons";
import { white, black } from "src/utils/colors";
import { Icon, Typography } from "@talentprotocol/design-system";
import ThemedButton from "src/components/design_system/button";

const ClaimRewardsRow = ({ activity, explorerURL, theme }) => {
  const talAmount = () => {
    const amount = ethers.utils.parseUnits(activity.token.toString(), 0);
    return parseAndCommify(ethers.utils.formatUnits(amount, 18));
  };

  const dollarAmount = () => {
    const amount = ethers.utils.parseUnits(activity.token.toString(), 0).div(50);
    return parseAndCommify(ethers.utils.formatUnits(amount, 18));
  };

  return (
    <Table.Tr key={activity.id} className="border-bottom-black">
      <Table.Td className="pl-3 lg-pl-0 py-3">
        <div className="d-flex align-items-center">
          <RewardIcon theme={theme}>
            <Add color={theme == "dark" ? black : white} />
          </RewardIcon>
          <DetailsCell>
            <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
              {"Claimed Rewards"}
            </Typography>
            <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
              {dayjs(activity.tx_date, "YYYY-MM-DD").format("MMM DD, YYYY")}
            </Typography>
          </DetailsCell>
        </div>
      </Table.Td>
      <Table.Td className="text-center hide-content-in-mobile py-3">
        <a href={`${explorerURL}tx/${activity.tx_hash}`} target="_blank">
          <Typography
            specs={{ variant: "p2", type: "regular" }}
            color="primary"
            className="d-flex flex-row justify-content-center align-items-center"
          >
            {activity.tx_hash}{" "}
            <div style={{ marginTop: -4, paddingLeft: 8 }}>
              <Icon name={"external-link"} size={12} color="primary" />
            </div>
          </Typography>
        </a>
      </Table.Td>
      <Table.Td className="pr-3 lg-pr-0 py-3">
        <DetailsCellRight>
          <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
            {`+${talAmount()} $TAL`}
          </Typography>
          <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
            {`$${dollarAmount()}`}
          </Typography>
        </DetailsCellRight>
      </Table.Td>
    </Table.Tr>
  );
};

const TopUpRow = ({ activity, explorerURL, theme }) => {
  const talAmount = () => {
    const amount = ethers.utils.parseUnits(activity.token.toString(), 0);
    return parseAndCommify(ethers.utils.formatUnits(amount, 18));
  };

  const dollarAmount = () => {
    const amount = ethers.utils.parseUnits(activity.token.toString(), 0).div(50);
    return parseAndCommify(ethers.utils.formatUnits(amount, 18));
  };

  return (
    <Table.Tr key={activity.id} className="border-bottom-black">
      <Table.Td className="pl-3 lg-pl-0 py-3">
        <div className="d-flex align-items-center">
          <RewardIcon theme={theme}>
            <Add color={theme == "dark" ? black : white} />
          </RewardIcon>
          <DetailsCell>
            <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
              {"Top Up"}
            </Typography>
            <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
              {dayjs(activity.tx_date, "YYYY-MM-DD").format("MMM DD, YYYY")}
            </Typography>
          </DetailsCell>
        </div>
      </Table.Td>
      <Table.Td className="text-center hide-content-in-mobile py-3">
        <a href={`${explorerURL}tx/${activity.tx_hash}`} target="_blank">
          <Typography
            specs={{ variant: "p2", type: "regular" }}
            color="primary"
            className="d-flex flex-row justify-content-center align-items-center"
          >
            {activity.tx_hash}{" "}
            <div style={{ marginTop: -4, paddingLeft: 8 }}>
              <Icon name={"external-link"} size={12} color="primary" />
            </div>
          </Typography>
        </a>
      </Table.Td>
      <Table.Td className="pr-3 lg-pr-0 py-3">
        <DetailsCellRight>
          <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
            {`+${talAmount()} $TAL`}
          </Typography>
          <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
            {`$${dollarAmount()}`}
          </Typography>
        </DetailsCellRight>
      </Table.Td>
    </Table.Tr>
  );
};

const StakeRow = ({ activity, explorerURL }) => {
  const talAmount = () => {
    const amount = ethers.utils.parseUnits(activity.token.toString(), 0);
    return parseAndCommify(ethers.utils.formatUnits(amount, 18));
  };

  const dollarAmount = () => {
    const amount = ethers.utils.parseUnits(activity.token.toString(), 0).div(10);
    return parseAndCommify(ethers.utils.formatUnits(amount, 18));
  };

  return (
    <Table.Tr key={activity.id} className="border-bottom-black">
      <Table.Td className="pl-3 lg-pl-0 py-3">
        <div className="d-flex align-items-center">
          <TalentProfilePicture src={activity.profile_picture_url} userId={activity.user_id} height={40} />
          <DetailsCell>
            <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
              {`Stake $${activity.symbol}`}
            </Typography>
            <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
              {dayjs(activity.tx_date, "YYYY-MM-DD").format("MMM DD, YYYY")}
            </Typography>
          </DetailsCell>
        </div>
      </Table.Td>
      <Table.Td className="text-center hide-content-in-mobile py-3">
        <a href={`${explorerURL}tx/${activity.tx_hash}`} target="_blank">
          <Typography
            specs={{ variant: "p2", type: "regular" }}
            color="primary"
            className="d-flex flex-row justify-content-center align-items-center"
          >
            {activity.tx_hash}{" "}
            <div style={{ marginTop: -4, paddingLeft: 8 }}>
              <Icon name={"external-link"} size={12} color="primary" />
            </div>
          </Typography>
        </a>
      </Table.Td>
      <Table.Td className="pr-3 lg-pr-0 py-3">
        <DetailsCellRight>
          <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
            {`+${talAmount()} $${activity.symbol}`}
          </Typography>
          <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
            {`$${dollarAmount()}`}
          </Typography>
        </DetailsCellRight>
      </Table.Td>
    </Table.Tr>
  );
};

const UnstakeRow = ({ activity, explorerURL }) => {
  const talAmount = () => {
    const amount = ethers.utils.parseUnits(activity.token.toString(), 0);
    return parseAndCommify(ethers.utils.formatUnits(amount, 18));
  };

  const dollarAmount = () => {
    const amount = ethers.utils.parseUnits(activity.token.toString(), 0).div(10);
    return parseAndCommify(ethers.utils.formatUnits(amount, 18));
  };

  return (
    <Table.Tr key={activity.id} className="border-bottom-black">
      <Table.Td className="pl-3 lg-pl-0 py-3">
        <div className="d-flex align-items-center">
          <TalentProfilePicture src={activity.profile_picture_url} userId={activity.user_id} height={40} />
          <DetailsCell>
            <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
              {`Unstake $${activity.symbol}`}
            </Typography>
            <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
              {dayjs(activity.tx_date, "YYYY-MM-DD").format("MMM DD, YYYY")}
            </Typography>
          </DetailsCell>
        </div>
      </Table.Td>
      <Table.Td className="text-center hide-content-in-mobile py-3">
        <a href={`${explorerURL}tx/${activity.tx_hash}`} target="_blank">
          <Typography
            specs={{ variant: "p2", type: "regular" }}
            color="primary"
            className="d-flex flex-row justify-content-center align-items-center"
          >
            {activity.tx_hash}{" "}
            <div style={{ marginTop: -4, paddingLeft: 8 }}>
              <Icon name={"external-link"} size={12} color="primary" />
            </div>
          </Typography>
        </a>
      </Table.Td>
      <Table.Td className="pr-3 lg-pr-0 py-3">
        <DetailsCellRight>
          <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
            {`+${talAmount()} $${activity.symbol}`}
          </Typography>
          <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
            {`$${dollarAmount()}`}
          </Typography>
        </DetailsCellRight>
      </Table.Td>
    </Table.Tr>
  );
};

const TalentRewardWithdrawalRow = ({ activity, explorerURL, theme }) => {
  const talAmount = () => {
    const amount = ethers.utils.parseUnits(activity.token.toString(), 0);
    return parseAndCommify(ethers.utils.formatUnits(amount, 18));
  };

  const dollarAmount = () => {
    const amount = ethers.utils.parseUnits(activity.token.toString(), 0).div(50);
    return parseAndCommify(ethers.utils.formatUnits(amount, 18));
  };

  return (
    <Table.Tr key={activity.id} className="border-bottom-black">
      <Table.Td className="pl-3 lg-pl-0 py-3">
        <div className="d-flex align-items-center">
          <RewardIcon theme={theme}>
            <Add color={theme == "dark" ? black : white} />
          </RewardIcon>
          <DetailsCell>
            <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
              {"Talent Rewards"}
            </Typography>
            <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
              {dayjs(activity.tx_date, "YYYY-MM-DD").format("MMM DD, YYYY")}
            </Typography>
          </DetailsCell>
        </div>
      </Table.Td>
      <Table.Td className="text-center hide-content-in-mobile py-3">
        <a href={`${explorerURL}tx/${activity.tx_hash}`} target="_blank">
          <Typography
            specs={{ variant: "p2", type: "regular" }}
            color="primary"
            className="d-flex flex-row justify-content-center align-items-center"
          >
            {activity.tx_hash}{" "}
            <div style={{ marginTop: -4, paddingLeft: 8 }}>
              <Icon name={"external-link"} size={12} color="primary" />
            </div>
          </Typography>
        </a>
      </Table.Td>
      <Table.Td className="pr-3 lg-pr-0 py-3">
        <DetailsCellRight>
          <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
            {`+${talAmount()} $TAL`}
          </Typography>
          <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
            {`$${dollarAmount()}`}
          </Typography>
        </DetailsCellRight>
      </Table.Td>
    </Table.Tr>
  );
};

const WalletActivityTable = ({ theme, activities, showLoadMoreActivities, loadMoreActivities, blockExplorerUrl }) => {
  const chooseRenderedRow = activity => {
    switch (activity.event_type) {
      case "RewardWithdrawal":
        return <ClaimRewardsRow key={activity.id} activity={activity} explorerURL={blockExplorerUrl} theme={theme} />;
      case "TalentRewardWithdrawal":
        return (
          <TalentRewardWithdrawalRow
            key={activity.id}
            activity={activity}
            explorerURL={blockExplorerUrl}
            theme={theme}
          />
        );
      case "AdminMinted":
        return <TopUpRow key={activity.id} activity={activity} explorerURL={blockExplorerUrl} theme={theme} />;
      case "Stake":
        return <StakeRow key={activity.id} activity={activity} explorerURL={blockExplorerUrl} theme={theme} />;
      case "Unstake":
        return <UnstakeRow key={activity.id} activity={activity} explorerURL={blockExplorerUrl} theme={theme} />;
      default:
        return <ClaimRewardsRow key={activity.id} activity={activity} explorerURL={blockExplorerUrl} theme={theme} />;
    }
  };

  return (
    <>
      {activities.length === 0 && (
        <>
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ marginTop: 88, marginBottom: 88 }}
          >
            <Icon name={"binoculars"} size={48} color="primary04" />
            <Typography specs={{ variant: "h5", type: "bold" }} className="mt-4" color="primary04">
              {"You don't have any activity yet"}
            </Typography>
            <Typography specs={{ variant: "p2", type: "regular" }} color="primary04">
              {"All your wallet activity related to Talent Protocol will be listed here."}
            </Typography>
          </div>
        </>
      )}
      {activities.length > 0 && (
        <>
          <Table mode={theme} className="table-mobile-full-width">
            <Table.Body className="">{activities.map(activity => chooseRenderedRow(activity))}</Table.Body>
          </Table>
          {showLoadMoreActivities() && (
            <div className="d-flex flex-column justify-content-center">
              <ThemedButton onClick={() => loadMoreActivities()} type="white-default" className="mx-auto">
                Show More
              </ThemedButton>
            </div>
          )}
          {!showLoadMoreActivities() && (
            <div className="d-flex flex-row justify-content-center my-6">
              <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
                {"You've reached the end of the list"}
              </Typography>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default WalletActivityTable;
