import { useState } from "react";

export const useUrlData = () => {
  const [urlData] = useState(() => {
    const url = new URL(window.location.href);
    return {
      profileUsername: window.location.pathname.split("/")[2],
      tab: url.searchParams.get("tab")?.toLocaleLowerCase()
    };
  });
  return urlData;
};
