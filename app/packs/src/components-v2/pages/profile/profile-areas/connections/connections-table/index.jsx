import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import { Tag } from "@talentprotocol/design-system";
import { P2, Caption } from "src/components/design_system/typography";
import TalentProfilePicture from "src/components/talent/TalentProfilePicture";
import Table from "src/components/design_system/table";
import { formattedConnectionType } from "src/utils/viewHelpers";

import cx from "classnames";

export const ConnectionsTable = ({ connections, mode, mobile }) => {
  return (
    <Table mode={mode}>
      <Table.Head>
        <Table.Th>
          <Caption bold text="Talent" />
        </Table.Th>
        <Table.Th className={cx(mobile ? "text-right" : "")}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Caption bold text="Connection" />
          </div>
        </Table.Th>
      </Table.Head>
      <Table.Body>
        {connections.map(connection => (
          <Table.Tr
            key={connection.id}
            onClick={() => (window.location.href = `https://beta.talentprotocol.com/u/${connection.username}`)}
          >
            <Table.Td>
              <div className="d-flex align-items-center">
                <TalentProfilePicture src={connection.profile_picture_url} userId={connection.id} height={24} />
                <P2 text={connection.name} bold className="ml-2" />
              </div>
            </Table.Td>
            <Table.Td>
              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <Tag
                  textColor="primary02"
                  borderColor="surfaceHover02"
                  size="small"
                  label={formattedConnectionType(connection.connection_type)}
                />
              </div>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Body>
    </Table>
  );
};
