import { Dropdown } from "react-bootstrap";
import { Typography } from "@talentprotocol/design-system";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
import { Bell, ArrowLeft } from "src/components/icons";
import { get } from "src/utils/requests";
import { put, post } from "src/utils/requests";
import { useWindowDimensionsHook } from "../../utils/window";
import Button from "src/components/design_system/button";
import Divider from "src/components/design_system/other/Divider";
import Link from "src/components/design_system/link";
import NotificationTemplate from "src/components/design_system/notification";

const Notification = ({ mode, notification, onClick, showDivider = true }) => {
  return (
    <NotificationTemplate
      buttonLabel={notification.button_label}
      buttonUrl={notification.button_url}
      description={notification.body}
      mode={mode}
      onClick={url => onClick(notification, url)}
      secondaryButtonLabel={notification.secondary_button_label}
      secondaryButtonUrl={notification.secondary_button_url}
      showDivider={showDivider}
      sourceName={notification.source_name}
      sourceProfilePictureUrl={notification.source_profile_picture_url}
      sourceVerified={notification.source_verified}
      timeInformation={dayjs(notification.created_at).fromNow()}
      unread={!notification.read}
    />
  );
};

const Notifications = ({ mode }) => {
  const { width } = useWindowDimensionsHook();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [pagination, setPagination] = useState({});

  const loadNotifications = () => {
    get("/api/v1/notifications").then(response => {
      if (response.error) {
        console.log("Error loading notifications");
      } else {
        setNotifications(response.notifications);
        setPagination(response.pagination);
      }
    });
  };

  const loadMoreNotifications = () => {
    const nextPage = pagination.currentPage + 1;

    get(`/api/v1/notifications?page=${nextPage}`).then(response => {
      setNotifications(prev => [...prev, ...response.notifications]);
      setPagination(response.pagination);
    });
  };

  const showLoadMoreNotifications = pagination.currentPage < pagination.lastPage;

  useEffect(() => {
    loadNotifications();
  }, []);

  const notificationsUnread = notifications.some(notif => notif.read === false);

  const onNotificationClick = async (notification, url) => {
    if (!notification.read) await put(`/api/v1/notifications/${notification.id}/mark_as_read`);
    if (url || notification.url) window.location.href = url || notification.url;
  };

  const markAllAsRead = async () => {
    const request = await post("/api/v1/clear_notifications");
    if (request.success) {
      const newNotifications = notifications.map(n => ({ ...n, read: true }));
      setNotifications(newNotifications);
    }
  };

  if (width < 992) {
    return (
      <>
        <Button onClick={() => setShowNotifications(true)} type="white-ghost" mode={mode} className="ml-2" size="none">
          <Bell color="currentColor" size={20} />
        </Button>
        <Modal
          show={showNotifications}
          fullscreen="true"
          onHide={() => setShowNotifications(false)}
          dialogClassName={"m-0 mh-100 mw-100"}
          backdrop={false}
          className="p-0"
        >
          <Modal.Header className="align-items-center justify-content-between">
            <div className="align-items-center d-flex">
              <Button
                className="d-flex align-items-center justify-content-center mr-3"
                onClick={() => setShowNotifications(false)}
                size="icon"
                type="white-ghost"
              >
                <ArrowLeft color="currentColor" size={16} />
              </Button>
              <Typography color="primary01" specs={{ variant: "p1", type: "medium" }}>
                Notifications
              </Typography>
            </div>
            <Link
              className="p-0"
              disabled={notifications.length === 0}
              medium
              onClick={markAllAsRead}
              text="Mark all as read"
            />
          </Modal.Header>
          <Divider />
          <Modal.Body className="notifications-menu-body">
            {notifications.length === 0 ? (
              <small className="w-100 text-center">No notifications</small>
            ) : (
              <>
                {notifications.map((notification, index) => (
                  <div key={`notifications-menu-${notification.id}`}>
                    <Button
                      className="notifications-menu-dropdown-item text-left text-black w-100"
                      mode={mode}
                      onClick={() => onNotificationClick(notification)}
                      type="white-ghost"
                    >
                      <Notification
                        mode={mode}
                        notification={notification}
                        onClick={onNotificationClick}
                        showDivider={index !== notifications.length - 1}
                      />
                    </Button>
                  </div>
                ))}
                {showLoadMoreNotifications && (
                  <>
                    <Divider />
                    <a
                      className="p-0 my-3 notifications-menu-dropdown-item text-center"
                      onClick={() => loadMoreNotifications()}
                      href="#"
                    >
                      <Typography color="primary01" specs={{ variant: "p2", type: "bold" }}>
                        Load More
                      </Typography>
                    </a>
                  </>
                )}
              </>
            )}
          </Modal.Body>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Dropdown className="ml-2">
        <Dropdown.Toggle
          className="talent-button white-subtle-button normal-size-button no-caret"
          id="notifications-dropdown"
          as="div"
          style={{ height: 34 }}
        >
          <Bell
            color="currentColor"
            style={{
              marginRight: notificationsUnread ? -12 : -3,
              marginTop: -2
            }}
          />
          {notificationsUnread && <span className="notifications-unread-icon"></span>}
        </Dropdown.Toggle>

        <Dropdown.Menu align="left" className="notifications-menu" style={width < 400 ? { width: width - 50 } : {}}>
          <div className="notifications-menu-header">
            <Typography color="primary01" specs={{ variant: "p1", type: "medium" }}>
              Notifications
            </Typography>
            <Link
              className="p-0"
              disabled={notifications.length === 0}
              medium
              onClick={markAllAsRead}
              text="Mark all as read"
            />
          </div>
          <div className="notifications-menu-body">
            {notifications.length === 0 ? (
              <Dropdown.ItemText className="px-2 py-3" key="no-notifications">
                <small className="no-notifications-item">No notifications</small>
              </Dropdown.ItemText>
            ) : (
              <>
                {notifications.map((notification, index) => (
                  <Dropdown.Item
                    key={`${notification.id}-notification`}
                    className="notifications-menu-dropdown-item"
                    onClick={() => onNotificationClick(notification)}
                  >
                    <Notification
                      mode={mode}
                      notification={notification}
                      onClick={onNotificationClick}
                      showDivider={index !== notifications.length - 1}
                    />
                  </Dropdown.Item>
                ))}
                {showLoadMoreNotifications && (
                  <>
                    <Divider className="mb-3" />
                    <a
                      className="mb-3 notifications-menu-dropdown-item text-center"
                      onClick={() => loadMoreNotifications()}
                      href="#"
                    >
                      <Typography color="primary01" specs={{ variant: "p2", type: "bold" }}>
                        Load More
                      </Typography>
                    </a>
                  </>
                )}
              </>
            )}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default Notifications;
