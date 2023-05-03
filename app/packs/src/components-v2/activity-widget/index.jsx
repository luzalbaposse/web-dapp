import React from "react";
import { Avatar, Button, Input, TextLink, Typography } from "@talentprotocol/design-system";
import { Container, ReplyArea, TitleDateWrapper, TitleRow, Update, UpdateContent, UpdateTitle, UpdatesContainer } from "./styled";

export const ActivityWidget = ({ username }) => {
  return (
    <Container>
      <TitleRow>
        <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
          Activity
        </Typography>
        <TextLink color="primary" text="Read all" rightIcon="carret" href="/" size="medium" />
      </TitleRow>
      <UpdatesContainer>
        <Update>
          <UpdateTitle>
            <TitleDateWrapper>
              <Avatar size="sm" name="John Doe" isVerified={true} />
              <Typography specs={{ variant: "p2", type: "regular" }} color="primary04">{new Date().toLocaleDateString()}</Typography>
            </TitleDateWrapper> 
            <Button hierarchy="primary" size="small" text="Support" href={`/u/${"bguedes"}/support`} />
          </UpdateTitle>
          <UpdateContent>
              <Typography specs={{ variant: "p1", type: "medium" }} color="primary01">{"Career Update"}.</Typography>
              <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">I'm starting learning 3D modeling in Blender to complement my UI's better and create 3D digital assets like Tokens, Landscapes, NFTs, and many more! I'm starting learning 3D modeling in Blender to complement my UI's better and create 3D digital assets like Tokens, Landscapes, NFTs, and many more! I'm starting learning</Typography>
              {username !== "asdasd" && (
                <ReplyArea>
                  <Input
                    placeholder="Reply directly..."
                  />
                  <Button
                    hierarchy="secondary"
                    size="medium"
                    leftIcon="send"
                    iconColor={"primary01"}
                  />
                </ReplyArea>
              )}
          </UpdateContent>
        </Update>
        <Update>
          <UpdateTitle>
            <TitleDateWrapper>
              <Avatar size="sm" name="John Doe" isVerified={true} />
              <Typography specs={{ variant: "p2", type: "regular" }} color="primary04">{new Date().toLocaleDateString()}</Typography>
            </TitleDateWrapper> 
            <Button hierarchy="primary" size="small" text="Support" href={`/u/${"bguedes"}/support`} />
          </UpdateTitle>
          <UpdateContent>
              <Typography specs={{ variant: "p1", type: "medium" }} color="primary01">{"Career Update"}.</Typography>
              <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">I'm starting learning 3D modeling in Blender to complement my UI's better and create 3D digital assets like Tokens, Landscapes, NFTs, and many more! I'm starting learning 3D modeling in Blender to complement my UI's better and create 3D digital assets like Tokens, Landscapes, NFTs, and many more! I'm starting learning</Typography>
              {username !== "asdasd" && (
                <ReplyArea>
                  <Input
                    placeholder="Reply directly..."
                  />
                  <Button
                    hierarchy="secondary"
                    size="medium"
                    leftIcon="send"
                    iconColor={"primary01"}
                  />
                </ReplyArea>
              )}
          </UpdateContent>
        </Update>
        <Update>
          <UpdateTitle>
            <TitleDateWrapper>
              <Avatar size="sm" name="John Doe" isVerified={true} />
              <Typography specs={{ variant: "p2", type: "regular" }} color="primary04">{new Date().toLocaleDateString()}</Typography>
            </TitleDateWrapper> 
            <Button hierarchy="primary" size="small" text="Support" href={`/u/${"bguedes"}/support`} />
          </UpdateTitle>
          <UpdateContent>
              <Typography specs={{ variant: "p1", type: "medium" }} color="primary01">{"Career Update"}.</Typography>
              <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">I'm starting learning 3D modeling in Blender to complement my UI's better and create 3D digital assets like Tokens, Landscapes, NFTs, and many more! I'm starting learning 3D modeling in Blender to complement my UI's better and create 3D digital assets like Tokens, Landscapes, NFTs, and many more! I'm starting learning</Typography>
              {username !== "asdasd" && (
                <ReplyArea>
                  <Input
                    placeholder="Reply directly..."
                  />
                  <Button
                    hierarchy="secondary"
                    size="medium"
                    leftIcon="send"
                    iconColor={"primary01"}
                  />
                </ReplyArea>
              )}
          </UpdateContent>
        </Update>
      </UpdatesContainer>
    </Container>
  );
};
