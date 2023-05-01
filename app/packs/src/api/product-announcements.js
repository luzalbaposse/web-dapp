import axios from "axios";
import { appendCSRFToken, defaultHeaders } from "./utils";

const getLatestUnread = () => axios.get("/api/v1/product_announcements/latest_unread");

const markAsRead = productAnnouncementId => {
  const baseHeaders = defaultHeaders();
  const headers = appendCSRFToken(baseHeaders);

  return axios.put(`/api/v1/product_announcements/${productAnnouncementId}`, { headers: { ...headers } });
};

export const productAnnouncements = {
  getLatestUnread,
  markAsRead
};
