import { Button, Modal, useModal, Typography, TextLink } from "@talentprotocol/design-system";
import React, { useEffect, useState } from "react";
import { Container, Image, LinkContainer, StyledUpdateContent } from "./styled";
import { productAnnouncements } from "src/api/product-announcements";
import Divider from "src/components/design_system/other/Divider";

const ProductAnnouncementModal = () => {
  const modalState = useModal();

  const [productAnnouncement, setProductAnnouncement] = useState(null);

  useEffect(() => {
    productAnnouncements
      .getLatestUnread()
      .then(({ data }) => {
        if (data.product_announcement) {
          setProductAnnouncement(data.product_announcement);
          modalState.openModal();
        }
      })
      .catch(() => {});
  }, []);

  const closeModal = () => {
    if (!productAnnouncement) return;

    productAnnouncements
      .markAsRead(productAnnouncement.id)
      .then(() => {})
      .catch(() => {});

    modalState.closeModal();
  };

  return (
    <>
      {productAnnouncement && (
        <Modal
          closeModal={closeModal}
          footer={
            <>
              <Divider />
              <div className="align-items-center d-flex justify-content-end p-3">
                {productAnnouncement.link && (
                  <LinkContainer>
                    <TextLink
                      size="small"
                      href={productAnnouncement.link}
                      newPage={true}
                      text="Learn more"
                      color="primary01"
                    />
                  </LinkContainer>
                )}
                <Button hierarchy="primary" onClick={closeModal} size="small" text="Got it!" />
              </div>
            </>
          }
          isOpen={modalState.isOpen}
          title="What's new?"
        >
          <Container>
            {productAnnouncement.image_url && <Image className="mb-4" src={productAnnouncement.image_url} />}
            <Typography
              specs={{
                type: "bold",
                variant: "h5"
              }}
              color="primary01"
              className="mb-2"
            >
              {productAnnouncement.title}
            </Typography>
            <StyledUpdateContent
              specs={{
                variant: "p2"
              }}
              color="primary03"
            >
              {productAnnouncement.content}
            </StyledUpdateContent>
          </Container>
        </Modal>
      )}
    </>
  );
};

export default (props, railsContext) => {
  return () => <ProductAnnouncementModal {...props} railsContext={railsContext} />;
};
