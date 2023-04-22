import { Button, Modal, useModal } from "@talentprotocol/design-system";
import React, { useCallback, useEffect, useState } from "react";
import { H5, P2 } from "src/components/design_system/typography";
import { productAnnouncements } from "src/api/product-announcements";
import {
  Container
  // ClaimArea,
  // ClaimAreaInput,
  // ClaimAreaInputContainer,
  // OutterContainer,
  // BottomContainer,
  // ClaimAreaAmountContainer,
  // BottomDivider
} from "./styled";
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

  const closeModal = useCallback(() => {
    modalState.closeModal();
  }, [modalState.closeModal]);

  return (
    <>
      {productAnnouncement && (
        <Modal closeModal={closeModal} isOpen={modalState.isOpen} title="What's new?">
          <Container>
            <div className="mb-4">
              <img
                className="mb-4"
                src={"https://cdn.ttgtmedia.com/rms/onlineimages/networking-basic_url_structure_half_column_mobile.png"}
                width="100%"
              />
              <H5 bold className="mb-3" text={productAnnouncement.title} />
              <P2 text={productAnnouncement.content} />
            </div>
            <div className="align-items-center d-flex justify-content-end">
              <Link bold className="mr-4 light-text-primary-01" text="Learn more" type="white" />
              <Button hierarchy="primary" onClick={closeModal} size="small" text="Got it!" />
            </div>
          </Container>
        </Modal>
      )}
    </>
  );
};

export default (props, railsContext) => {
  return () => <ProductAnnouncementModal {...props} railsContext={railsContext} />;
};
