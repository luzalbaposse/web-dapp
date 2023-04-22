import axios from "axios";

const getLatestUnread = () => axios.get("/api/v1/product_announcements/latest_unread?");

export const productAnnouncements = {
  getLatestUnread
};
