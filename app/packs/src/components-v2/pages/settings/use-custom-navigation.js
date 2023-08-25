import { useCallback, useState } from "react";
import { BASE_PAGES } from "./local-header/base-pages";

export const useCustomNavigation = (initialPage = "profile") => {
  const [page, setPage] = useState(() => BASE_PAGES[initialPage]);
  const goToPage = useCallback(page => {
    setPage(BASE_PAGES[page]);
    window.history.pushState({}, "", `?tab=${BASE_PAGES[page]}`);
  }, []);
  return {
    page,
    goToPage
  };
};
