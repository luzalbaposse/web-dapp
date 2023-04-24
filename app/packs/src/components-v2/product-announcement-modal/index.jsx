import { Button, Modal, useModal } from "@talentprotocol/design-system";
import React, { useEffect, useState } from "react";
import { Container, Image } from "./styled";
import { H5, P2 } from "src/components/design_system/typography";
import { productAnnouncements } from "src/api/product-announcements";
import Divider from "src/components/design_system/other/Divider";
import Link from "src/components/design_system/link";

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
                  <Link
                    bold
                    className="mr-4 light-text-primary-01"
                    onClick={() => (window.location.href = productAnnouncement.link)}
                    text="Learn more"
                    type="white"
                  />
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
            <H5 bold className="mb-3" text={productAnnouncement.title} />
            <P2 text={productAnnouncement.content} />
          </Container>
        </Modal>
      )}
    </>
  );
};

export default (props, railsContext) => {
  return () => <ProductAnnouncementModal {...props} railsContext={railsContext} />;
};
