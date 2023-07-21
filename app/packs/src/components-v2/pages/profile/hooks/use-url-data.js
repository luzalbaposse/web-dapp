import { useEffect } from "react";
import { useState } from "react";

export const useUrlData = () => {
  const [urlData, setUrlData] = useState({ profileUsername: "" });
  useEffect(() => {
    setUrlData({ profileUsername: window.location.pathname.split("/")[2] });
  }, [setUrlData]);
  return urlData;
}
