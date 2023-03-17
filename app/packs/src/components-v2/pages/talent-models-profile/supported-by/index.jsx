import { Avatar, Icon, Typography } from "@talentprotocol/design-system";
import React from "react";
import {  Container, ListContainer, ListItem, ListItemInfo, ListItemInfoRow} from "./styled";

export const SupportedBy = () => (
    <Container>
        <Typography specs={{ variant: "h5", type: "bold"}} color="primary01" >
            Pedro is supported by 47 people
        </Typography>
        <ListContainer>
            <ListItem>
                <Avatar size="md" />
                <ListItemInfo>
                    <ListItemInfoRow>
                        <Typography specs={{ variant: "label2", type: "medium"}} color="primary01">
                            Esther Howard
                        </Typography>
                        <Icon name="verified-2" />
                    </ListItemInfoRow>
                    <ListItemInfoRow>
                        <Typography specs={{ variant: "p3", type: "bold"}} color="primary01">
                            $EST
                        </Typography>
                        <Typography specs={{ variant: "p3", type: "regular"}} color="primary01">
                            Design Lead at Microsoft
                        </Typography>
                    </ListItemInfoRow>
                </ListItemInfo>
            </ListItem>
            <ListItem>
                <Avatar size="md" />
                <ListItemInfo>
                    <ListItemInfoRow>
                        <Typography specs={{ variant: "label2", type: "medium"}} color="primary01">
                            Esther Howard
                        </Typography>
                        <Icon name="verified-2" />
                    </ListItemInfoRow>
                    <ListItemInfoRow>
                        <Typography specs={{ variant: "p3", type: "bold"}} color="primary01">
                            $EST
                        </Typography>
                        <Typography specs={{ variant: "p3", type: "regular"}} color="primary01">
                            Design Lead at Microsoft
                        </Typography>
                    </ListItemInfoRow>
                </ListItemInfo>
            </ListItem>
            <ListItem>
                <Avatar size="md" />
                <ListItemInfo>
                    <ListItemInfoRow>
                        <Typography specs={{ variant: "label2", type: "medium"}} color="primary01">
                            Esther Howard
                        </Typography>
                        <Icon name="verified-2" />
                    </ListItemInfoRow>
                    <ListItemInfoRow>
                        <Typography specs={{ variant: "p3", type: "bold"}} color="primary01">
                            $EST
                        </Typography>
                        <Typography specs={{ variant: "p3", type: "regular"}} color="primary01">
                            Design Lead at Microsoft
                        </Typography>
                    </ListItemInfoRow>
                </ListItemInfo>
            </ListItem>
        </ListContainer>
    </Container>
);