import React from "react";
import NewTalentCard from "src/components/design_system/cards/NewTalentCard";
import { useWindowDimensionsHook } from "src/utils/window";

import cx from "classnames";

const TalentTableCardMode = ({
  updateFollow,
  getMarketCap,
  getSupporterCount,
  talents,
}) => {
  const { mobile } = useWindowDimensionsHook();

  return (
    <div
      className={cx(
        "w-100 d-flex flex-wrap talents-cards-container",
        mobile ? "justify-content-center" : "justify-start"
      )}
    >
      {talents.map((talent) => (
        <div key={talent.id} className={cx("mt-3", !mobile && "pr-4")}>
          <NewTalentCard
            name={talent.user.name}
            ticker={talent.token.ticker}
            contractId={talent.token.contractId}
            occupation={talent.occupation}
            profilePictureUrl={talent.profilePictureUrl}
            headline={talent.headline}
            isFollowing={talent.isFollowing}
            updateFollow={() => updateFollow(talent)}
            talentLink={`/talent/${talent.user.username}`}
            marketCap={getMarketCap(talent.token.contractId)}
            supporterCount={getSupporterCount(talent.token.contractId)}
          />
        </div>
      ))}
    </div>
  );
};

export default TalentTableCardMode;